<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import CategoryManager from './components/CategoryManager.vue'
import Stats from './components/Stats.vue'
import { apiCall } from './api'

const activeTab = ref<'tasks' | 'categories' | 'stats'>('tasks')
const tasks = ref<any[]>([])
const categories = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const backendConnected = ref(false)

const fetchTasks = async () => {
  const { data, error: err } = await apiCall('/tasks')
  if (err) {
    error.value = `Error al cargar tareas: ${err}`
    return
  }
  tasks.value = data || []
  error.value = null
}

const fetchCategories = async () => {
  const { data, error: err } = await apiCall('/categories')
  if (err) {
    error.value = `Error al cargar categorías: ${err}`
    return
  }
  categories.value = data || []
  error.value = null
}

const checkBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/health')
    if (response.ok) {
      backendConnected.value = true
    }
  } catch {
    backendConnected.value = false
    error.value = 'No se puede conectar al servidor backend. Asegúrate de que está corriendo en http://localhost:5000'
  }
}

const handleTaskAdded = (newTask: any) => {
  tasks.value.push(newTask)
}

const handleTaskDeleted = (taskId: string) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId)
}

const handleCategoryAdded = (newCategory: any) => {
  categories.value.push(newCategory)
}

onMounted(async () => {
  loading.value = true
  await checkBackendConnection()
  
  if (backendConnected.value) {
    await Promise.all([fetchTasks(), fetchCategories()])
  }
  
  loading.value = false
})
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <h1 class="logo">✓ TaskFlow</h1>
        <p class="subtitle">Gestiona tus tareas fácilmente</p>
        <div v-if="!backendConnected" class="connection-status">
          <span class="status-indicator error"></span>
          Backend desconectado
        </div>
        <div v-else class="connection-status">
          <span class="status-indicator success"></span>
          Backend conectado
        </div>
      </div>
    </header>

    <main class="container">
      <div v-if="error" class="error-banner">
        <span class="error-icon">⚠️</span>
        <span>{{ error }}</span>
        <button class="close-btn" @click="error = null">✕</button>
      </div>

      <nav class="tabs">
        <button
          v-for="tab in ['tasks', 'categories', 'stats']"
          :key="tab"
          :class="['tab-button', { active: activeTab === tab }]"
          @click="activeTab = tab as any"
          :disabled="!backendConnected"
        >
          {{ tab === 'tasks' ? '📋 Tareas' : tab === 'categories' ? '🏷️ Categorías' : '📊 Estadísticas' }}
        </button>
      </nav>

      <div v-if="loading" class="loading">Cargando...</div>

      <div v-else-if="!backendConnected" class="error-full">
        <h2>No hay conexión con el servidor</h2>
        <p>Por favor, inicia el backend ejecutando en otra terminal:</p>
        <pre>cd backend && npm run dev</pre>
      </div>

      <section v-else-if="activeTab === 'tasks'" class="section">
        <TaskForm :categories="categories" @task-added="handleTaskAdded" />
        <TaskList :tasks="tasks" :categories="categories" @task-deleted="handleTaskDeleted" @task-updated="fetchTasks" />
      </section>

      <section v-else-if="activeTab === 'categories'" class="section">
        <CategoryManager :categories="categories" @category-added="handleCategoryAdded" />
      </section>

      <section v-else-if="activeTab === 'stats'" class="section">
        <Stats :tasks="tasks" :categories="categories" />
      </section>
    </main>

    <footer class="footer">
      <p>TaskFlow © 2025 - Aplicación de Gestión de Tareas</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  margin: 0.5rem 0 0.5rem 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

.connection-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.status-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  display: inline-block;
}

.status-indicator.success {
  background: #10B981;
  animation: pulse 2s infinite;
}

.status-indicator.error {
  background: #EF4444;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.container {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.error-banner {
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #991b1b;
}

.error-full {
  background: white;
  border: 2px solid #EF4444;
  border-radius: 0.75rem;
  padding: 3rem;
  text-align: center;
}

.error-full h2 {
  color: #EF4444;
  margin: 0 0 1rem 0;
}

.error-full p {
  color: #666;
  margin: 0 0 1rem 0;
}

.error-full pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  text-align: left;
}

.error-icon {
  font-size: 1.2rem;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-btn:hover {
  opacity: 1;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-button:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.tab-button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.tab-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #667eea;
  font-weight: 500;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}

.footer p {
  margin: 0;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .logo {
    font-size: 1.5rem;
  }

  .container {
    padding: 1rem;
  }
}
</style>
 
