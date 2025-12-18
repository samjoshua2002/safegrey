"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Video, Clock, Globe, Mail, User } from "lucide-react";
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
} from "@/components/ui/dialog";

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

export default function BookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
                <Badge variant="outline" className="bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] border-[var(--theme-accent)]/20 gap-1">
                    <Calendar className="h-3 w-3" />
                    Total: {bookings.length}
                </Badge>
            </div>

            <div className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30 overflow-hidden">
                <Table>
                    <TableHeader className="bg-[var(--theme-dark-secondary)]">
                        <TableRow className="border-[var(--theme-border)] hover:bg-[var(--theme-dark-secondary)]">
                            <TableHead className="text-[var(--muted-foreground)]">Requestor</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Topic</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Date & Time</TableHead>
                            <TableHead className="text-[var(--muted-foreground)]">Meeting</TableHead>
                            <TableHead className="text-right text-[var(--muted-foreground)]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-[var(--muted-foreground)]">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            bookings.map((booking) => (
                                <TableRow
                                    key={booking._id}
                                    className="border-[var(--theme-border)] hover:bg-[var(--theme-dark-base)]/50 transition-colors cursor-pointer"
                                    onClick={() => setSelectedBooking(booking)}
                                >
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-[var(--foreground)] flex items-center gap-2">
                                                <User className="w-3 h-3 text-[var(--theme-accent)]" /> {booking.name}
                                            </span>
                                            <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> {booking.email}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-[var(--foreground)]">
                                        <Badge variant="secondary" className="bg-[var(--primary)]/10 text-[var(--primary)] border-transparent hover:bg-[var(--primary)]/20">
                                            {booking.topic}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
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
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-[var(--theme-accent)]">
                                            <Video className="w-4 h-4" />
                                            Join Meet
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                                    </TableCell>
                                </TableRow>
                            ))
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
        </div>
    );
}
