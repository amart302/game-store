import bcrypt from "bcrypt";
import { mongoURI } from "./config.js";
import mongoose, { Schema, Types } from "mongoose";

const { ObjectId } = Types;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Подключение к MongoDB успешно"))
    .catch((err) => console.error("Ошибка подключения в MongoDB", err));

const purchaseItemSchema = new Schema({
    id: { type: Number, required: true },
    key: { type: String, required: true },
    name: { type: String, required: true },
    final_price: { type: String, required: true },
    large_capsule_image: { type: String },
    windows_available: { type: Boolean, default: false },
    mac_available: { type: Boolean, default: false },
    linux_available: { type: Boolean, default: false }
}, { _id: false });

const purchaseRecordSchema = new Schema({
    date: { type: String, required: true },
    items: { type: [purchaseItemSchema], required: true },
    method: { type: String, required: true },
    status: { type: String, required: true },
    total: { type: Number, required: true }
}, { _id: false });

const userSchema = new Schema({
    avatarIcon: { type: String, default: "src/assets/images/avatarIcon.png" },
    username: { type: String, required: true, unique: true },
    fullName: { type: String, default: null },
    dateOfBirth:  { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 10000 },
    purchaseHistory: {
        type: [purchaseRecordSchema],
        default: []
    },
    createdAt: { type: Date, default: () => Date.now() }
});

const User = mongoose.model("User", userSchema);

const createError = (message, code, field, originError = null) => {
    const error = new Error(message);
    error.code = code;
    error.field = field;
    if(originError){
        error.keyPattern = originError.keyPattern;
        error.keyValue = originError.keyValue;
    }
    return error;
};

export async function registerUser(username, email, password){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return savedUser._id;
    } catch (error) {
        if(error.code === 11000){
            if(error.keyPattern.username){
                throw createError("Пользователь с таким ником уже существует", 409, "username", error);
            }else if(error.keyPattern.email){
                throw createError("Пользователь с такой почтой уже существует", 409, "email", error);
            }
        }else{
            console.error("Ошибка при регистрации пользователя:", error);
            throw error;
        }
    }
};

export async function verificateUser(email, password){
    try {
        const foundUser = await User.findOne({ email: email });
        const isPasswordValid = (foundUser) ? await bcrypt.compare(password, foundUser.password) : null;

        if(!foundUser || !isPasswordValid){
            throw createError("Неправильный логин или пароль", 401, (!foundUser) ? "email" : "password");
        }else{
            return foundUser._id;
        }
    } catch (error) {
        console.error("Ошибка при проверке пользователя:", error);
        throw error;
    }
};

export async function getUserData(id){
    try {
        const foundUser = await User.findOne({ _id: new Object(id)}).select("-password");
        if(!foundUser){
            throw createError("Пользователь не найден", 404);
        }
        return foundUser;
    } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        throw error;
    }
};

export async function updateUserData(id, avatarIcon, username, dateOfBirth, email, password){
    try {
        const update = {
            avatarIcon: avatarIcon,
            username: username,
            email: email,
            dateOfBirth: dateOfBirth,
        };

        let hashedPassword;
        if(password !== ""){
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
            update.password = hashedPassword
        }
        const checkUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (checkUser) {
            if (checkUser.username === username && checkUser._id.toString() !== id) {
                throw createError("Пользователь с таким ником уже существует", 409, "username");
            }else if (checkUser.email === email && checkUser._id.toString() !== id) {
                throw createError("Пользователь с такой почтой уже существует", 409, "email");
            } 
        }

        const updateUser = await User.findOneAndUpdate(
            { _id: new Object(id)},
            update,
            { new: true }
        );
    } catch (error) {
        console.error("Ошибка при попытке обновить данные:", error);
        throw error;
    }
};

export async function topUpYourBalance(id, cash){
    try {
        const numericCash = Number(cash);
        
        if (isNaN(numericCash)) {
            throw new Error("Сумма пополнения должна быть числом");
        }
        const updateUser = await User.findOneAndUpdate(
            { _id: new Object(id)},
            { $inc: { balance: numericCash } },
            { new: true }
        );
    } catch (error) {
        console.error("Ошибка при попытке пополнить баланс:", error);
        throw error;
    }
};

export async function makingAnOrder(id, purchase){
    try {
        const numericTotal = Number(purchase.total);
        
        const purchaseRecord = {
            date: purchase.date,
            items: purchase.items,
            method: purchase.method,
            status: purchase.status,
            total: numericTotal
        };

        const updateUser = await User.findOneAndUpdate(
            { _id: id },
            {
                $inc: { balance: -numericTotal },
                $push: { purchaseHistory: purchaseRecord }
            },
            { new: true }
        );
    } catch (error) {
        console.error("Ошибка при оформлении заказа:", error);
        throw error;
    }
};