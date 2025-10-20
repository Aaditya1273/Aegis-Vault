"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react"

interface Activity {
  id: string
  type: "like" | "comment" | "share" | "post"
  platform: string
  description: string
  timestamp: string
  engagement: number
}

const activities: Activity[] = [
  {
    id: "1",
    type: "post",
    platform: "Farcaster",
    description: "Posted about portfolio rebalancing",
    timestamp: "2 hours ago",
    engagement: 45,
  },
  {
    id: "2",
    type: "like",
    platform: "Lens",
    description: "Liked a post about DeFi strategies",
    timestamp: "5 hours ago",
    engagement: 12,
  },
  {
    id: "3",
    type: "comment",
    platform: "Farcaster",
    description: "Commented on Web3 security discussion",
    timestamp: "1 day ago",
    engagement: 28,
  },
  {
    id: "4",
    type: "share",
    platform: "Lens",
    description: "Shared an article about blockchain trends",
    timestamp: "2 days ago",
    engagement: 67,
  },
]

const activityIcons: Record<string, React.ReactNode> = {
  like: <Heart className="w-4 h-4 text-red-500" />,
  comment: <MessageCircle className="w-4 h-4 text-blue-500" />,
  share: <Share2 className="w-4 h-4 text-green-500" />,
  post: <TrendingUp className="w-4 h-4 text-accent" />,
}

export default function SocialActivity() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

      <div className="space-y-3">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              {activityIcons[activity.type]}
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.description}</p>
                <p className="text-xs text-muted">{activity.platform}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">{activity.timestamp}</p>
              <p className="text-xs font-medium text-accent">{activity.engagement} engagements</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
