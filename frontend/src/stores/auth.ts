import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import api from '@/config/api'  // Use the axios instance

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<string | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  )
  const token = ref<string | null>(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  )
  const returnUrl = ref<string>('/')

  // Actions
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await api.post<{ token: string }>('/login', { email, password })

      if (response.status === 200) {
        const tokenResponse = response.data.token  // Assuming the token is in response.data.token
        localStorage.setItem('user', JSON.stringify(email))  // Assuming email as user identifier
        localStorage.setItem('token', tokenResponse)  // Store token as a string
        user.value = email
        token.value = tokenResponse

        // After successful login, redirect the user to the home or returnUrl
        router.push(returnUrl.value || '/')
      }
    } catch (error) {
      throw new Error('Invalid credentials')  // Handle login failure
    }
  }

  const validate = async (): Promise<boolean> => {
    try {
      const response = await api.get('/validate')
      if (response.status === 200) {
        // If validation succeeds, return true or set user data
        return true
      }
    } catch (error) {
      // If the validation fails, logout the user
      logout()
      return false
    }
  }

  const logout = (): void => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    router.push('/login')
  }

  // Return state and actions
  return {
    user,
    token,
    returnUrl,
    login,
    validate,
    logout
  }
})
