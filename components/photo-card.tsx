"use client"

import { useState } from "react"
import Image from "next/image"

interface PhotoCardProps {
  src: string
  alt: string
  caption?: string
  index: number
}

export function PhotoCard({ src, alt, caption, index }: PhotoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const rotations = [-3, 2, -1.5, 3, -2, 1.5, -2.5, 2.5]
  const rotation = rotations[index % rotations.length]

  return (
    <div
      className="perspective-[1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      aria-label={isFlipped ? `显示照片: ${alt}` : `显示描述: ${caption || alt}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsFlipped(!isFlipped) }}
    >
      <div
        className="relative w-full aspect-[3/4] transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? `rotateY(180deg) rotate(${rotation}deg)` : `rotate(${rotation}deg)`,
        }}
      >
        {/* Front side - photo */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-card p-2 pb-10 rounded-lg">
            <div className="relative w-full h-full rounded overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </div>
          {/* Tape effect */}
          <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-12 h-5 bg-secondary/80 rotate-[-2deg]" />
        </div>

        {/* Back side - caption */}
        <div
          className="absolute inset-0 rounded-lg overflow-hidden shadow-lg flex items-center justify-center p-6 bg-card"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center">
            <p className="text-base leading-relaxed text-foreground">
              {caption || "\u70b9\u51fb\u7ffb\u8f6c\u67e5\u770b\u7167\u7247"}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              {"\u70b9\u51fb\u7ffb\u56de"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
