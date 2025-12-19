"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { AppointmentModal } from "./appointment-booking-modal"

interface ModalWrapperProps {
  isOpen: boolean
  onClose: () => void
}

export function AppointmentModalWrapper({
  isOpen,
  onClose,
}: ModalWrapperProps) {
  /* ============================
     BODY SCROLL LOCK (NO JUMP)
  ============================ */
  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY

    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.width = "100%"

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.width = ""

      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  /* ============================
     BLUR + DISABLE APP ROOT
  ============================ */
  useEffect(() => {
    const appRoot = document.getElementById("app-root")
    if (!appRoot) return

    if (isOpen) {
      appRoot.classList.add("modal-active")
    } else {
      appRoot.classList.remove("modal-active")
    }

    return () => {
      appRoot.classList.remove("modal-active")
    }
  }, [isOpen])

  if (!isOpen) return null

  /* ============================
     PORTAL RENDER
  ============================ */
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-6xl max-h-[85vh] bg-[var(--theme-dark-base)] border border-[var(--theme-border)]/30 rounded-2xl shadow-2xl flex flex-col md:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 hover:bg-[var(--primary)]/60 text-white cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-[var(--theme-border)]/30 shrink-0">
          <h2 className="lg:text-2xl text-xl font-bold text-white">
            Schedule Your Free Security Assessment
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AppointmentModal onClose={onClose} />
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  )
}
