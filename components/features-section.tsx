"use client"

import { motion } from "framer-motion"

const features = [
  {
    title: "Multi-Chain Support",
    description: "Seamlessly manage assets across Ethereum, Polygon, Solana, and Base",
    icon: "🔗",
  },
  {
    title: "AI Trust Engine",
    description: "Real-time risk analysis and transaction intelligence powered by ML",
    icon: "🧠",
  },
  {
    title: "Social Identity",
    description: "Verifiable reputation scoring with Farcaster and Lens integration",
    icon: "👥",
  },
  {
    title: "Secure & Non-Custodial",
    description: "Your keys, your crypto. MPC and passkey-based security",
    icon: "🔐",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="card-glass"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
