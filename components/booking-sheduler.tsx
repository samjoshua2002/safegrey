"use client"

import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Clock, Globe, Video, Calendar, Users, Check, Sparkles, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Step = "select-date" | "select-time" | "fill-details"

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const TIME_SLOTS = ["5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm", "7:30pm", "8:00pm", "8:30pm", "9:00pm", "9:30pm", "10:00pm"]
const TIMEZONES = [
    { value: "Asia/Kolkata", label: "Asia/Kolkata" },
    { value: "America/New_York", label: "America/New_York" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles" },
    { value: "Europe/London", label: "Europe/London" },
]

export function BookingScheduler() {
    const [step, setStep] = useState<Step>("select-date")
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [timezone, setTimezone] = useState("Asia/Kolkata")
    const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("12h")
    const [formData, setFormData] = useState({ name: "", email: "", topic: "", notes: "" })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const getDaysInMonth = useCallback((date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDay = firstDay.getDay()
        const days: (number | null)[] = []
        for (let i = 0; i < startingDay; i++) days.push(null)
        for (let i = 1; i <= daysInMonth; i++) days.push(i)
        return days
    }, [])

    const isDateSelectable = useCallback((day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const dayOfWeek = date.getDay()
        return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6
    }, [currentMonth])

    const handleDateSelect = useCallback((day: number) => {
        if (!isDateSelectable(day) || isAnimating) return
        setIsAnimating(true)
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        setSelectedDate(date)
        setTimeout(() => {
            // If just selecting date and not yet selected time, stay on view to pick time
            // In the 3-column layout, we don't need to "switch steps" like mobile
            // But we do need to update state to show time slots
            if (step === "select-date") {
                setStep("select-date") // Keep in this view/step but now time slots are visible
            }
            setIsAnimating(false)
        }, 300)
    }, [currentMonth, isDateSelectable, isAnimating, step])

    const handleTimeSelect = useCallback((time: string) => {
        if (isAnimating) return
        setIsAnimating(true)
        setSelectedTime(time)
        setTimeout(() => setIsAnimating(false), 200)
    }, [isAnimating])

    const handleNext = useCallback(() => {
        if (selectedTime && !isAnimating) {
            setIsAnimating(true)
            setTimeout(() => {
                setStep("fill-details")
                setIsAnimating(false)
            }, 400)
        }
    }, [selectedTime, isAnimating])

    const handleBack = useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)
        setTimeout(() => {
            if (step === "fill-details") setStep("select-time")
            else if (step === "select-time") { setStep("select-date"); setSelectedTime(null) }
            setIsAnimating(false)
        }, 300)
    }, [step, isAnimating])

    const handleConfirm = useCallback(() => {
        console.log({ date: selectedDate, time: selectedTime, timezone, ...formData })
        setIsSubmitted(true)
    }, [selectedDate, selectedTime, timezone, formData])

    const formatSelectedDate = useCallback(() => {
        if (!selectedDate) return ""
        return selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    }, [selectedDate])

    const getTimeRange = useCallback(() => {
        if (!selectedTime) return ""
        const [time, period] = selectedTime.split(/(?=[ap]m)/i)
        const [hours, minutes] = time.split(":").map(Number)
        let endHours = hours
        let endMinutes = minutes + 30
        if (endMinutes >= 60) { endMinutes -= 60; endHours += 1 }
        const endPeriod = endHours >= 12 ? "pm" : period
        if (endHours > 12) endHours -= 12
        return `${selectedTime} – ${endHours}:${endMinutes.toString().padStart(2, "0")}${endPeriod}`
    }, [selectedTime])

    const prevMonth = useCallback(() => {
        if (isAnimating) return
        const today = new Date()
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
            setIsAnimating(true)
            setCurrentMonth(newMonth)
            setTimeout(() => setIsAnimating(false), 200)
        }
    }, [currentMonth, isAnimating])

    const nextMonth = useCallback(() => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
        setTimeout(() => setIsAnimating(false), 200)
    }, [currentMonth, isAnimating])

    // Add glowing effect for current time slot
    const [glowingIndex, setGlowingIndex] = useState<number | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * TIME_SLOTS.length)
            setGlowingIndex(randomIndex)
            setTimeout(() => setGlowingIndex(null), 1000)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent)]/5 via-transparent to-transparent" />
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--theme-accent)]/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 15, repeat: Infinity }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4 bg-clip-text text-transparent bg-white">
                            Schedule Your Free Consultation
                        </h1>

                    </motion.div>
                </div>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex justify-center items-center py-20"
                                >
                                    <Card className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 backdrop-blur-sm glow-accent max-w-md w-full mx-auto">
                                        <CardContent className="p-12 text-center">
                                            <CheckCircle className="w-16 h-16 text-[var(--theme-accent)] mx-auto mb-6" />
                                            <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Thank You!</h3>
                                            <p className="text-[var(--muted-foreground)] mb-6">
                                                We've received your message and will get back to you within 24 hours. Our security experts are reviewing
                                                your requirements.
                                            </p>
                                            <Button
                                                onClick={() => {
                                                    setIsSubmitted(false)
                                                    setStep("select-date")
                                                    setSelectedDate(null)
                                                    setSelectedTime(null)
                                                    setFormData({ name: "", email: "", topic: "", notes: "" })
                                                }}
                                                variant="outline"
                                                className="glass-effect bg-transparent border-[var(--theme-accent)] text-[var(--foreground)] hover:bg-[var(--theme-accent)]/10"
                                            >
                                                Send Another Message
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <div className="glass-effect rounded-3xl border border-[var(--theme-border)]/30 overflow-hidden shadow-2xl">
                                    <div className="relative z-10">
                                        {step === "fill-details" ? (
                                            <div className="grid md:grid-cols-2">
                                                <div className="p-8 space-y-6 bg-gradient-to-br from-[var(--theme-dark-base)]/30 to-[var(--theme-dark-base)]/10 border-b md:border-b-0 md:border-r border-[var(--theme-border)]/30">
                                                    <motion.div
                                                        initial={{ scale: 0.9 }}
                                                        animate={{ scale: 1 }}
                                                        className="flex items-center gap-4"
                                                    >
                                                        <Avatar className="h-14 w-14 ring-3 ring-[var(--theme-accent)]/30 ring-offset-2 ring-offset-[var(--theme-dark-base)]">
                                                            <AvatarImage src="/professional-man-avatar.png" />
                                                            <AvatarFallback className="bg-gradient-to-br from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] text-lg font-bold">
                                                                {formData.name ? formData.name.charAt(0).toUpperCase() : "JO"}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-[var(--muted-foreground)] text-sm">{formData.name || "Your Name"}</p>
                                                            <h2 className="text-2xl font-bold text-[var(--foreground)]">30 Min Meeting</h2>
                                                        </div>
                                                    </motion.div>

                                                    <div className="space-y-4">
                                                        <motion.div
                                                            className="flex items-center gap-3 p-4 rounded-xl bg-[var(--theme-dark-base)]/30 border border-[var(--theme-border)]/30"
                                                            whileHover={{ scale: 1.02 }}
                                                        >
                                                            <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                <Calendar className="h-5 w-5 text-[var(--primary)]" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-[var(--foreground)]">{formatSelectedDate()}</div>
                                                                <div className="text-sm text-[var(--muted-foreground)]">{getTimeRange()}</div>
                                                            </div>
                                                        </motion.div>

                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                    <Clock className="h-5 w-5 text-[var(--primary)]" />
                                                                </div>
                                                                <span>30 minutes</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                    <Video className="h-5 w-5 text-[var(--primary)]" />
                                                                </div>
                                                                <span>Google Meet Video Call</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                    <Globe className="h-5 w-5 text-[var(--primary)]" />
                                                                </div>
                                                                <span>{timezone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-8 space-y-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="space-y-4"
                                                    >
                                                        <div className="space-y-2">
                                                            <Label htmlFor="name" className="text-[var(--foreground)] flex items-center gap-2">
                                                                <span className="inline-block w-2 h-2 rounded-full bg-[var(--theme-accent)]"></span>
                                                                Your name <span className="text-[var(--primary)]">*</span>
                                                            </Label>
                                                            <Input
                                                                id="name"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                required
                                                                className="glass-effect h-12 bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="email" className="text-[var(--foreground)] flex items-center gap-2">
                                                                <span className="inline-block w-2 h-2 rounded-full bg-[var(--theme-accent)]"></span>
                                                                Email address <span className="text-[var(--primary)]">*</span>
                                                            </Label>
                                                            <Input
                                                                id="email"
                                                                type="email"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                required
                                                                className="glass-effect h-12 bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="topic" className="text-[var(--foreground)] flex items-center gap-2">
                                                                <span className="inline-block w-2 h-2 rounded-full bg-[var(--theme-accent)]"></span>
                                                                What is this meeting about? <span className="text-[var(--primary)]">*</span>
                                                            </Label>
                                                            <Input
                                                                id="topic"
                                                                value={formData.topic}
                                                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                                                required
                                                                className="glass-effect h-12 bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 transition-all"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="notes" className="text-[var(--foreground)] flex items-center gap-2">
                                                                <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                                                                Additional notes
                                                            </Label>
                                                            <Textarea
                                                                id="notes"
                                                                placeholder="Please share anything that will help prepare for our meeting."
                                                                value={formData.notes}
                                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                                className="min-h-[120px] glass-effect bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 transition-all resize-none"
                                                            />
                                                        </div>
                                                    </motion.div>

                                                    <div className="space-y-4 pt-4 border-t border-[var(--theme-border)]/30">
                                                        <button className="flex items-center gap-3 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group">
                                                            <div className="p-2 rounded-lg bg-[var(--theme-dark-base)]/30 group-hover:bg-[var(--primary)]/10 transition-colors">
                                                                <Users className="h-4 w-4" />
                                                            </div>
                                                            Add guests
                                                        </button>
                                                        <p className="text-xs text-[var(--muted-foreground)]">
                                                            By proceeding, you agree to our{" "}
                                                            <a href="/terms" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">Terms</a>{" "}
                                                            and{" "}
                                                            <a href="/privacy" className="font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">Privacy Policy</a>.
                                                        </p>
                                                        <div className="flex justify-between items-center gap-3 pt-2">
                                                            <Button
                                                                variant="ghost"
                                                                onClick={handleBack}
                                                                className="text-[var(--foreground)] hover:bg-[var(--theme-dark-base)]/30 hover:text-[var(--primary)] transition-all"
                                                            >
                                                                ← Back
                                                            </Button>
                                                            <Button
                                                                onClick={handleConfirm}
                                                                disabled={!formData.name || !formData.email || !formData.topic}
                                                                className="relative bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)] hover:from-[var(--primary)]/90 hover:to-[var(--theme-accent)]/90 text-[var(--foreground)] font-semibold px-8 h-12 shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/30 transition-all group"
                                                            >
                                                                <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                                                                Confirm Booking
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid lg:grid-cols-4">
                                                {/* Host Info Panel */}
                                                <div className="p-8 space-y-6 bg-gradient-to-br from-[var(--theme-dark-base)]/30 to-[var(--theme-dark-base)]/10 border-b lg:border-b-0 lg:border-r border-[var(--theme-border)]/30">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className="space-y-4"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <Avatar className="h-16 w-16 ring-3 ring-[var(--theme-accent)]/30 ring-offset-2 ring-offset-[var(--theme-dark-base)]">
                                                                <AvatarImage src="/professional-man-avatar.png" />
                                                                <AvatarFallback className="bg-gradient-to-br from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] text-xl font-bold">
                                                                    JO
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="text-[var(--muted-foreground)]">Joel Aviad Ossi</p>
                                                                <h2 className="text-2xl font-bold text-[var(--foreground)]">30 Min Meeting</h2>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                    <Clock className="h-5 w-5 text-[var(--primary)]" />
                                                                </div>
                                                                <span>30 minutes</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                    <Video className="h-5 w-5 text-[var(--primary)]" />
                                                                </div>
                                                                <span>Google Meet Video Call</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                                                <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                                                                    <Globe className="h-5 w-5 text-[var(--primary)]" />
                                                                </div>
                                                                <Select value={timezone} onValueChange={setTimezone}>
                                                                    <SelectTrigger className="h-auto p-0 border-0 shadow-none bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] focus:ring-0">
                                                                        <SelectValue />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)]">
                                                                        {TIMEZONES.map((tz) => (
                                                                            <SelectItem key={tz.value} value={tz.value} className="hover:bg-[var(--theme-dark-base)]">
                                                                                {tz.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* Calendar Panel - Bigger */}
                                                <div className="p-8 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-[var(--theme-border)]/30">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="space-y-6"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <h3 className="text-2xl font-bold text-[var(--foreground)]">
                                                                    {MONTHS[currentMonth.getMonth()]}{" "}
                                                                    <span className="text-[var(--primary)]">{currentMonth.getFullYear()}</span>
                                                                </h3>
                                                                <div className="flex gap-1">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-9 w-9 hover:bg-[var(--theme-dark-base)]/30 hover:text-[var(--primary)] transition-all"
                                                                        onClick={prevMonth}
                                                                        disabled={isAnimating}
                                                                    >
                                                                        <ChevronLeft className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-9 w-9 hover:bg-[var(--theme-dark-base)]/30 hover:text-[var(--primary)] transition-all"
                                                                        onClick={nextMonth}
                                                                        disabled={isAnimating}
                                                                    >
                                                                        <ChevronRight className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Big Calendar Grid */}
                                                        <div className="grid grid-cols-7 gap-3">
                                                            {DAYS.map((day) => (
                                                                <div key={day} className="text-center py-3">
                                                                    <span className="text-xs font-semibold text-[var(--muted-foreground)] tracking-wider">
                                                                        {day}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                            {getDaysInMonth(currentMonth).map((day, index) => {
                                                                if (day === null) return <div key={`empty-${index}`} className="h-16" />
                                                                const isSelectable = isDateSelectable(day)
                                                                const isToday = day === new Date().getDate() &&
                                                                    currentMonth.getMonth() === new Date().getMonth() &&
                                                                    currentMonth.getFullYear() === new Date().getFullYear()
                                                                const isSelected = selectedDate &&
                                                                    selectedDate.getDate() === day &&
                                                                    selectedDate.getMonth() === currentMonth.getMonth() &&
                                                                    selectedDate.getFullYear() === currentMonth.getFullYear()

                                                                return (
                                                                    <motion.button
                                                                        key={day}
                                                                        onClick={() => handleDateSelect(day)}
                                                                        disabled={!isSelectable}
                                                                        whileHover={isSelectable ? { scale: 1.05 } : {}}
                                                                        whileTap={isSelectable ? { scale: 0.95 } : {}}
                                                                        className={cn(
                                                                            "relative h-16 rounded-xl text-lg font-medium transition-all duration-200",
                                                                            isSelected
                                                                                ? "bg-gradient-to-br from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] shadow-lg shadow-[var(--primary)]/30"
                                                                                : isToday
                                                                                    ? "bg-[var(--theme-dark-base)]/50 text-[var(--foreground)] ring-2 ring-[var(--primary)]/30"
                                                                                    : isSelectable
                                                                                        ? "bg-[var(--theme-dark-base)]/30 text-[var(--foreground)] hover:bg-[var(--theme-dark-base)]/50 hover:ring-2 hover:ring-[var(--theme-accent)]/20"
                                                                                        : "text-[var(--muted-foreground)]/30 cursor-not-allowed"
                                                                        )}
                                                                    >
                                                                        {day}
                                                                        {isSelected && (
                                                                            <motion.div
                                                                                initial={{ scale: 0 }}
                                                                                animate={{ scale: 1 }}
                                                                                className="absolute -top-1 -right-1"
                                                                            >
                                                                                <div className="p-1 rounded-full bg-[var(--theme-accent)]">
                                                                                    <Check className="h-3 w-3 text-[var(--foreground)]" />
                                                                                </div>
                                                                            </motion.div>
                                                                        )}
                                                                        {isToday && !isSelected && (
                                                                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                                                                        )}
                                                                    </motion.button>
                                                                )
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* Time Selection Panel */}
                                                <div className="p-8 lg:col-span-1">
                                                    {selectedDate ? (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            className="space-y-6 h-full flex flex-col"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="space-y-1">
                                                                    <div className="font-bold text-[var(--foreground)] text-lg">
                                                                        {selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
                                                                    </div>
                                                                    <div className="text-2xl font-bold text-[var(--primary)]">
                                                                        {selectedDate.getDate().toString().padStart(2, "0")}
                                                                    </div>
                                                                </div>
                                                                <div className="flex rounded-xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-dark-base)]/30">
                                                                    <button
                                                                        onClick={() => setTimeFormat("12h")}
                                                                        className={cn(
                                                                            "px-3 py-2 text-sm transition-all",
                                                                            timeFormat === "12h"
                                                                                ? "bg-[var(--primary)] text-[var(--foreground)]"
                                                                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                                                        )}
                                                                    >
                                                                        12h
                                                                    </button>
                                                                    <button
                                                                        onClick={() => setTimeFormat("24h")}
                                                                        className={cn(
                                                                            "px-3 py-2 text-sm transition-all",
                                                                            timeFormat === "24h"
                                                                                ? "bg-[var(--primary)] text-[var(--foreground)]"
                                                                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                                                        )}
                                                                    >
                                                                        24h
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2 flex-1 overflow-y-auto pr-2 max-h-[320px]">
                                                                {TIME_SLOTS.map((time, index) => (
                                                                    <motion.button
                                                                        key={time}
                                                                        onClick={() => handleTimeSelect(time)}
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        className={cn(
                                                                            "relative w-full py-4 px-4 rounded-xl border text-base font-medium transition-all duration-200",
                                                                            selectedTime === time
                                                                                ? "border-[var(--theme-accent)] bg-gradient-to-r from-[var(--primary)]/20 to-[var(--theme-accent)]/20 text-[var(--foreground)] shadow-lg shadow-[var(--primary)]/10"
                                                                                : "border-[var(--theme-border)]/50 hover:border-[var(--theme-accent)]/50 text-[var(--foreground)] hover:bg-[var(--theme-dark-base)]/30"
                                                                        )}
                                                                    >
                                                                        {glowingIndex === index && (
                                                                            <motion.div
                                                                                initial={{ opacity: 0, scale: 0.5 }}
                                                                                animate={{ opacity: 1, scale: 1 }}
                                                                                className="absolute inset-0 bg-[var(--theme-accent)]/10 rounded-xl blur-md"
                                                                            />
                                                                        )}
                                                                        {time}
                                                                        {selectedTime === time && (
                                                                            <motion.div
                                                                                initial={{ scale: 0 }}
                                                                                animate={{ scale: 1 }}
                                                                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                                            >
                                                                                <Check className="h-4 w-4 text-[var(--theme-accent)]" />
                                                                            </motion.div>
                                                                        )}
                                                                    </motion.button>
                                                                ))}
                                                            </div>

                                                            {selectedTime && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                >
                                                                    <Button
                                                                        onClick={handleNext}
                                                                        className="w-full h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)] hover:from-[var(--primary)]/90 hover:to-[var(--theme-accent)]/90 text-[var(--foreground)] font-semibold shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/30 transition-all"
                                                                    >
                                                                        Continue →
                                                                    </Button>
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                                            <div className="p-4 rounded-full bg-[var(--theme-dark-base)]/30">
                                                                <Calendar className="h-8 w-8 text-[var(--muted-foreground)]" />
                                                            </div>
                                                            <p className="text-[var(--muted-foreground)]">
                                                                Select a date to see available times
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    )}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Step Indicator */}
                    <div className="flex justify-center items-center gap-2 mt-8">
                        {(["select-date", "select-time", "fill-details"] as Step[]).map((s, index) => (
                            <motion.div
                                key={s}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    step === s
                                        ? "w-8 bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)]"
                                        : "w-2 bg-[var(--theme-border)]"
                                )}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}