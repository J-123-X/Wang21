"use client"

import { useEffect, useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
}

export function Typewriter({ text, speed = 60, className = "" }: TypewriterProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.3)
  const [displayText, setDisplayText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isVisible && !started) {
      setStarted(true)
    }
  }, [isVisible, started])

  useEffect(() => {
    if (!started) return
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [started, text, speed])

  return (
    <div ref={ref} className={className}>
      <p className="text-lg md:text-xl leading-relaxed text-foreground">
        {displayText}
        {started && displayText.length < text.length && (
          <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
        )}
      </p>
    </div>
  )
}
