"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  src: string
  alt: string
}

interface PhotoCarouselProps {
  photos: Photo[]
}

export function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(next, 3500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  return (
    <div
      className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-xl bg-card"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative aspect-[4/3]">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "scale(1)" : "scale(1.05)",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 512px"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-colors"
        aria-label="上一张照片"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-card transition-colors"
        aria-label="下一张照片"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary-foreground w-6"
                : "bg-primary-foreground/50"
            }`}
            aria-label={`第 ${i + 1} 张照片`}
          />
        ))}
      </div>
    </div>
  )
}
