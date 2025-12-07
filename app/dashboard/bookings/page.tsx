"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Video, Clock, Globe, Mail, User } from "lucide-react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
                            <TableHead className="text-[var(--muted-foreground)]">Details</TableHead>
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
                                <TableRow key={booking._id} className="border-[var(--theme-border)] hover:bg-[var(--theme-dark-base)]/50 transition-colors">
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
                                            <span className="flex items-center gap-1.5 text-xs opacity-70">
                                                <Globe className="w-3 h-3" />
                                                {booking.timezone}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={booking.meetingLink}
                                            target="_blank"
                                            className="inline-flex items-center gap-2 text-sm text-[var(--theme-accent)] hover:underline"
                                        >
                                            <Video className="w-4 h-4" />
                                            Join Meet
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {booking.notes ? (
                                            <div className="max-w-[200px] truncate text-sm text-[var(--muted-foreground)]" title={booking.notes}>
                                                {booking.notes}
                                            </div>
                                        ) : (
                                            <span className="text-sm text-[var(--muted-foreground)]/50 italic">None</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
