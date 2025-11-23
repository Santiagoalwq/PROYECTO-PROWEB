<script setup lang="ts">
import { ref } from 'vue'
import { apiCall } from '../api'

const props = defineProps<{
  categories: Array<{ id: string; name: string; color: string }>
}>()

const emit = defineEmits<{
  'category-added': [category: any]
}>()

const newCategoryName = ref('')
const newCategoryColor = ref('#667eea')
const loading = ref(false)

const colors = [
  '#667eea',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
  '#8B5CF6'
]

const handleAddCategory = async () => {
  if (!newCategoryName.value.trim()) {
    alert('Por favor ingresa un nombre')
    return
  }

  loading.value = true

  const { data, error } = await apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify({
      name: newCategoryName.value,
      color: newCategoryColor.value
    })
  })

  if (error) {
    alert(`Error al crear la categoría: ${error}`)
  } else if (data) {
    emit('category-added', data)
    newCategoryName.value = ''
    newCategoryColor.value = '#667eea'
  }

  loading.value = false
}

const deleteCategory = async (id: string) => {
  if (!confirm('¿Eliminar esta categoría?')) return

  const { error } = await apiCall(`/categories/${id}`, {
    method: 'DELETE'
  })

  if (!error) {
    location.reload()
  } else {
    console.error('[v0] Error deleting category:', error)
    alert('Error al eliminar la categoría')
  }
}
</script>

<template>
  <div class="category-manager">
    <form @submit.prevent="handleAddCategory" class="add-form">
      <h2>Crear Nueva Categoría</h2>
      
      <div class="form-group">
        <label for="cat-name">Nombre *</label>
        <input
          id="cat-name"
          v-model="newCategoryName"
          type="text"
          placeholder="Ej: Compras, Salud, etc."
          class="input"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label>Color</label>
        <div class="color-picker">
          <button
            v-for="color in colors"
            :key="color"
            type="button"
            :style="{ backgroundColor: color }"
            :class="['color-option', { active: newCategoryColor === color }]"
            @click="newCategoryColor = color"
          ></button>
        </div>
      </div>

      <button type="submit" class="button" :disabled="loading">
        {{ loading ? 'Agregando...' : '+ Agregar Categoría' }}
      </button>
    </form>

    <div class="categories-list">
      <h2>Categorías Existentes</h2>
      <div v-if="categories.length === 0" class="empty">Sin categorías</div>
      <div v-else class="categories">
        <div v-for="cat in categories" :key="cat.id" class="category-card">
          <div class="category-color" :style="{ backgroundColor: cat.color }"></div>
          <h3>{{ cat.name }}</h3>
          <button @click="deleteCategory(cat.id)" class="delete-btn">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-manager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.add-form {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.add-form h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
}

.input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.color-picker {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.color-option {
  width: 3rem;
  height: 3rem;
  border: 3px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #333;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #333;
}

.button {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}

.button:hover:not(:disabled) {
  background: #5568d3;
}

.categories-list {
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.categories-list h2 {
  margin: 0 0 1.5rem 0;
  color: #333;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.categories {
  display: grid;
  gap: 1rem;
}

.category-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 0.5rem;
  border-left: 4px solid #667eea;
}

.category-color {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

.category-card h3 {
  margin: 0;
  flex: 1;
  color: #333;
}

.delete-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .category-manager {
    grid-template-columns: 1fr;
  }
}
</style>
