<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmitRegister()">
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
            <p>У вас уже есть аккаунт ? <router-link to="/login">Войти</router-link></p>
        </form>

        
    </div>
</template>

<script setup>
    import { ref, reactive } from "vue";
    import { useRouter } from "vue-router";
    localStorage.removeItem("userData");

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
    };

    const handleSubmitRegister = () => {
        validateData();
        
        if(errors.username || errors.email || errors.password || errors.confirmPassword) return 1;
        else if(password.value != confirmPassword.value){
            errors.generalError = "Пароли не совпадают";
            return 1;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];

        
        users.map(item => {
            if(item.username == username.value){
                errors.generalError = "Пользователь с таким ником уже существует";
            }else if(item.email == email.value){
                errors.generalError = "Пользователь с такой почтой уже существует";
            }
        });

        if(errors.generalError){
            return 1;
        }

        const newUser = {
            id: users.length + 1,
            username: username.value,
            email: email.value,
            password: password.value
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userData", JSON.stringify(newUser));
        setTimeout(() => router.push("/"), 1000);
    };

    
</script>

<style>
    .form-container{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    form{
        position: relative;
        width: 320px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 20px;
        border-radius: 10px;
        background-color: #13101B;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    form h2{
        text-align: center;
    }
    form input{
        width: calc(100% - 12px);
        padding: 8px;
        background-color: rgba(196, 196, 196, 0.05);
        border: none;
        border-radius: 6px;
        color: white;
    }
    form button{
        height: 30px;
        cursor: pointer;
        background-color: #77BE1D;
        border: none;
        border-radius: 6px;
        color: white;
        transition: all 0.2s;
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
        font-size: 14px;
    }
    form a{
        color: #77BE1D;
        cursor: pointer;
    }
</style>