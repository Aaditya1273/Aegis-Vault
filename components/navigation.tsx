"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function Navigation() {
  const router = useRouter()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-lg text-foreground">LUMINAUT</span>
          </motion.div>

          <div className="hidden md:flex gap-8">
            {["Features", "Dashboard", "Docs"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-muted hover:text-foreground transition-smooth"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push("/onboarding")}
            className="btn-primary"
          >
            Launch App
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
