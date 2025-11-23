# TaskFlow - Guía de Instalación y Uso

## Requisitos
- Node.js 16+ instalado
- npm o yarn

## Instalación Rápida

### 1. Backend (Puerto 5000)

\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

Verás:
\`\`\`
✅ TaskFlow API running on http://localhost:5000
📚 Swagger documentation: http://localhost:5000/api-docs
🏥 Health check: http://localhost:5000/health
\`\`\`

### 2. Frontend (Puerto 3000) - En otra terminal

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Verás:
\`\`\`
➜  Local:   http://localhost:3000/
\`\`\`

## URLs de Acceso

| Componente | URL | Descripción |
|-----------|-----|-------------|
| Frontend | http://localhost:3000 | Aplicación principal de tareas |
| Swagger API | http://localhost:5000/api-docs | Documentación interactiva de API |
| Health Check | http://localhost:5000/health | Verificar si el API está activo |

## Características

- ✓ Crear, editar, eliminar tareas
- ✓ Categorizar tareas con colores personalizados
- ✓ Marcar tareas como completadas
- ✓ Establecer prioridades (baja, media, alta)
- ✓ Ver estadísticas en tiempo real
- ✓ API REST documentada con Swagger
- ✓ Interfaz responsiva y moderna

## API Endpoints

### Tasks
- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear una nueva tarea
- `GET /api/tasks/{id}` - Obtener una tarea
- `PUT /api/tasks/{id}` - Actualizar una tarea
- `DELETE /api/tasks/{id}` - Eliminar una tarea
- `PATCH /api/tasks/{id}/complete` - Marcar como completada

### Categories
- `GET /api/categories` - Obtener todas las categorías
- `POST /api/categories` - Crear una categoría
- `DELETE /api/categories/{id}` - Eliminar una categoría

### Statistics
- `GET /api/stats` - Obtener estadísticas

## Troubleshooting

### El frontend no carga
- Asegúrate de que `npm run dev` está ejecutándose en la carpeta `frontend`
- Verifica que el puerto 3000 no esté en uso

### Swagger no funciona
- Verifica que el backend está corriendo: http://localhost:5000/health
- Limpia el caché del navegador (Ctrl+Shift+Del)

### El API no responde
- Asegúrate de que `npm run dev` está ejecutándose en la carpeta `backend`
- Verifica que el puerto 5000 no esté en uso

## Estructura del Proyecto

\`\`\`
project/
├── backend/          # Express API con TypeScript
│   ├── src/
│   │   ├── server.ts
│   │   ├── swagger.ts
│   │   └── routes/
│   │       ├── tasks.ts
│   │       ├── categories.ts
│   │       └── stats.ts
│   └── package.json
├── frontend/         # Vue 3 con Vite
│   ├── src/
│   │   ├── App.vue
│   │   ├── api.ts
│   │   ├── main.ts
│   │   └── components/
│   └── package.json
└── INSTALL.md
\`\`\`

## Licencia

MIT
