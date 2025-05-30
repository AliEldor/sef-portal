<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Header Section -->
      <div class="login-header">
        <div class="logo">
          <Layers :size="60" stroke="white" />
        </div>
        <h1>SE Factory Portal</h1>
        <p>Access your student dashboard</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <div class="input-wrapper">
            <Mail class="input-icon" :size="28" />
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Enter your email"
              :class="{ error: emailError }"
            />
          </div>
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <Lock class="input-icon" :size="28" />
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              required
              placeholder="Enter your password"
              :class="{ error: passwordError }"
            />
            <button
              type="button"
              @click="togglePassword"
              class="password-toggle"
            >
              <Eye v-if="!showPassword" :size="28" />
              <EyeOff v-else :size="28" />
            </button>
          </div>
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="!isLoading">Sign In</span>
          <div v-else class="loading-spinner"></div>
        </button>
      </form>

      <div class="login-footer">
        <p>Don't have an account? <a href="#" class="signup-link">Contact Admin</a></p>
      </div>
    </div>

    <!-- Background decoration -->
    <div class="background-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { Layers, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const { login, isLoading } = useAuth()

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

const emailError = ref('')
const passwordError = ref('')

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''
  
  if (!email.value) {
    emailError.value = 'Email is required'
    return false
  }
  
  if (!email.value.includes('@')) {
    emailError.value = 'Please enter a valid email'
    return false
  }
  
  if (!password.value) {
    passwordError.value = 'Password is required'
    return false
  }
  
  if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return false
  }
  
  return true
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  try {
    const result = await login({
      email: email.value,
      password: password.value
    })
    
    if (result.success) {
      router.push('/home')
    } else {
      passwordError.value = result.error || 'Login failed. Please try again.'
    }
  } catch (error) {
    passwordError.value = 'Login failed. Please try again.'
  }
}
</script>

