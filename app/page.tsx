import PasswordProtect from './components/PasswordProtect';
"use client"

import { useState } from "react"
import { Envelope } from "@/components/envelope"
import { Fireworks } from "@/components/fireworks"
import { FloatingHearts } from "@/components/floating-hearts"
import { BlessingContent } from "@/components/blessing-content"

export default function BirthdayPage() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  const handleEnvelopeOpen = () => {
    setShowFireworks(true)
    setEnvelopeOpened(true)
    // Stop fireworks after 8 seconds
    setTimeout(() => setShowFireworks(false), 8000)
  }

    return (
        
            <PasswordProtect>
      {/* Envelope entrance */}
      {!envelopeOpened && <Envelope onOpen={handleEnvelopeOpen} />}

      {/* Fireworks overlay */}
      <Fireworks active={showFireworks} />

      {/* Floating hearts background */}
      {envelopeOpened && <FloatingHearts />}

      {/* Main content - hidden until envelope is opened */}
      {envelopeOpened && (
        <div
          className="animate-in fade-in duration-1000"
          style={{ animationDelay: "200ms", animationFillMode: "both" }}
        >
          <BlessingContent />
        </div>
      )}
            </PasswordProtect>
  )
}
