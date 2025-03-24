<template>
    <Header />
    <main>
        <div class="infographic-container">
        <h1 class="infographic-title">Гарантии и информация</h1>
        <div class="infographic-grid">
            <div v-for="(item, index) in items" :key="index" class="infographic-card"
                :style="{ '--card-color': item.color }">
                <i :class="`icon ${item.icon}`"></i>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
            </div>
        </div>
    </div>
    </main>
    <Footer />
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {

    name: 'InfographicPage',
    data() {
        return {
            items: [
                { icon: 'fas fa-calendar-alt', title: '6 месяцов работы', description: 'Работаем с 15 февраля 2025 года', color: '#3498db' },
                { icon: 'fas fa-trophy', title: 'Официальные ключи', description: 'Все ключи закупаются у официальных дилеров', color: '#e74c3c' },
                { icon: 'fas fa-comment-dots', title: 'Отзывы к заказам', description: '1 реальный отзыв', color: '#2ecc71' },
                { icon: 'fas fa-headset', title: 'Поддержка', description: 'Помощь по покупкам и системным требованиям', color: '#e67e22' },
                { icon: 'fas fa-handshake', title: 'Надёжный партнёр', description: '2 участника программы', color: '#2980b9' },
                { icon: 'fas fa-balance-scale', title: 'Стабильность', description: 'Всегда качественный сервис', color: '#c0392b' },
                { icon: 'fas fa-credit-card', title: 'Приём платежей', description: 'Все платежи через агрегаторы', color: '#16a085' },
                { icon: 'fas fa-truck', title: 'Моментальная доставка', description: 'Вы получите товар сразу после оплаты', color: '#9b59b6' },
                { icon: 'fas fa-lock', title: 'SSL-сертификат', description: 'Протокол SSL для безопасности', color: '#34495e' },
                { icon: 'fas fa-bullhorn', title: 'Реклама', description: 'Нас рекламируют крупнейшие каналы', color: '#8e44ad' },
                { icon: 'fas fa-gift', title: 'Раздачи', description: '15 призов, 2 участников', color: '#27ae60' },
                { icon: 'fas fa-certificate', title: 'Аттестат ПРОДАВЦА', description: 'Официальная аттестация ITHub', color: '#f39c12' }
            ]
        };
    },
    components:
    {Header,Footer}
};
</script>

<style scoped>
.infographic-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
}

.infographic-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #fff;
}

.infographic-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.infographic-card {
    background: white;
    padding: 45px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    text-align: center;
    border-top: 4px solid var(--card-color);
}

.infographic-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--card-color);
}

.infographic-card h3 {
    font-size: 1.4rem;
    color: #333;
    margin-bottom: 10px;
}

.infographic-card p {
    font-size: 0.95rem;
    color: #666;
    line-height: 1.5;
}

@media (max-width: 600px) {
    .infographic-title {
        font-size: 2rem;
    }

    .icon {
        font-size: 2rem;
    }

    .infographic-card h3 {
        font-size: 1.2rem;
    }

    .infographic-card p {
        font-size: 0.9rem;
    }
}
</style>