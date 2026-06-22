<script setup lang="ts">
const counter = useState<number>('count', () => 0);

useHead({
    title: 'My Awesome Website',
});
</script>

<template>
    <h1>Hello World!</h1>
    <NuxtLink to="/about">About</NuxtLink>
    {{ counter }}
    <button @click="counter++">Click</button>
</template>