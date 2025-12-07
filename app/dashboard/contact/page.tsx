"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Reply, Send, Loader2, Trash2, Eye, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import dynamicImport from "next/dynamic"
import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamicImport(() => import("react-quill"), { ssr: false })

export const dynamic = 'force-dynamic'

interface Message {
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

const statusConfig = {
    New: { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Circle },
    Read: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Eye },
    Replied: { color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle2 },
}

export default function ContactPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [replyingTo, setReplyingTo] = useState<Message | null>(null)
    const [replySubject, setReplySubject] = useState("")
    const [replyMessage, setReplyMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const { toast } = useToast()

    useEffect(() => {
        fetchMessages()
    }, [])

    async function fetchMessages() {
        try {
            const response = await fetch("/api/dashboard/messages")
            if (!response.ok) throw new Error("Failed to fetch messages")
            const data = await response.json()
            // Add default status for messages that don't have one
            setMessages(data.map((msg: Message) => ({
                ...msg,
                status: msg.status || 'New'
            })))
        } catch (error) {
            console.error("Error fetching messages:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleReplyClick = async (msg: Message) => {
        setReplyingTo(msg)
        setReplySubject(`Re: Inquiry from ${msg.userId.name}`)
        setReplyMessage("")

        // Mark as Read if it's New
        if (msg.status === 'New') {
            await updateStatus(msg._id, 'Read')
        }
    }

    const updateStatus = async (id: string, status: 'New' | 'Read' | 'Replied') => {
        try {
            const response = await fetch(`/api/dashboard/messages/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            })
            if (response.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, status } : m))
            }
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    const handleSendReply = async () => {
        if (!replyingTo) return

        setSending(true)
        try {
            const response = await fetch("/api/dashboard/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: replyingTo.userId.email,
                    subject: replySubject,
                    message: replyMessage,
                    originalMessageId: replyingTo._id,
                }),
            })

            if (!response.ok) throw new Error("Failed to send reply")

            toast({
                title: "Reply Sent",
                description: `Email sent to ${replyingTo.userId.email}`,
            })

            // Update local state
            setMessages(messages.map(m =>
                m._id === replyingTo._id ? { ...m, status: 'Replied' as const } : m
            ))
            setReplyingTo(null)
        } catch (error) {
            console.error("Error sending reply:", error)
            toast({
                title: "Error",
                description: "Failed to send reply. Please try again.",
                variant: "destructive",
            })
        } finally {
            setSending(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/dashboard/messages/${id}`, {
                method: "DELETE",
            })
            if (!response.ok) throw new Error("Failed to delete message")

            setMessages(messages.filter(m => m._id !== id))
            toast({
                title: "Message Deleted",
                description: "The message has been removed.",
            })
        } catch (error) {
            console.error("Error deleting message:", error)
            toast({
                title: "Error",
                description: "Failed to delete message.",
                variant: "destructive",
            })
        } finally {
            setDeleteId(null)
        }
    }

    if (loading) {
        return <div className="text-[var(--foreground)]">Loading...</div>
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link'],
            ['clean']
        ],
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--foreground)]">Contact Messages</h1>
                    <p className="text-[var(--muted-foreground)]">
                        Manage inquiries from the contact form.
                    </p>
                </div>
                <div className="flex gap-2">
                    {Object.entries(statusConfig).map(([status, config]) => {
                        const Icon = config.icon
                        const count = messages.filter(m => m.status === status).length
                        return (
                            <Badge key={status} variant="outline" className={`${config.color} gap-1`}>
                                <Icon className="h-3 w-3" />
                                {status}: {count}
                            </Badge>
                        )
                    })}
                </div>
            </div>

            <div className="grid gap-4">
                {messages.map((msg) => {
                    const status = msg.status || 'New'
                    const StatusIcon = statusConfig[status].icon
                    return (
                        <Card key={msg._id} className="border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30 hover:bg-[var(--theme-dark-secondary)]/50 transition-colors">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-lg font-medium text-[var(--foreground)]">
                                                <Link href={`/dashboard/user/${msg.userId._id}`} className="hover:underline text-[var(--theme-accent)]">
                                                    {msg.userId.name}
                                                </Link>
                                            </CardTitle>
                                            <Badge variant="outline" className={`${statusConfig[status].color} gap-1`}>
                                                <StatusIcon className="h-3 w-3" />
                                                {status}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                                            <span>{msg.userId.email}</span>
                                            {msg.userId.company && (
                                                <>
                                                    <span>•</span>
                                                    <span>{msg.userId.company}</span>
                                                </>
                                            )}
                                            <span>•</span>
                                            <span>{format(new Date(msg.submittedAt), "PPP p")}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 rounded-lg bg-[var(--theme-dark-base)]/50 border border-[var(--theme-border)] mb-4">
                                    <p className="text-[var(--foreground)] whitespace-pre-wrap">{msg.message}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)] hover:bg-[var(--theme-accent)]/10"
                                            onClick={() => handleReplyClick(msg)}
                                        >
                                            <Reply className="h-4 w-4" /> Reply
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-2 glass-effect bg-transparent border-red-500/20 text-red-500 hover:bg-red-500/10"
                                            onClick={() => setDeleteId(msg._id)}
                                        >
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </Button>
                                    </div>
                                    {msg.status === 'New' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                            onClick={() => updateStatus(msg._id, 'Read')}
                                        >
                                            <Eye className="h-4 w-4 mr-2" /> Mark as Read
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}

                {messages.length === 0 && (
                    <div className="text-center py-12 text-[var(--muted-foreground)]">
                        No messages found.
                    </div>
                )}
            </div>

            {/* Reply Dialog */}
            <Dialog open={!!replyingTo} onOpenChange={(open) => !open && setReplyingTo(null)}>
                <DialogContent className="sm:max-w-[700px] bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] text-[var(--foreground)] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Reply to {replyingTo?.userId.name}</DialogTitle>
                        <DialogDescription className="text-[var(--muted-foreground)]">
                            Compose your email response with rich formatting.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                value={replySubject}
                                onChange={(e) => setReplySubject(e.target.value)}
                                className="bg-[var(--theme-dark-base)] border-[var(--theme-border)]"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="message">Message</Label>
                            <div className="rounded-md dark-quill-editor">
                                <style jsx global>{`
                                    .dark-quill-editor .ql-toolbar {
                                        background: var(--theme-dark-base);
                                        border: 1px solid var(--theme-border);
                                        border-radius: 0.375rem 0.375rem 0 0;
                                    }
                                    .dark-quill-editor .ql-container {
                                        background: var(--theme-dark-base);
                                        border: 1px solid var(--theme-border);
                                        border-top: none;
                                        border-radius: 0 0 0.375rem 0.375rem;
                                        color: var(--foreground);
                                    }
                                    .dark-quill-editor .ql-editor {
                                        color: var(--foreground);
                                        min-height: 200px;
                                    }
                                    .dark-quill-editor .ql-editor.ql-blank::before {
                                        color: var(--muted-foreground);
                                    }
                                    .dark-quill-editor .ql-stroke {
                                        stroke: var(--foreground);
                                    }
                                    .dark-quill-editor .ql-fill {
                                        fill: var(--foreground);
                                    }
                                    .dark-quill-editor .ql-picker-label {
                                        color: var(--foreground);
                                    }
                                    .dark-quill-editor .ql-picker-options {
                                        background: var(--theme-dark-secondary);
                                        border: 1px solid var(--theme-border);
                                    }
                                    .dark-quill-editor .ql-picker-item:hover {
                                        background: var(--theme-accent);
                                        color: white;
                                    }
                                    .dark-quill-editor .ql-toolbar button:hover,
                                    .dark-quill-editor .ql-toolbar button.ql-active {
                                        color: var(--theme-accent);
                                    }
                                    .dark-quill-editor .ql-toolbar button:hover .ql-stroke,
                                    .dark-quill-editor .ql-toolbar button.ql-active .ql-stroke {
                                        stroke: var(--theme-accent);
                                    }
                                    .dark-quill-editor .ql-toolbar button:hover .ql-fill,
                                    .dark-quill-editor .ql-toolbar button.ql-active .ql-fill {
                                        fill: var(--theme-accent);
                                    }
                                `}</style>
                                <ReactQuill
                                    theme="snow"
                                    value={replyMessage}
                                    onChange={setReplyMessage}
                                    modules={modules}
                                    className="h-64"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-16">
                        <Button
                            onClick={handleSendReply}
                            disabled={sending}
                            className="bg-[var(--theme-accent)] text-white hover:bg-[var(--theme-accent)]/90"
                        >
                            {sending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                </>
                            ) : (
                                <>
                                    Send Email <Send className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] text-[var(--foreground)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-[var(--muted-foreground)]">
                            This action cannot be undone. This will permanently delete the message.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-[var(--theme-border)]">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && handleDelete(deleteId)}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
