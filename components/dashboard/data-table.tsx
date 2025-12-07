"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Calendar } from "lucide-react"

type DateFilterOption = "all" | "recent" | "oldest" | "thisMonth" | "lastMonth"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [dateFilter, setDateFilter] = React.useState<DateFilterOption>("all")

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // Apply date filtering
    React.useEffect(() => {
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        switch (dateFilter) {
            case "recent":
                setSorting([{ id: "downloadedAt", desc: true }])
                table.getColumn("downloadedAt")?.setFilterValue(undefined)
                break
            case "oldest":
                setSorting([{ id: "downloadedAt", desc: false }])
                table.getColumn("downloadedAt")?.setFilterValue(undefined)
                break
            case "thisMonth":
                // Filter for current month
                setSorting([{ id: "downloadedAt", desc: true }])
                table.getColumn("downloadedAt")?.setFilterValue((value: any) => {
                    const date = new Date(value)
                    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
                })
                break
            case "lastMonth":
                // Filter for last month
                setSorting([{ id: "downloadedAt", desc: true }])
                const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
                const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
                table.getColumn("downloadedAt")?.setFilterValue((value: any) => {
                    const date = new Date(value)
                    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
                })
                break
            case "all":
            default:
                table.getColumn("downloadedAt")?.setFilterValue(undefined)
                setSorting([])
                break
        }
    }, [dateFilter, table])

    // Unique categories for filtering
    // @ts-ignore
    const categories = Array.from(new Set(data.map((item: any) => item.serviceCategory)))

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("userId_email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("userId_email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]"
                />

                <div className="flex gap-2">
                    {/* Category Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]">
                                Filter Category <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)]">
                            {categories.map((category: any) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={category}
                                        className="capitalize text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20"
                                        checked={
                                            (table.getColumn("serviceCategory")?.getFilterValue() as string[])?.includes(
                                                category
                                            )
                                        }
                                        onCheckedChange={(checked) => {
                                            const current = (table.getColumn("serviceCategory")?.getFilterValue() as string[]) || []
                                            const next = checked
                                                ? [...current, category]
                                                : current.filter((value) => value !== category)
                                            table.getColumn("serviceCategory")?.setFilterValue(next.length ? next : undefined)
                                        }}
                                    >
                                        {category}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Date Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]">
                                <Calendar className="mr-2 h-4 w-4" />
                                {dateFilter === "all" && "All Dates"}
                                {dateFilter === "recent" && "Recent"}
                                {dateFilter === "oldest" && "Oldest"}
                                {dateFilter === "thisMonth" && "This Month"}
                                {dateFilter === "lastMonth" && "Last Month"}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)]">
                            <DropdownMenuLabel className="text-[var(--muted-foreground)]">Sort & Filter by Date</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-[var(--theme-border)]" />
                            <DropdownMenuRadioGroup value={dateFilter} onValueChange={(value) => setDateFilter(value as DateFilterOption)}>
                                <DropdownMenuRadioItem value="all" className="text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20">
                                    All Dates
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="recent" className="text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20">
                                    Recent (Newest First)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="oldest" className="text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20">
                                    Oldest (Oldest First)
                                </DropdownMenuRadioItem>
                                <DropdownMenuSeparator className="bg-[var(--theme-border)]" />
                                <DropdownMenuRadioItem value="thisMonth" className="text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20">
                                    This Month
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="lastMonth" className="text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20">
                                    Last Month
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[var(--theme-dark-secondary)] border-[var(--theme-border)]">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize text-[var(--foreground)] focus:bg-[var(--theme-accent)]/20"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border border-[var(--theme-border)] bg-[var(--theme-dark-secondary)]/30">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b border-[var(--theme-border)] hover:bg-[var(--theme-accent)]/5">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-[var(--muted-foreground)]">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-[var(--theme-border)] hover:bg-[var(--theme-accent)]/5"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-[var(--foreground)]">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-[var(--muted-foreground)]"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-[var(--muted-foreground)]">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="glass-effect bg-transparent border-[var(--theme-border)] text-[var(--foreground)]"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
