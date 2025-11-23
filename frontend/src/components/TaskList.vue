<script setup lang="ts">
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'

const props = defineProps<{
  tasks: Array<any>
  categories: Array<{ id: string; name: string; color: string }>
}>()

const emit = defineEmits<{
  'task-deleted': [taskId: string]
  'task-updated': []
}>()

const pendingTasks = computed(() => props.tasks.filter(t => !t.completed))
const completedTasks = computed(() => props.tasks.filter(t => t.completed))

const getCategoryName = (categoryId: string) => {
  return props.categories.find(c => c.id === categoryId)?.name || 'Sin categoría'
}
</script>

<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty-state">
      <p>📭 No hay tareas. ¡Crea una nueva!</p>
    </div>

    <div v-else>
      <section v-if="pendingTasks.length > 0" class="section-group">
        <h3 class="section-title">Por Hacer ({{ pendingTasks.length }})</h3>
        <div class="tasks">
          <TaskItem
            v-for="task in pendingTasks"
            :key="task.id"
            :task="task"
            :category-name="getCategoryName(task.categoryId)"
            @task-deleted="emit('task-deleted', $event)"
            @task-updated="emit('task-updated')"
          />
        </div>
      </section>

      <section v-if="completedTasks.length > 0" class="section-group">
        <h3 class="section-title">Completadas ({{ completedTasks.length }})</h3>
        <div class="tasks">
          <TaskItem
            v-for="task in completedTasks"
            :key="task.id"
            :task="task"
            :category-name="getCategoryName(task.categoryId)"
            @task-deleted="emit('task-deleted', $event)"
            @task-updated="emit('task-updated')"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  animation: fadeIn 0.3s ease;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 0.75rem;
  color: #999;
}

.section-group {
  margin-bottom: 2rem;
}

.section-title {
  color: #667eea;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.tasks {
  display: grid;
  gap: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
