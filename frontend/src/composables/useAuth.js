import { ref, computed } from 'vue'
import { authService } from '../services/axios'

const user = ref(null)
const isLoading = ref(false)

export function useAuth() {
  if (!user.value) {
    const savedUser = authService.getCurrentUser()
    if (savedUser) {
      user.value = savedUser
    }
  }

  const isAuthenticated = computed(() => {
    return authService.isAuthenticated() && user.value !== null
  })

  const login = async (credentials) => {
    try {
      isLoading.value = true
      
      const response = await authService.login(credentials)
      
      if (response.success) {
        user.value = response.data
        return { success: true }
      } else {
        return { 
          success: false, 
          error: response.message || 'Login failed' 
        }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      user.value = null
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      user.value = null
      return { success: true }
    }
  }

  const getProfile = async () => {
    try {
      const response = await authService.getProfile()
      if (response.success) {
        user.value = response.data
      }
      return response
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  }

  return {
    user: computed(() => user.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    login,
    logout,
    getProfile
  }
}