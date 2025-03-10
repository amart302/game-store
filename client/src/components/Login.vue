<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmitLogin()">
            <img src="../assets/images/cross.png" @click="() => mainStore.closeForm()">
            <h2>Авторизация</h2>
            <div class="form-group">
                <input type="text" v-model="email" placeholder="Электронная почта">
                <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
            </div>
            <div class="form-group">
                <input type="password" v-model="password" placeholder="Пароль">
                <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
            </div>
            <p v-if="errors.generalError" class="error-message">{{ errors.generalError }}</p>
            <button type="submit">Войти</button>
            <p>У вас еще нет аккаунта ? <span @click="() => mainStore.openRegisterForm()">Зарегистрироваться</span></p>
        </form>
    </div>
    
</template>

<script setup>
    import { useMainStore } from "@/store/store";
    import { ref, reactive } from "vue";
    sessionStorage.removeItem("userData");

    const mainStore = useMainStore();

    const email = ref("");
    const password = ref("");

    const errors = reactive({
        generalError: "",
        email: "",
        password: "",
    });

    const validateData = () => {
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
    };

    const handleSubmitLogin = () => {
        errors.generalError = "";
        errors.email = "";
        errors.password = "";
        validateData();

        if(errors.email || errors.password){
            return 1;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];

        let check = false;
        users.map(item => {
            if(item.email == email.value && item.password == password.value){
                check = true;
                sessionStorage.setItem("userData", JSON.stringify(item));
                setTimeout(() => window.location.reload(), 1000);
            }
        });
        if(!check) errors.generalError = "Неверный логин или пароль";
    };
</script>
