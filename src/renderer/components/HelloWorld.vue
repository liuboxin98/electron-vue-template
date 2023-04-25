<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore } from "../stores";

const counterStore = useCounterStore();

defineProps({
    msg: String,
});
const count = ref(0);
</script>

<template>
    <h1>{{ counterStore.count }}</h1>
    <h1>x2 {{ counterStore.doubleCount }}</h1>
    <h1>{{ msg }}</h1>

    <button @click="counterStore.increment()">add</button>
    <hr />

    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>
    <p>
        Install
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
        in your IDE for a better DX
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
