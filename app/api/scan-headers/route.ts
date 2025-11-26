import { NextRequest, NextResponse } from 'next/server'

// Define types
interface HeaderAnalysis {
    name: string
    status: "implemented" | "partial" | "missing"
    value?: string
    risk: string
    recommendation: string
    impact: "high" | "medium" | "low"
    category: "content-security" | "transport-security" | "authentication" | "privacy"
}

interface ScanResult {
    score: number
    domain: string
    headers: HeaderAnalysis[]
    scanDate: string
    responseTime: number
    serverInfo: string
    recommendations: number
    criticalIssues: number
    ipAddress?: string
    sslGrade?: string
}

// Security header definitions
const securityHeaders = [
    {
        name: "Content-Security-Policy",
        check: (value: string) => value && value.length > 10, // Basic check for meaningful CSP
        risk: "Missing CSP allows XSS attacks and content injection",
        recommendation: "Implement comprehensive CSP with strict directives: default-src 'self'; script-src 'self'",
        impact: "high" as const,
        category: "content-security" as const
    },
    {
        name: "Strict-Transport-Security",
        check: (value: string) => value && value.includes('max-age=') && parseInt(value.split('max-age=')[1]) >= 31536000,
        risk: "Without HSTS, sites vulnerable to SSL stripping attacks",
        recommendation: "Set HSTS with max-age=31536000; includeSubDomains; preload",
        impact: "high" as const,
        category: "transport-security" as const
    },
    {
        name: "X-Content-Type-Options",
        check: (value: string) => value && value.toLowerCase() === 'nosniff',
        risk: "MIME type sniffing can lead to security issues and XSS",
        recommendation: "Set X-Content-Type-Options to nosniff",
        impact: "medium" as const,
        category: "content-security" as const
    },
    {
        name: "X-Frame-Options",
        check: (value: string) => value && ['deny', 'sameorigin'].includes(value.toLowerCase()),
        risk: "Clickjacking attacks possible without frame protection",
        recommendation: "Set X-Frame-Options to DENY or SAMEORIGIN",
        impact: "medium" as const,
        category: "content-security" as const
    },
    {
        name: "X-XSS-Protection",
        check: (value: string) => value && value.includes('1; mode=block'),
        risk: "Browser XSS protection not properly enforced",
        recommendation: "Set X-XSS-Protection to 1; mode=block",
        impact: "low" as const,
        category: "content-security" as const
    },
    {
        name: "Referrer-Policy",
        check: (value: string) => value && value.length > 0,
        risk: "Sensitive data leakage through referrer headers",
        recommendation: "Implement strict referrer policy like 'strict-origin-when-cross-origin'",
        impact: "medium" as const,
        category: "privacy" as const
    },
    {
        name: "Permissions-Policy",
        check: (value: string) => value && value.length > 0,
        risk: "No control over browser features and APIs",
        recommendation: "Implement Permissions-Policy to restrict sensitive features",
        impact: "medium" as const,
        category: "privacy" as const
    },
    {
        name: "Cache-Control",
        check: (value: string) => value && (value.includes('no-cache') || value.includes('no-store') || value.includes('private')),
        risk: "Improper caching may expose sensitive data",
        recommendation: "Implement secure caching policies for sensitive pages",
        impact: "low" as const,
        category: "privacy" as const
    }
]

async function performSecurityScan(domain: string): Promise<ScanResult> {
    const startTime = Date.now()

    // Normalize domain
    let targetUrl = domain
    if (!domain.startsWith('http')) {
        targetUrl = `https://${domain}`
    }

    console.log(`Scanning: ${targetUrl}`)

    try {
        // Make the HTTP request
        const response = await fetch(targetUrl, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; SafeGrey-Scanner/1.0; +https://safegrey.com)',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            },
            // Add timeout
            signal: AbortSignal.timeout(15000) // 15 second timeout
        })

        const responseTime = Date.now() - startTime
        const headers = Object.fromEntries(response.headers.entries())

        return analyzeHeaders(headers, domain, responseTime)
    } catch (error: any) {
        console.error('Scan error:', error)

        // Throw specific errors that the route handler can convert to HTTP status codes
        if (error.cause?.code === 'ENOTFOUND' || error.cause?.code === 'EAI_AGAIN') {
            throw new Error('DOMAIN_NOT_FOUND')
        }
        if (error.name === 'TimeoutError') {
            throw new Error('TIMEOUT')
        }

        throw error
    }
}

function analyzeHeaders(headers: Record<string, string>, domain: string, responseTime: number): ScanResult {
    const analysis: ScanResult = {
        score: 0,
        domain,
        headers: [],
        scanDate: new Date().toISOString(),
        responseTime,
        serverInfo: headers['server'] || headers['x-powered-by'] || 'Unknown',
        recommendations: 0,
        criticalIssues: 0
    }

    let implementedCount = 0

    securityHeaders.forEach(headerDef => {
        // Case-insensitive header lookup
        const headerValue = headers[headerDef.name.toLowerCase()] || headers[headerDef.name]
        const isImplemented = headerValue ? headerDef.check(headerValue) : false

        if (isImplemented) implementedCount++

        analysis.headers.push({
            name: headerDef.name,
            status: isImplemented ? "implemented" : "missing",
            value: headerValue || undefined,
            risk: headerDef.risk,
            recommendation: headerDef.recommendation,
            impact: headerDef.impact,
            category: headerDef.category
        })
    })

    // Calculate score
    analysis.score = Math.round((implementedCount / securityHeaders.length) * 100)
    analysis.criticalIssues = analysis.headers.filter(h => h.impact === 'high' && h.status !== 'implemented').length
    analysis.recommendations = analysis.headers.filter(h => h.status !== 'implemented').length

    return analysis
}

export async function POST(request: NextRequest) {
    try {
        const { domain } = await request.json()

        if (!domain) {
            return NextResponse.json(
                { error: 'Domain is required' },
                { status: 400 }
            )
        }

        // Basic domain validation
        const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/
        const cleanDomain = domain.replace(/^https?:\/\//, '').split('/')[0]

        if (!domainRegex.test(cleanDomain)) {
            return NextResponse.json(
                { error: 'Invalid domain format' },
                { status: 400 }
            )
        }

        // Perform the security scan
        const scanResult = await performSecurityScan(cleanDomain)

        return NextResponse.json(scanResult)
    } catch (error: any) {
        console.error('API Error:', error)

        if (error.message === 'DOMAIN_NOT_FOUND') {
            return NextResponse.json(
                { error: 'Domain not found or unreachable. Please check the URL.' },
                { status: 404 }
            )
        }

        if (error.message === 'TIMEOUT') {
            return NextResponse.json(
                { error: 'Scan timed out. The server took too long to respond.' },
                { status: 504 }
            )
        }

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    })
}