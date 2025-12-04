"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, User, Mail, FileText, CheckCircle, X, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AppointmentData {
  name: string;
  email: string;
  reason: string;
  description: string;
  date: string;
  time: string;
}

interface AppointmentBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentBookingModal({ isOpen, onClose }: AppointmentBookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("2025-12-05");
  const [selectedTime, setSelectedTime] = useState<string>("16:30");
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    name: "",
    email: "",
    reason: "",
    description: "",
    date: "2025-12-05",
    time: "16:30"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots
  const timeSlots = [
    "16:30", "17:00", "17:30", "18:00", 
    "18:30", "19:00", "19:30", "21:30"
  ];

  // Calendar data for December 2025
  const calendarDays = [
    { day: 1, enabled: true }, { day: 2, enabled: true }, { day: 3, enabled: true },
    { day: 4, enabled: true }, { day: 5, enabled: true }, { day: 6, enabled: true },
    { day: 7, enabled: true }, { day: 8, enabled: true }, { day: 9, enabled: true },
    { day: 10, enabled: true }, { day: 11, enabled: true }, { day: 12, enabled: true },
    { day: 13, enabled: true }, { day: 14, enabled: true }, { day: 15, enabled: true },
    { day: 16, enabled: true }, { day: 17, enabled: true }, { day: 18, enabled: true },
    { day: 19, enabled: true }, { day: 20, enabled: true }, { day: 21, enabled: true },
    { day: 22, enabled: true }, { day: 23, enabled: true }, { day: 24, enabled: true },
    { day: 25, enabled: true }, { day: 26, enabled: true }, { day: 27, enabled: true },
    { day: 28, enabled: true }, { day: 29, enabled: true }, { day: 30, enabled: true },
    { day: 31, enabled: true }
  ];

  const handleInputChange = (field: keyof AppointmentData, value: string) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (day: number) => {
    const date = `2025-12-${day.toString().padStart(2, '0')}`;
    setSelectedDate(date);
    setAppointmentData(prev => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setAppointmentData(prev => ({ ...prev, time }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select a date and time");
        return;
      }
    }
    if (step === 2) {
      if (!appointmentData.name || !appointmentData.email || !appointmentData.reason) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(appointmentData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare appointment data
      const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);
      
      // Send to your API endpoint
      const response = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...appointmentData,
          appointmentDateTime: appointmentDateTime.toISOString(),
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        // Generate Google Calendar link
        const googleCalendarLink = generateGoogleCalendarLink(appointmentData, appointmentDateTime);
        
        // Send confirmation email
        await sendConfirmationEmail(appointmentData, googleCalendarLink);
        
        // Send admin notification
        await sendAdminNotification(appointmentData);
        
        toast.success("Appointment booked successfully!");
        
        // Move to confirmation step
        setStep(4);
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateGoogleCalendarLink = (data: AppointmentData, dateTime: Date) => {
    const endDateTime = new Date(dateTime);
    endDateTime.setHours(endDateTime.getHours() + 1);
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Consultation: ${data.reason}`,
      details: `Name: ${data.name}\nEmail: ${data.email}\nReason: ${data.reason}\nDescription: ${data.description || 'No description provided'}`,
      location: 'Online Meeting',
      dates: `${dateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const sendConfirmationEmail = async (data: AppointmentData, calendarLink: string) => {
    try {
      await fetch('/api/email/confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, calendarLink })
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  };

  const sendAdminNotification = async (data: AppointmentData) => {
    try {
      await fetch('/api/email/admin-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate("2025-12-05");
    setSelectedTime("16:30");
    setAppointmentData({
      name: "",
      email: "",
      reason: "",
      description: "",
      date: "2025-12-05",
      time: "16:30"
    });
    onClose();
  };

  const addToGoogleCalendar = () => {
    const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const googleCalendarLink = generateGoogleCalendarLink(appointmentData, appointmentDateTime);
    window.open(googleCalendarLink, '_blank');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center pt-64 p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[var(--theme-dark-base)] border border-[var(--theme-accent)]/20 rounded-2xl shadow-2xl overflow-hidden glass-effect"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 pt- border-b border-[var(--theme-accent)]/20">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Book Your Consultation
              </h2>
              <p className="text-muted-foreground mt-1">
                {step === 1 && "Select date & time"}
                {step === 2 && "Enter your details"}
                {step === 3 && "Review & confirm"}
                {step === 4 && "Booking confirmed!"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-[var(--theme-accent)]/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 pt-4">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= stepNumber 
                      ? "bg-[var(--primary)] text-white" 
                      : "bg-[var(--theme-accent)]/10 text-muted-foreground"
                  }`}>
                    {step > stepNumber ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground">
                    {stepNumber === 1 && "Date & Time"}
                    {stepNumber === 2 && "Details"}
                    {stepNumber === 3 && "Review"}
                    {stepNumber === 4 && "Confirm"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Date
                  </h3>
                  <div className="glass-effect rounded-xl p-4">
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map(({ day, enabled }) => (
                        <motion.button
                          key={day}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDateSelect(day)}
                          disabled={!enabled}
                          className={`p-3 rounded-lg transition-all duration-200 ${
                            selectedDate === `2025-12-${day.toString().padStart(2, '0')}`
                              ? "bg-[var(--primary)] text-white shadow-lg"
                              : "bg-[var(--theme-accent)]/5 hover:bg-[var(--theme-accent)]/10"
                          } ${!enabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {day}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Select Time
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <motion.button
                        key={time}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-4 rounded-xl text-center transition-all duration-200 ${
                          selectedTime === time
                            ? "bg-[var(--primary)] text-white shadow-lg"
                            : "bg-[var(--theme-accent)]/5 hover:bg-[var(--theme-accent)]/10"
                        }`}
                      >
                        <div className="text-lg font-medium">
                          {time.split(':')[0]}:{time.split(':')[1]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {parseInt(time.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={appointmentData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="glass-effect border-[var(--theme-accent)]/20"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={appointmentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="glass-effect border-[var(--theme-accent)]/20"
                  />
                </div>

                <div>
                  <Label htmlFor="reason" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Reason for Consultation *
                  </Label>
                  <Input
                    id="reason"
                    value={appointmentData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    placeholder="e.g., Security Assessment, Penetration Testing"
                    className="glass-effect border-[var(--theme-accent)]/20"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Additional Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    value={appointmentData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Any additional details or concerns..."
                    className="glass-effect border-[var(--theme-accent)]/20 min-h-[120px]"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Review Your Appointment
                </h3>
                
                <div className="glass-effect rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h4>
                      <p className="text-lg font-semibold">
                        {new Date(appointmentData.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-lg">
                        {appointmentData.time.split(':')[0]}:
                        {appointmentData.time.split(':')[1]} 
                        {parseInt(appointmentData.time.split(':')[0]) >= 12 ? ' PM' : ' AM'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Duration</h4>
                      <p className="text-lg font-semibold">1 Hour</p>
                      <p className="text-sm text-muted-foreground">Online Meeting</p>
                    </div>
                  </div>

                  <div className="border-t border-[var(--theme-accent)]/20 pt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Personal Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{appointmentData.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{appointmentData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span>{appointmentData.reason}</span>
                      </div>
                      {appointmentData.description && (
                        <div className="mt-2 p-3 bg-[var(--theme-accent)]/5 rounded-lg">
                          <p className="text-sm">{appointmentData.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle className="w-10 h-10 text-[var(--primary)]" />
                </motion.div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">
                    Appointment Confirmed!
                  </h3>
                  <p className="text-muted-foreground">
                    Your consultation has been scheduled successfully.
                  </p>
                </div>

                <div className="glass-effect rounded-xl p-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {new Date(appointmentData.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">
                        {appointmentData.time.split(':')[0]}:{appointmentData.time.split(':')[1]} 
                        {parseInt(appointmentData.time.split(':')[0]) >= 12 ? ' PM' : ' AM'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">1 Hour</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={addToGoogleCalendar}
                    className="glass-effect bg-[var(--primary)] hover:bg-[var(--primary)]/90"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Add to Google Calendar
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={resetForm}
                  >
                    Close
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {appointmentData.email}
                </p>
              </motion.div>
            )}
          </div>

          {/* Modal Footer */}
          {step < 4 && (
            <div className="flex items-center justify-between p-6 border-t border-[var(--theme-accent)]/20">
              <div>
                {step > 1 && (
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
              </div>
              
              <div>
                {step < 3 ? (
                  <Button
                    onClick={nextStep}
                    className="glow-accent group"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {step === 1 ? "Continue to Details" : "Review & Confirm"}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="glow-accent group"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
