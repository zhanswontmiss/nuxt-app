<script setup lang="ts">
interface User {
  id: number,
  username: string,
}

const user = ref<User | null>(null);

onMounted(async () => {
  const token = useCookie("jwt_token");

  if (!token) return;

  const result = await $fetch('/api/auth/verifyToken', {
    method: 'POST',
    body: { token: token.value }
  })

  if (!result.success) return;

  user.value = ((result.user.user as any) as User)
})
</script>

<template>
  <nav class="flex justify-between p-4 bg-neutral-400">
    <NuxtLink to="/">Website</NuxtLink>
    <ul class="inline-flex gap-4">
      <li>
        <NuxtLink to="/about">About</NuxtLink>
      </li>

      <div v-if="!user" class="inline-flex gap-4">
        <li>
          <NuxtLink to="/register">Register</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
      </div>
      <div v-else class="inline-flex gap-4">
        {{  user.username }}
      </div>
    </ul>
  </nav>
</template>