<template>
    <div class="container-profile">
        <div class="block-profile">
            <div class="form-container">
                <h1>Profile</h1>
                <form @submit.prevent="updateUserData()"
                    style="padding-top: 30px; display: flex; flex-direction: row; gap: 20px; width: auto;">
                    <div class="form-avatar-container">
                        <div class="avatar-icon">
                            <img :src="avatarIcon"  alt="User Avatar">

                                <label class="upload" name="upload" >
                                    <input type="file" style="display: none;" @change="handleFileChange" accept="image/*">
                                    <img :src="upload" for="upload" name="upload" alt="">
                                </label>
                            
                        </div>
                     
                        <!-- <input type="file" @change="handleFileChange" accept="image/*"> -->
                    </div>
                    <div class="form-child-container">
                        <div class="profile-group">
                            <label>Игровой ник:</label>
                            <input type="text" v-model="updateUsername" placeholder="Введите ваш ник">
                            <p v-if="errors.username" class="error-message">{{ errors.username }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Полное имя:</label>
                            <input type="text" v-model="updateFullName" placeholder="Введите ваше имя">
                            <p v-if="errors.fullName" class="error-message">{{ errors.fullName }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Электронная почта:</label>
                            <input type="email" v-model="updateEmail" placeholder="example@mail.com">
                            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Новый пароль:</label>
                            <input type="password" v-model="updatePassword" placeholder="Введите новый пароль">
                            <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Подтверждение пароля:</label>
                            <input type="password" v-model="confirmPassword" placeholder="Подтвердите пароль">
                            <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Дата рождения:</label>
                            <input type="date" v-model="updateBirthDate">
                            <p v-if="errors.birthDate" class="error-message">{{ errors.birthDate }}</p>
                        </div>
                        <button type="submit">Обновить данные</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import { reactive, ref } from 'vue';

import upload from "../assets/images/upload.svg"

const props = defineProps({
    showAndHideProfile: Function
});

const userData = JSON.parse(localStorage.getItem("userData"));

const updateUsername = ref(userData.username);
const updateEmail = ref(userData.email);

const errors = reactive({
    username: "",
    email: "",
});

const validateData = () => {
    errors.username = "";
    errors.email = "";
    if (!updateUsername.value.trim()) {
        errors.username = "Это поле обязательно для заполнения";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!updateEmail.value.trim()) {
        errors.email = "Это поле обязательно для заполнения";
    } else if (!emailPattern.test(updateEmail.value)) {
        errors.email = "Некорректная формат почты";
    }
};

let avatarIcon = ref(userData.avatarIcon || 'src/assets/images/avatarIcon.png');

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

    if (errors.email || errors.username) return;
    const users = JSON.parse(localStorage.getItem("users"));
    users.map(item => {
        if (item.id == userData.id) {
            item.username = updateUsername.value;
            item.email = updateEmail.value;
            item.avatarIcon = avatarIcon.value;
        }
    });
    localStorage.setItem("users", JSON.stringify(users));
};
</script>

<style scoped>
.block-profile{
    background-color: rgba(0, 0, 0, 0.4)
}
.form-container {
    display: flex;
    flex-direction: column;
}

.cross {
    position: absolute;
    top: 16px;
    right: 20px;
    width: 16px;
    height: 16px;
    cursor: pointer;
}

.avatar-icon {
    height: max-content;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
.avatar-icon img {
    width: 600px;
    height: 600px;
    object-fit: cover;
    border-radius: 50%;
    margin: auto;
}

.form-child-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 50%;
}

.form-avatar-container {
    padding-top: 30px;
    display: flex;
    position: relative;
    flex-direction: row;
    gap: 20px;
    width: 1000px;
    height: 800px;
}

.form-avatar-container .upload {
    position: absolute;
    background: #77BE1D;
    padding: 10px;
    border-radius: 50%;
    bottom: 10px;
    right: 80px;
}

.form-avatar-container .upload img {
    padding:30px;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style> 