"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import * as THREE from "three"

const HORIZON = 0.6

const STARS = [
  { x: 0.05, y: 0.25, s: 3 },   { x: 0.01, y: 0.55, s: 1.5 },
  { x: 0.02, y: 0.42, s: 3 },   { x: 0.10, y: 0.17, s: 3 },
  { x: 0.12, y: 0.33, s: 1.5 }, { x: 0.30, y: 0.25, s: 3 },
  { x: 0.16, y: 0.08, s: 3 },   { x: 0.24, y: 0.17, s: 1.5 },
  { x: 0.32, y: 0.67, s: 1.5 }, { x: 0.33, y: 0.58, s: 3 },
  { x: 0.12, y: 0.63, s: 3 },   { x: 0.33, y: 0.08, s: 3 },
  { x: 0.20, y: 0.17, s: 1.5 }, { x: 0.80, y: 0.17, s: 3 },
  { x: 0.62, y: 0.33, s: 1.5 }, { x: 0.60, y: 0.25, s: 3 },
  { x: 0.70, y: 0.12, s: 1.5 }, { x: 0.62, y: 0.83, s: 1.5 },
  { x: 0.65, y: 0.58, s: 3 },   { x: 0.64, y: 0.17, s: 1.5 },
  { x: 0.85, y: 0.03, s: 1.5 }, { x: 0.92, y: 0.67, s: 1.5 },
  { x: 0.75, y: 0.58, s: 3 },   { x: 0.90, y: 0.17, s: 1.5 },
  { x: 0.45, y: 0.10, s: 2 },   { x: 0.52, y: 0.30, s: 1.5 },
  { x: 0.78, y: 0.45, s: 2 },   { x: 0.38, y: 0.48, s: 1.5 },
  { x: 0.88, y: 0.28, s: 2 },   { x: 0.15, y: 0.50, s: 1.5 },
]

