// SDK Client
import type { LuminautConfig } from "./types"

export class LuminautClient {
  private apiUrl: string
  private apiKey?: string
  private timeout: number

  constructor(config: LuminautConfig = {}) {
    this.apiUrl = config.apiUrl || "https://api.luminaut.io"
    this.apiKey = config.apiKey
    this.timeout = config.timeout || 30000
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      return response.json() as Promise<T>
    } finally {
      clearTimeout(timeoutId)
    }
  }
}
