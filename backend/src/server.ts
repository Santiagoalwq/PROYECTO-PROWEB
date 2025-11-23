import express, { type Express, type Request, type Response } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { v4 as uuidv4 } from "uuid"

const app: Express = express()
const PORT = 5000


app.use(cors())
app.use(express.json())


interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  categoryId: string
  priority: "low" | "medium" | "high"
  createdAt: string
}

interface Category {
  id: string
  name: string
  color: string
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Welcome to TaskFlow",
    description: "Your first task is here!",
    completed: false,
    categoryId: "1",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
]

const categories: Category[] = [
  { id: "1", name: "Personal", color: "#3B82F6" },
  { id: "2", name: "Work", color: "#10B981" },
]

// Swagger configuration
const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "TaskFlow API",
    description: "Task Management API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          completed: { type: "boolean" },
          categoryId: { type: "string" },
          priority: { type: "string", enum: ["low", "medium", "high"] },
          createdAt: { type: "string" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          color: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/api/tasks": {
      get: {
        summary: "Get all tasks",
        tags: ["Tasks"],
        responses: {
          200: {
            description: "List of all tasks",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Task" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new task",
        tags: ["Tasks"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  categoryId: { type: "string" },
                  priority: { type: "string", enum: ["low", "medium", "high"] },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
        },
      },
    },
    "/api/tasks/{id}": {
      get: {
        summary: "Get a task by ID",
        tags: ["Tasks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Task details",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
          404: { description: "Task not found" },
        },
      },
      put: {
        summary: "Update a task",
        tags: ["Tasks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  completed: { type: "boolean" },
                  priority: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a task",
        tags: ["Tasks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Task deleted successfully" },
        },
      },
    },
    "/api/tasks/{id}/complete": {
      patch: {
        summary: "Toggle task completion status",
        tags: ["Tasks"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Task toggled successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" },
              },
            },
          },
        },
      },
    },
    "/api/categories": {
      get: {
        summary: "Get all categories",
        tags: ["Categories"],
        responses: {
          200: {
            description: "List of all categories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new category",
        tags: ["Categories"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string" },
                  color: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Category created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Category" },
              },
            },
          },
        },
      },
    },
    "/api/categories/{id}": {
      delete: {
        summary: "Delete a category",
        tags: ["Categories"],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Category deleted successfully" },
        },
      },
    },
    "/api/stats": {
      get: {
        summary: "Get application statistics",
        tags: ["Statistics"],
        responses: {
          200: {
            description: "Statistics data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    totalTasks: { type: "number" },
                    completedTasks: { type: "number" },
                    pendingTasks: { type: "number" },
                    completionRate: { type: "number" },
                    totalCategories: { type: "number" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/health": {
      get: {
        summary: "Health check",
        tags: ["Health"],
        responses: {
          200: {
            description: "Server is running",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

// Setup Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "TaskFlow API is running" })
})

// Tasks endpoints
app.get("/api/tasks", (req: Request, res: Response) => {
  res.json(tasks)
})

app.post("/api/tasks", (req: Request, res: Response) => {
  const { title, description = "", categoryId = "1", priority = "medium" } = req.body

  if (!title) {
    return res.status(400).json({ error: "Title is required" })
  }

  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    categoryId,
    priority,
    createdAt: new Date().toISOString(),
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

app.get("/api/tasks/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) {
    return res.status(404).json({ error: "Task not found" })
  }
  res.json(task)
})

app.put("/api/tasks/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) {
    return res.status(404).json({ error: "Task not found" })
  }

  const { title, description, completed, priority } = req.body
  if (title) task.title = title
  if (description !== undefined) task.description = description
  if (completed !== undefined) task.completed = completed
  if (priority) task.priority = priority

  res.json(task)
})

app.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" })
  }

  tasks.splice(index, 1)
  res.status(204).send()
})

app.patch("/api/tasks/:id/complete", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) {
    return res.status(404).json({ error: "Task not found" })
  }

  task.completed = !task.completed
  res.json(task)
})

// Categories endpoints
app.get("/api/categories", (req: Request, res: Response) => {
  res.json(categories)
})

app.post("/api/categories", (req: Request, res: Response) => {
  const { name, color = "#6366F1" } = req.body

  if (!name) {
    return res.status(400).json({ error: "Name is required" })
  }

  const newCategory: Category = {
    id: uuidv4(),
    name,
    color,
  }

  categories.push(newCategory)
  res.status(201).json(newCategory)
})

app.delete("/api/categories/:id", (req: Request, res: Response) => {
  const index = categories.findIndex((c) => c.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: "Category not found" })
  }

  categories.splice(index, 1)
  res.status(204).send()
})

// Stats endpoint
app.get("/api/stats", (req: Request, res: Response) => {
  const completed = tasks.filter((t) => t.completed).length
  const total = tasks.length

  res.json({
    totalTasks: total,
    completedTasks: completed,
    pendingTasks: total - completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    totalCategories: categories.length,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ TaskFlow API running on http://localhost:${PORT}`)
  console.log(`📚 Swagger documentation: http://localhost:${PORT}/api-docs`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
})
