<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <div>
    <h1 class="text-6xl font-black">
      Error {{ props.error.statusCode }}
    </h1>

    <p>
      {{  props.error.statusMessage }}
    </p>

    <hr>

    <p>
      {{ props.error.message }}
    </p>

    <pre>
      {{ props.error.stack?.trimStart()}}
    </pre>
  </div>
</template>