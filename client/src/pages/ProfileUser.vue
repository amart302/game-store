<template>
    <Header />
    <div class="container-profile">
        <div class="block-profile">
            <div class="form-profile-container">
                <h1>Профиль пользователя</h1>
                <br>
                <form @submit.prevent="updateUserData()"
                    style=" display: flex; flex-direction: row; gap: 20px; width: auto;">
                    <div class="form-avatar-container">
                        <div class="avatar-icon">
                            <img :src="avatarIcon"  alt="User Avatar">
                                <label class="upload" name="upload" >
                                    <input type="file" style="display: none;" @change="handleFileChange" accept="image/*">
                                    <!-- <img :src="upload" for="upload" name="upload" alt=""> -->
                                    <img src="../assets/images/upload.svg" alt="">
                                </label>
                        </div>
                        <button type="button" @click="() => logOut()">Выйти из аккаунта</button>
                    </div>
                    <div class="form-child-container">
                        <div class="profile-group">
                            <label>Игровой ник:</label>
                            <input type="text" v-model="updateUsername" placeholder="Введите ваш ник">
                            <p v-if="errors.username" class="error-message">{{ errors.username }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Электронная почта:</label>
                            <input type="email" v-model="updateEmail" placeholder="example@mail.com">
                            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Новый пароль:</label>
                            <input type="password" v-model="updatePassword" placeholder="******">
                            <p v-if="errors.updatePassword" class="error-message">{{ errors.updatePassword }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Подтверждение пароля:</label>
                            <input type="password" v-model="confirmPassword" placeholder="******">
                            <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
                        </div>
                        <div class="profile-group">
                            <label>Дата рождения:</label>
                            <input type="date" v-model="updateBirthDate">
                        </div>
                        <p v-if="errors.generalError" class="error-message">{{ errors.generalError }}</p>
                        <button type="submit">Обновить данные</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <Footer />
</template>


<script setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useMainStore } from '@/store/store';
import axios from 'axios';
import { reactive, ref, watch } from 'vue';
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const mainStore = useMainStore();
const router = useRouter();
const userId = sessionStorage.getItem("userId");

if (!userId) {
    router.push('/');
}
const toast = useToast();


const updatePassword = ref("");
const confirmPassword = ref("");
const avatarIcon = ref((mainStore.userData) ? mainStore.userData.avatarIcon : "src/assets/images/avatarIcon.png");
const updateUsername = ref((mainStore.userData) ? mainStore.userData.username : "");
const updateEmail = ref((mainStore.userData) ? mainStore.userData.email : "");
const updateBirthDate = ref((mainStore.userData) ? mainStore.userData.dateOfBirth : "");

watch(() => mainStore.userData, (newUserData) => {
    if (newUserData) {
        updateUsername.value = newUserData.username;
        updateEmail.value = newUserData.email;
        updateBirthDate.value = newUserData.dateOfBirth;
        avatarIcon.value = newUserData.avatarIcon;
    } else {
        updateUsername.value = "";
        updateEmail.value = "";
        updateBirthDate.value = "";
        avatarIcon.value = 'src/assets/images/avatarIcon.png';
    }
}, { deep: true });

const errors = reactive({
    username: "",
    email: "",
    updatePassword: "",
    confirmPassword: "",
    generalError: ""
});

const validateData = () => {
    errors.username = "";
    errors.email = "";
    errors.updatePassword = "";
    errors.confirmPassword = "";
    errors.generalError = "";

    if (!updateUsername.value.trim()) {
        errors.username = "Это поле обязательно для заполнения";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!updateEmail.value.trim()) {
        errors.email = "Это поле обязательно для заполнения";
    } else if (!emailPattern.test(mainStore.userData.email)) {
        errors.email = "Некорректная формат почты";
    }
    
    if(updatePassword.value || confirmPassword.value){
        if(updatePassword.value.trim().length < 6){
            errors.updatePassword = "Минимальная длина пароля 6 символов";
        }

        if(confirmPassword.value.trim().length < 6){
            errors.confirmPassword = "Минимальная длина пароля 6 символов";
        }

        if(updatePassword.value !== confirmPassword.value){
            errors.generalError  = "Пароли не совпадают";
        }
    }
};

const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            mainStore.userData.avatarIcon = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const logOut = () => {
    sessionStorage.clear();
    setTimeout(() => window.location.reload(), 600);
};

const updateUserData = async () => {
    try {
        validateData();
        if (errors.generalError || errors.email || errors.username || 
            errors.updatePassword || errors.confirmPassword) return;
        
        const response = await axios.post("http://localhost:3000/api/updateUserData", 
            {
                id: userId,
                avatarIcon: mainStore.userData.avatarIcon,
                username: updateUsername.value,
                email: updateEmail.value,
                password: updatePassword.value,
                dateOfBirth: updateBirthDate.value
            }
        );
        mainStore.getUserData();
        toast.success("Данные обновлены");
        setTimeout(() => router.push("/"), 1200);
    } catch (error) {
        if(error.response){
            errors.generalError = error.response.data.message;
        }else{
            errors.generalError = error.message;
        }
    }
};
// 
</script>

<style scoped>
.form-profile-container {
    min-height: calc(100vh - 600px);
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-block: 20px;
    z-index: 6;
}
form{
    position: relative;
    width: 420px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 30px;
    border-radius: 20px;
    background-color: #13101B;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-size: 20px;
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
    width: 460px;
    height: 460px;
    object-fit: cover;
    border-radius: 50%;
    margin: auto;
}

.form-child-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
}

.form-avatar-container {
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 20px;
    width: 1000px;
    height: 700px;
}
.form-avatar-container button{
    width: 200px;
    background-color: red;
}

.form-avatar-container .upload {
    padding: 25px;
    position: absolute;
    background: #77BE1D;
    border-radius: 50%;
    bottom: 10px;
    right: 80px;
    cursor: pointer;
}

.form-avatar-container .upload img {
    width: 35px;
    height: 35px;
}
</style> 