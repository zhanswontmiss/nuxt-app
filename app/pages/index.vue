<script setup lang="ts">
const counter = useState<number>('count', () => 0);

const { data, pending, error } = await useFetch('/api/hello', {
    method: 'GET',
    server: false,
});

useHead({
    title: 'My Awesome Website',
});
</script>

<template>
    <h1>Hello World!</h1>
    <NuxtLink to="/about">About</NuxtLink>
    {{ counter }}
    <button @click="counter++">Click</button>
    <p v-if="pending">Loading...</p>
    <ul v-else class="list-disc list-inside p-4">
        <li v-for="fruit in data?.fruits" :key="fruit.id">
            {{ fruit.name }}
        </li>
    </ul>
</template>