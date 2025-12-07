"use client";

import * as React from "react";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
    FileText,
    Shield,
    Cloud,
    Server,
    Lock,
    Users,
    Wrench,
    Github,
    Home,
    Info,
    Phone,
    Handshake,
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

interface SearchCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
    const router = useRouter();

    const runCommand = React.useCallback((command: () => void) => {
        onOpenChange(false);
        command();
    }, [onOpenChange]);

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/"))}
                    >
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/about"))}
                    >
                        <Info className="mr-2 h-4 w-4" />
                        <span>About Us</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/services"))}
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Services</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/partners"))}
                    >
                        <Handshake className="mr-2 h-4 w-4" />
                        <span>Partners</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/tools"))}
                    >
                        <Wrench className="mr-2 h-4 w-4" />
                        <span>Tools</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() => runCommand(() => router.push("/contact"))}
                    >
                        <Phone className="mr-2 h-4 w-4" />
                        <span>Contact</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Security Assessment">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-assessment&tab=web-app"))
                        }
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Web Application Assessment</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-assessment&tab=mobile-app"))
                        }
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Mobile Application Assessment</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-assessment&tab=api"))
                        }
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>API Security Assessment</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-assessment&tab=network"))
                        }
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Network Assessment</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-assessment&tab=active-directory"))
                        }
                    >
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Active Directory Assessment</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Security Posture Assessment">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=posture-assessment&tab=phishing-campaign"))
                        }
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Phishing Campaign</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=posture-assessment&tab=mystery-guest"))
                        }
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Mystery Guest (Physical security)</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=posture-assessment&tab=assumed-breach"))
                        }
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Assumed Breach</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=posture-assessment&tab=red-team"))
                        }
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span>Traditional RedTeam</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Cloud Security">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=cloud-security&tab=cloud-infrastructure"))
                        }
                    >
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>Cloud Infrastructure Security Assessment</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=cloud-security&tab=container"))
                        }
                    >
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>Container Security Assessment</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=cloud-security&tab=kubernetes"))
                        }
                    >
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>Kubernetes Security Assessment</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Managed Security Services">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=manage-security&tab=siem"))
                        }
                    >
                        <Server className="mr-2 h-4 w-4" />
                        <span>SIEM Monitoring & Threat Detection</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=manage-security&tab=vulnerability"))
                        }
                    >
                        <Server className="mr-2 h-4 w-4" />
                        <span>Vulnerability Management</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=manage-security&tab=purple-team"))
                        }
                    >
                        <Server className="mr-2 h-4 w-4" />
                        <span>Purple Team</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Risk Management">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=risk-management&tab=iso27001"))
                        }
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>ISO 27001 Consulting</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=risk-management&tab=hipaa"))
                        }
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>HIPAA Compliance</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=risk-management&tab=gdpr"))
                        }
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>GDPR Consulting</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=risk-management&tab=soc"))
                        }
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        <span>SOC 1 / SOC 2 Readiness</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Security Enablement Services">
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-enablement&tab=subscriptions"))
                        }
                    >
                        <Users className="mr-2 h-4 w-4" />
                        <span>Security Subscriptions</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-enablement&tab=staffing"))
                        }
                    >
                        <Users className="mr-2 h-4 w-4" />
                        <span>Security Staffing</span>
                    </CommandItem>
                    <CommandItem
                        onSelect={() =>
                            runCommand(() => router.push("/services?section=security-enablement&tab=cryptx"))
                        }
                    >
                        <Users className="mr-2 h-4 w-4" />
                        <span>CryptX</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="External">
                    <CommandItem
                        onSelect={() => runCommand(() => window.open("https://github.com/", "_blank"))}
                    >
                        <Github className="mr-2 h-4 w-4" />
                        <span>GitHub</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
