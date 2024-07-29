<script setup>
import HelloWorld from './components/HelloWorld.vue';

window.electronAPI.sendMessage('Hello from App.vue 2023!');
</script>

<template>
    <HelloWorld msg="Vite + Vue" />
    <hr />
    <div class="wrapper">
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/count">Count</RouterLink>
        </nav>
    </div>
    <hr />
    <RouterView />
</template>

<style scoped>
.wrapper nav a {
    margin: 0 10px;
}
</style>
