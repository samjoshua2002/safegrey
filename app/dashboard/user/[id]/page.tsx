"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { Mail, Phone, Building, Briefcase, Calendar, Video, ArrowLeft, User as UserIcon, ShieldCheck, Download as DownloadIcon, Activity, MessageCircle, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export const dynamic = 'force-dynamic'

interface User {
    _id: string
    firstName?: string
    lastName?: string
    name: string
    email: string
    phone?: string
    company?: string
    designation?: string
    createdAt: string
}

interface Download {
    _id: string
    serviceType: string
    serviceCategory: string
    downloadedAt: string
}

interface Message {
    _id: string
    message: string
    submittedAt: string
}

interface Booking {
    _id: string
    topic: string
    date: string
    time: string
    timezone: string
    meetingLink: string
    createdAt: string
}

export default function UserDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [downloads, setDownloads] = useState<Download[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/dashboard/user/${params.id}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch user data")
                }
                const data = await response.json()
                setUser(data.user)
                setDownloads(data.downloads)
                setMessages(data.messages)
                setBookings(data.bookings)
            } catch (error) {
                console.error("Error fetching user details:", error)
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchData()
        }
    }, [params.id])

    if (loading) {
        return <div className="text-[var(--foreground)]">Loading...</div>
    }

    if (!user) {
        return <div className="text-[var(--foreground)]">User not found</div>
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="w-fit text-[var(--muted-foreground)] hover:text-[var(--foreground)] gap-2 -ml-2"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Button>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-[var(--theme-dark-secondary)]/10 p-10 rounded-3xl border border-[var(--theme-border)] glass-effect relative overflow-hidden group">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -right-10 p-20 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                        <ShieldCheck className="h-48 w-48 text-[var(--theme-accent)]" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-30" />

                    <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-black/50 ring-2 ring-[var(--theme-accent)] shadow-[0_0_40px_rgba(174,32,18,0.2)] group-hover:shadow-[0_0_60px_rgba(174,32,18,0.4)] transition-all duration-500">
                            <AvatarFallback className="bg-[var(--theme-dark-base)] text-[var(--theme-accent)] text-4xl font-extrabold">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 bg-[var(--theme-accent)] p-2 rounded-full border-2 border-black">
                            <UserIcon className="h-4 w-4 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4 relative z-10">
                        <div className="space-y-1">
                            <h1 className="text-5xl font-black text-[var(--foreground)] tracking-tight drop-shadow-sm">{user.name}</h1>
                            <p className="text-[var(--theme-accent)] font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                                {user.company || "Independent Professional"}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-[var(--theme-border)]">
                                <div className="p-2 rounded-lg bg-[var(--theme-accent)]/10">
                                    <Mail className="h-4 w-4 text-[var(--theme-accent)]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold">Primary Email</span>
                                    <span className="text-sm font-medium">{user.email}</span>
                                </div>
                            </div>

                            {user.phone && (
                                <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-[var(--theme-border)]">
                                    <div className="p-2 rounded-lg bg-[var(--theme-accent)]/10">
                                        <Phone className="h-4 w-4 text-[var(--theme-accent)]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold">Phone Number</span>
                                        <span className="text-sm font-medium">{user.phone}</span>
                                    </div>
                                </div>
                            )}

                            {user.designation && (
                                <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-[var(--theme-border)]">
                                    <div className="p-2 rounded-lg bg-[var(--theme-accent)]/10">
                                        <Briefcase className="h-4 w-4 text-[var(--theme-accent)]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold">Designation</span>
                                        <span className="text-sm font-medium">{user.designation}</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 bg-black/20 p-3 rounded-xl border border-[var(--theme-border)]">
                                <div className="p-2 rounded-lg bg-[var(--theme-accent)]/10">
                                    <Calendar className="h-4 w-4 text-[var(--theme-accent)]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold">Client Since</span>
                                    <span className="text-sm font-medium">{format(new Date(user.createdAt), "MMMM d, yyyy")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-[var(--theme-dark-secondary)]/20 border-[var(--theme-border)]">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{downloads.length}</p>
                                <p className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold tracking-wider">Downloads</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--theme-dark-secondary)]/20 border-[var(--theme-border)]">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-[var(--theme-accent)]/10 text-[var(--theme-accent)]">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{bookings.length}</p>
                                <p className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold tracking-wider">Bookings</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--theme-dark-secondary)]/20 border-[var(--theme-border)]">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{messages.length}</p>
                                <p className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold tracking-wider">Messages</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--theme-dark-secondary)]/20 border-[var(--theme-border)]">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                                <Activity className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">Active</p>
                                <p className="text-[10px] text-[var(--muted-foreground)] uppercase font-bold tracking-wider">Status</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3 space-y-6">
                    {/* Downloads Section */}
                    <Card className="border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30 overflow-hidden">
                        <CardHeader className="border-b border-[var(--theme-border)] bg-black/10">
                            <CardTitle className="text-[var(--foreground)] flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-blue-500" />
                                Datasheet Downloads
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {downloads.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {downloads.map((download) => (
                                        <div key={download._id} className="flex justify-between items-center p-4 rounded-xl bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)] hover:border-blue-500/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                                    <DownloadIcon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-[var(--foreground)]">{download.serviceCategory}</p>
                                                    <p className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-tight">{download.serviceType}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-[var(--muted-foreground)] bg-black/20 px-2 py-1 rounded">
                                                {format(new Date(download.downloadedAt), "MMM d, yyyy")}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 opacity-40 italic">No downloads yet.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Bookings Section */}
                    <Card className="border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30 overflow-hidden">
                        <CardHeader className="border-b border-[var(--theme-border)] bg-black/10">
                            <CardTitle className="text-[var(--foreground)] flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-[var(--theme-accent)]" />
                                Scheduled Bookings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {bookings.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {bookings.map((booking) => (
                                        <div key={booking._id} className="p-5 rounded-xl bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)] relative group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="font-bold text-[var(--foreground)]">{booking.topic}</p>
                                                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mt-1">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{format(new Date(booking.date), "PPP")} at {booking.time}</span>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline" className="h-8 border-[var(--theme-border)] hover:bg-[var(--theme-accent)]/10 hover:text-[var(--theme-accent)]" asChild>
                                                    <a href={booking.meetingLink} target="_blank">
                                                        <Video className="h-3 w-3 mr-2" /> Join
                                                    </a>
                                                </Button>
                                            </div>
                                            <div className="text-[10px] text-[var(--muted-foreground)] uppercase tracking-widest">
                                                Booked {format(new Date(booking.createdAt), "MMM d")}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 opacity-40 italic">No bookings scheduled.</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Messages Section */}
                    <Card className="border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30 overflow-hidden">
                        <CardHeader className="border-b border-[var(--theme-border)] bg-black/10">
                            <CardTitle className="text-[var(--foreground)] flex items-center gap-2">
                                <MessageCircle className="h-5 w-5 text-orange-500" />
                                Communication History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {messages.length > 0 ? (
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div key={msg._id} className="relative pl-6 border-l-2 border-[var(--theme-accent)]/20 hover:border-[var(--theme-accent)] transition-colors py-2">
                                            <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-[var(--theme-accent)] shadow-[0_0_8px_var(--theme-accent)]" />
                                            <div className="bg-[var(--theme-dark-base)]/40 p-5 rounded-2xl border border-[var(--theme-border)] space-y-3">
                                                <p className="text-sm text-[var(--foreground)] leading-relaxed">{msg.message}</p>
                                                <div className="flex justify-between items-center text-[10px] text-[var(--muted-foreground)] uppercase tracking-wider font-bold">
                                                    <span>Inquiry</span>
                                                    <span>{format(new Date(msg.submittedAt), "MMM d, h:mm a")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 opacity-40 italic">No messages recorded.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
