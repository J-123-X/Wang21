"use client"

import { useState } from "react"

interface EnvelopeProps {
  onOpen: () => void
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false)
  const [isFullyOpen, setIsFullyOpen] = useState(false)

  const handleClick = () => {
    if (isOpening) return
    setIsOpening(true)
    setTimeout(() => {
      setIsFullyOpen(true)
    }, 800)
    setTimeout(() => {
      onOpen()
    }, 1800)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[oklch(0.98_0.005_30)] transition-opacity duration-700"
      style={{ opacity: isFullyOpen ? 0 : 1, pointerEvents: isFullyOpen ? "none" : "auto" }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? "oklch(0.65 0.18 12)" : i % 3 === 1 ? "oklch(0.75 0.12 50)" : "oklch(0.7 0.15 30)",
              animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <p className="mb-8 text-lg tracking-wider text-muted-foreground animate-pulse">
        {isOpening ? "\u6b63\u5728\u6253\u5f00..." : "\u70b9\u51fb\u4fe1\u5c01\u67e5\u770b\u795d\u798f"}
      </p>

      {/* Envelope */}
      <div
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        role="button"
        aria-label="打开信封查看生日祝福"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick() }}
      >
        <svg
          width="280"
          height="200"
          viewBox="0 0 280 200"
          className="drop-shadow-xl transition-transform duration-300 hover:scale-105"
        >
          {/* Envelope body */}
          <rect
            x="10"
            y="60"
            width="260"
            height="130"
            rx="8"
            fill="oklch(0.94 0.04 30)"
            stroke="oklch(0.85 0.06 20)"
            strokeWidth="1.5"
          />

          {/* Card inside - slides up when opening */}
          <g
            style={{
              transform: isOpening ? "translateY(-50px)" : "translateY(0px)",
              transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <rect
              x="30"
              y="70"
              width="220"
              height="100"
              rx="6"
              fill="white"
              stroke="oklch(0.85 0.06 20)"
              strokeWidth="0.5"
            />
            <text
              x="140"
              y="110"
              textAnchor="middle"
              fill="oklch(0.65 0.18 12)"
              fontSize="16"
              fontWeight="bold"
            >
              {"\u751f\u65e5\u5feb\u4e50"}
            </text>
            <text
              x="140"
              y="135"
              textAnchor="middle"
              fill="oklch(0.5 0.03 30)"
              fontSize="12"
            >
              {"\u4eb2\u7231\u7684\u6c6a"}
            </text>
          </g>

          {/* Envelope flap - opens upward */}
          <path
            d="M10,60 L140,0 L270,60"
            fill="oklch(0.90 0.05 25)"
            stroke="oklch(0.85 0.06 20)"
            strokeWidth="1.5"
            style={{
              transformOrigin: "140px 60px",
              transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
              transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Front flap decorations */}
          <path
            d="M10,190 L140,120 L270,190"
            fill="oklch(0.92 0.04 28)"
            stroke="oklch(0.85 0.06 20)"
            strokeWidth="0.5"
          />

          {/* Heart seal */}
          {!isOpening && (
            <g className="animate-pulse">
              <circle cx="140" cy="60" r="16" fill="oklch(0.65 0.18 12)" />
              <path
                d="M140,50 C136,44 128,44 128,52 C128,58 140,68 140,68 C140,68 152,58 152,52 C152,44 144,44 140,50Z"
                fill="oklch(0.99 0.005 30)"
              />
            </g>
          )}
        </svg>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {"To: \u4eb2\u7231\u7684\u6c6a"}
      </p>

      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
      `}</style>
    </div>
  )
}
