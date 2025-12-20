"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Loader2, CheckCircle2, XCircle, ShieldAlert, Mail, UserPlus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { toast } from "sonner"

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
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
    const [processing, setProcessing] = useState(false)

    // Manual Add User State
    const [isAddUserOpen, setIsAddUserOpen] = useState(false)
    const [newUser, setNewUser] = useState({ name: "", email: "" })
    const [isAddingUser, setIsAddingUser] = useState(false)

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

    const toggleSelectAll = () => {
        if (selectedUsers.size === users.length) {
            setSelectedUsers(new Set())
        } else {
            setSelectedUsers(new Set(users.map(u => u._id)))
        }
    }

    const toggleSelectUser = (id: string) => {
        const newSelected = new Set(selectedUsers)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedUsers(newSelected)
    }

    const handleAction = async (action: 'approve' | 'reject') => {
        if (selectedUsers.size === 0) return

        setProcessing(true)
        try {
            const res = await fetch("/api/dashboard/authorize-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userIds: Array.from(selectedUsers),
                    action
                })
            })

            if (!res.ok) throw new Error("Action failed")

            const result = await res.json()

            toast.success(`Users ${action === 'approve' ? 'authorized' : 'rejected'} successfully`)
            setSelectedUsers(new Set())
            fetchUsers() // Refresh list
        } catch (error) {
            console.error("Action error:", error)
            toast.error("An error occurred")
        } finally {
            setProcessing(false)
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
                        Approve requests or manually add new users.
                    </p>
                </div>
                <Button
                    onClick={() => setIsAddUserOpen(true)}
                    className="bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white"
                >
                    <UserPlus className="mr-2 h-4 w-4" /> Add Manual User
                </Button>
            </div>

            <Card className="bg-[var(--theme-dark-secondary)]/30 border-[var(--theme-border)]">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Pending & Active Users</CardTitle>
                        <CardDescription>Select users to take bulk actions.</CardDescription>
                    </div>
                    {selectedUsers.size > 0 && (
                        <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleAction('reject')}
                                disabled={processing}
                            >
                                <XCircle className="mr-2 h-4 w-4" /> Reject ({selectedUsers.size})
                            </Button>
                            <Button
                                className="bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90 text-white"
                                size="sm"
                                onClick={() => handleAction('approve')}
                                disabled={processing}
                            >
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
                                Approve & Send OTP ({selectedUsers.size})
                            </Button>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-[var(--theme-border)] hover:bg-transparent">
                                <TableHead className="w-[50px]">
                                    <Checkbox
                                        checked={users.length > 0 && selectedUsers.size === users.length}
                                        onCheckedChange={toggleSelectAll}
                                        className="border-[var(--muted-foreground)]"
                                    />
                                </TableHead>
                                <TableHead className="text-[var(--muted-foreground)]">User</TableHead>
                                <TableHead className="text-[var(--muted-foreground)]">Status</TableHead>
                                <TableHead className="text-[var(--muted-foreground)]">Company</TableHead>
                                <TableHead className="text-[var(--muted-foreground)] text-right">Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user._id}
                                    className={`border-[var(--theme-border)] transition-colors ${selectedUsers.has(user._id) ? 'bg-[var(--theme-accent)]/5' : 'hover:bg-white/5'}`}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.has(user._id)}
                                            onCheckedChange={() => toggleSelectUser(user._id)}
                                            className="border-[var(--muted-foreground)]"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-[var(--foreground)]">{user.name}</span>
                                            <span className="text-xs text-[var(--muted-foreground)]">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`
                                            ${user.status === 'approved' ? 'border-green-500/50 text-green-500' : ''}
                                            ${user.status === 'pending' || !user.status ? 'border-yellow-500/50 text-yellow-500' : ''}
                                            ${user.status === 'rejected' ? 'border-red-500/50 text-red-500' : ''}
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
                                </TableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-[var(--muted-foreground)]">
                                        No users found.
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
        </div>
    )
}
