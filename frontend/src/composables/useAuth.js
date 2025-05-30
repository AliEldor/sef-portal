import { ref, computed } from 'vue'
import { authService } from '../services/axios'

const user = ref(null)
const isLoading = ref(false)

