import express from "express";
import axios from "axios";
import cors from "cors";
import { body, validationResult} from "express-validator";
import { corsOrigin, port } from "./config.js";
import { registerUser, verificateUser, getUserData, updateUserData, topUpYourBalance, makingAnOrder } from "./db.js";

const app = express();

app.use(cors({
    origin: corsOrigin,
    credentials: true
}));
app.use(express.json({ limit: "5mb" }));
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/api/steam/:appId", async (req, res) => {
    try {
        const gameId = req.params.appId;
        const responce = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${gameId}`);
        res.json(responce.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Steam API' });
    }
});


app.post("/api/loginData", [
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").isLength({ min: 6 }).withMessage("Минимальная длина 6 символов")
], async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ message: "Некорректно введены данные" })
    }

    const { email, password } = req.body;
    
    try {
        const result = await verificateUser(email.trim(), password.trim());
        res.status(201).json({ message: "Данные получены успешно", data: result });
    } catch (error) {
        if(!error.code) error.code = 500;
        res.status(error.code).json({ message: (error.code == 500) ? "Ошибка сервера при обработке данных" : error.message });
    }
});

app.post("/api/registerData", [
    body("email").isEmail().withMessage("Некорректный email"),
    body("password").isLength({ min: 6 }).withMessage("Минимальная длина 6 символов")
], async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ message: "Некорректно введены данные" })
    }

    const { username, email, password } = req.body;
    try {
        const result = await registerUser(username.trim(), email.trim(), password.trim());
        
        res.status(201).json({ message: "Данные получены успешно", userId: result});
    } catch (error) {        
        if(!error.code) error.code = 500;
        res.status(error.code).json({ message: (error.code == 500) ? "Ошибка сервера при обработке данных" : error.message });
    }
});

app.post("/api/updateUserData", async (req, res) => {
    try {
        const { id, avatarIcon, username, dateOfBirth, email, password } = req.body;
        const result = await updateUserData(id, avatarIcon, username.trim(), dateOfBirth, email.trim(), password.trim());
        res.status(200).json({ message: "Данные успешно обновлены" });
    } catch (error) {
        if(!error.code) error.code = 500;
        res.status(error.code).json({ message: (error.code == 500) ? "Ошибка сервера при обработке данных" : error.message });
    }
});

app.get("/api/getUserData/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const formattedId = userId.replace(/['"]/g, "");
        
        const result = await getUserData(formattedId);
        res.status(201).json({ message: "Данные получены успешно", data: result });
    } catch (error) {
        if(!error.code) error.code = 500;
        res.status(error.code).json({ message: (error.code == 500) ? "Ошибка сервера при обработке данных" : error.message });
    }
});

app.post("/api/topUpYourBalance", async (req, res) => {
    try {
        const { id, cash } = req.body;
        const result = await topUpYourBalance(id, cash);
        res.status(200).json({ message: "Баланс успешно попонен" });
    } catch (error) {
        if(!error.code) error.code = 500;
        res.status(error.code).json({ message: (error.code == 500) ? "Ошибка сервера при обработке данных" : error.message });
    }
});

app.post("/api/makingAnOrder", async (req, res) => {
    try {
        const { id, purchase } = req.body;
        const result = await makingAnOrder(id, purchase);
        res.status(200).json({ message: "Покупка успешно завершена" });
    } catch (error) {
        if(!error.code) error.code = 500;
        res.status(error.code).json({ message: (error.code == 500) ? "Ошибка сервера при обработке данных" : error.message });
    }
});

app.listen(port, () => {
    console.clear();
    console.log(`Сервер запущен на http://localhost:${port}`);
});