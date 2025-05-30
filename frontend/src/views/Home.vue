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

    <!-- Search and Filter -->
    <div class="controls-section">
      <div class="search-box">
        <Search class="search-icon" :size="20" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search students..."
          class="search-input"
        />
      </div>

      <div class="filter-dropdown">
        <select v-model="selectedTrack" class="filter-select">
          <option value="">All Tracks</option>
          <option value="Full Stack Software Engineering">Full Stack</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
      </div>
    </div>

    <!-- Students Grid -->
    <div class="students-section">
      <div class="section-header">
        <h2>Students ({{ filteredStudents.length }})</h2>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading students...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <AlertCircle :size="64" color="#ef4444" />
        <h3>Error Loading Students</h3>
        <p>{{ error }}</p>
        <button @click="fetchStudents" class="retry-btn">
          <RotateCw :size="16" />
          Try Again
        </button>
      </div>

      <div v-else-if="filteredStudents.length === 0" class="empty-state">
        <XCircle :size="64" />
        <h3>No students found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>

      <div v-else class="students-grid">
        <div
          v-for="student in filteredStudents"
          :key="student.id"
          class="student-card"
          @click="viewStudentProfile(student)"
        >
          <div class="student-avatar-wrapper">
            <img
              :src="student.avatar"
              :alt="student.name"
              class="student-avatar"
              @error="handleImageError"
            />
            <div
              class="student-status"
              :class="student.status || 'active'"
            ></div>
          </div>

          <div class="student-info">
            <h3>{{ student.name }}</h3>
            <p class="student-track">{{ student.track }}</p>
            <p class="student-email">{{ student.email }}</p>

            <div class="student-meta">
              <span class="student-cohort">{{ student.cohortDisplay }}</span>
            </div>
          </div>

          <div class="student-actions">
            <a
              :href="student.linkedinUrl"
              target="_blank"
              class="action-btn linkedin"
              @click.stop
            >
              <Linkedin :size="16" />
            </a>
            <a
              :href="student.githubUrl"
              target="_blank"
              class="action-btn github"
              @click.stop
            >
              <Github :size="16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { studentService } from "../services/axios";
import {
  Layers,
  LogOut,
  Users,
  Code,
  Palette,
  Search,
  XCircle,
  Linkedin,
  Github,
  RotateCw,
  AlertCircle,
} from "lucide-vue-next";

const router = useRouter();
const { logout } = useAuth();

const loading = ref(false);
const error = ref(null);
const searchQuery = ref("");
const selectedTrack = ref("");
const students = ref([]);

const fetchStudents = async () => {
  try {
    loading.value = true;
    error.value = null;

    const studentData = await studentService.fetchStudents(24);
    students.value = studentData;
  } catch (err) {
    error.value = err.message || "Failed to load student data";
  } finally {
    loading.value = false;
  }
};

const handleImageError = (event) => {
  event.target.src =
    "https://ui-avatars.com/api/?name=Student&background=667eea&color=fff&size=200";
};

const filteredStudents = computed(() => {
  let filtered = students.value;

  if (searchQuery.value) {
    filtered = studentService.searchStudents(filtered, searchQuery.value);
  }

  if (selectedTrack.value) {
    filtered = studentService.filterByTrack(filtered, selectedTrack.value);
  }

  return filtered;
});

const trackCounts = computed(() => {
  const counts = {};
  students.value.forEach((student) => {
    counts[student.track] = (counts[student.track] || 0) + 1;
  });
  return counts;
});


</script>


