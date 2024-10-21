<script setup lang="ts">
import MainNavLayout from "@/Layouts/MainNavLayout.vue";
import CreatePostBox from "@/Layouts/CreatePostBox.vue";
import Post from "@/components/Post.vue";
// import PrimaryButton from "@/components/PrimaryButton.vue";
// import GuestLayout from "@/Layouts/GuestLayout.vue";
// import TextInput from "@/components/TextInput.vue";
import api from "@/config/api";
import { useAuthStore } from "@/stores/auth";

import Camera from "vue-material-design-icons/Camera.vue";
import Pen from "vue-material-design-icons/Pen.vue";
import router from "@/router";
import { ref } from "vue";
// import { useGeneralStore } from "@/stores/general";
import { storeToRefs } from "pinia";

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

const authStore = useAuthStore();
// const useGeneral = useGeneralStore();
// const { isCropperModal, isImageDisplay } = storeToRefs(useGeneral);
const canResetPassword = true;

// Define reactive variables with types
const email = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);

// Type the props
defineProps<{
  posts: Post[];
  user: User;
}>();

const submit = async (): Promise<void> => {
  console.log("logging in...");

  error.value = null; // Reset error state before attempting login

  try {
    // Call the login action from the auth store
    await authStore.login(email.value, password.value);

    // On successful login, navigate to the home page
    router.push("/home");
  } catch (err) {
    // Set error message if login fails
    error.value = "Login failed. Please check your credentials.";
  }
};
</script>

<template>
  <!-- <Head title="Log in" /> -->
  <div v-if="error" class="text-red-500">{{ error }}</div>

  <!-- <GuestLayout> -->
    <!-- <div
    class="h-[100vh] flex flex-col items-center pt-[100px] sm:pt-0 bg-gray-100 z-40"
  > -->
    <div class="w-full max-h-[50vh] bg-white text-center justify-center items-center mb-5">
      <form @submit.prevent="submit" class="mb-5 text-black">
        <div>
          <input
            v-model="email"
            id="email"
            type="email"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="username"
            placeholder="Email"
          />
        </div>

        <div class="mt-4">
          <input
            v-model="password"
            id="password"
            type="password"
            class="mt-1 block w-full"
            required
            autofocus
            autocomplete="current-password"
            placeholder="Password"
          />
        </div>

        <div class="flex items-center justify-center pt-4">
          <button type="button" class="w-full text-sm">Login</button>
        </div>

        <div class="flex items-center justify-center my-5">
          <RouterLink
            to="/"
            v-if="canResetPassword"
            class="hover:underline font-bold text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Forgot Password?
          </RouterLink>
        </div>

        <div class="border-b border-b-gray-300"></div>
        <div class="flex items-center justify-center pt-6 pb-2">
          <RouterLink
            to="/register"
            class="px-5 py-3 text-white bg-[#37A621] text-[20px] font-bold rounded-lg text-sm">
            Create a new account.
          </RouterLink>
        </div>
      </form>
    </div>
<!-- </div> -->
  <!-- </GuestLayout> -->
</template>
