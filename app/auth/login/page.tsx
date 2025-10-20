"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <div className="card-glass p-8 rounded-2xl">
        <button
          onClick={() => router.push("/onboarding")}
          className="flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-muted text-center mb-8">Sign in to your LUMINAUT wallet</p>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
        </div>

        <Button
          onClick={handleLogin}
          disabled={!formData.email || !formData.password || isLoading}
          className="w-full btn-primary mb-4"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-sm text-muted text-center">
          Don't have an account?{" "}
          <button onClick={() => router.push("/onboarding")} className="text-primary hover:underline font-medium">
            Create one
          </button>
        </p>
      </div>
    </motion.div>
  )
}
