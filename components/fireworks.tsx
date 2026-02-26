"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
  size: number
  decay: number
  gravity: number
}

interface Firework {
  x: number
  y: number
  targetY: number
  speed: number
  color: string
  exploded: boolean
  particles: Particle[]
  trail: { x: number; y: number; alpha: number }[]
}

const COLORS = [
  "rgba(232, 160, 160,",  // soft rose
  "rgba(255, 182, 150,",  // peach
  "rgba(255, 218, 185,",  // light peach
  "rgba(255, 200, 200,",  // light pink
  "rgba(255, 223, 186,",  // warm gold
]

export function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireworksRef = useRef<Firework[]>([])
  const animationRef = useRef<number>(0)
  const lastLaunchRef = useRef<number>(0)

  const createParticles = useCallback((x: number, y: number, color: string): Particle[] => {
    const particles: Particle[] = []
    const count = 60 + Math.floor(Math.random() * 40)
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
      const speed = 1 + Math.random() * 4
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color,
        size: 1 + Math.random() * 2,
        decay: 0.008 + Math.random() * 0.012,
        gravity: 0.02,
      })
    }
    return particles
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.globalCompositeOperation = "destination-out"
    ctx.fillStyle = "rgba(0,0,0,0.15)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.globalCompositeOperation = "lighter"

    const now = Date.now()
    if (now - lastLaunchRef.current > 600 + Math.random() * 1200) {
      lastLaunchRef.current = now
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      fireworksRef.current.push({
        x: canvas.width * (0.2 + Math.random() * 0.6),
        y: canvas.height,
        targetY: canvas.height * (0.15 + Math.random() * 0.35),
        speed: 3 + Math.random() * 2,
        color,
        exploded: false,
        particles: [],
        trail: [],
      })
    }

    fireworksRef.current = fireworksRef.current.filter((fw) => {
      if (!fw.exploded) {
        fw.y -= fw.speed
        fw.trail.push({ x: fw.x, y: fw.y, alpha: 1 })
        if (fw.trail.length > 8) fw.trail.shift()

        // Draw trail
        fw.trail.forEach((t, i) => {
          t.alpha *= 0.85
          ctx.beginPath()
          ctx.arc(t.x, t.y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `${fw.color} ${t.alpha * 0.5})`
          ctx.fill()
        })

        // Draw head
        ctx.beginPath()
        ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `${fw.color} 1)`
        ctx.fill()

        if (fw.y <= fw.targetY) {
          fw.exploded = true
          fw.particles = createParticles(fw.x, fw.y, fw.color)
        }
        return true
      } else {
        let alive = false
        fw.particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          p.vy += p.gravity
          p.vx *= 0.99
          p.alpha -= p.decay
          if (p.alpha > 0) {
            alive = true
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `${p.color} ${p.alpha})`
            ctx.fill()
          }
        })
        return alive
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [createParticles])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [active, animate])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-40 pointer-events-none"
      aria-hidden="true"
    />
  )
}
