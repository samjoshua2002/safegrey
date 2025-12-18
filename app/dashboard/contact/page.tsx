"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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
import { Reply, Send, Loader2, Trash2, Eye, CheckCircle2, Circle, Search, Filter, Inbox, User, MessageCircle, MoreVertical, Minus, Maximize2, X, Plus } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import dynamicImport from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { motion, AnimatePresence } from "framer-motion"

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
    const [sending, setSending] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [compose, setCompose] = useState({
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        to: "",
        cc: "",
        bcc: "",
        subject: "",
        message: "",
        showCc: false,
        showBcc: false,
        originalId: ""
    })
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("All")
    const { toast } = useToast()
    const searchParams = useSearchParams()

    useEffect(() => {
        fetchMessages()
    }, [])

    useEffect(() => {
        const replyId = searchParams.get('replyTo')
        if (replyId && messages.length > 0) {
            const msg = messages.find(m => m._id === replyId)
            if (msg) {
                setSelectedId(msg._id)
                handleReplyClick(msg)
            }
        }
    }, [searchParams, messages])

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
        setCompose(prev => ({
            ...prev,
            isOpen: true,
            isMinimized: false,
            to: msg.userId.email,
            subject: `Re: Inquiry from ${msg.userId.name}`,
            message: "",
            originalId: msg._id
        }))

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
        if (!compose.to) return

        setSending(true)
        try {
            const response = await fetch("/api/dashboard/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: compose.to,
                    cc: compose.cc,
                    bcc: compose.bcc,
                    subject: compose.subject,
                    message: compose.message,
                    originalMessageId: compose.originalId,
                }),
            })

            if (!response.ok) throw new Error("Failed to send reply")

            toast({
                title: "Reply Sent",
                description: `Email sent to ${compose.to}`,
            })

            // Update local state
            setMessages(messages.map(m =>
                m._id === compose.originalId ? { ...m, status: 'Replied' as const } : m
            ))
            setCompose(prev => ({ ...prev, isOpen: false }))
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
            if (selectedId === id) {
                const remaining = messages.filter(m => m._id !== id)
                setSelectedId(remaining.length > 0 ? remaining[0]._id : null)
            }
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

    const filteredMessages = messages.filter(msg => {
        const matchesSearch =
            msg.userId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.userId.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.message.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "All" || msg.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const selectedMessage = messages.find(m => m._id === selectedId)

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
        <div className="flex-1 min-h-0 flex flex-col gap-6 animate-in fade-in duration-500 pb-6">
            <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">Communication Center</h1>
                    <p className="text-[var(--muted-foreground)] flex items-center gap-2">
                        <Inbox className="h-4 w-4 text-[var(--theme-accent)]" />
                        Manage client inquiries and responses
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] group-focus-within:text-[var(--theme-accent)] transition-colors" />
                        <Input
                            placeholder="Search inbox..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-full md:w-64 bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)] focus:border-[var(--theme-accent)] transition-all glass-effect"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Inbox List */}
                <Card className="w-full md:w-96 flex flex-col border-[var(--theme-border)] bg-[var(--theme-dark-secondary)] shadow-2xl overflow-hidden">
                    <CardHeader className="p-4 border-b border-[var(--theme-border)] space-y-4 bg-black/20">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">Messages</span>
                            <div className="flex gap-1">
                                {["All", "New", "Read", "Replied"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${statusFilter === status
                                            ? "bg-[var(--theme-accent)] text-white"
                                            : "bg-white/5 text-[var(--muted-foreground)] hover:bg-white/10"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="flex flex-col">
                                {filteredMessages.map((msg) => {
                                    const status = msg.status || 'New'
                                    const isActive = selectedId === msg._id
                                    return (
                                        <button
                                            key={msg._id}
                                            onClick={() => {
                                                setSelectedId(msg._id)
                                                if (msg.status === 'New') updateStatus(msg._id, 'Read')
                                            }}
                                            className={`p-4 text-left border-b border-[var(--theme-border)] transition-all relative group ${isActive ? "bg-[var(--theme-accent)]/10" : "hover:bg-white/5"
                                                }`}
                                        >
                                            {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--theme-accent)]" />}
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-sm font-bold truncate pr-2 ${isActive ? "text-[var(--theme-accent)]" : "text-[var(--foreground)]"}`}>
                                                    {msg.userId.name}
                                                </span>
                                                <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">
                                                    {format(new Date(msg.submittedAt), "MMM d")}
                                                </span>
                                            </div>
                                            <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mb-2">
                                                {msg.message}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${status === 'New' ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                                                    status === 'Replied' ? "bg-green-500" : "bg-yellow-500"
                                                    }`} />
                                                <span className="text-[10px] uppercase font-black tracking-widest text-[var(--muted-foreground)]">{status}</span>
                                            </div>
                                        </button>
                                    )
                                })}
                                {filteredMessages.length === 0 && (
                                    <div className="p-12 text-center text-[var(--muted-foreground)] italic text-sm">
                                        No messages found.
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Message Detail View */}
                <Card className="flex-1 flex flex-col border-[var(--theme-border)] bg-[var(--theme-dark-secondary)] shadow-2xl overflow-hidden">
                    {selectedMessage ? (
                        <>
                            <CardHeader className="p-6 border-b border-[var(--theme-border)] bg-black/10">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 border-2 border-[var(--theme-accent)]/30 ring-2 ring-black/50">
                                            <AvatarFallback className="bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] text-lg font-black">
                                                {selectedMessage.userId.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className="text-xl font-bold flex items-center gap-2">
                                                {selectedMessage.userId.name}
                                                <Badge variant="outline" className={`${statusConfig[selectedMessage.status].color} border-none font-black text-[10px] h-5`}>
                                                    {selectedMessage.status}
                                                </Badge>
                                            </h2>
                                            <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                                                <span className="hover:text-[var(--theme-accent)] transition-colors cursor-pointer">{selectedMessage.userId.email}</span>
                                                {selectedMessage.userId.company && (
                                                    <>
                                                        <Separator orientation="vertical" className="h-3 bg-[var(--theme-border)]" />
                                                        <span className="font-medium text-[var(--theme-accent)]/70">{selectedMessage.userId.company}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setSelectedId(null)}
                                            className="text-white hover:text-white hover:bg-white/10 h-10 w-10 transition-all rounded-full"
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>

                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                                <ScrollArea className="flex-1 p-8">
                                    <div className="max-w-3xl mx-auto space-y-8 pb-12">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                                                <MessageCircle className="h-3 w-3" /> Original Inquiry
                                                <Separator className="flex-1 h-[1px] bg-[var(--theme-border)]" />
                                                <span>{format(new Date(selectedMessage.submittedAt), "PPP p")}</span>
                                            </div>
                                            <div className="bg-[var(--theme-dark-secondary)] border border-[var(--theme-border)] p-6 rounded-2xl rounded-tl-none relative shadow-xl">
                                                <div className="absolute top-0 left-[-8px] border-t-8 border-t-[var(--theme-border)] border-l-8 border-l-transparent" />
                                                <p className="text-[var(--foreground)] leading-relaxed whitespace-pre-wrap">
                                                    {selectedMessage.message}
                                                </p>
                                            </div>
                                        </div>

                                        {selectedMessage.status === 'Replied' && (
                                            <div className="flex flex-col gap-2 scale-in-center">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500 mb-1 justify-end">
                                                    <span>Reply Sent</span>
                                                    <Separator className="flex-1 h-[1px] bg-green-500/20" />
                                                    <CheckCircle2 className="h-3 w-3" />
                                                </div>
                                                <div className="bg-green-500/5 border border-green-500/20 p-6 rounded-2xl rounded-tr-none relative self-end max-w-[80%]">
                                                    <p className="text-green-500/80 text-xs italic">
                                                        A response has been delivered to the client. View sent folder for details.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>

                                <Separator className="bg-[var(--theme-border)]" />

                                {/* High-Visibility Fixed Footer */}
                                <div className="flex-shrink-0 p-6 bg-[#1a1a1b] z-10 border-t border-[var(--theme-border)]">
                                    <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Communication Action</span>
                                            <span className="text-[10px] text-[var(--muted-foreground)] uppercase font-black tracking-widest">Execute coordinated response protocols</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => setDeleteId(selectedMessage._id)}
                                                className="border-red-500/30 text-red-500 hover:bg-red-500/10 h-11 px-6 font-bold transition-all"
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                                            </Button>
                                            <Button
                                                onClick={() => handleReplyClick(selectedMessage)}
                                                className="bg-[var(--theme-accent)] text-white hover:bg-[var(--theme-accent)]/90 h-11 px-10 font-black shadow-[0_4px_20px_rgba(174,32,18,0.4)] transition-all active:scale-95"
                                            >
                                                <Reply className="h-4 w-4 mr-2" /> Compose Reply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-black/5">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 bg-[var(--theme-accent)]/20 blur-3xl rounded-full" />
                                <div className="relative bg-[var(--theme-dark-base)] border border-[var(--theme-border)] p-8 rounded-full shadow-2xl">
                                    <Inbox className="h-16 w-16 text-[var(--theme-accent)] opacity-50" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-widest mb-3 text-[var(--foreground)]">Communication Inbox</h3>
                            <p className="text-[var(--muted-foreground)] max-w-sm text-sm leading-relaxed">
                                Select an active inquiry from the sidebar to view communication history and coordinate a professional response.
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Draggable Gmail-style Compose Window */}
            <AnimatePresence>
                {compose.isOpen && (
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragListener={!compose.isMaximized}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            width: compose.isMinimized ? "280px" : compose.isMaximized ? "calc(100vw - 320px)" : "600px",
                            height: compose.isMinimized ? "48px" : compose.isMaximized ? "calc(100vh - 64px)" : "600px",
                            bottom: compose.isMinimized ? "0px" : "32px",
                            right: "3px",
                            borderRadius: compose.isMinimized ? "12px 12px 0 0" : "12px",
                        }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        dragConstraints={{ left: 288, right: 0, top: 0, bottom: 0 }}
                        className={cn(
                            "fixed z-[2000] bg-[#0c0c0d] border border-[var(--theme-border)] shadow-[0_-20px_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden glass-effect-strong transition-all duration-300 ease-in-out",
                            !compose.isMinimized && !compose.isMaximized && "resize overflow-auto"
                        )}
                        style={{
                            minWidth: "280px",
                            minHeight: "48px",
                            maxWidth: "calc(100vw - 320px)",
                            maxHeight: "calc(100vh - 64px)"
                        }}
                    >
                        {/* Header / Drag Handle */}
                        <div className="bg-[#1a1a1b]/95 p-4 flex items-center justify-between border-b border-[var(--theme-border)] cursor-move select-none h-12 flex-shrink-0 backdrop-blur-xl">
                            <div className="flex items-center gap-2 min-w-0 flex-1 pr-2 overflow-hidden">
                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-accent)] shadow-[0_0_10px_rgba(174,32,18,0.8)] animate-pulse flex-shrink-0" />
                                <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.1em] truncate">
                                    {compose.isMinimized ? "Docked" : `Dispatch: ${compose.subject || "New Inquiry"}`}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:bg-white/10 text-white/50 hover:text-white rounded-md transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCompose(prev => ({ ...prev, isMinimized: !prev.isMinimized, isMaximized: false }));
                                    }}
                                >
                                    <Minus className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:bg-white/10 text-white/50 hover:text-white rounded-md transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCompose(prev => ({ ...prev, isMaximized: !prev.isMaximized, isMinimized: false }));
                                    }}
                                >
                                    <Maximize2 className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:bg-red-500/20 text-white/50 hover:text-red-500 rounded-md transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setCompose(prev => ({ ...prev, isOpen: false })); }}
                                >
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>

                        {!compose.isMinimized && (
                            <>
                                <div className="flex flex-col p-4 gap-2 bg-black/40">
                                    <div className="flex items-center border-b border-[var(--theme-border)]/30 px-2 group py-1 focus-within:border-[var(--theme-accent)]/50 transition-colors">
                                        <span className="text-[10px] uppercase font-black text-white/40 w-12 group-focus-within:text-[var(--theme-accent)] transition-colors">To</span>
                                        <Input
                                            value={compose.to}
                                            onChange={(e) => setCompose(prev => ({ ...prev, to: e.target.value }))}
                                            className="border-none bg-transparent focus-visible:ring-0 text-white text-sm h-8 font-medium placeholder:text-white/10"
                                            placeholder="recipient@domain.com"
                                        />
                                        <div className="flex gap-4 shrink-0">
                                            <button
                                                className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest transition-all hover:scale-110",
                                                    compose.showCc ? "text-[var(--theme-accent)]" : "text-white/30 hover:text-white"
                                                )}
                                                onClick={() => setCompose(prev => ({ ...prev, showCc: !prev.showCc }))}
                                            >
                                                Cc
                                            </button>
                                            <button
                                                className={cn(
                                                    "text-[10px] font-black uppercase tracking-widest transition-all hover:scale-110",
                                                    compose.showBcc ? "text-[var(--theme-accent)]" : "text-white/30 hover:text-white"
                                                )}
                                                onClick={() => setCompose(prev => ({ ...prev, showBcc: !prev.showBcc }))}
                                            >
                                                Bcc
                                            </button>
                                        </div>
                                    </div>

                                    {compose.showCc && (
                                        <div className="flex items-center border-b border-[var(--theme-border)]/30 px-2 animate-in slide-in-from-top-1 duration-200 py-1 focus-within:border-[var(--theme-accent)]/50">
                                            <span className="text-[10px] uppercase font-black text-white/40 w-12 group-focus-within:text-[var(--theme-accent)] transition-colors">Cc</span>
                                            <Input
                                                value={compose.cc}
                                                onChange={(e) => setCompose(prev => ({ ...prev, cc: e.target.value }))}
                                                className="border-none bg-transparent focus-visible:ring-0 text-white text-sm h-8 font-medium"
                                            />
                                        </div>
                                    )}

                                    {compose.showBcc && (
                                        <div className="flex items-center border-b border-[var(--theme-border)]/30 px-2 animate-in slide-in-from-top-1 duration-200 py-1 focus-within:border-[var(--theme-accent)]/50">
                                            <span className="text-[10px] uppercase font-black text-white/40 w-12 group-focus-within:text-[var(--theme-accent)] transition-colors">Bcc</span>
                                            <Input
                                                value={compose.bcc}
                                                onChange={(e) => setCompose(prev => ({ ...prev, bcc: e.target.value }))}
                                                className="border-none bg-transparent focus-visible:ring-0 text-white text-sm h-8 font-medium"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center border-b border-[var(--theme-border)]/30 px-2 py-1 focus-within:border-[var(--theme-accent)]/50 transition-colors">
                                        <span className="text-[10px] uppercase font-black text-white/40 w-12 shrink-0 group-focus-within:text-[var(--theme-accent)] transition-colors">Sub</span>
                                        <Input
                                            value={compose.subject}
                                            onChange={(e) => setCompose(prev => ({ ...prev, subject: e.target.value }))}
                                            placeholder="Mission Subject"
                                            className="border-none bg-transparent focus-visible:ring-0 text-white text-sm h-8 placeholder:text-white/5 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-hidden flex flex-col dark-quill-editor gmail-style">
                                    <style jsx global>{`
                                        .dark-quill-editor.gmail-style .ql-toolbar {
                                            background: rgba(0,0,0,0.4);
                                            border: none;
                                            border-bottom: 1px solid var(--theme-border);
                                            order: 2;
                                            padding: 10px;
                                            backdrop-blur-md;
                                        }
                                        .dark-quill-editor.gmail-style .ql-toolbar button:hover .ql-stroke,
                                        .dark-quill-editor.gmail-style .ql-toolbar button:hover .ql-fill,
                                        .dark-quill-editor.gmail-style .ql-toolbar button.ql-active .ql-stroke,
                                        .dark-quill-editor.gmail-style .ql-toolbar button.ql-active .ql-fill {
                                            stroke: var(--theme-accent) !important;
                                            fill: transparent !important;
                                        }
                                        .dark-quill-editor.gmail-style .ql-toolbar button.ql-active {
                                            background: rgba(174,32,18,0.15);
                                            border-radius: 4px;
                                        }
                                        .dark-quill-editor.gmail-style .ql-container {
                                            background:rgba(13,13,14,0.4);
                                            border: none;
                                            order: 1;
                                            flex: 1;
                                            overflow-y: auto;
                                        }
                                        .dark-quill-editor.gmail-style .ql-editor {
                                            font-size: 15px;
                                            padding: 24px;
                                            line-height: 1.6;
                                            color: #ffffff;
                                        }
                                        .dark-quill-editor.gmail-style .ql-editor.ql-blank::before {
                                            color: rgba(255,255,255,0.1);
                                            font-style: italic;
                                        }
                                    `}</style>
                                    <ReactQuill
                                        theme="snow"
                                        value={compose.message}
                                        onChange={(val) => setCompose(prev => ({ ...prev, message: val }))}
                                        modules={modules}
                                        className="flex-1 overflow-hidden"
                                    />

                                    <div className="p-6 flex items-center justify-between border-t border-[var(--theme-border)] bg-black/40 order-3">
                                        <div className="flex items-center gap-4">
                                            <Button
                                                onClick={handleSendReply}
                                                disabled={sending}
                                                className="bg-[var(--theme-accent)] text-white hover:bg-[var(--theme-accent)]/90 h-11 px-10 font-black shadow-[0_0_30px_rgba(174,32,18,0.4)] active:scale-95 transition-all"
                                            >
                                                {sending ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        Dispatch <Send className="h-4 w-4" />
                                                    </div>
                                                )}
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-[var(--muted-foreground)] hover:text-red-500 rounded-full h-10 w-10"
                                                onClick={() => setCompose(prev => ({ ...prev, isOpen: false }))}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

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
