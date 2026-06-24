<script setup lang="ts">
const counter = useState('count', () => 0)
</script>

<template>
  <PageTitle>About</PageTitle>
  {{ counter }}
</template>