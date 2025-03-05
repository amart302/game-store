<template>
  <div class="feedback-form">
    <button @click="showForm = !showForm" class="addFeedbackBtn">Оставить отзыв</button>
    <div v-if="showForm" class="form-container">
      <h3>Оставить отзыв</h3>
      <div class="rating">
        <span>Оценка:</span>
        <div class="stars">
          <span v-for="n in 5" :key="n" @click="rating = n" :class="{ selected: n <= rating }">★</span>
        </div>
      </div>
      <textarea v-model="text" placeholder="Ваш отзыв" rows="4"></textarea>
      <p>{{ userName }}</p>
      <div class="form-buttons">
        <button @click="submitFeedback" class="submitBtn">Отправить</button>
        <button @click="showForm = false" class="cancelBtn">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedbackForm',
  data() {
    return {
      showForm: false,
      rating: 0,
      text: '',
      userName: (sessionStorage.getItem("userData")) ? JSON.parse(sessionStorage.getItem("userData")).username : "",
    };
  },
  methods: {
    submitFeedback() {
      if (this.rating === 0 || !this.text.trim()) {
        alert('Пожалуйста, укажите оценку и текст отзыва');
        return;
      }
      this.$emit('add-feedback', {
        rating: this.rating,
        text: this.text.trim(),
        userName: this.userName.trim(),
      });
      this.rating = 0;
      this.text = '';
      this.userName = '';
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.feedback-form {
  position: relative;
  margin-bottom: 20px;
}

.addFeedbackBtn {
  padding: 10px 20px;
  background: transparent;
  border: 2px solid #77BE1D;
  border-radius: 25px;
  color: #77BE1D;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.addFeedbackBtn:hover {
  background: #77BE1D;
  color: white;
  transform: translateY(-3px);
}

.form-container {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #fff;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.rating span {
  color: #fff;
  font-size: 16px;
}

.stars {
  display: flex;
  gap: 5px;
}

.stars span {
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.stars span.selected {
  color: #FFD700;
}

textarea {
  width: 80%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
  resize: vertical;
}

p{
  width: 80%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

input {
  width: 80%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 14px;
  margin-bottom: 15px;
}

.form-buttons {
  margin-top: 40px;
  display: flex;
  gap: 10px;
}

.submitBtn,
.cancelBtn {
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submitBtn {
  background: linear-gradient(90deg, #77BE1D, #97E238);
  color: white;
}

.submitBtn:hover {
  background: linear-gradient(90deg, #649E18, #7BC22F);
  transform: translateY(-3px);
}

.cancelBtn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.cancelBtn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* Медиазапросы для адаптации */
@media (max-width: 1024px) {
  .addFeedbackBtn {
    font-size: 14px;
    padding: 8px 16px;
  }

  .form-container {
    padding: 15px;
  }

  h3 {
    font-size: 18px;
  }

  .rating span {
    font-size: 14px;
  }

  .stars span {
    font-size: 20px;
  }

  textarea,
  input {
    font-size: 12px;
  }

  .submitBtn,
  .cancelBtn {
    font-size: 12px;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .addFeedbackBtn {
    width: 100%;
    font-size: 12px;
    padding: 6px 12px;
  }

  .form-container {
    padding: 10px;
  }

  h3 {
    font-size: 16px;
  }

  .rating {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .rating span {
    font-size: 12px;
  }

  .stars span {
    font-size: 18px;
  }

  textarea,
  input {
    font-size: 10px;
    padding: 8px;
  }

  .form-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .submitBtn,
  .cancelBtn {
    width: 100%;
    font-size: 10px;
    padding: 6px 12px;
  }
}
</style>