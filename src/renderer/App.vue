<script setup>
import { ref, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const ipcdata = ref('Hello');

onMounted(() => {
    window.electronAPI.sendMessage('Hello from App.vue 2023!');

    setTimeout(() => {
        window.electronAPI.ipcGetsomething({ msg: 'hhhhh from Render!' }).then((res) => {
            ipcdata.value = res;
        });
    }, 3000);
});
</script>

<template>
    {{ ipcdata }}
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
