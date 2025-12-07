"use client"

import { useEffect, useState } from "react"
import { Download, columns } from "@/components/dashboard/columns"
import { DataTable } from "@/components/dashboard/data-table"

export const dynamic = 'force-dynamic'

export default function ServicePage() {
    const [data, setData] = useState<Download[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/dashboard/downloads")
                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error("Error fetching downloads:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <div className="text-[var(--foreground)]">Loading...</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-[var(--foreground)]">Service Downloads</h1>
                <p className="text-[var(--muted-foreground)]">
                    Manage and view all datasheet downloads across services.
                </p>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
