<script setup lang="ts">
const counter = useState<number>('count', () => 0);

const { data, pending, error } = await useFetch('/api/hello', { server: false });

useHead({
  title: 'My Awesome Website',
});
</script>

<template>
  <div class="w-full">
    <div>
      <section class="bg-blue-600 p-4 h-140 flex flex-col items-center justify-center shadow-md">
        <h1 class="text-6xl font-black tracking-tight">#1 Website</h1>
        <p class="text-slate-400 font-medoum text-shadow-2xs tracking-tight">you've never seen something quite this good</p>
      </section>

      <section @click="counter++" class="bg-[#7f6ffd] h-140 flex flex-col justify-center items-center gap-12 cursor-pointer hover:brightness-90 transition-all duration-300 ease-in-out shadow-md">
        <div class="flex flex-col justify-center items-center gap-1">
          <h2 class="text-4xl font-bold select-none">
            {{ counter }} click<span v-if="counter !== 1">s</span>
          </h2>
          <p class="text-slate-400 font-medoum text-shadow-2xs tracking-tight select-none">
            click me to increment!
          </p>
        </div>
      </section>

      <section class="bg-amber-600 p-4 h-140 flex flex-col items-center">
        <div class="h-1/4 flex items-center">
          <h1 class="text-6xl font-black tracking-tight">
            List of fruits
          </h1>
        </div>
        
        <div class="text-xl p-4 text-neutral-200">
          <ClientOnly>
            <p v-if="pending">Loading...</p>

            <ul v-else class="list-disc list-inside p-4">
              <li v-for="fruit in data?.fruits" :key="fruit.id">
                {{ fruit.name }}
              </li>
            </ul>
          </ClientOnly>
        </div>

        <div>
          <NuxtImg class="rounded-xl shadow-lg mt-6" src="/img/sea_otter.jfif" alt="Sea Otter" width="200" height="100"  format="png" fit="contain" />
        </div>
      </section>
    </div>
  </div>
</template>