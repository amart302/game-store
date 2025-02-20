<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmitLogin()" style="width: 320px;">
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
            <p>У вас еще нет аккаунта ? <router-link to="/register">Зарегистрироваться</router-link></p>
        </form>
    </div>
    
</template>

<script setup>
    import { ref, reactive } from "vue";
    import { useRouter } from "vue-router";
    localStorage.removeItem("userData");

    const router = useRouter();

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
                localStorage.setItem("userData", JSON.stringify(item));
                setTimeout(() => router.push("/"), 1000);
            }
        });
        if(!check) errors.generalError = "Неверный логин или пароль";
    };
</script>
