"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format, differenceInHours } from "date-fns"
import { Loader2, Mail, UserPlus, User, Search, Trash2, X, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
import { toast } from "sonner"
import Link from "next/link"

interface IUser {
    _id: string
    name: string
    email: string
    company?: string
    designation?: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: string
}

export default function UserAuthorizationPage() {
    const router = useRouter()
    const [users, setUsers] = useState<IUser[]>([])
    const [loading, setLoading] = useState(true)
    const [processingId, setProcessingId] = useState<string | null>(null)

    // Manual Add User State
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [newUser, setNewUser] = useState({ name: "", email: "" })
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    async function fetchUsers() {
        try {
            const res = await fetch("/api/dashboard/users")
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error("Error fetching users:", error)
            toast.error("Failed to load users")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const isNewUser = (createdAt: string) => {
        const hours = differenceInHours(new Date(), new Date(createdAt))
        return hours < 24
    }

    const handleAction = async (userId: string, action: 'approve' | 'reject') => {
        setProcessingId(userId)
        try {
            const res = await fetch("/api/dashboard/authorize-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userIds: [userId],
                    action
                })
            })

            if (!res.ok) throw new Error("Action failed")

            await res.json()

            toast.success(`User ${action === 'approve' ? 'authorized' : 'rejected'} successfully`)

            // Optimistic update
            setUsers(users.map(u =>
                u._id === userId ? { ...u, status: action === 'approve' ? 'approved' : 'rejected' } : u
            ))
        } catch (error) {
            console.error("Action error:", error)
            toast.error("An error occurred")
        } finally {
            setProcessingId(null)
        }
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newUser.name || !newUser.email) return

        setIsAddingUser(true)
        try {
            const res = await fetch("/api/dashboard/add-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to add user")
            }

            toast.success("User added and authorized successfully!")
            setIsAddUserOpen(false)
            setNewUser({ name: "", email: "" })
            fetchUsers() // Refresh list
        } catch (error) {
            console.error("Add user error:", error)
            toast.error(error instanceof Error ? error.message : "Failed to add user")
        } finally {
            setIsAddingUser(false)
        }
    }

    const handleDeleteUser = async (userId: string) => {
        setIsDeleting(true)
        try {
            const res = await fetch(`/api/dashboard/users/${userId}`, {
                method: "DELETE",
            })

            if (!res.ok) throw new Error("Failed to delete user")

            toast.success("User deleted successfully")
            setUsers(users.filter(u => u._id !== userId))
            setDeleteUserId(null)
        } catch (error) {
            console.error("Delete user error:", error)
            toast.error("Failed to delete user")
        } finally {
            setIsDeleting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--theme-accent)]" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6 lg:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">User Authorization</h1>
                    <p className="text-[var(--muted-foreground)]">
                        Manage user access and approvals.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
                        <Input
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 w-64 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                        />
                    </div>
                    <Button
                        onClick={() => setIsAddUserOpen(true)}
                        className="bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white"
                    >
                        <UserPlus className="mr-2 h-4 w-4" /> Add Manual User
                    </Button>
                </div>
            </div>

            <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>View and manage all registered users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-[var(--theme-border)] hover:bg-transparent">
                                <TableHead className="text-[var(--muted-foreground)]">User</TableHead>
                                <TableHead className="text-[var(--muted-foreground)]">Status</TableHead>
                                <TableHead className="text-[var(--muted-foreground)]">Company</TableHead>
                                <TableHead className="text-[var(--muted-foreground)] text-right">Joined</TableHead>
                                <TableHead className="text-[var(--muted-foreground)] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow
                                    key={user._id}
                                    className="border-[var(--theme-border)] hover:bg-white/5"
                                >
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/dashboard/user/${user._id}`} className="font-medium text-[var(--theme-accent)] hover:underline hover:text-[var(--theme-accent)]/80 transition-colors">
                                                    {user.name}
                                                </Link>
                                                {isNewUser(user.createdAt) && (
                                                    <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20 text-[10px] px-1 py-0 h-5">
                                                        <Sparkles className="mr-1 h-2 w-2" />
                                                        NEW
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-[var(--muted-foreground)]">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`
                                            ${user.status === 'approved' ? 'border-green-500/50 text-green-500 bg-green-500/10' : ''}
                                            ${user.status === 'pending' || !user.status ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' : ''}
                                            ${user.status === 'rejected' ? 'border-red-500/50 text-red-500 bg-red-500/10' : ''}
                                        `}>
                                            {user.status || 'pending'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-[var(--muted-foreground)]">
                                        {user.company || "Individual"}
                                    </TableCell>
                                    <TableCell className="text-right text-[var(--muted-foreground)]">
                                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.status !== 'approved' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 p-0 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-600"
                                                    onClick={() => handleAction(user._id, 'approve')}
                                                    disabled={processingId === user._id}
                                                >
                                                    {processingId === user._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Check className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            )}
                                            {user.status !== 'rejected' && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8 w-8 p-0 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-600"
                                                    onClick={() => handleAction(user._id, 'reject')}
                                                    disabled={processingId === user._id}
                                                >
                                                    {processingId === user._id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <X className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                onClick={() => setDeleteUserId(user._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredUsers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-[var(--muted-foreground)]">
                                        {searchQuery ? "No users match your search." : "No users found."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Manual User Dialog */}
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogContent className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] text-[var(--foreground)] sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription className="text-[var(--muted-foreground)]">
                            Create a new user manually. They will be automatically approved and sent an OTP.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddUser} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    className="pl-9 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="pl-9 bg-[var(--theme-dark-base)]/50 border-[var(--theme-border)]"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsAddUserOpen(false)}
                                className="hover:bg-[var(--theme-dark-base)]"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isAddingUser}
                                className="bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white"
                            >
                                {isAddingUser ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Add User
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteUserId} onOpenChange={(open) => !open && setDeleteUserId(null)}>
                <AlertDialogContent className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)] text-[var(--foreground)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription className="text-[var(--muted-foreground)]">
                            Are you sure you want to delete this user? This action cannot be undone and will remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-[var(--theme-border)]">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteUserId && handleDeleteUser(deleteUserId)}
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
    )
}
