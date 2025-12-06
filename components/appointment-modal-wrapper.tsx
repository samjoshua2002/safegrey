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
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Dark overlay with blur - covers ENTIRE screen */}
      <div 
        className="fixed inset-0 bg-black backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal container - centered with proper spacing */}
      <div className="relative min-h-screen flex items-center justify-center mt-8 p-4 sm:p-6 lg:p-8">
        {/* Modal content */}
        <div 
          className="relative w-full max-w-7xl bg-[var(--theme-dark-base)] border border-[var(--theme-border)]/30 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors backdrop-blur-sm shadow-lg"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Header - Now inside the modal, not blurred */}
          <div className="p-6 bg-[var(--theme-dark-base)] border-b border-[var(--theme-border)]/30">
            <h2 className="text-xl md:text-3xl font-bold text-[var(--foreground)] text-center">
              Schedule Your Free Security Assessment
            </h2>
            <p className="text-center text-[var(--muted-foreground)] mt-2 text-sm">
              Book a 30-minute consultation with our security experts to assess your needs
            </p>
          </div>
          
          {/* Main content */}
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <AppointmentModal onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  )
}