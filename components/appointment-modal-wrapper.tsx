// components/appointment-modal-wrapper.tsx
"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { AppointmentModal } from "./appointment-booking-modal"

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
}

export function AppointmentModalWrapper({ isOpen, onClose }: ModalWrapperProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Add a class to body to prevent scrolling
      document.body.classList.add('modal-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container - Reduced height, no outer overflow */}
      <div
        className="relative w-full max-w-6xl h-auto max-h-[85vh] bg-[var(--theme-dark-base)] border border-[var(--theme-border)]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-md border border-white/10"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header - Compact */}
        <div className="p-6 bg-gradient-to-r   border-b border-[var(--theme-border)]/30 shrink-0 relative z-10 text-left">
          <h2 className="text-2xl font-bold bg-clip-text text-white">
            Schedule Your Free Security Assessment
          </h2>
         
        </div>

        {/* Main content - Scrollable only inside */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[var(--theme-dark-base)]">
          <AppointmentModal onClose={onClose} />
        </div>
      </div>
    </div>
  )
}