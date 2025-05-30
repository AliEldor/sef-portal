<template>
  <div class="home-container">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo">
            <Layers :size="32" stroke="#667eea" />
          </div>
          <div class="header-title">
            <h1>SE Factory Portal</h1>
            <p>Student Dashboard</p>
          </div>
        </div>

        <div class="header-right">
          <button @click="handleLogout" class="logout-btn">
            <LogOut :size="20" />
            Logout
          </button>
        </div>
      </div>
    </header>

    
  </div>
</template>


