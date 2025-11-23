"use client"

import { AlertCircle, Code2, Database, Zap } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">✓ TaskFlow</h1>
          <p className="text-indigo-100 text-lg">Aplicación Full-Stack de Gestión de Tareas</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-12 flex gap-4">
          <AlertCircle className="text-blue-600 flex-shrink-0" size={24} />
          <div>
            <h2 className="text-lg font-semibold text-blue-900 mb-2">📦 Descarga tu proyecto</h2>
            <p className="text-blue-800">
              Haz clic en el botón de tres puntos en la esquina superior derecha y selecciona "Download ZIP" para
              descargar toda la aplicación completa.
            </p>
          </div>
        </div>

        {/* Quick Start Guide */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-indigo-500">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="text-indigo-600" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">Backend</h3>
            </div>
            <p className="text-gray-600 mb-6">API en TypeScript + Express con Swagger documentation</p>
            <div className="bg-gray-50 p-4 rounded font-mono text-sm space-y-2 mb-6">
              <p className="text-gray-700">$ cd backend</p>
              <p className="text-gray-700">$ npm install</p>
              <p className="text-indigo-600 font-semibold">$ npm run dev</p>
            </div>
            <p className="text-sm text-gray-600">
              ▸ Puerto: <span className="font-semibold text-indigo-600">5000</span>
              <br />▸ API: <span className="font-mono text-sm">http://localhost:5000/api</span>
              <br />▸ Swagger: <span className="font-mono text-sm">http://localhost:5000/api-docs</span>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-green-600" size={28} />
              <h3 className="text-2xl font-bold text-gray-900">Frontend</h3>
            </div>
            <p className="text-gray-600 mb-6">Interfaz Vue 3 con Script Setup y Vite</p>
            <div className="bg-gray-50 p-4 rounded font-mono text-sm space-y-2 mb-6">
              <p className="text-gray-700">$ cd frontend</p>
              <p className="text-gray-700">$ npm install</p>
              <p className="text-green-600 font-semibold">$ npm run dev</p>
            </div>
            <p className="text-sm text-gray-600">
              ▸ Puerto: <span className="font-semibold text-green-600">3000</span>
              <br />▸ App: <span className="font-mono text-sm">http://localhost:3000</span>
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">✨ Características</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "✅",
                title: "Crear Tareas",
                desc: "Agrega nuevas tareas con título, descripción, categoría y prioridad",
              },
              {
                icon: "📂",
                title: "Categorías",
                desc: "Organiza tus tareas en categorías personalizables con colores",
              },
              {
                icon: "🎯",
                title: "Prioridades",
                desc: "Marca tareas como Baja, Media o Alta prioridad",
              },
              {
                icon: "📊",
                title: "Estadísticas",
                desc: "Visualiza tu progreso con métricas en tiempo real",
              },
              {
                icon: "🎨",
                title: "Diseño Limpio",
                desc: "Interfaz intuitiva y responsiva para todos los dispositivos",
              },
              {
                icon: "📚",
                title: "API Documentada",
                desc: "11+ endpoints con documentación Swagger completa",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API Endpoints */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Database className="text-purple-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">API Endpoints</h2>
          </div>
          <div className="space-y-4">
            {[
              { method: "GET", path: "/api/tasks", desc: "Obtener todas las tareas" },
              { method: "POST", path: "/api/tasks", desc: "Crear una nueva tarea" },
              { method: "GET", path: "/api/tasks/:id", desc: "Obtener una tarea específica" },
              { method: "PUT", path: "/api/tasks/:id", desc: "Actualizar una tarea" },
              { method: "DELETE", path: "/api/tasks/:id", desc: "Eliminar una tarea" },
              { method: "PATCH", path: "/api/tasks/:id/complete", desc: "Marcar como completada" },
              { method: "GET", path: "/api/categories", desc: "Obtener categorías" },
              { method: "POST", path: "/api/categories", desc: "Crear categoría" },
              { method: "DELETE", path: "/api/categories/:id", desc: "Eliminar categoría" },
              { method: "GET", path: "/api/stats", desc: "Obtener estadísticas" },
            ].map((endpoint, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded hover:bg-gray-100 transition">
                <span
                  className={`px-3 py-1 rounded font-mono text-sm font-bold text-white min-w-16 text-center ${
                    endpoint.method === "GET"
                      ? "bg-blue-500"
                      : endpoint.method === "POST"
                        ? "bg-green-500"
                        : endpoint.method === "PUT"
                          ? "bg-yellow-500"
                          : endpoint.method === "PATCH"
                            ? "bg-purple-500"
                            : "bg-red-500"
                  }`}
                >
                  {endpoint.method}
                </span>
                <span className="font-mono text-sm text-gray-900 flex-1">{endpoint.path}</span>
                <span className="text-gray-600 text-sm">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Stack Tecnológico</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg text-indigo-600 mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ TypeScript</li>
                <li>✓ Express.js</li>
                <li>✓ Swagger/OpenAPI</li>
                <li>✓ UUID</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-green-600 mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Vue 3</li>
                <li>✓ Script Setup</li>
                <li>✓ Vite</li>
                <li>✓ CSS3 (Responsive)</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>TaskFlow © 2025 - Aplicación Full-Stack de Gestión de Tareas</p>
          <p className="mt-2 text-sm">¡Descarga el ZIP y comienza a usar tu aplicación!</p>
        </div>
      </footer>
    </div>
  )
}
