"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Video,
  Calendar,
  Sparkles,
  CheckCircle,
  Check,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Step = "select-date" | "select-time" | "fill-details";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const TIME_SLOTS = [
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
];
const TIMEZONES = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "Europe/London", label: "Europe/London" },
];

interface BookingSchedulerProps {
  onClose?: () => void;
}

export function AppointmentModal({ onClose }: BookingSchedulerProps) {
  const [step, setStep] = useState<Step>("select-date");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const getDaysInMonth = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const days: (number | null)[] = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, []);

  const isDateSelectable = useCallback((day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()

    // Reset both dates to midnight for accurate comparison
    const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const dayOfWeek = date.getDay()
    const isToday = dateMidnight.getTime() === todayMidnight.getTime()

    // Always allow today, for future dates exclude weekends
    return isToday || (dateMidnight > todayMidnight && dayOfWeek !== 0 && dayOfWeek !== 6)
  }, [currentMonth])

  const handleDateSelect = useCallback(async (day: number) => {
    if (isAnimating) return

    if (!isDateSelectable(day)) return

    setIsAnimating(true)
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date)

    // Fetch booked slots for the selected date
    try {
      const response = await fetch(`/api/booked-slots?date=${date.toISOString()}`);
      if (response.ok) {
        const data = await response.json();
        setBookedSlots(data.bookedSlots || []);
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      setBookedSlots([]);
    }

    setTimeout(() => {
      setStep("select-time")
      setIsAnimating(false)
    }, 300)
  }, [currentMonth, isAnimating, isDateSelectable])

  const handleTimeSelect = useCallback(
    (time: string) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setSelectedTime(time);
      setTimeout(() => setIsAnimating(false), 200);
    },
    [isAnimating]
  );

  const handleNext = useCallback(() => {
    if (selectedTime && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep("fill-details");
        setIsAnimating(false);
      }, 400);
    }
  }, [selectedTime, isAnimating]);

  const handleBack = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      if (step === "fill-details") setStep("select-time");
      else if (step === "select-time") {
        setStep("select-date");
        setSelectedTime(null);
      }
      setIsAnimating(false);
    }, 300);
  }, [step, isAnimating]);

  const handleConfirm = useCallback(async () => {
    if (!selectedDate || !selectedTime) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate.toISOString(),
          time: selectedTime,
          timezone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to book appointment");
      }

      setIsSubmitted(true);
      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, selectedTime, timezone, formData]);

  const formatSelectedDate = useCallback(() => {
    if (!selectedDate) return "";
    return selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  const getTimeRange = useCallback(() => {
    if (!selectedTime) return "";
    const [time, period] = selectedTime.split(/(?=[ap]m)/i);
    const [hours, minutes] = time.split(":").map(Number);
    let endHours = hours;
    let endMinutes = minutes + 30;
    if (endMinutes >= 60) {
      endMinutes -= 60;
      endHours += 1;
    }
    const endPeriod = endHours >= 12 ? "pm" : period;
    if (endHours > 12) endHours -= 12;
    return `${selectedTime} – ${endHours}:${endMinutes
      .toString()
      .padStart(2, "0")}${endPeriod}`;
  }, [selectedTime]);

  const prevMonth = useCallback(() => {
    if (isAnimating) return;
    const today = new Date();
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setIsAnimating(true);
      setCurrentMonth(newMonth);
      setTimeout(() => setIsAnimating(false), 200);
    }
  }, [currentMonth, isAnimating]);

  const nextMonth = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
    setTimeout(() => setIsAnimating(false), 200);
  }, [currentMonth, isAnimating]);

  const [glowingIndex, setGlowingIndex] = useState<number | null>(null);

  // Helper function to check if a time slot is in the past
  const isTimePast = useCallback((timeSlot: string) => {
    if (!selectedDate) return false;

    const now = new Date();
    const selectedDateMidnight = new Date(selectedDate);
    selectedDateMidnight.setHours(0, 0, 0, 0);
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);

    // If selected date is in the future, no times are past
    if (selectedDateMidnight > todayMidnight) return false;

    // If selected date is in the past, all times are past
    if (selectedDateMidnight < todayMidnight) return true;

    // If selected date is today, check the time
    const [time, period] = timeSlot.split(/(?=[ap]m)/i);
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;

    if (period.toLowerCase() === 'pm' && hours !== 12) hour24 += 12;
    if (period.toLowerCase() === 'am' && hours === 12) hour24 = 0;

    const slotTime = new Date(selectedDate);
    slotTime.setHours(hour24, minutes, 0, 0);

    return slotTime < now;
  }, [selectedDate]);

  // Helper function to check if a time slot is available
  const isTimeAvailable = useCallback((timeSlot: string) => {
    return !bookedSlots.includes(timeSlot) && !isTimePast(timeSlot);
  }, [bookedSlots, isTimePast]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TIME_SLOTS.length);
      setGlowingIndex(randomIndex);
      setTimeout(() => setGlowingIndex(null), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pb-4 mt-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center items-center h-full py-10"
            >
              <Card className="border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/50 backdrop-blur-sm glow-accent max-w-sm w-full mx-auto">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-[var(--theme-accent)] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-[var(--foreground)]">
                    Assessment Scheduled!
                  </h3>
                  <p className="text-base text-[var(--muted-foreground)] mb-6">
                    Your free security assessment has been scheduled. Our experts will contact you shortly.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setStep("select-date");
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setFormData({
                          name: "",
                          email: "",
                          topic: "",
                          notes: "",
                        });
                      }}
                      variant="outline"
                      className="glass-effect w-full h-10 text-sm bg-transparent border-[var(--theme-accent)] text-[var(--foreground)] hover:bg-[var(--theme-accent)]/10"
                    >
                      Schedule Another
                    </Button>
                    {onClose && (
                      <Button
                        onClick={onClose}
                        className="w-full h-10 text-sm bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)] hover:from-[var(--primary)]/90 hover:to-[var(--theme-accent)]/90 text-[var(--foreground)]"
                      >
                        Close
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="w-full h-full">
              {step === "fill-details" ? (
                <div className="grid md:grid-cols-2 w-full h-full">
                  {/* Sidebar */}
                  <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-[var(--theme-dark-base)]/30 to-[var(--theme-dark-base)]/10 border-b md:border-b-0 md:border-r border-[var(--theme-border)]/30">
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-4"
                    >
                      <Avatar className="h-14 w-14 ring-2 ring-[var(--theme-accent)]/30 ring-offset-2 ring-offset-[var(--theme-dark-base)]">
                        <AvatarImage src="/professional-man-avatar.png" />
                        <AvatarFallback className="text-lg bg-gradient-to-br from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] font-bold">
                          {formData.name
                            ? formData.name.charAt(0).toUpperCase()
                            : "JO"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[var(--muted-foreground)] text-sm">
                          {formData.name || "Your Name"}
                        </p>
                        <h2 className="text-xl font-bold text-[var(--foreground)] mt-0.5">
                          Security Assessment
                        </h2>
                      </div>
                    </motion.div>

                    <div className="space-y-4">
                      <motion.div
                        className="flex items-center gap-4 p-4 rounded-xl bg-[var(--theme-dark-base)]/30 border border-[var(--theme-border)]/30"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="p-2.5 rounded-lg bg-[var(--primary)]/10">
                          <Calendar className="h-5 w-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <div className="font-semibold text-base text-[var(--foreground)]">
                            {formatSelectedDate()}
                          </div>
                          <div className="text-[var(--muted-foreground)] text-sm">
                            {getTimeRange()}
                          </div>
                        </div>
                      </motion.div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                          <Clock className="h-4 w-4 text-[var(--primary)]" />
                          <span>30 minute session</span>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                          <Video className="h-4 w-4 text-[var(--primary)]" />
                          <span>Google Meet Video Call</span>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                          <Globe className="h-4 w-4 text-[var(--primary)]" />
                          <span>{timezone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="p-6 md:p-8 space-y-4 bg-[var(--theme-dark-base)]">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="name"
                          className="text-[var(--foreground)] text-sm flex items-center gap-1.5"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]"></span>
                          Your name <span className="text-[var(--primary)]">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="h-10 text-sm glass-effect bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 px-3"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="email"
                          className="text-[var(--foreground)] text-sm flex items-center gap-1.5"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]"></span>
                          Email address <span className="text-[var(--primary)]">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          required
                          className="h-10 text-sm glass-effect bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 px-3"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="topic"
                          className="text-[var(--foreground)] text-sm flex items-center gap-1.5"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]"></span>
                          Assessment Focus <span className="text-[var(--primary)]">*</span>
                        </Label>
                        <Input
                          id="topic"
                          value={formData.topic}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              topic: e.target.value,
                            })
                          }
                          required
                          placeholder="e.g., Network Security"
                          className="h-10 text-sm glass-effect bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 px-3"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="notes"
                          className="text-[var(--foreground)] text-sm flex items-center gap-1.5"
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
                          Additional Information
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Anything else we should know?"
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              notes: e.target.value,
                            })
                          }
                          className="min-h-[80px] text-sm glass-effect bg-[var(--theme-dark-base)]/30 border-[var(--theme-border)]/50 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--theme-accent)] focus:ring-2 focus:ring-[var(--theme-accent)]/20 resize-none p-3"
                        />
                      </div>
                    </motion.div>

                    <div className="space-y-3 pt-4 border-t border-[var(--theme-border)]/30">
                      <div className="flex justify-between items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleBack}
                          className="h-10 text-sm text-[var(--foreground)] hover:bg-[var(--theme-dark-base)]/30 hover:text-[var(--primary)]"
                        >
                          ← Back
                        </Button>
                        <Button
                          onClick={handleConfirm}
                          size="sm"
                          disabled={
                            !formData.name ||
                            !formData.email ||
                            !formData.topic ||
                            isLoading
                          }
                          className="relative h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)] hover:from-[var(--primary)]/90 hover:to-[var(--theme-accent)]/90 text-[var(--foreground)] text-sm font-semibold px-6 shadow-md shadow-[var(--primary)]/20 transition-all group"
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                          )}
                          {isLoading ? "Booking..." : "Confirm Booking"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-[300px_1fr] w-full h-full">
                  {/* Host Panel */}
                  <div className="p-6 md:p-8 space-y-6 bg-gradient-to-br from-[var(--theme-dark-base)]/30 to-[var(--theme-dark-base)]/10 border-b md:border-b-0 md:border-r border-[var(--theme-border)]/30">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 ring-2 ring-[var(--theme-accent)]/30 ring-offset-2 ring-offset-[var(--theme-dark-base)]">
                          <AvatarImage src="/professional-man-avatar.png" />
                          <AvatarFallback className="text-lg bg-gradient-to-br from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] font-bold">
                            SJ
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[var(--muted-foreground)] text-sm font-medium">
                            Security Expert
                          </p>
                          <h2 className="text-xl font-bold text-[var(--foreground)] leading-tight mt-0.5">
                            Free Assessment
                          </h2>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                          <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                            <Clock className="h-4 w-4 text-[var(--primary)]" />
                          </div>
                          <span>30 minute session</span>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                          <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                            <Video className="h-4 w-4 text-[var(--primary)]" />
                          </div>
                          <span>Google Meet Call</span>
                        </div>
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)] text-sm">
                          <div className="p-2 rounded-lg bg-[var(--primary)]/10">
                            <Globe className="h-4 w-4 text-[var(--primary)]" />
                          </div>
                          <Select
                            value={timezone}
                            onValueChange={setTimezone}
                          >
                            <SelectTrigger className="h-8 text-xs p-0 border-0 shadow-none bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] focus:ring-0 w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] p-1">
                              {TIMEZONES.map((tz) => (
                                <SelectItem
                                  key={tz.value}
                                  value={tz.value}
                                  className="text-xs py-1.5 hover:bg-[var(--theme-dark-base)] cursor-pointer"
                                >
                                  {tz.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Combined Calendar & Time Panel */}
                  <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 bg-[var(--theme-dark-base)]">

                    {/* Calendar Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[var(--foreground)]">
                          {MONTHS[currentMonth.getMonth()]}{" "}
                          <span className="text-[var(--primary)]">
                            {currentMonth.getFullYear()}
                          </span>
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-[var(--theme-dark-base)]/30 hover:text-[var(--primary)]"
                            onClick={prevMonth}
                            disabled={isAnimating}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-[var(--theme-dark-base)]/30 hover:text-[var(--primary)]"
                            onClick={nextMonth}
                            disabled={isAnimating}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-2">
                        {DAYS.map((day) => (
                          <div key={day} className="text-center py-1">
                            <span className="text-[10px] font-semibold text-[var(--muted-foreground)] tracking-wider">
                              {day.slice(0, 3)}
                            </span>
                          </div>
                        ))}
                        {getDaysInMonth(currentMonth).map((day, index) => {
                          if (day === null)
                            return (
                              <div key={`empty-${index}`} className="h-10" />
                            );
                          const isSelectable = isDateSelectable(day)
                          const isToday =
                            day === todayDay &&
                            currentMonth.getMonth() === todayMonth &&
                            currentMonth.getFullYear() === todayYear;
                          const isSelected =
                            selectedDate &&
                            selectedDate.getDate() === day &&
                            selectedDate.getMonth() ===
                            currentMonth.getMonth() &&
                            selectedDate.getFullYear() ===
                            currentMonth.getFullYear();

                          return (
                            <motion.button
                              key={day}
                              onClick={() => handleDateSelect(day)}
                              disabled={!isSelectable}
                              whileHover={isSelectable ? { scale: 1.1, zIndex: 10 } : {}}
                              whileTap={isSelectable ? { scale: 0.95 } : {}}
                              className={cn(
                                "relative h-10 w-full rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center border border-transparent",
                                isSelected
                                  ? "bg-gradient-to-br from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] shadow-md shadow-[var(--primary)]/30"
                                  : isToday
                                    ? "bg-[var(--theme-dark-base)]/50 text-[var(--foreground)] ring-1 ring-[var(--primary)]/40"
                                    : isSelectable
                                      ? "text-[var(--foreground)] hover:bg-[var(--theme-dark-base)]/50 hover:border-[var(--theme-border)]/50"
                                      : "text-[var(--muted-foreground)]/20 cursor-not-allowed"
                              )}
                            >
                              {day}
                              {isToday && !isSelected && (
                                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--primary)]" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Section */}
                    <div className="border-t lg:border-t-0 lg:border-l border-[var(--theme-border)]/30 pt-6 lg:pt-0 lg:pl-6">
                      {selectedDate ? (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4 h-full flex flex-col"
                        >
                          <div className="font-bold text-[var(--foreground)] text-sm mb-1">
                            Available times for <span className="text-[var(--theme-accent)]">{selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                          </div>

                          <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar px-2 sm:px-3 md:px-4 lg:px-1">
                            {TIME_SLOTS.map((time, index) => {
                              const isBooked = bookedSlots.includes(time);
                              const isPast = isTimePast(time);
                              const isAvailable = isTimeAvailable(time);

                              return (
                                <motion.button
                                  key={time}
                                  onClick={() => isAvailable && handleTimeSelect(time)}
                                  disabled={!isAvailable}
                                  whileHover={isAvailable ? { scale: 1.02 } : {}}
                                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                                  className={cn(
                                    "relative w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 border flex items-center justify-between group",
                                    selectedTime === time
                                      ? "border-[var(--theme-accent)] bg-gradient-to-r from-[var(--primary)]/20 to-[var(--theme-accent)]/20 text-[var(--foreground)]"
                                      : !isAvailable
                                        ? "border-[var(--theme-border)]/20 bg-[var(--theme-dark-base)]/20 text-[var(--muted-foreground)]/40 cursor-not-allowed"
                                        : "border-[var(--theme-border)]/30 hover:border-[var(--theme-accent)]/30 text-[var(--foreground)] hover:bg-[var(--theme-dark-base)]/30"
                                  )}
                                >
                                  {glowingIndex === index && !selectedTime && isAvailable && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="absolute inset-0 bg-[var(--theme-accent)]/5 rounded-lg"
                                    />
                                  )}
                                  <span className={!isAvailable ? "line-through" : ""}>{time}</span>
                                  {selectedTime === time ? (
                                    <Check className="h-4 w-4 text-[var(--theme-accent)]" />
                                  ) : isBooked ? (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 border border-red-500/30">
                                      Booked
                                    </span>
                                  ) : isPast ? (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-500 border border-gray-500/30">
                                      Past
                                    </span>
                                  ) : (
                                    <ChevronRight className="h-3 w-3 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100 transition-opacity" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>

                          {selectedTime && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="pt-2"
                            >
                              <Button
                                onClick={handleNext}
                                className="w-full h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)] text-[var(--foreground)] text-sm font-semibold shadow-md shadow-[var(--primary)]/20 transition-all"
                              >
                                Continue →
                              </Button>
                            </motion.div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-[var(--muted-foreground)] rounded-xl bg-[var(--theme-dark-base)]/20 border border-dashed border-[var(--theme-border)]/30 p-6">
                          <Clock className="h-8 w-8 opacity-20" />
                          <p className="text-sm max-w-[150px]">
                            Select a date to view times
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Steps */}
      <div className="flex justify-center items-center gap-2 mt-4 shrink-0">
        {(["select-date", "select-time", "fill-details"] as Step[]).map(
          (s) => (
            <motion.div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                step === s
                  ? "w-8 bg-gradient-to-r from-[var(--primary)] to-[var(--theme-accent)]"
                  : "w-2 bg-[var(--theme-border)]"
              )}
            />
          )
        )}
      </div>
    </div>
  );
}
