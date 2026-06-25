<script setup lang="ts">

const error = ref<string | null>(null);
const navbarRefreshKey = useState<number>("navbarRefreshKey", () => 0);

const submitForm = async () => {
  error.value = null;

  if (!form.username) {
    error.value = "You must specify a username.";
    return;
  }

  if (!form.password) {
    error.value = "You must set a password.";
    return;
  }

  const result = await $fetch.raw('/api/auth/login', {
    method: 'POST',
    body: { username: form.username, password: form.password },
    async onResponseError({ response }) {
      if (response.status === 401) {
        error.value = (response._data).message;
        return;
      }
    }
  })

  if (!result.ok) {
    error.value = "Something went wrong while logging in.";
    return;
  }

  if (!(result._data && result._data?.token)) {
    error.value = "There was an issue with the data body from the response.";
    return;
  }

  useCookie("jwt_token").value = result._data.token;
  navbarRefreshKey.value++;
  await navigateTo('/');
}

const form = reactive({
  username: '',
  password: ''
})
</script>

<template>
  <div class="register-page p-4">
    <form class="flex flex-col gap-2 items-center" @submit.prevent="submitForm">
      <div class="flex gap-2 items-center justify-center">
        <label for="username">Username: </label>
        <input v-model="form.username" type="text" name="username" id="username" />
      </div>
      

      <div class="flex gap-2 items-center justify-center">
        <label for="password">Password: </label>
        <input v-model="form.password" type="password" name="password" id="password" />
      </div>

      <button type="submit" class="px-6!">
        Submit
      </button>

      <div class="flex items-center justify-center" v-if="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
@import 'tailwindcss';

input, button {
  @apply bg-neutral-300 border-neutral-700 p-2 rounded-full;
}
</style>