<template>
    <ul class="nav nav-tabs tablistgp" role="tablist">
        <li class="nav-item" 
            v-for="(tab, index) in tabs" @click="currentTab = index, changeTab(index)"
            :class="{ active: currentTab === index}"
        >
            <a class="nav-link text-black px-4">
                {{tab}}
            </a>
        </li>
    </ul>
    <div class="tab-content">
        <div v-show="currentTab === 0">
            <Players />
        </div>
        <div v-show="currentTab === 1">
            <Teams/>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import Players from './Players.vue';
import Teams from './Teams.vue';
import { onMounted } from 'vue';

const currentTab = ref()
const tabs = ['Players', 'Teams'];

onMounted(() => {
    changeTab(0)
});

function changeTab(index) {
        if(index === 0) {
            currentTab.value = 0
        } else if(index === 1) {
            currentTab.value = 1
        }
    }

</script>