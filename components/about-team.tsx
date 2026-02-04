"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Globe, MapPin } from "lucide-react";

export function AboutTeam() {
    const team = [
        {
            name: "Sarah Chen",
            role: "CEO & Co-Founder",
            image: "/placeholder-user.jpg",
            location: "Washington, D.C., USA",
            description: "Leads the vision and strategy while building a strong and innovative culture in cybersecurity."
        },
        {
            name: "Marcus Thorne",
            role: "CTO & Co-Founder",
            image: "/placeholder-user.jpg",
            location: "San Francisco, USA",
            description: "Ex-Google security engineer specializing in AI-powered threat detection and orchestration."
        },
        {
            name: "Dr. Emily Watson",
            role: "Head of Research",
            image: "/placeholder-user.jpg",
            location: "London, UK",
            description: "PhD in Computer Security with expertise in nation-state attack patterns and defense."
        },
        {
            name: "James Park",
            role: "Director of IR",
            image: "/placeholder-user.jpg",
            location: "Seoul, South Korea",
            description: "Former FBI cybercrime investigator with a focus on incident response and forensics."
        },
        {
            name: "Alex Rivera",
            role: "Head of Operations",
            image: "/placeholder-user.jpg",
            location: "Madrid, Spain",
            description: "Managing global security operations and ensuring seamless delivery of our core services."
        },
        {
            name: "David Miller",
            role: "Lead Architect",
            image: "/placeholder-user.jpg",
            location: "Berlin, Germany",
            description: "Designing resilient infrastructures that stand against the most advanced modern threats."
        },
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--theme-dark-base)] relative overflow-hidden" id="about-team">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--theme-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
               

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden bg-white/[0.03] border border-white/5 backdrop-blur-md group hover:border-[var(--theme-accent)]/30 transition-all duration-500 hover:-translate-y-2 rounded-2xl">
                                <CardContent className="p-0 flex flex-col sm:flex-row h-full pl-5">
                                    {/* Left Side - Image */}
                                    <div className="w-full sm:w-2/5 h-72 sm:h-auto relative overflow-hidden border rounded-2xl ">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-dark-base)] sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[var(--theme-dark-base)]/20 pointer-events-none" />
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="w-full sm:w-3/5 p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="mb-6">
                                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[var(--theme-accent)] transition-colors duration-300">
                                                    {member.name}
                                                </h3>
                                                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--theme-accent)] opacity-80">
                                                    {member.role}
                                                </p>
                                            </div>

                                            <p className="text-[var(--theme-text-secondary)] text-base leading-relaxed mb-8 font-light italic">
                                                "{member.description}"
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                            {/* Location Tag */}
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                                                <MapPin size={14} className="text-[var(--theme-accent)]" />
                                                <span className="text-[11px] font-bold text-[var(--theme-text-secondary)] uppercase tracking-wider">
                                                    {member.location}
                                                </span>
                                            </div>

                                            {/* Social Icons */}
                                            <div className="flex items-center gap-1">
                                                <button className="p-2 text-white/30 hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 rounded-lg transition-all duration-300">
                                                    <Twitter size={18} />
                                                </button>
                                                <button className="p-2 text-white/30 hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 rounded-lg transition-all duration-300">
                                                    <Linkedin size={18} />
                                                </button>
                                                <button className="p-2 text-white/30 hover:text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 rounded-lg transition-all duration-300">
                                                    <Globe size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
