<script setup lang="ts">
const counter = useState('count', () => 0)
</script>

<template>
    <h1>About</h1>
    {{ counter }}
</template>