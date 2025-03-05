<template>
    <Header />
    <main>
        <section class="profile-wrapper">
            <div class="profile-card">
                <h1>Профиль пользователя</h1>
                <form @submit.prevent="updateUserData()" class="profile-form">
                    <div class="avatar-section">
                        <div class="avatar-wrapper">
                            <img :src="avatarIcon" alt="User Avatar" class="avatar-img">
                            <label class="upload-btn">
                                <input type="file" hidden @change="handleFileChange" accept="image/*">
                                <img :src="upload" alt="Upload" class="upload-icon">
                            </label>
                        </div>
                    </div>
                    <div class="form-fields">
                        <div class="field-group">
                            <label>Игровой ник</label>
                            <input type="text" v-model="updateUsername" placeholder="Введите ваш ник">
                            <span v-if="errors.username" class="error">{{ errors.username }}</span>
                        </div>
                        <div class="field-group">
                            <label>Полное имя</label>
                            <input type="text" v-model="updateFullName" placeholder="Введите ваше имя">
                            <span v-if="errors.fullName" class="error">{{ errors.fullName }}</span>
                        </div>
                        <div class="field-group">
                            <label>Электронная почта</label>
                            <input type="email" v-model="updateEmail" placeholder="example@mail.com">
                            <span v-if="errors.email" class="error">{{ errors.email }}</span>
                        </div>
                        <div class="field-group">
                            <label>Новый пароль</label>
                            <input type="password" v-model="updatePassword" placeholder="Введите новый пароль">
                            <span v-if="errors.password" class="error">{{ errors.password }}</span>
                        </div>
                        <div class="field-group">
                            <label>Подтверждение пароля</label>
                            <input type="password" v-model="confirmPassword" placeholder="Подтвердите пароль">
                            <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
                        </div>
                        <div class="field-group">
                            <label>Дата рождения</label>
                            <input type="date" v-model="updateBirthDate">
                            <span v-if="errors.birthDate" class="error">{{ errors.birthDate }}</span>
                        </div>
                        <button type="submit" class="submit-btn">Сохранить изменения</button>
                    </div>
                </form>
            </div>
        </section>
    </main>
    <Footer />
</template>
<script setup>
import { reactive, ref } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import upload from "../assets/images/upload.svg";
import crossIcon from "../assets/images/cross.svg";
import defaultAvatar from "../assets/images/avatarIcon.png";


const userData = JSON.parse(localStorage.getItem("userData")) || {};
const users = JSON.parse(localStorage.getItem("users")) || [];

const updateUsername = ref(userData.username || '');
const updateEmail = ref(userData.email || '');
const updateFullName = ref(userData.fullName || '');
const updatePassword = ref('');
const confirmPassword = ref('');
const updateBirthDate = ref(userData.birthDate || '');
const avatarIcon = ref(userData.avatarIcon || defaultAvatar);

const errors = reactive({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    birthDate: ""
});

const validateData = () => {
    Object.keys(errors).forEach(key => errors[key] = "");
    if (!updateUsername.value.trim()) errors.username = "Это поле обязательно";
    if (!updateEmail.value.trim()) {
        errors.email = "Это поле обязательно";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateEmail.value)) {
        errors.email = "Некорректный формат почты";
    }
    if (!updateFullName.value.trim()) errors.fullName = "Это поле обязательно";
    if (updatePassword.value && updatePassword.value !== confirmPassword.value) {
        errors.confirmPassword = "Пароли не совпадают";
    }
    if (updateBirthDate.value && new Date(updateBirthDate.value) > new Date()) {
        errors.birthDate = "Дата не может быть в будущем";
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            avatarIcon.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const updateUserData = () => {
    validateData();
    if (Object.values(errors).some(error => error)) return;

    const updatedUser = {
        ...userData,
        username: updateUsername.value,
        email: updateEmail.value,
        fullName: updateFullName.value,
        birthDate: updateBirthDate.value,
        avatarIcon: avatarIcon.value,
        ...(updatePassword.value && { password: updatePassword.value })
    };

    const updatedUsers = users.map(item => 
        item.id === userData.id ? { ...item, ...updatedUser } : item
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("userData", JSON.stringify(updatedUser));
};
</script>
<style scoped>
main {
    min-height: 100vh;
    padding: 20px;
}

.profile-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.profile-card {
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 800px;
}

h1 {
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
    font-size: 28px;
}

.profile-form {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
}

.avatar-section {
    display: flex;
    flex-shrink: 0;
}

.avatar-wrapper {
    position: relative;
    width: 300px;
    height: 300px;
    background: #333;
    border-radius: 12px;
    overflow: hidden;
}

.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: #77BE1D;
    padding: 8px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.upload-btn:hover {
    transform: scale(1.1);
}

.upload-icon {
    width: 24px;
    height: 24px;
}

.form-fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%; /* Даём полям полную доступную ширину */
    max-width: 400px; 
    flex-grow: 1; 
}

.field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.field-group label {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
}

.field-group input {
    padding: 10px;
    border: 1px solid #444;
    border-radius: 6px;
    background: #222;
    color: #fff;
    font-size: 14px;
}

.field-group input:focus {
    outline: none;
    border-color: #77BE1D;
}

.error {
    color: #ff5555;
    font-size: 12px;
}

.submit-btn {
    padding: 12px;
    background: #77BE1D;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s ease;
}

.submit-btn:hover {
    background: #5a9c14;
}

@media (max-width: 768px) {
    .profile-form {
        flex-direction: column; /* Переключаем на вертикальное расположение */
        align-items: center;
    }

    .avatar-wrapper {
        width: 200px;
        height: 200px;
    }

    .profile-card {
        padding: 15px;
    }

    .form-fields {
        max-width: 100%; /* Убираем ограничение ширины на малых экранах */
    }
}

@media (max-width: 480px) {
    .avatar-wrapper {
        width: 150px;
        height: 150px;
    }

    h1 {
        font-size: 24px;
    }
}
</style>