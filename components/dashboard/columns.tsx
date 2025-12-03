"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Shield, ShieldCheck, Cloud, AlertTriangle, Lock, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { format } from "date-fns"

// This type is used to define the shape of our data.
export type Download = {
    _id: string
    userId: {
        _id: string
        name: string
        email: string
        firstName?: string
        lastName?: string
    }
    serviceType: string
    serviceCategory: string
    downloadedAt: string
}

const categoryIcons: Record<string, any> = {
    "Security Assessment": Shield,
    "Security Posture Assessment": ShieldCheck,
    "Cloud Security": Cloud,
    "Risk Management": AlertTriangle,
    "Security Enablement": Lock,
    "Managed Security": Server,
}

export const columns: ColumnDef<Download>[] = [
    {
        accessorKey: "userId.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const user = row.original.userId
            return (
                <Link
                    href={`/dashboard/user/${user._id}`}
                    className="font-medium text-[var(--theme-accent)] hover:underline"
                >
                    {user.name}
                </Link>
            )
        },
    },
    {
        accessorKey: "userId.email",
        header: "Email",
        cell: ({ row }) => row.original.userId.email,
    },
    {
        accessorKey: "serviceCategory",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("serviceCategory") as string
            const Icon = categoryIcons[category] || Shield
            return (
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-[var(--theme-accent)]" />
                    <span>{category}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "serviceType",
        header: "Service Type",
    },
    {
        accessorKey: "downloadedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return format(new Date(row.getValue("downloadedAt")), "PPP p")
        },
    },
]