export default function OutrunHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeRef = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme()

  // ── Layer 1: Canvas 2D atmosphere ──────────────────────────────────
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

    const isDark = theme === "outrun" || resolvedTheme === "dark"

    const draw = () => {
      time += 0.01
      const w = canvas.width
      const h = canvas.height
      const horizonY = h * HORIZON

      ctx.clearRect(0, 0, w, h)

      // 80s sky gradient (B palette, stretched to 60 % horizon)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, h)
      if (isDark) {
        bgGradient.addColorStop(0, "#010310")
        bgGradient.addColorStop(0.12, "#0c1142")
        bgGradient.addColorStop(0.36, "#45125e")
        bgGradient.addColorStop(0.54, "#d53567")
        bgGradient.addColorStop(HORIZON, "#f0c3d9")
        bgGradient.addColorStop(HORIZON + 0.001, "#0a0a2e")
        bgGradient.addColorStop(1, "#050520")
      } else {
        bgGradient.addColorStop(0, "#f8fafc")
        bgGradient.addColorStop(0.4, "#e0e7ff")
        bgGradient.addColorStop(HORIZON, "#bfdbfe")
        bgGradient.addColorStop(HORIZON + 0.001, "#e0e7ff")
        bgGradient.addColorStop(1, "#c7d2fe")
      }
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, w, h)

      // Stars (dark mode only, above horizon)
      if (isDark) {
        const glitter = 0.5 + 0.4 * Math.sin(time * Math.PI)
        for (const star of STARS) {
          const sy = star.y * horizonY
          if (sy > horizonY) continue
          ctx.globalAlpha = glitter * (0.3 + star.s / 6)
          ctx.fillStyle = "white"
          ctx.beginPath()
          ctx.arc(star.x * w, sy, star.s, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      // Classic outrun sun, half-hidden behind the horizon
      const sunDiscR = w * 0.10
      const sunGlowR = w * 0.34
      const sunX = w * 0.5
      const sunY = h * 0.515

      // Clip everything to above the horizon so the sun "sets"
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, w, horizonY)
      ctx.clip()

      if (isDark) {
        // Outer atmospheric glow (fades to transparent blue)
        const outerGlow = ctx.createRadialGradient(
          sunX, sunY, sunDiscR * 1.2,
          sunX, sunY, sunGlowR,
        )
        outerGlow.addColorStop(0, "rgba(56, 189, 248, 0.25)")
        outerGlow.addColorStop(0.4, "rgba(99, 102, 241, 0.10)")
        outerGlow.addColorStop(1, "rgba(0, 80, 255, 0)")
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunGlowR, 0, Math.PI * 2)
        ctx.fill()

        // Mid-range pink/magenta light-emitting border
        const borderGlow = ctx.createRadialGradient(
          sunX, sunY, sunDiscR * 0.8,
          sunX, sunY, sunDiscR * 2.8,
        )
        borderGlow.addColorStop(0, "rgba(244, 114, 182, 0.45)")
        borderGlow.addColorStop(0.35, "rgba(213, 53, 103, 0.20)")
        borderGlow.addColorStop(0.7, "rgba(139, 92, 246, 0.08)")
        borderGlow.addColorStop(1, "rgba(56, 189, 248, 0)")
        ctx.fillStyle = borderGlow
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunDiscR * 2.8, 0, Math.PI * 2)
        ctx.fill()

        // Thick reddish-pink light-emitting ring
        ctx.save()
        ctx.shadowColor = "rgba(240, 195, 217, 0.8)"
        ctx.shadowBlur = 60
        const ring = ctx.createRadialGradient(
          sunX, sunY, sunDiscR * 0.85,
          sunX, sunY, sunDiscR * 1.45,
        )
        ring.addColorStop(0, "rgba(240, 195, 217, 0.0)")
        ring.addColorStop(0.25, "rgba(240, 195, 217, 0.7)")
        ring.addColorStop(0.5, "rgba(240, 195, 217, 0.55)")
        ring.addColorStop(0.75, "rgba(213, 53, 103, 0.25)")
        ring.addColorStop(1, "rgba(213, 53, 103, 0.0)")
        ctx.fillStyle = ring
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunDiscR * 1.45, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Sun disc with warm outrun gradient
        ctx.save()
        ctx.shadowColor = "rgba(240, 195, 217, 0.9)"
        ctx.shadowBlur = 50
        const disc = ctx.createRadialGradient(
          sunX, sunY - sunDiscR * 0.15, 0,
          sunX, sunY, sunDiscR,
        )
        disc.addColorStop(0, "#fef3c7")
        disc.addColorStop(0.35, "#fbbf24")
        disc.addColorStop(0.6, "#f97316")
        disc.addColorStop(0.82, "#ef4444")
        disc.addColorStop(1, "#ec4899")
        ctx.fillStyle = disc
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunDiscR, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Horizontal scan-line bands (classic outrun sun detail)
        ctx.save()
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunDiscR, 0, Math.PI * 2)
        ctx.clip()
        ctx.fillStyle = "rgba(5, 5, 32, 0.8)"
        const bands = [
          { y: 0.30, h: 0.035 },
          { y: 0.42, h: 0.04 },
          { y: 0.53, h: 0.045 },
          { y: 0.63, h: 0.055 },
          { y: 0.73, h: 0.065 },
          { y: 0.84, h: 0.08 },
        ]
        for (const band of bands) {
          const by = sunY - sunDiscR + sunDiscR * 2 * band.y
          const bh = sunDiscR * 2 * band.h
          ctx.fillRect(sunX - sunDiscR, by, sunDiscR * 2, bh)
        }
        ctx.restore()
      } else {
        const lightSun = ctx.createRadialGradient(
          sunX, sunY, 0,
          sunX, sunY, sunGlowR * 0.6,
        )
        lightSun.addColorStop(0, "#38bdf8")
        lightSun.addColorStop(1, "rgba(0, 80, 255, 0)")
        ctx.fillStyle = lightSun
        ctx.beginPath()
        ctx.arc(sunX, sunY, sunGlowR * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Restore from horizon clip
      ctx.restore()

      // Foggy horizon haze
      if (isDark) {
        const hazeGrad = ctx.createLinearGradient(
          0, horizonY - 60,
          0, horizonY + 40,
        )
        hazeGrad.addColorStop(0, "rgba(213, 53, 103, 0)")
        hazeGrad.addColorStop(0.4, "rgba(240, 195, 217, 0.15)")
        hazeGrad.addColorStop(0.6, "rgba(240, 195, 217, 0.12)")
        hazeGrad.addColorStop(1, "rgba(10, 10, 46, 0)")
        ctx.fillStyle = hazeGrad
        ctx.fillRect(0, horizonY - 60, w, 100)

      }

      // Animated light dots (from A)
      const dotCount = 80
      for (let i = 0; i < dotCount; i++) {
        const t = (i / dotCount + time * 0.2) % 1
        const size = 2 + Math.sin(time * 2 + i) * 1
        const curve = Math.sin(t * Math.PI * 2 + i) * 0.3
        const x = w / 2 + curve * w * 0.6
        const y = horizonY * t * 1.8
        const radians = Math.PI * t
        const opacity = Math.pow(Math.sin(radians), 2)

        ctx.fillStyle = isDark
          ? `rgba(0, 220, 255, ${opacity})`
          : "rgba(124, 169, 237, 0.0)"
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
  }, [theme, resolvedTheme])

  // ── Layer 2: Three.js GPU grid ─────────────────────────────────────
  useEffect(() => {
    if (!threeRef.current) return

    const container = threeRef.current
    const scene = new THREE.Scene()

    // Camera tuned so the grid horizon sits at ~60 % from top
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 2.5, 5)
    camera.rotation.x = 0.15

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const cellSize = 2
    const gridSize = 1000
    const gridDivisions = gridSize / cellSize

    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        camZ: { value: camera.position.z },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float camZ;
        varying vec3 vWorldPos;

        void main() {
          float pulse = 0.9 + 0.1 * sin(time * 2.0);

          vec3 color;
          color.r = 0.1  + 0.1 * sin(vWorldPos.z * 0.05 + time);
          color.g = 0.6  + 0.1 * sin(vWorldPos.z * 0.05 + time);
          color.b = 1.0;

          float dist = abs(vWorldPos.z - camZ);
          float horizonFade = 1.0 - smoothstep(400.0, 500.0, dist);
          float xFade = 1.0 - smoothstep(400.0, 500.0, abs(vWorldPos.x));

          float glow = 1.2;
          gl_FragColor = vec4(color * pulse * glow, horizonFade * xFade);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    // Build grid line segments
    const gridGeometry = new THREE.BufferGeometry()
    const verts: number[] = []

    for (let i = -gridSize / 2; i <= gridSize / 2; i += cellSize) {
      verts.push(-gridSize / 2, 0, i, gridSize / 2, 0, i)
    }
    for (let i = -gridSize / 2; i <= gridSize / 2; i += cellSize) {
      verts.push(i, 0, -gridSize / 2, i, 0, gridSize / 2)
    }

    gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(verts, 3),
    )
    const grid = new THREE.LineSegments(gridGeometry, gridMaterial)
    scene.add(grid)

    let time = 0
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      time += 0.01
      if (gridMaterial.uniforms.time) {
        gridMaterial.uniforms.time.value = time
      }

      grid.position.z += 0.08
      if (grid.position.z > cellSize) {
        grid.position.z = 0
      }

      renderer.render(scene, camera)
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafId)
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      gridGeometry.dispose()
      gridMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60 dark:opacity-90">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div ref={threeRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
