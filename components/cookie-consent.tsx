"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show banner after a short delay for better UX
            setTimeout(() => setShowBanner(true), 1000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem("cookie-consent", "rejected");
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-[100] w-[95%] max-w-md"
                >
                    <div className="relative bg-[var(--theme-dark-secondary)]/95 backdrop-blur-md border border-[var(--theme-border)] rounded-xl shadow-2xl p-6">
                        {/* Accent glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--theme-accent)]/5 via-transparent to-[var(--theme-accent)]/5 rounded-xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={handleReject}
                            className="absolute top-4 right-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-start gap-4">
                            {/* Cookie Icon */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/20 flex items-center justify-center">
                                <Cookie className="w-6 h-6 text-[var(--theme-accent)]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pr-6">
                                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                                    Cookie Preferences
                                </h3>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                                    We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content.
                                    By clicking "Accept", you consent to our use of cookies. You can manage your preferences at any time.
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="px-6 py-2.5 bg-[var(--theme-accent)] text-white font-medium rounded-lg 
                                                 hover:bg-[var(--theme-accent)]/90 transition-all duration-200
                                                 shadow-lg shadow-[var(--theme-accent)]/20 hover:shadow-[var(--theme-accent)]/30
                                                 hover:scale-105 active:scale-95"
                                    >
                                        Accept All
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        className="px-6 py-2.5 border border-[var(--theme-border)] text-[var(--foreground)] 
                                                 font-medium rounded-lg hover:border-[var(--theme-accent)]/50 
                                                 hover:bg-[var(--theme-accent)]/5 transition-all duration-200
                                                 hover:scale-105 active:scale-95"
                                    >
                                        Reject All
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
