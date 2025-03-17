<template>
    <Header />
    <main>
        <h1 style="color: white;">404 :(</h1>
    </main>
    <Footer />
</template>
<script>
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue';

    export default {
        components: {
            Header,
            Footer
        }
    }
</script>
<style scoped>
/* 212  */
    main {
        max-width: 1440px;
        min-height: calc(100vh - 600px);
        margin: 0 auto;
        padding: 60px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h1{
        font-size: 70px;
    }
</style>