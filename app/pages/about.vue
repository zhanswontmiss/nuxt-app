<script setup lang="ts">
const counter = useState('count', () => 0);
</script>

<template>
  <div>
    <PageTitle>About</PageTitle>
    {{ counter }}
  </div>
</template>