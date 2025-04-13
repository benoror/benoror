"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function CyberGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()

    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    const draw = () => {
      time += 0.01

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create full-screen background gradient from top to bottom
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      bgGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      bgGradient.addColorStop(0.5, isDark ? "rgba(0, 20, 60, 1)" : "rgba(0, 30, 80, 0.8)")
      bgGradient.addColorStop(1, isDark ? "rgba(0, 40, 100, 1)" : "rgba(0, 60, 120, 0.6)")

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set the horizon line at 60% from the top
      const horizonY = canvas.height * 0.6

      // Draw sun/moon
      const sunRadius = canvas.width * 0.25
      const sunX = canvas.width * 0.5
      const sunY = horizonY - 20

      const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius)

      sunGradient.addColorStop(0, isDark ? "rgba(0, 200, 255, 0.8)" : "rgba(0, 150, 255, 0.6)")
      sunGradient.addColorStop(1, "rgba(0, 80, 255, 0)")

      ctx.fillStyle = sunGradient
      ctx.beginPath()
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2)
      ctx.fill()

      // GRID

      // Set grid color
      const gridColor = isDark ? "rgba(0, 170, 255, 0.6)" : "rgba(0, 120, 255, 0.3)"
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1.5

      // Calculate grid offset based on time for continuous motion
      const gridOffset = (time * 0.6) % 1

      // Draw horizontal grid lines with perspective
      const horizontalLineCount = 10
      for (let i = 0; i <= horizontalLineCount; i++) {
        // Calculate y position with continuous motion
        const t = (i / horizontalLineCount + gridOffset) % 1
        const y = horizonY + (canvas.height - horizonY) * t

        // Calculate perspective width (wider as they get closer)
        const perspectiveWidth = canvas.width

        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 - perspectiveWidth, y)
        ctx.lineTo(canvas.width / 2 + perspectiveWidth, y)
        ctx.stroke()
      }

      // Draw vertical grid lines with perspective
      // These should diverge FROM the center (not converge TO the center)
      const verticalLineCount = 19

      for (let i = 0; i <= verticalLineCount; i++) {
        // Calculate normalized position (0 to 1)
        const normalizedPos = i / verticalLineCount

        // Calculate x position at horizon (evenly spaced)
        const horizonX = canvas.width * 0.1 + normalizedPos * canvas.width * 0.8

        // Calculate x position at bottom (diverging FROM center)
        // This is the key change - we're multiplying by a factor > 1 to make lines diverge
        const bottomX = canvas.width / 2 + (horizonX - canvas.width / 2) * 5

        ctx.beginPath()
        ctx.moveTo(horizonX, horizonY)

        // Only draw the line if it's within the canvas bounds
        if (bottomX >= 0 && bottomX <= canvas.width) {
          ctx.lineTo(bottomX, canvas.height)
        } else {
          // If the bottom point is outside the canvas, find where it intersects the edge
          const slope = (canvas.height - horizonY) / (bottomX - horizonX)
          let edgeX, edgeY

          if (bottomX < 0) {
            edgeX = 0
            edgeY = horizonY + slope * (edgeX - horizonX)
          } else {
            edgeX = canvas.width
            edgeY = horizonY + slope * (edgeX - horizonX)
          }

          if (edgeY <= canvas.height) {
            ctx.lineTo(edgeX, edgeY)
          }
        }

        ctx.stroke()
      }

      // Draw moving light dots (DeLorean time travel effect) at the top of the screen
      const dotCount = 40
      for (let i = 0; i < dotCount; i++) {
        // Calculate dot position with continuous motion
        const t = (i / dotCount + time * 0.2) % 1
        const size = 2 + Math.sin(time * 2 + i) * 1

        // Calculate x position with slight curve
        const curve = Math.sin(t * Math.PI * 2 + i) * 0.3
        const x = canvas.width / 2 + curve * canvas.width * 0.4

        // Calculate y position - now at the top portion of the screen
        const y = horizonY * t * 0.8 // This keeps dots in the top 80% of the space above horizon

        // Fade in as they approach the horizon
        const opacity = t * 0.8

        ctx.fillStyle = `rgba(0, 220, 255, ${opacity})`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 dark:opacity-90" />
}
