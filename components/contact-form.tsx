"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
import { Captcha } from "@/components/ui/captcha"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isCaptchaVerified) {
      setError("Please complete the security verification.")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      designation: formData.get("designation"),
      phone: formData.get("phone"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 backdrop-blur-sm glow-accent">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-[var(--theme-accent)] mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Thank You!</h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            We've received your message and will get back to you within 24 hours. Our security experts are reviewing
            your requirements.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="glass-effect bg-transparent border-[var(--theme-accent)] text-[var(--foreground)] hover:bg-[var(--theme-accent)]/10"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 backdrop-blur-sm hover:border-[var(--theme-accent)]/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-[var(--foreground)]">Get Your Free Security Assessment</CardTitle>
        <CardDescription className="text-base text-[var(--muted-foreground)]">
          Fill out the form below and our security experts will contact you to discuss your cybersecurity needs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-[var(--foreground)]">First Name *</Label>
              <Input name="firstName" id="firstName" placeholder="John" required className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-[var(--foreground)]">Last Name *</Label>
              <Input name="lastName" id="lastName" placeholder="Doe" required className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[var(--foreground)]">Work Email *</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="john@company.com"
              required
              className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[var(--foreground)]">Company Name</Label>
              <Input name="company" id="company" placeholder="Your Company" className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-[var(--foreground)]">Designation</Label>
              <Input name="designation" id="designation" placeholder="Job Title" className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[var(--foreground)]">Phone Number *</Label>
            <Input name="phone" id="phone" type="tel" placeholder="+1 (555) 123-4567" required className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]" />
          </div>

          <div className="space-y-4 pt-2">
            <Captcha onVerify={setIsCaptchaVerified} className="w-full" />
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 text-sm text-[var(--muted-foreground)] border-t border-[var(--theme-border)] pt-6">
            <p>
              By clicking here, you acknowledge that you have read and understood our <a href="/privacy" className="text-[var(--theme-accent)] hover:underline">Privacy Policy</a>, and you agree to be bound by its terms.
            </p>
            <p className="text-xs">
              Disclaimer: Please read these documents carefully before proceeding. Continued use of this website constitutes your agreement to all terms and conditions set forth therein.
            </p>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full glow-accent animate-pulse-glow group"
            style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}
            disabled={isLoading || !isCaptchaVerified}
          >
            {isLoading ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
