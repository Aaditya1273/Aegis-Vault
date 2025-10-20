"use client"

import { motion } from "framer-motion"
import ChatInterface from "@/components/ai-assistant/chat-interface"
import AssistantSidebar from "@/components/ai-assistant/assistant-sidebar"

export default function AssistantPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Assistant</h1>
        <p className="text-muted">Get personalized insights and recommendations for your wallet</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6 h-[600px]">
        <div className="lg:col-span-3">
          <ChatInterface />
        </div>
        <div>
          <AssistantSidebar />
        </div>
      </div>
    </div>
  )
}
