<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmitRegister()">
            <img class="cross-icon" src="../assets/images/cross.png" @click="() => mainStore.closeForm()">
            <h2>Регистрация</h2>
            <div class="form-group">
                <input type="text" v-model="username" placeholder="Ник пользователя">
                <p v-if="errors.username" class="error-message">{{ errors.username }}</p>
            </div>
            <div class="form-group">
                <input type="text" v-model="email" placeholder="Электронная почта">
                <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
            </div>
            <div class="form-group">
                <input type="password" v-model="password" placeholder="Пароль">
                <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
            </div>
            <div class="form-group">
                <input type="password" v-model="confirmPassword" placeholder="Подтвердите пароль">
                <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
            </div>
            <p v-if="errors.generalError" class="error-message">{{ errors.generalError }}</p>
            <button type="submit">Зарегистрироваться</button>
            <p>У вас уже есть аккаунт ? <span @click="() => mainStore.openLoginForm()">Войти</span></p>
        </form>

        
    </div>
</template>

<script setup>
    import { useMainStore } from "@/store/store";
    import { ref, reactive } from "vue";
    import { useRouter } from "vue-router";
    import { useToast } from "vue-toastification";
    import axios from "axios";

    const mainStore = useMainStore();
    const toast = useToast();
    const router = useRouter();

    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const errors = reactive({
        generalError: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const validateData = () => {
        errors.generalError = "";
        errors.username = "";
        errors.email = "";
        errors.password = "";
        errors.confirmPassword = "";
        if(!username.value.trim()){
            errors.username = "Это поле обязательно для заполнения";
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email.value.trim()){
            errors.email = "Это поле обязательно для заполнения";
        }else if(!emailPattern.test(email.value)){
            errors.email = "Некорректная формат почты";
        }

        if(!password.value.trim()){
            errors.password = "Это поле обязательно для заполнения";
        }else if(password.value.trim().length < 6){
            errors.password = "Минимальная длина пароля 6 символов";
        }

        if(!confirmPassword.value.trim()){
            errors.confirmPassword = "Это поле обязательно для заполнения";
        }else if(confirmPassword.value.trim().length < 6){
            errors.confirmPassword = "Минимальная длина пароля 6 символов";
        }

        if(password.value != confirmPassword.value){
            errors.generalError = "Пароли не совпадают";
        }
    };

    const handleSubmitRegister = async () => {
        try {
            validateData();
            if(errors.username || errors.email || errors.password || errors.confirmPassword || errors.generalError) return 1;
            
            const response = await axios.post("http://localhost:3000/api/registerData", { username: username.value, email: email.value, password: password.value });
            
            sessionStorage.setItem("userId", JSON.stringify(response.data.userId));
            toast.success("Успешная регистрация");
            setTimeout(() => window.location.reload(), 1200);
        } catch (error) {
            if(error.response){
                errors.generalError = error.response.data.message;
            }else{
                errors.generalError = error.message;
            }
        }
    };
    
</script>

<style>
    .form-container{
        width: 100%;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 6;
        background-color: rgba(0, 0, 0, 0.5);
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
    .cross-icon{
        position: absolute;
        top: 30px;
        right: 30px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    form h2{
        text-align: center;
    }
    form input{
        width: 100%;
        padding: 8px;
        background-color: rgba(196, 196, 196, 0.05);
        border: none;
        border-radius: 6px;
        color: white;
        height: 40px;
        font-size: 20px;
    }
    form button{
        height: 40px;
        cursor: pointer;
        background-color: #77BE1D;
        border: none;
        border-radius: 6px;
        color: white;
        transition: all 0.2s;
        font-size: 18px;
    }
    form button:hover{
        opacity: 0.7;
    }
    .error-message{
        text-align: left;
        color: red;
    }
    form p{
        text-align: center;
        font-size: 16px;
    }
    form span{
        color: #77BE1D;
        text-decoration: underline;
        cursor: pointer;
    }
</style>