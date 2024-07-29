<template>
    <h1>{{ counterStore.count }}</h1>
    <h1>x2 {{ counterStore.doubleCount }}</h1>

    <button @click="counterStore.increment()">add</button>

    <button @click="openSomething">Something</button>
    <button @click="openFile">open</button>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCounterStore } from '../stores';

const counterStore = useCounterStore();
onMounted(() => {
    console.log('mounted');
});
const openFile = async () => {
    const filePath = await window.electronAPI.openFile();
    console.log(filePath);
};

const openSomething = () => {
    window.electronAPI.openSomething('maybe a file ?');

    // 渲染进程
    // ipcRenderer.invoke('some-name', 'maybe a file ?').then((result) => {
    //     console.log(result);
    // });
};
</script>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
