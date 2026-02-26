"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const initial: Heart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 10 + Math.random() * 20,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 8,
      opacity: 0.05 + Math.random() * 0.12,
    }))
    setHearts(initial)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-20px]"
          style={{
            left: `${heart.x}%`,
            animation: `floatUp ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="oklch(0.65 0.18 12)"
          >
            <path d="M12,4 C9,0.5 3,0.5 3,6 C3,10.5 12,18 12,18 C12,18 21,10.5 21,6 C21,0.5 15,0.5 12,4Z" />
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
