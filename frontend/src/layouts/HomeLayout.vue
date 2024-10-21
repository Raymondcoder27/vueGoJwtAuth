<script setup lang="ts">
import AppNotification from "@/components/AppNotification.vue"
import AppHeader from '@/components/AppHeader.vue';
import SideMenu from '@/components/SideMenu.vue';
</script>

<template>
    <div class="flex flex-col w-screen h-screen bg-white">
        <div class="flex flex-col relative h-full w-full">
            <AppHeader />
            <main class="flex flex-col h-full w-full bg-gray-100">
                <div class="flex flex-row h-full">
                    <SideMenu class="pt-5" />
                    <div class="flex flex-col flex-grow rounded p-2">
                        <div class="relative overflow-y-auto w-full flex-grow">
                            <RouterView />
                        </div>
                    </div>
                </div>
            </main>
            <AppNotification />
        </div>
    </div>
</template>