<script setup lang="ts">
import { useCounterStore } from "../stores";

const counterStore = useCounterStore();
</script>

<template>
    <h1>{{ counterStore.count }}</h1>
    <h1>x2 {{ counterStore.doubleCount }}</h1>

    <button @click="counterStore.increment()">add</button>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
