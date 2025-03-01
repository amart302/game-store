<template>
    <div class="mainBlock5">
      <h2>Отзывы</h2>
      <button id="addFeedbackBtn" @click="showForm = true">Оставить отзыв</button>
      <div class="feedbackCardsConteiner">
        <div class="feedbackCard" v-for="(feedback, i) in feedbacks" :key="i">
          <div class="estimationBlock">
            <div class="starBlock" v-for="n in feedback.rating" :key="n"><img src="../assets/images/star.svg" /></div>
          </div>
          <span class="datePublication">{{ feedback.date }}</span>
          <p class="feedback">{{ feedback.text }}</p>
          <p class="feedbackUserName">{{ feedback.user }}</p>
        </div>
      </div>
      <div class="addFeedBack_background" v-if="showForm" @click.self="showForm = false">
        <div class="addFeedbackFrom">
          <img src="../assets/images/cross.svg" id="closeFeedbackFrom" @click="showForm = false" />
          <h3>Заполните форму</h3>
          <label>Оценка:</label>
          <input v-model="newRating" type="text" maxlength="1" @input="validateRating" />
          <label>Отзыв:</label>
          <input v-model="newFeedback" type="text" />
          <div><span>Ник пользователя: </span><span>{{ currentUser.username }}</span></div>
          <button @click="publishFeedback">Опубликовать</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Feedback',
    data() {
      return {
        feedbacks: [
          { rating: 5, date: '20.04.2024', text: 'Lorem ipsum dolor sit amet...', user: 'Amart' },
        ],
        showForm: false,
        newRating: '',
        newFeedback: '',
        currentUser: { username: 'User' },
      };
    },
    mounted() {
      const localUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userId = sessionStorage.getItem('userId');
      this.currentUser = localUsers.find(user => user.id == userId) || this.currentUser;
    },
    methods: {
      validateRating() {
        this.newRating = this.newRating.replace(/[^0-5]/, '');
      },
      publishFeedback() {
        const date = new Date().toLocaleDateString('ru-RU');
        this.feedbacks.push({
          rating: parseInt(this.newRating),
          date,
          text: this.newFeedback,
          user: this.currentUser.username,
        });
        this.newRating = '';
        this.newFeedback = '';
        this.showForm = false;
      },
    },
  };
  </script>
  <style scoped>
  .mainBlock5 {
    margin-top: 60px;
    position: relative;
  }
  
  .feedbackCardsConteiner {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 36px;
  }
  
  .feedbackCard {
    position: relative;
    width: 314px;
  }
  
  .estimationBlock {
    display: flex;
    gap: 4px;
  }
  
  .starBlock {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background-color: #00b67a;
  }
  
  .datePublication {
    position: absolute;
    top: 0;
    right: 0;
    color: #3d394a;
  }
  
  .feedbackUserName {
    color: #3d394a;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  
  .feedback {
    margin-bottom: 50px;
  }
  
  #addFeedbackBtn {
    position: absolute;
    top: 0;
    right: 0;
    border: solid 1px gray;
    background: none;
    width: 15%;
    padding: 10px;
    border-radius: 12px;
    color: #366edc;
    font-size: 16px;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  #addFeedbackBtn:hover {
    background-color: #366edc;
    color: white;
  }
  
  .addFeedBack_background {
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
  
  .addFeedBack_background.visible {
    opacity: 1;
  }
  
  .addFeedbackFrom {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #0c061f;
    width: 380px;
    height: 380px;
    border-radius: 12px;
    padding: 20px;
    gap: 10px;
  }
  
  .addFeedbackFrom h3,
  .addFeedbackFrom label {
    width: 94%;
  }
  
  .addFeedbackFrom button {
    border: solid 1px gray;
    background: none;
    width: 100%;
    padding: 10px;
    border-radius: 12px;
    margin-top: 40px;
    color: #366edc;
    font-size: 16px;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .addFeedbackFrom button:hover {
    background-color: #366edc;
    color: white;
  }
  
  .addFeedbackFrom input {
    width: 94%;
    background-color: #0c061f;
    padding: 10px;
    border-radius: 12px;
    border: solid 1px #3d394a;
  }
  
  #closeFeedbackFrom {
    width: 4%;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  </style>