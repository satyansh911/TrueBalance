"use client"

import { Player } from "@lottiefiles/react-lottie-player"
import type React from "react"
import { useState, useEffect } from "react"

interface Props {
  size?: number
  isActive?: boolean
}

const LogoIcon: React.FC<Props> = ({ size = 24 }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div style={{ height: size, width: size }} className="flex items-center justify-center bg-muted rounded-lg">
        <span className="text-4xl">🔍</span>
      </div>
    )
  }

  return <Player autoplay loop src="/logo.json" style={{ height: size, width: size }} />
}

export default LogoIcon
