<template>
    <div class="content-page">
        <div class="content">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const currentMonth = computed(() => {
    return new Date().getFullYear();
})
</script>