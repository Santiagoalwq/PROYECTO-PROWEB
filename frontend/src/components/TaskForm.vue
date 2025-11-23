<script setup lang="ts">
import { ref } from 'vue'
import { apiCall } from '../api'

const props = defineProps<{
  categories: Array<{ id: string; name: string; color: string }>
}>()

const emit = defineEmits<{
  'task-added': [task: any]
}>()

const title = ref('')
const description = ref('')
const categoryId = ref('1')
const priority = ref('medium')
const loading = ref(false)

const handleSubmit = async () => {
  if (!title.value.trim()) {
    alert('Por favor ingresa un título')
    return
  }

  loading.value = true

  const { data, error } = await apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      categoryId: categoryId.value,
      priority: priority.value
    })
  })

  if (error) {
    alert(`Error al crear la tarea: ${error}`)
  } else if (data) {
    emit('task-added', data)
    title.value = ''
    description.value = ''
    categoryId.value = '1'
    priority.value = 'medium'
  }

  loading.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <h2>Crear Nueva Tarea</h2>
    
    <div class="form-group">
      <label for="title">Título *</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Ingresa el título de la tarea"
        class="input"
        :disabled="loading"
      />
    </div>

    <div class="form-group">
      <label for="description">Descripción</label>
      <textarea
        id="description"
        v-model="description"
        placeholder="Describe la tarea (opcional)"
        class="textarea"
        :disabled="loading"
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="category">Categoría</label>
        <select v-model="categoryId" id="category" class="select" :disabled="loading">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="priority">Prioridad</label>
        <select v-model="priority" id="priority" class="select" :disabled="loading">
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>
    </div>

    <button type="submit" class="button" :disabled="loading">
      {{ loading ? 'Creando...' : '+ Crear Tarea' }}
    </button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
  font-size: 0.9rem;
}

.input,
.textarea,
.select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.button {
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
  width: 100%;
}

.button:hover:not(:disabled) {
  background: #5568d3;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
