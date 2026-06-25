<script setup lang="ts">
const counter = useState<number>('count', () => 0);

const { data, pending, error } = await useFetch('/api/hello', { server: false });

useHead({
  title: 'My Awesome Website',
});
</script>

<template>
  <div>
    <div>
      <NuxtImg src="/img/sea_otter.jfif" alt="Sea Otter" width="200" height="100" class="aspect-video" format="png" fit="contain" />
    </div>
    <PageTitle>Hello World!</PageTitle>
    <NuxtLink to="/about">About</NuxtLink>
    {{ counter }}
    <button @click="counter++">Click</button>

    <ClientOnly>
      <p v-if="pending">Loading...</p>

      <ul v-else class="list-disc list-inside p-4">
        <li v-for="fruit in data?.fruits" :key="fruit.id">
          {{ fruit.name }}
        </li>
      </ul>
    </ClientOnly>


  </div>
</template>