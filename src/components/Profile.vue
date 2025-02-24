<template>
    <div class="profileBlock_background" v-if="show" @click.self="close">
      <div class="profileBlock">
        <h3>Профиль:</h3>
        <img src="../assets/images/cross.svg" id="closeProfile" @click="close" />
        <div class="profileForm_user">
          <div class="profileFrom_avatar">
            <img :src="avatarSrc || '../assets/images/profileImg.jpg'" class="avatarImg" />
          </div>
          <span class="userName">{{ userName }}</span>
        </div>
        <form @submit.prevent="submitForm">
          <label>Файл</label><br />
          <input type="file" @change="handleFileUpload" /><br /><br />
          <div class="user_info">
            <div>Ваш email: <span class="email">{{ email }}</span></div>
            <a class="changeEmail" @click="changeEmail">Изменить почту</a>
          </div>
          <button class="commitChangesBtn" type="submit">Зафиксировать изменения</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Profile',
    props: {
      show: Boolean,
    },
    data() {
      return {
        userName: 'User',
        email: 'user@example.com',
        avatarSrc: null,
      };
    },
    mounted() {
      const localUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userId = sessionStorage.getItem('userId');
      const user = localUsers.find(u => u.id == userId) || {};
      this.userName = user.username || this.userName;
      this.email = user.email || this.email;
      this.avatarSrc = user.avatarSrc || this.avatarSrc;
    },
    methods: {
      close() {
        this.$emit('close');
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.avatarSrc = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      submitForm() {
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userId = sessionStorage.getItem('userId');
        const userIndex = localUsers.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
          localUsers[userIndex] = { ...localUsers[userIndex], avatarSrc: this.avatarSrc, email: this.email };
          localStorage.setItem('users', JSON.stringify(localUsers));
        }
        this.close();
      },
      changeEmail() {
        this.email = prompt('Введите новый email:', this.email) || this.email;
      },
    },
  };
  </script>
  <style scoped>
  .profileBlock_background {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
    opacity: 0;
    transition: all 0.2s;
  }
  
  .profileBlock_background.visible {
    opacity: 1;
  }
  
  .profileBlock {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #0c061f;
    width: 380px;
    border-radius: 12px;
    padding: 20px;
    gap: 20px;
  }
  
  .profileBlock h3 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  .profileForm_user {
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: 8px;
  }
  
  .profileFrom_avatar {
    height: 54px;
    width: 54px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .profileFrom_avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  
  .email {
    margin-top: 15px;
    text-decoration: underline;
    cursor: pointer;
  }
  
  .changeEmail {
    color: #77be1d;
    cursor: pointer;
  }
  
  .commitChangesBtn {
    width: 100%;
    border: none;
    background-color: #77be1d;
    border-radius: 12px;
    padding: 8px;
    font-size: 16px;
    margin-top: 40px;
    cursor: pointer;
  }
  
  #closeProfile {
    width: 4%;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  </style>