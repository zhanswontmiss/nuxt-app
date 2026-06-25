<script setup lang="ts">

const error = ref<string | null>(null);

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

  const result = await $fetch.raw('/api/auth/register', {
    method: 'POST',
    body: { username: form.username, password: form.password }
  })

  if (!result.ok) {
    error.value = "Something went wrong.";
    return;
  }

  error.value = "User successfully created, you can now login."
}

const form = reactive({
  username: '',
  password: ''
})
</script>

<template>
  <div class="p-4 flex justify-center items-center grow">
    <form class="flex flex-col gap-6 items-center bg-neutral-800 p-4 border border-neutral-700 rounded-xl shadow-md backdrop-blur-md h-2/4 w-1/3" @submit.prevent="submitForm">
      <div class="h-1/4 flex justify-center items-center">
        <h1 class="text-4xl font-black">
          Register
        </h1>
      </div>

      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2 items-center justify-center">
          <label class="text-xs text-gray-500 font-bold uppercase" for="username">Username: </label>
          <input v-model="form.username" type="text" name="username" id="username" autocomplete="username" />
        </div>
        

        <div class="flex flex-col gap-2 items-center justify-center">
          <label class="text-xs text-gray-500 font-bold uppercase" for="password">Password: </label>
          <input v-model="form.password" type="password" name="password" id="password" autocomplete="current-password" />
        </div>
      </div>

      <div class="flex w-full grow items-center justify-center">
        <button type="submit" class="w-full">
          Submit
        </button>
      </div>

      <div v-if="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
@import 'tailwindcss';

input, button {
  @apply bg-neutral-700 border-neutral-300 p-2 rounded-full;
}
</style>