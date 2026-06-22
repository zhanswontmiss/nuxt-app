<script setup lang="ts">
import { useRoute } from 'vue-router';

const profileId = useRoute().params.profileId;
</script>

<template>
    {{ profileId }}
</template>