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

    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-icon">
          <Users :size="24" />
        </div>
        <div class="stat-content">
          <h3>{{ students.length }}</h3>
          <p>Total Students</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <Code :size="24" />
        </div>
        <div class="stat-content">
          <h3>{{ trackCounts["Full Stack Software Engineering"] || 0 }}</h3>
          <p>Full Stack Students</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <Palette :size="24" />
        </div>
        <div class="stat-content">
          <h3>{{ trackCounts["UI/UX Design"] || 0 }}</h3>
          <p>UI/UX Students</p>
        </div>
      </div>
    </div>

    
  </div>
</template>


