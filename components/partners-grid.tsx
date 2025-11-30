import Image from "next/image"

export function PartnersGrid() {
    return (
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4">
                <div className="relative aspect-square lg:col-start-2 overflow-hidden rounded-lg border border-[var(--theme-border)] group">
                    <Image
                        src="https://placehold.co/500x500/1e1e1f/ae2012?text=Partner+1"
                        alt="Partner 1"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="relative aspect-square lg:col-start-4 overflow-hidden rounded-lg border border-[var(--theme-border)] group">
                    <Image
                        src="https://placehold.co/500x500/1e1e1f/ae2012?text=Partner+2"
                        alt="Partner 2"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="order-first py-12 lg:col-span-2 lg:order-none flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-4">
                        Explore our <span className="text-[var(--theme-accent)]">Strategic Partners</span>
                    </h2>
                    <p className="font-medium text-[var(--muted-foreground)] text-lg leading-relaxed">
                        A curated collection of industry leaders and innovators we collaborate with to deliver top-tier security solutions.
                    </p>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-lg border border-[var(--theme-border)] group">
                    <Image
                        src="https://placehold.co/500x500/1e1e1f/ae2012?text=Partner+3"
                        alt="Partner 3"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="relative aspect-square overflow-hidden rounded-lg border border-[var(--theme-border)] group">
                    <Image
                        src="https://placehold.co/500x500/1e1e1f/ae2012?text=Partner+4"
                        alt="Partner 4"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="relative aspect-square lg:col-start-2 overflow-hidden rounded-lg border border-[var(--theme-border)] group">
                    <Image
                        src="https://placehold.co/500x500/1e1e1f/ae2012?text=Partner+5"
                        alt="Partner 5"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="relative aspect-square lg:col-start-1 overflow-hidden rounded-lg border border-[var(--theme-border)] group">
                    <Image
                        src="https://placehold.co/500x500/1e1e1f/ae2012?text=Partner+6"
                        alt="Partner 6"
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                <div className="py-12 lg:col-span-2 lg:col-start-3 flex flex-col justify-center">
                    <p className="font-medium text-[var(--muted-foreground)] text-lg leading-relaxed mb-8">
                        Our smart contract automation feature simplifies complex business
                        processes by encoding contract terms and conditions into self-executing
                        code.
                    </p>
                    <button
                        className="relative flex items-center justify-center font-medium transition-all duration-300 ease-in-out select-none rounded-md text-[var(--foreground)] bg-[var(--theme-dark-secondary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 h-11 px-6 w-fit glow-accent"
                    >
                        Become a Partner
                    </button>
                </div>
            </div>
        </div>
    )
}
