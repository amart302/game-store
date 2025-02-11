<template>
    <header>
        <div class="container-header">
            <div class="header-block-w">
                <div class="bl-lang">  
                    <div class="lang-cn">
                        <button>Русский (RU)</button>
                        <button>English (EN)</button>
                    </div>
                    <div class="val-cn">
                        <button>$</button>
                        <button>₽</button>
                        <button>€</button>
                    </div>
                </div>
                <div class="bl-cash">
                    Накопительный счет
                </div>
                <div class="bl-state">
                    <a href="/">Отзывы</a>
                    <a href="/">Гарантии</a>
                    <a href="/">Как купить</a>
                    <a href="/">Накопительная</a>
                    <a href="/">Заработай</a>
                </div>
                <div class="bl-pr">
                    <p>Hanzed Rules</p>
                    <img src="" alt="">
                </div>
            </div>
            <div class="header-block-c">
                <div class="logo">Playnchill</div>
                <input type="text">
                <div class="bl-icon">
                    <img src="" alt="Избранное">
                    <img src="" alt="Корзина">
                </div>
            </div>
        </div>
    </header>
</template>

<script>
</script>

<style>
    .container-header{
        max-width: 1600px;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
    }
    .header-block-w, .header-block-c{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
    }
    .bl-state{
        display: flex;  
        gap: 32px;
    }
    .bl-state a{
        color: #fff;
        font-size: 16px;
        text-decoration: none;
    }
    
</style>