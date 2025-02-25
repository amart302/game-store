<template>
  <div class="form-container" style="background-color: rgba(0, 0, 0, 0.4)">
      <form @submit="updateUserData()" style="padding-top: 30px; display: flex; flex-direction: row; gap: 20px; width: auto;">
          <img class="cross" src="../assets/images/cross.png" @click="props.showAndHideProfile()">
          <div class="form-child-container" style="align-items: center; gap: 10px;">
              <img :src="avatarIcon" class="avatar-icon">
              <input type="file" @change="handleFileChange">
          </div>
          <div class="form-child-container">
              <div class="profile-group">
                  <label>Ник пользователя:</label>
                  <input type="text" v-model="updateUsername">
                  <p v-if="errors.username" class="error-message">{{ errors.username }}</p>
              </div>
              <div class="profile-group">
                  <label>Электронная почта:</label>
                  <input type="text" v-model="updateEmail">
                  <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
              </div>
              <button type="submit">Обновить данные</button>
          </div>
      </form>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';

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
      if(!updateUsername.value.trim()){
          errors.username = "Это поле обязательно для заполнения";
      }
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!updateEmail.value.trim()){
          errors.email = "Это поле обязательно для заполнения";
      }else if(!emailPattern.test(updateEmail.value)){
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

      if(errors.email || errors.username) return;
      const users = JSON.parse(localStorage.getItem("users"));        
      users.map(item => {
          if(item.id == userData.id){
              item.username = updateUsername.value;
              item.email = updateEmail.value;
              item.avatarIcon = avatarIcon.value;
          }
      });
      localStorage.setItem("users", JSON.stringify(users));
  };
</script>

<style scoped>
  .cross{
      position: absolute;
      top: 16px;
      right: 20px;
      width: 16px;
      height: 16px;
      cursor: pointer;
  }
  .avatar-icon{
      width: 200px;
      height: 200px;
      border-radius: 50%;
  }
  .form-child-container{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
  }
</style>