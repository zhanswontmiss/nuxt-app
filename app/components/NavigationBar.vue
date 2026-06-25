<script setup lang="ts">
const refreshKey = useState<number>("navbarRefreshKey", () => 0);

const logout = async () => {
  useCookie('jwt_token').value = undefined;

  refreshKey.value++;
}

const verifyAuthentication = async () => {
  const token = useCookie("jwt_token");

  if (!token) return null;

  const result = await $fetch('/api/auth/verifyToken', {
    method: 'POST',
    body: { token: token.value }
  })

  if (!result.success) return null;

  return result.user.user as JwtUserInfo;
}

const { data: user } = await useAsyncData('navbar-user', verifyAuthentication, {
  watch: [refreshKey]
});

onMounted(async () => {
  await verifyAuthentication();
});
</script>

<template>
  <nav class="flex justify-between p-4 bg-neutral-400" :key="refreshKey">
    <NuxtLink to="/">Website</NuxtLink>

    <TransitionGroup tag="ul" class="inline-flex gap-4" name="fade-nav">
      <li key="about">
        <NuxtLink to="/about">About</NuxtLink>
      </li>

      <div v-if="!user" key="guest" class="inline-flex gap-4">
        <li>
          <NuxtLink to="/register">Register</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
      </div>

      <div v-else key="user" class="inline-flex gap-4">
        <div @click="logout" class="hover:text-neutral-300 cursor-pointer">
          Logout
        </div>
        <div>
          {{  user.username }}
        </div>
      </div>
    </TransitionGroup>
  </nav>
</template>

<style>
.fade-nav-enter-active, .fade-nav-leave-active {
  transition: all 0.1s ease;
}

.fade-nav-enter-from {
  opacity: 0;
  transform: translateY((-10px));
}
.fade-nav-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-nav-leave-active {
  position: absolute;
  right: 1rem;
}
</style>