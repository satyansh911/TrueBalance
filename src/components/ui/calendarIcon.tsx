"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Props {
  size?: number
  isActive?: boolean
}

const CalendarIcon: React.FC<Props> = ({ size = 24 }) => {
  const [Player, setPlayer] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Dynamically import the Player component only on client side
    const loadPlayer = async () => {
      try {
        const { Player: LottiePlayer } = await import("@lottiefiles/react-lottie-player")
        setPlayer(() => LottiePlayer)
        setIsMounted(true)
      } catch (error) {
        console.error("Failed to load Lottie player:", error)
        setIsMounted(true) // Still set mounted to show fallback
      }
    }

    loadPlayer()
  }, [])

  // Always show fallback during SSR or if Player failed to load
  if (!isMounted || !Player) {
    return (
      <div
        style={{ height: size, width: size }}
        className="flex items-center justify-center bg-muted/20 rounded-lg animate-pulse"
      >
        <span style={{ fontSize: size * 0.4 }} className="text-muted-foreground">
          🔍
        </span>
      </div>
    )
  }

  return <Player autoplay loop src="/calendar.json" style={{ height: size, width: size }} />
}

export default CalendarIcon
