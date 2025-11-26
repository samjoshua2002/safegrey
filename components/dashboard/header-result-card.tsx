"use client"

import {
    CheckCircle,
    AlertTriangle,
    XCircle,
    Zap,
    AlertCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface HeaderResult {
    name: string
    status: "implemented" | "partial" | "missing"
    value?: string
    risk: string
    recommendation: string
    impact: "high" | "medium" | "low"
    category: "content-security" | "transport-security" | "authentication" | "privacy"
}

interface HeaderResultCardProps {
    header: HeaderResult
    index: number
}

export function HeaderResultCard({ header, index }: HeaderResultCardProps) {
    const getStatusIcon = (status: HeaderResult["status"]) => {
        switch (status) {
            case "implemented":
                return <CheckCircle className="h-5 w-5 text-emerald-500" />
            case "partial":
                return <AlertTriangle className="h-5 w-5 text-amber-500" />
            case "missing":
                return <XCircle className="h-5 w-5 text-red-500" />
        }
    }

    const getImpactColor = (impact: HeaderResult["impact"]) => {
        switch (impact) {
            case "high":
                return "text-red-500 border-red-500/20 bg-red-500/10"
            case "medium":
                return "text-amber-500 border-amber-500/20 bg-amber-500/10"
            case "low":
                return "text-blue-500 border-blue-500/20 bg-blue-500/10"
        }
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={`item-${index}`} className="border-0">
                <AccordionTrigger className="hover:no-underline hover:bg-muted/30 px-4 py-4 transition-colors">
                    <div className="flex items-center gap-4 overflow-hidden w-full">
                        <div className="flex-shrink-0">
                            {getStatusIcon(header.status)}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-sm truncate text-[var(--theme-text-primary)]">{header.name}</h4>
                                <Badge variant="outline" className={`text-[10px] h-5 px-1.5 uppercase ${getImpactColor(header.impact)}`}>
                                    {header.impact}
                                </Badge>
                            </div>
                            <p className="text-xs text-[var(--theme-text-secondary)] font-mono truncate mt-0.5 max-w-[300px] md:max-w-md text-left">
                                {header.value || "Not Set"}
                            </p>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4 pt-0">
                    <div className="pl-9 grid gap-4 md:grid-cols-2 text-sm">
                        <div className="space-y-1.5 p-3 rounded bg-red-500/5 border border-red-500/10">
                            <div className="flex items-center gap-2 text-red-500 font-medium text-xs uppercase tracking-wide">
                                <AlertCircle className="h-3 w-3" />
                                Risk Analysis
                            </div>
                            <p className="text-[var(--theme-text-secondary)] leading-relaxed">
                                {header.risk}
                            </p>
                        </div>

                        <div className="space-y-1.5 p-3 rounded bg-emerald-500/5 border border-emerald-500/10">
                            <div className="flex items-center gap-2 text-emerald-500 font-medium text-xs uppercase tracking-wide">
                                <Zap className="h-3 w-3" />
                                Recommendation
                            </div>
                            <p className="text-[var(--theme-text-secondary)] leading-relaxed">
                                {header.recommendation}
                            </p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
