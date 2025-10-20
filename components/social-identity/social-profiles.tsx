"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Link2, Unlink2 } from "lucide-react"

interface SocialProfile {
  id: string
  platform: "farcaster" | "lens" | "twitter"
  username: string
  displayName: string
  avatar: string
  verified: boolean
  followers: number
  connected: boolean
  connectedAt?: Date
}

const socialProfiles: SocialProfile[] = [
  {
    id: "1",
    platform: "farcaster",
    username: "@yourname",
    displayName: "Your Name",
    avatar: "F",
    verified: true,
    followers: 1250,
    connected: true,
    connectedAt: new Date("2024-02-01"),
  },
  {
    id: "2",
    platform: "lens",
    username: "yourname.lens",
    displayName: "Your Name",
    avatar: "L",
    verified: true,
    followers: 850,
    connected: true,
    connectedAt: new Date("2024-02-05"),
  },
  {
    id: "3",
    platform: "twitter",
    username: "@yourhandle",
    displayName: "Your Name",
    avatar: "T",
    verified: false,
    followers: 5200,
    connected: false,
  },
]

export default function SocialProfiles() {
  const [profiles, setProfiles] = useState(socialProfiles)
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (profileId: string) => {
    setConnecting(profileId)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, connected: true, connectedAt: new Date() } : p)),
    )
    setConnecting(null)
  }

  const handleDisconnect = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, connected: false, connectedAt: undefined } : p)),
    )
  }

  const platformColors: Record<string, { bg: string; text: string }> = {
    farcaster: { bg: "bg-purple-500/10", text: "text-purple-500" },
    lens: { bg: "bg-green-500/10", text: "text-green-500" },
    twitter: { bg: "bg-blue-500/10", text: "text-blue-500" },
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Connected Profiles</h2>
        <span className="text-sm text-muted">
          {profiles.filter((p) => p.connected).length} of {profiles.length} connected
        </span>
      </div>

      <div className="space-y-4">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg border-2 transition-all ${
              profile.connected
                ? `${platformColors[profile.platform].bg} border-${platformColors[profile.platform].text}`
                : "bg-background/50 border-border"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                    profile.platform === "farcaster"
                      ? "bg-purple-500"
                      : profile.platform === "lens"
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                >
                  {profile.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{profile.displayName}</p>
                    {profile.verified && <CheckCircle2 className="w-4 h-4 text-accent" />}
                  </div>
                  <p className="text-sm text-muted mb-2">{profile.username}</p>
                  <p className="text-xs text-muted">{profile.followers.toLocaleString()} followers</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {profile.connected ? (
                  <>
                    <span className="text-xs font-medium text-accent">Connected</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => handleDisconnect(profile.id)}
                    >
                      <Unlink2 className="w-3 h-3 mr-1" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="btn-primary"
                    onClick={() => handleConnect(profile.id)}
                    disabled={connecting === profile.id}
                  >
                    <Link2 className="w-3 h-3 mr-1" />
                    {connecting === profile.id ? "Connecting..." : "Connect"}
                  </Button>
                )}
              </div>
            </div>

            {profile.connected && profile.connectedAt && (
              <p className="text-xs text-muted mt-3">Connected on {profile.connectedAt.toLocaleDateString()}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-sm text-muted">
          <span className="font-medium text-foreground">Tip:</span> Connecting your social profiles helps build your
          on-chain reputation and improves your trust score.
        </p>
      </div>
    </motion.div>
  )
}
