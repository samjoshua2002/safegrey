import { SecurityHeaderScanner } from "@/components/SecurityHeaderScanner"
import { Navigation } from "@/components/navigation"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Cybersecurity Tools",
    description: "Access Safegrey's suite of cybersecurity tools including our Security Header Scanner to assess your website's security posture.",
}

export default function ToolsPage() {
    return (
        <>
            <Navigation />
            <SecurityHeaderScanner />
        </>
    )
}
