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

   
  </div>
</template>

