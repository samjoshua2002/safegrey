"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { Mail, Phone, Building, Briefcase, Calendar } from "lucide-react"

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

export default function UserDetailsPage() {
    const params = useParams()
    const [user, setUser] = useState<User | null>(null)
    const [downloads, setDownloads] = useState<Download[]>([])
    const [messages, setMessages] = useState<Message[]>([])
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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-[var(--foreground)]">{user.name}</h1>
                <p className="text-[var(--muted-foreground)]">User Profile & History</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Profile Card */}
                <Card className="md:col-span-1 border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30">
                    <CardHeader>
                        <CardTitle className="text-[var(--foreground)]">Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                            <Mail className="h-4 w-4" />
                            <span className="text-[var(--foreground)]">{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                <Phone className="h-4 w-4" />
                                <span className="text-[var(--foreground)]">{user.phone}</span>
                            </div>
                        )}
                        {user.company && (
                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                <Building className="h-4 w-4" />
                                <span className="text-[var(--foreground)]">{user.company}</span>
                            </div>
                        )}
                        {user.designation && (
                            <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                                <Briefcase className="h-4 w-4" />
                                <span className="text-[var(--foreground)]">{user.designation}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Joined {format(new Date(user.createdAt), "PPP")}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <div className="md:col-span-2 space-y-6">
                    {/* Downloads Section */}
                    <Card className="border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30">
                        <CardHeader>
                            <CardTitle className="text-[var(--foreground)]">Datasheet Downloads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {downloads.length > 0 ? (
                                <div className="space-y-4">
                                    {downloads.map((download) => (
                                        <div key={download._id} className="flex justify-between items-center p-3 rounded-lg bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)]">
                                            <div>
                                                <p className="font-medium text-[var(--foreground)]">{download.serviceCategory}</p>
                                                <p className="text-sm text-[var(--muted-foreground)]">{download.serviceType}</p>
                                            </div>
                                            <span className="text-xs text-[var(--muted-foreground)]">
                                                {format(new Date(download.downloadedAt), "PPP p")}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--muted-foreground)]">No downloads yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Messages Section */}
                    <Card className="border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30">
                        <CardHeader>
                            <CardTitle className="text-[var(--foreground)]">Contact Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {messages.length > 0 ? (
                                <div className="space-y-4">
                                    {messages.map((msg) => (
                                        <div key={msg._id} className="space-y-2 p-4 rounded-lg bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)]">
                                            <div className="flex justify-between items-start">
                                                <p className="text-[var(--foreground)] whitespace-pre-wrap">{msg.message}</p>
                                                <span className="text-xs text-[var(--muted-foreground)] shrink-0 ml-4">
                                                    {format(new Date(msg.submittedAt), "PPP p")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--muted-foreground)]">No messages yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
