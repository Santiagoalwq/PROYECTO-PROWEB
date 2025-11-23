const API_BASE_URL = "http://localhost:5000/api"

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log(`[v0] Calling API: ${API_BASE_URL}${endpoint}`)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    console.log(`[v0] Response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.log(`[v0] Error response: ${errorText}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log(`[v0] API success:`, data)
    return { data, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error(`[v0] API Error on ${endpoint}:`, errorMessage)
    return { data: null, error: errorMessage }
  }
}
