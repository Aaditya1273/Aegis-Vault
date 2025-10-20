"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users, Zap } from "lucide-react"

export default function VerifyIdentity() {
  const router = useRouter()
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const platforms = [
    {
      id: "farcaster",
      name: "Farcaster",
      description: "Connect your Farcaster account for social verification",
      icon: Users,
    },
    {
      id: "lens",
      name: "Lens Protocol",
      description: "Link your Lens profile for Web3 social credibility",
      icon: Zap,
    },
  ]

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const handleComplete = () => {
    router.push("/dashboard")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
      <div className="card-glass p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold">Verify Your Identity</h2>
            <p className="text-sm text-muted">Step 2 of 3</p>
          </div>
        </div>

        <p className="text-muted mb-6">
          Connect your social profiles to build your Web3 reputation and unlock AI trust insights.
        </p>

        <div className="space-y-3 mb-8">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => togglePlatform(platform.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                selectedPlatforms.includes(platform.id)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <platform.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{platform.name}</p>
                    <p className="text-sm text-muted">{platform.description}</p>
                  </div>
                </div>
                {selectedPlatforms.includes(platform.id) && (
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-muted">
            <span className="font-medium text-foreground">💡 Tip:</span> Connecting social profiles helps our AI Trust
            Engine provide better risk assessments and personalized insights.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent">
            Skip for Now
          </Button>
          <Button onClick={handleComplete} className="flex-1 btn-primary">
            Complete Setup
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
