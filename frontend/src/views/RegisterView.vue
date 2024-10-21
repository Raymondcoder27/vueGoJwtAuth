<script setup lang="ts">
import Post from "@/components/Post.vue";
// import PrimaryButton from "@/components/PrimaryButton.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import TextInput from "@/components/TextInput.vue";
import api from "@/config/api";

import Camera from "vue-material-design-icons/Camera.vue";
import Pen from "vue-material-design-icons/Pen.vue";

// import { useGeneralStore } from "@/stores/general";
import { storeToRefs } from "pinia";
import router from "@/router";

// Define types for props
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

// const useGeneral = useGeneralStore();
// const { isCropperModal, isImageDisplay } = storeToRefs(useGeneral);
const canResetPassword = true;

// Type the props
defineProps<{
  posts: Post[],
  user: User
}>();

// Define reactive variables with types
import { ref } from 'vue';
const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

// Register function with async/await and proper typing for errors
const register = async (): Promise<void> => {
  console.log("Registering...");

  try {
    await api.post('/register', {
      name: username.value,
      email: email.value,
      password: password.value,
    });
    router.push("/login");
  } catch (error: any) {
    console.error(error.message || error);
  }
};
</script>

<template>
  <Head title="Register" />
  <div v-if="error" class="text-red-500">{{ error }}</div>
  <GuestLayout>
    <div
      class="w-full max-h-[100vh] bg-white text-center justify-center items-center mb-5"
    >
      <form @submit.prevent="register" class="mb-5 text-black">
        <!-- <div>
          <input
            id="username"
            v-model="username"
            type="text"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="username"
            placeholder="Name"
          />
        </div> -->

        <div class="mt-4">
          <TextInput
            id="email"
            v-model="email"
            type="email"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="email"
            placeholder="Email"
          />
        </div>

        <div class="mt-4">
          <TextInput
            id="password"
            v-model="password"
            type="password"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="new-password"
            placeholder="Password"
          />
        </div>

        <div class="flex items-center justify-center pt-4">
          <button type="button" class="w-full text-sm bg-green-900 text-white p-2 rounded-md font-semibold"
            @click="register"> 
            Register
          </button>
        </div>

        <div class="flex items-center justify-center my-3">
          <RouterLink
            v-if="canResetPassword"
            to="/login"
            class="hover:underline font-bold text-black-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Already Registered?
          </RouterLink>
        </div>
      </form>
    </div>
  </GuestLayout>
</template>
