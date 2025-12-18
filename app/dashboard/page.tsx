"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Users, MessageSquare, Activity, Shield, ArrowUpRight, Plus, Search, Filter, MoreHorizontal, CheckCircle2, Clock, AlertCircle, Loader2, Reply } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { format, subDays, startOfDay, isSameDay } from "date-fns"

// Types based on the models
interface IBooking {
    _id: string
    name: string
    email: string
    topic: string
    date: string
    time: string
    status?: string
    createdAt: string
}

interface IMessage {
    _id: string
    userId: {
        _id: string
        name: string
        email: string
        company?: string
    }
    message: string
    status: 'New' | 'Read' | 'Replied'
    submittedAt: string
}

interface IUser {
    _id: string
    name: string
    email: string
    company?: string
    designation?: string
    createdAt: string
}

interface IDownload {
    _id: string
    userId: {
        _id: string
        name: string
        email: string
        company?: string
    }
    serviceType: string
    serviceCategory: string
    downloadedAt: string
}

const chartConfig = {
    bookings: {
        label: "Mission Activity",
        color: "#AE2012",
    },
    messages: {
        label: "Intelligence Telemetry",
        color: "#404040",
    },
    services: {
        label: "Capabilities Interest",
        color: "#cc8400",
    },
} satisfies ChartConfig

