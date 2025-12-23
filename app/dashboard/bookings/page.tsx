"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isPast, isFuture, startOfDay } from "date-fns";
import { Calendar, Video, Clock, Globe, Mail, User, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Booking {
    _id: string;
    name: string;
    email: string;
    topic: string;
    notes?: string;
    date: string;
    time: string;
    timezone: string;
    meetingLink: string;
    createdAt: string;
}

// Helper function to determine booking status
function getBookingStatus(dateString: string) {
    const bookingDate = startOfDay(new Date(dateString));
    const today = startOfDay(new Date());

    if (isToday(bookingDate)) return 'today';
    if (isPast(bookingDate)) return 'past';
    return 'future';
}

// Helper function to get row styling based on status
function getRowClassName(status: 'past' | 'today' | 'future') {
    const baseClass = "border-[var(--theme-border)] transition-colors cursor-pointer";

    switch (status) {
        case 'past':
            return `${baseClass} bg-red-500/5 hover:bg-red-500/10 border-l-4 border-l-red-500/50`;
        case 'today':
            return `${baseClass} bg-green-500/5 hover:bg-green-500/10 border-l-4 border-l-green-500/50`;
        case 'future':
            return `${baseClass} bg-blue-500/5 hover:bg-blue-500/10 border-l-4 border-l-blue-500/50`;
    }
}

// Helper function to get status badge
function getStatusBadge(status: 'past' | 'today' | 'future') {
    switch (status) {
        case 'past':
            return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">Past</Badge>;
        case 'today':
            return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">Today</Badge>;
        case 'future':
            return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">Upcoming</Badge>;
    }
}

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        try {
            const response = await fetch("/api/dashboard/bookings");
            if (!response.ok) throw new Error("Failed to fetch bookings");
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(bookingId: string) {
        setIsDeleting(true);
        try {
            const response = await fetch(`/api/dashboard/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error("Failed to delete booking");

            toast.success("Booking deleted successfully");
            setBookings(bookings.filter(b => b._id !== bookingId));
            setDeleteBookingId(null);
        } catch (error) {
            console.error("Error deleting booking:", error);
            toast.error("Failed to delete booking");
        } finally {
            setIsDeleting(false);
        }
    }

    if (loading) {
        return <div className="text-[var(--foreground)]">Loading bookings...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">
                        Bookings
                    </h1>
                    <p className="text-[var(--muted-foreground)]">
                        Manage scheduled security assessments.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border-[var(--theme-accent)]/20 gap-1">
                        <Calendar className="h-3 w-3" />
                        Total: {bookings.length}
                    </Badge>
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
                <span className="text-[var(--muted-foreground)]">Status:</span>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <span className="text-[var(--foreground)]">Past</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <span className="text-[var(--foreground)]">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                    <span className="text-[var(--foreground)]">Upcoming</span>
                </div>
            </div>

            <div className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30 overflow-hidden">
                <Table>
                    <TableHeader className="bg-[var(--theme-dark-secondary)]">
                        <TableRow className="border-[var(--theme-border)] hover:bg-[var(--theme-dark-secondary)]">
                            <TableHead className="text-[var(--muted-foreground)]">Status</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Requestor</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Topic</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Date & Time</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Meeting</TableHead>
                            <TableHead className="text-right text-[var(--muted-foreground)]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-[var(--muted-foreground)]">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking) => {
                                const status = getBookingStatus(booking.date);
                                return (
                                    <TableRow
                                        key={booking._id}
                                        className={getRowClassName(status)}
                                    >
                                        <TableCell>
                                            {getStatusBadge(status)}
                                        </TableCell>
                                        <TableCell onClick={() => setSelectedBooking(booking)}>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-[var(--foreground)] flex items-center gap-2">
                                                    <User className="w-3 h-3 text-[var(--theme-accent)]" /> {booking.name}
                                                </span>
                                                <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-2">
                                                    <Mail className="w-3 h-3" /> {booking.email}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell onClick={() => setSelectedBooking(booking)} className="font-medium text-[var(--foreground)]">
                                            <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] border-transparent hover:bg-[var(--primary)]/20">
                                                {booking.topic}
                                            </Badge>
                                        </TableCell>
                                        <TableCell onClick={() => setSelectedBooking(booking)}>
                                            <div className="flex flex-col text-sm text-[var(--muted-foreground)]">
                                                <span className="flex items-center gap-1.5 text-[var(--foreground)]">
                                                    <Calendar className="w-3 h-3 text-[var(--theme-accent)]" />
                                                    {format(new Date(booking.date), "MMM d, yyyy")}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" />
                                                    {booking.time}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell onClick={() => setSelectedBooking(booking)}>
                                            <div className="flex items-center gap-2 text-sm text-[var(--theme-accent)]">
                                                <Video className="w-4 h-4" />
                                                Join Meet
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-xs"
                                                    onClick={() => setSelectedBooking(booking)}
                                                >
                                                    View Details
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteBookingId(booking._id);
                                                    }}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Detailed View Dialog */}
            <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                <DialogContent className="sm:max-w-[500px] bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] text-[var(--foreground)]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-[var(--theme-accent)]" />
                            Booking Details
                        </DialogTitle>
                        <DialogDescription className="text-[var(--muted-foreground)]">
                            Full information for scheduled assessment
                        </DialogDescription>
                    </DialogHeader>
                    {selectedBooking && (
                        <div className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-xs text-[var(--muted-foreground)]">Requestor</Label>
                                    <div className="text-sm font-medium">{selectedBooking.name}</div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-[var(--muted-foreground)]">Topic</Label>
                                    <div>
                                        <Badge className="bg-[var(--theme-accent)] text-white">
                                            {selectedBooking.topic}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs text-[var(--muted-foreground)]">Email Address</Label>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-3 w-3 text-[var(--theme-accent)]" />
                                    {selectedBooking.email}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-xs text-[var(--muted-foreground)]">Date</Label>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-3 w-3 text-[var(--theme-accent)]" />
                                        {format(new Date(selectedBooking.date), "PPP")}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-[var(--muted-foreground)]">Time</Label>
                                    <div className="flex items-center gap-2 text-sm text-[var(--theme-accent)] font-mono">
                                        <Clock className="h-3 w-3" />
                                        {selectedBooking.time} ({selectedBooking.timezone})
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-[var(--muted-foreground)]">Notes / Background</Label>
                                <div className="p-4 rounded-lg bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)] text-sm whitespace-pre-wrap">
                                    {selectedBooking.notes || "No additional notes provided."}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--theme-border)]">
                                <Button variant="outline" onClick={() => setSelectedBooking(null)} className="h-9 border-[var(--theme-border)]">
                                    Close
                                </Button>
                                <Button asChild className="h-9 bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white">
                                    <Link href={selectedBooking.meetingLink} target="_blank">
                                        <Video className="w-4 h-4 mr-2" /> Join Meeting
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteBookingId} onOpenChange={(open) => !open && setDeleteBookingId(null)}>
                <AlertDialogContent className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] text-[var(--foreground)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                        <AlertDialogDescription className="text-[var(--muted-foreground)]">
                            Are you sure you want to delete this booking? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-[var(--theme-border)]">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteBookingId && handleDelete(deleteBookingId)}
                            disabled={isDeleting}
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
