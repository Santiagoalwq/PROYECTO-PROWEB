<script setup lang="ts">
import { ref } from 'vue'
import { apiCall } from '../api'

const props = defineProps<{
  task: any
  categoryName: string
}>()

const emit = defineEmits<{
  'task-deleted': [taskId: string]
  'task-updated': []
}>()

const loading = ref(false)

const priorityEmoji = {
  low: '🟢',
  medium: '🟡',
  high: '🔴'
}

const toggleComplete = async () => {
  loading.value = true
  const { error } = await apiCall(`/tasks/${props.task.id}/complete`, {
    method: 'PATCH'
  })

  if (!error) {
    emit('task-updated')
  } else {
    console.error('[v0] Error toggling task completion:', error)
  }

  loading.value = false
}

const deleteTask = async () => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta tarea?')) return

  loading.value = true
  const { error } = await apiCall(`/tasks/${props.task.id}`, {
    method: 'DELETE'
  })

  if (!error) {
    emit('task-deleted', props.task.id)
  } else {
    console.error('[v0] Error deleting task:', error)
    alert('Error al eliminar la tarea')
  }

  loading.value = false
}
</script>

<template>
  <div :class="['task-item', { completed: task.completed }]">
    <div class="task-content">
      <button class="checkbox" @click="toggleComplete" :disabled="loading">
        {{ task.completed ? '✓' : '○' }}
      </button>
      <div class="task-info">
        <h4 class="task-title">{{ task.title }}</h4>
        <p v-if="task.description" class="task-description">{{ task.description }}</p>
        <div class="task-meta">
          <span class="badge category">{{ categoryName }}</span>
          <span class="badge priority">{{ priorityEmoji[task.priority] }} {{ task.priority }}</span>
        </div>
      </div>
    </div>
    <button class="delete-btn" @click="deleteTask" :disabled="loading">🗑️</button>
  </div>
</template>

<style scoped>
.task-item {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  border-left: 4px solid #667eea;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.task-item.completed {
  opacity: 0.7;
  background: #f9f9f9;
}

.task-content {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.checkbox {
  width: 2rem;
  height: 2rem;
  border: 2px solid #ddd;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  color: #667eea;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox:hover:not(:disabled) {
  border-color: #667eea;
  background: #f0f3ff;
}

.task-item.completed .checkbox {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.task-info {
  flex: 1;
}

.task-title {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-weight: 600;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #999;
}

.task-description {
  margin: 0.25rem 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.task-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.badge.category {
  background: #eef2ff;
  color: #667eea;
}

.badge.priority {
  background: #fef3c7;
  color: #92400e;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0.5rem;
}

.delete-btn:hover:not(:disabled) {
  opacity: 1;
}

@media (max-width: 768px) {
  .task-item {
    flex-direction: column;
  }

  .task-content {
    width: 100%;
  }
}
</style>