export default function DashboardPage() {
    const router = useRouter()
    const [bookings, setBookings] = useState<IBooking[]>([])
    const [messages, setMessages] = useState<IMessage[]>([])
    const [downloads, setDownloads] = useState<IDownload[]>([])
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const [chartData, setChartData] = useState<any[]>([])
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("overview")
    const [stats, setStats] = useState({
        totalBookings: 0,
        activeServices: 0,
        unreadMessages: 0,
        recentGrowth: 0
    })

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const [bookingsRes, messagesRes, downloadsRes, usersRes] = await Promise.all([
                    fetch("/api/dashboard/bookings"),
                    fetch("/api/dashboard/messages"),
                    fetch("/api/dashboard/downloads"),
                    fetch("/api/dashboard/users")
                ])

                const [bookingsData, messagesData, downloadsData, usersData] = await Promise.all([
                    bookingsRes.json(),
                    messagesRes.json(),
                    downloadsRes.json(),
                    usersRes.json()
                ])

                setBookings(bookingsData)
                setMessages(messagesData)
                setDownloads(downloadsData)
                setUsers(usersData)

                if (messagesData.length > 0) {
                    setSelectedMessageId(messagesData[0]._id)
                }

                // Calculate Stats
                const unread = messagesData.filter((m: IMessage) => m.status === 'New').length
                const uniqueServices = new Set(downloadsData.map((d: IDownload) => d.serviceType)).size

                setStats({
                    totalBookings: bookingsData.length,
                    activeServices: uniqueServices || 3, // Fallback to 3 if none
                    unreadMessages: unread,
                    recentGrowth: 15.5 // Dummy growth for now
                })

                // Generate Chart Data for last 7 days
                const last7Days = Array.from({ length: 7 }).map((_, i) => {
                    const date = subDays(new Date(), 6 - i)
                    const dayLabel = format(date, "EEE")
                    const bookingsCount = bookingsData.filter((b: IBooking) => isSameDay(new Date(b.createdAt), date)).length
                    const messagesCount = messagesData.filter((m: IMessage) => isSameDay(new Date(m.submittedAt), date)).length
                    const downloadsCount = downloadsData.filter((d: IDownload) => isSameDay(new Date(d.downloadedAt), date)).length
                    return {
                        date: dayLabel,
                        bookings: bookingsCount,
                        messages: messagesCount,
                        services: downloadsCount
                    }
                })
                setChartData(last7Days)

            } catch (error) {
                console.error("Error fetching dashboard data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const activeMessage = messages.find(m => m._id === selectedMessageId) || (messages.length > 0 ? messages[0] : null)

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--theme-accent)]" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6 lg:p-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Dashboard</h1>
                <p className="text-[var(--muted-foreground)]">
                    Overview of your services, bookings, and customer interactions.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalBookings}</div>
                        <p className="text-xs text-muted-foreground">Lifetime appointments</p>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeServices}</div>
                        <p className="text-xs text-muted-foreground">Based on downloads</p>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.unreadMessages}</div>
                        <p className="text-xs text-muted-foreground">Pending response</p>
                    </CardContent>
                </Card>
                <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-muted-foreground">Global uptime</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="bg-[var(--theme-dark-secondary)]/50 border-[var(--theme-border)]">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                            <CardHeader>
                                <CardTitle>Weekly Activity</CardTitle>
                                <CardDescription>
                                    Bookings and messages received over the last 7 days.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="h-[350px]  w-full mt-4 relative overflow-hidden">
                                <div className="absolute inset-0 pointer-events-none opacity-20"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 50% 10%, rgba(174,32,18,0.15) 0%, transparent 70%)`,
                                    }}
                                />
                                <div className="absolute inset-0 pointer-events-none border-radius: 16px; opacity-80" />

                                <ChartContainer config={chartConfig} className="h-full w-full border-radius: 16px; relative z-10 flex items-center justify-center">
                                    <RadarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} outerRadius="90%">
                                        <defs>
                                            <filter id="radarShadow" height="200%">
                                                <feGaussianBlur stdDeviation="3" result="blur" />
                                                <feOffset dx="0" dy="0" result="offsetBlur" />
                                                <feMerge>
                                                    <feMergeNode />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        <PolarGrid
                                            stroke="rgba(233, 202, 202, 0.14)"
                                            radialLines={true}
                                        />

                                        <PolarAngleAxis
                                            dataKey="date"
                                            tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: "bold" }}
                                        />

                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-[#0f0f10] border border-white/5 p-3 rounded-lg shadow-2xl backdrop-blur-xl border-l-2 border-l-[#AE2012]">
                                                            <div className="flex flex-col gap-2">
                                                                <p className="text-[9px] font-black uppercase tracking-widest text-[#AE2012]">Sector Analysis</p>
                                                                {payload.map((entry: any, index: number) => (
                                                                    <div key={index} className="flex items-center justify-between gap-6">
                                                                        <span className="text-[10px] font-bold text-white/50 uppercase">{entry.name}</span>
                                                                        <span className="text-sm font-black text-white">{entry.value}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />

                                        <Radar
                                            name="Intelligence Telemetry"
                                            dataKey="messages"
                                            stroke="#404040"
                                            fill="#404040"
                                            fillOpacity={0.2}
                                            strokeWidth={1}
                                        />

                                        <Radar
                                            name="Capabilities Interest"
                                            dataKey="services"
                                            stroke="#cc8400"
                                            fill="#cc8400"
                                            fillOpacity={0.3}
                                            strokeWidth={2}
                                        />

                                        <Radar
                                            name="Mission Activity"
                                            dataKey="bookings"
                                            stroke="#AE2012"
                                            fill="#AE2012"
                                            fillOpacity={0.5}
                                            strokeWidth={3}
                                            filter="url(#radarShadow)"
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                            <CardHeader>
                                <CardTitle>Recent Messages</CardTitle>
                                <CardDescription>
                                    You have <span className="font-bold text-foreground">{stats.unreadMessages}</span> unread messages.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {messages.slice(0, 5).map((item) => (
                                        <div
                                            className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group"
                                            key={item._id}
                                            onClick={() => {
                                                setSelectedMessageId(item._id)
                                                setActiveTab("contact")
                                            }}
                                        >
                                            <Avatar className="h-9 w-9 border border-[var(--theme-border)]">
                                                <AvatarFallback className="bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]">
                                                    {item.userId?.name?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none group-hover:text-[var(--theme-accent)] transition-colors">
                                                    {item.userId?.name || "Anonymous"}
                                                </p>
                                                <p className="text-xs text-[var(--muted-foreground)] line-clamp-1">
                                                    {item.message}
                                                </p>
                                            </div>
                                            <div className="ml-auto text-xs text-[var(--muted-foreground)] whitespace-nowrap">
                                                {format(new Date(item.submittedAt), "MMM d")}
                                            </div>
                                        </div>
                                    ))}
                                    {messages.length === 0 && (
                                        <div className="text-center text-[var(--muted-foreground)] py-4">No data available.</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                            <CardHeader>
                                <CardTitle>Upcoming Bookings</CardTitle>
                                <CardDescription>Latest appointments scheduled.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-[var(--theme-border)] hover:bg-transparent">
                                            <TableHead className="text-[var(--muted-foreground)]">Client</TableHead>
                                            <TableHead className="text-[var(--muted-foreground)]">Topic</TableHead>
                                            <TableHead className="text-[var(--muted-foreground)]">Date</TableHead>
                                            <TableHead className="text-right text-[var(--muted-foreground)]">Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bookings.slice(0, 5).map((booking) => (
                                            <TableRow
                                                key={booking._id}
                                                className="border-[var(--theme-border)] cursor-pointer hover:bg-[var(--theme-accent)]/5 transition-colors"
                                                onClick={() => setActiveTab("bookings")}
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-[var(--theme-accent)]/20 text-[var(--theme-accent)]">
                                                                {booking.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span>{booking.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{booking.topic}</TableCell>
                                                <TableCell>
                                                    {format(new Date(booking.date), "MMM d, yyyy")}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {booking.time}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {bookings.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                                    No bookings found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                            <CardHeader>
                                <CardTitle>Recent Customers</CardTitle>
                                <CardDescription>Newest users signed up.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {users.slice(0, 5).map((u) => (
                                        <div key={u._id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 border border-[var(--theme-border)]">
                                                    <AvatarFallback className="bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-xs">
                                                        {u.name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm font-medium leading-none">{u.name}</p>
                                                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{u.company || "Individual"}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                                className="h-8 w-8 text-[var(--muted-foreground)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10"
                                            >
                                                <a href={`/dashboard/user/${u._id}`}>
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    ))}
                                    {users.length === 0 && (
                                        <div className="text-center text-[var(--muted-foreground)] py-4">No users found.</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                    <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Service Downloads</CardTitle>
                                <CardDescription>Track interest in your service datasheet offerings.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {downloads.map((download) => (
                                    <div
                                        key={download._id}
                                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-[var(--theme-dark-secondary)]/30 border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/50 transition-all group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
                                                <Shield className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-[var(--foreground)]">{download.serviceType}</h3>
                                                <p className="text-xs text-[var(--muted-foreground)]">{download.serviceCategory}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 mt-4 md:mt-0">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Requestor</span>
                                                <button
                                                    onClick={() => router.push(`/dashboard/user/${download.userId?._id}`)}
                                                    className="text-sm font-medium hover:text-[var(--theme-accent)] transition-colors text-left"
                                                >
                                                    {download.userId?.name}
                                                </button>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Company</span>
                                                <span className="text-sm text-[var(--foreground)]">{download.userId?.company || "Private"}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">Downloaded</span>
                                                <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                                                    <Clock className="h-3 w-3" />
                                                    {format(new Date(download.downloadedAt), "MMM d, HH:mm")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {downloads.length === 0 && (
                                    <div className="text-center py-20 bg-[var(--theme-dark-secondary)]/10 rounded-xl border border-dashed border-[var(--theme-border)]">
                                        <Search className="h-10 w-10 mx-auto mb-4 opacity-20" />
                                        <p className="text-[var(--muted-foreground)]">No service downloads found.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="bookings" className="space-y-4">
                    <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                        <CardHeader>
                            <CardTitle>All Bookings</CardTitle>
                            <CardDescription>Full history of scheduled appointments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[var(--theme-border)]">
                                        <TableHead className="text-[var(--muted-foreground)]">Client</TableHead>
                                        <TableHead className="text-[var(--muted-foreground)]">Email</TableHead>
                                        <TableHead className="text-[var(--muted-foreground)]">Topic</TableHead>
                                        <TableHead className="text-right text-[var(--muted-foreground)]">Scheduled For</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking._id} className="border-[var(--theme-border)]">
                                            <TableCell className="font-medium">{booking.name}</TableCell>
                                            <TableCell>{booking.email}</TableCell>
                                            <TableCell>{booking.topic}</TableCell>
                                            <TableCell className="text-right">
                                                {format(new Date(booking.date), "MMM d")} at {booking.time}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {bookings.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                                No bookings found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-1 lg:col-span-2 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)] overflow-hidden flex flex-col">
                            <CardHeader className="border-b border-[var(--theme-border)]">
                                <CardTitle>Inbox</CardTitle>
                                <CardDescription>Contact submissions</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 overflow-y-auto max-h-[500px]">
                                <div className="flex flex-col divide-y divide-[var(--theme-border)]">
                                    {messages.map((msg) => (
                                        <button
                                            key={msg._id}
                                            onClick={() => setSelectedMessageId(msg._id)}
                                            className={`flex flex-col items-start gap-2 p-4 text-left transition-colors ${selectedMessageId === msg._id ? 'bg-[var(--theme-accent)]/10' : 'hover:bg-white/5'}`}
                                        >
                                            <div className="flex w-full justify-between items-center">
                                                <span className="font-semibold text-sm">{msg.userId?.name}</span>
                                                <span className="text-[10px] text-[var(--muted-foreground)]">{format(new Date(msg.submittedAt), "MMM d")}</span>
                                            </div>
                                            <div className="line-clamp-1 text-xs text-[var(--muted-foreground)]">
                                                {msg.message}
                                            </div>
                                            <Badge variant="outline" className={`text-[10px] h-5 ${msg.status === 'New' ? 'border-blue-500/50 text-blue-400' : 'border-[var(--theme-border)] text-[var(--muted-foreground)]'}`}>
                                                {msg.status}
                                            </Badge>
                                        </button>
                                    ))}
                                    {messages.length === 0 && (
                                        <div className="p-8 text-center text-[var(--muted-foreground)]">No messages.</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 lg:col-span-5 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)] flex flex-col min-h-[500px]">
                            {activeMessage ? (
                                <>
                                    <CardHeader className="flex flex-row items-center justify-between border-b border-[var(--theme-border)]">
                                        <div className="flex items-center space-x-4">
                                            <Avatar className="h-10 w-10 border border-[var(--theme-border)]">
                                                <AvatarFallback className="bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] font-bold">
                                                    {activeMessage.userId?.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <a
                                                    href={`/dashboard/user/${activeMessage.userId?._id}`}
                                                    className="group"
                                                >
                                                    <CardTitle className="text-lg group-hover:text-[var(--theme-accent)] transition-colors cursor-pointer">
                                                        {activeMessage.userId?.name}
                                                    </CardTitle>
                                                </a>
                                                <CardDescription className="text-xs">
                                                    {activeMessage.userId?.email} • {activeMessage.userId?.company || "Private Individual"}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-[var(--muted-foreground)]">
                                            {format(new Date(activeMessage.submittedAt), "PPP p")}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 p-6 overflow-y-auto">
                                        <div className="bg-[var(--theme-dark-base)]/40 p-6 rounded-xl border border-[var(--theme-border)] shadow-inner">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap text-[var(--foreground)]">
                                                {activeMessage.message}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-3 border-t border-[var(--theme-border)] p-4 bg-black/10 text-xs">
                                        <Button
                                            size="sm"
                                            className="bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white gap-2"
                                            onClick={() => router.push(`/dashboard/contact?replyTo=${activeMessage._id}`)}
                                        >
                                            <Reply className="h-4 w-4" /> Go to Inbox to Reply
                                        </Button>
                                    </CardFooter>
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-[var(--muted-foreground)] min-h-[500px]">
                                    <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                                    No Message Selected
                                </div>
                            )}
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                        <CardHeader>
                            <CardTitle>User Directory</CardTitle>
                            <CardDescription>Manage and view all registered users and their activity history.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-[var(--theme-border)]">
                                        <TableHead className="text-[var(--muted-foreground)]">Name</TableHead>
                                        <TableHead className="text-[var(--muted-foreground)]">Email</TableHead>
                                        <TableHead className="text-[var(--muted-foreground)]">Company</TableHead>
                                        <TableHead className="text-[var(--muted-foreground)]">Designation</TableHead>
                                        <TableHead className="text-right text-[var(--muted-foreground)]">Joined Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow
                                            key={user._id}
                                            className="border-[var(--theme-border)] cursor-pointer hover:bg-[var(--theme-accent)]/5 transition-colors"
                                            onClick={() => router.push(`/dashboard/user/${user._id}`)}
                                        >
                                            <TableCell className="font-medium text-[var(--theme-accent)]">
                                                {user.name}
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.company || "N/A"}</TableCell>
                                            <TableCell>{user.designation || "N/A"}</TableCell>
                                            <TableCell className="text-right">
                                                {format(new Date(user.createdAt), "MMM d, yyyy")}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {users.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
