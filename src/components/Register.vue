<template>
    <div class="form-container" @submit.prevent="handleSubmit()">
        <form>
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
        </form>
    </div>
</template>

<script setup>
    import { ref, reactive } from "vue";

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

    const handleSubmit = () => {
        errors.generalError = "";
        errors.username = "";
        errors.email = "";
        errors.password = "";
        errors.confirmPassword = "";
        validateData();
        
        if(errors.username || errors.email || errors.password || errors.confirmPassword){
            return 1;
        }else if(password.value != confirmPassword.value){
            errors.generalError = "Пароли не совпадают";
            return 1;
        }
        const users = JSON.parse(localStorage.setItem("users"));

        const newUser = {
            username: username.value,
            email: email.value,
            password: password.value
        };
        users.map(item => {
            if(item.username == newUser.username){
                errors.generalError = "Пользователь с таким ником уже существует";
            }else if(item.email == newUser.email){
                errors.generalError = "Пользователь с такой почтой уже существует";
            }
        })
    };
</script>

<style scoped>
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
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 20px;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    h2{
        text-align: center;
    }
    input{
        width: calc(100% - 12px);
        padding: 6px;
        border: solid 1px;
        border-radius: 6px;
    }
    button{
        height: 30px;
        cursor: pointer;
        background-color: #77BE1D;
        border: none;
        border-radius: 6px;
        color: white;
        transition: all 0.2s;
    }
    button:hover{
        opacity: 0.7;
    }
    .error-message{
        color: red;
    }
</style>