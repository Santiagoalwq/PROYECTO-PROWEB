<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tasks: Array<any>
  categories: Array<any>
}>()

const stats = computed(() => {
  const total = props.tasks.length
  const completed = props.tasks.filter(t => t.completed).length
  const pending = total - completed

  return {
    total,
    completed,
    pending,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
})

const tasksByPriority = computed(() => {
  return {
    high: props.tasks.filter(t => t.priority === 'high').length,
    medium: props.tasks.filter(t => t.priority === 'medium').length,
    low: props.tasks.filter(t => t.priority === 'low').length
  }
})
</script>

<template>
  <div class="stats-container">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>Total de Tareas</h3>
          <p class="stat-value">{{ stats.total }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">✓</div>
        <div class="stat-content">
          <h3>Completadas</h3>
          <p class="stat-value">{{ stats.completed }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <h3>Pendientes</h3>
          <p class="stat-value">{{ stats.pending }}</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">📈</div>
        <div class="stat-content">
          <h3>Progreso</h3>
          <p class="stat-value">{{ stats.completionRate }}%</p>
        </div>
      </div>
    </div>

    <div class="priority-stats">
      <h2>Tareas por Prioridad</h2>
      <div class="priority-grid">
        <div class="priority-item">
          <span class="priority-label">🔴 Alta</span>
          <span class="priority-count">{{ tasksByPriority.high }}</span>
        </div>
        <div class="priority-item">
          <span class="priority-label">🟡 Media</span>
          <span class="priority-count">{{ tasksByPriority.medium }}</span>
        </div>
        <div class="priority-item">
          <span class="priority-label">🟢 Baja</span>
          <span class="priority-count">{{ tasksByPriority.low }}</span>
        </div>
      </div>
    </div>

    <div class="categories-stats">
      <h2>Categorías</h2>
      <p v-if="categories.length === 0" class="empty">Sin categorías</p>
      <div v-else class="categories-list">
        <div v-for="cat in categories" :key="cat.id" class="category-stat">
          <div class="color-dot" :style="{ backgroundColor: cat.color }"></div>
          <span>{{ cat.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: grid;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
  border-left: 4px solid #667eea;
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-content h3 {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-value {
  margin: 0.5rem 0 0 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.priority-stats,
.categories-stats {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.priority-stats h2,
.categories-stats h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.priority-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.priority-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
  border-left: 4px solid #667eea;
}

.priority-label {
  font-weight: 600;
  color: #333;
}

.priority-count {
  font-size: 1.25rem;
  font-weight: bold;
  color: #667eea;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.categories-list {
  display: grid;
  gap: 0.75rem;
}

.category-stat {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
}

.color-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .priority-grid {
    grid-template-columns: 1fr;
  }
}
</style>
