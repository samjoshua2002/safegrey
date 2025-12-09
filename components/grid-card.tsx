"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export function GridCard() {
    const spotlightRef = useRef<HTMLElement>(null)
    const imagesRef = useRef<HTMLDivElement[]>([])

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const spotlightImgFinalPos = [
            [-140, -140],
            [40, -130],
            [-160, 40],
            [20, 30],
        ]

        const spotlightImages = imagesRef.current

        // Pin the spotlight container
        const scrollTrigger = ScrollTrigger.create({
            trigger: spotlightRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 6}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress
                const initialRotations = [5, -3, 3.5, -1]
                const phase1Startoffsets = [0, 0.1, 0.2, 0.3]

                spotlightImages.forEach((img, index) => {
                    if (!img) return

                    const initialRotation = initialRotations[index]
                    const phase1Start = phase1Startoffsets[index]
                    const phase1End = Math.min(
                        phase1Start + (0.45 - phase1Start) * 0.9,
                        0.45
                    )
                    let x = -50
                    let y, rotation
                    const phaseTwoStartOffsets = [0.5, 0.55, 0.6, 0.65]
                    const phase2Start = phaseTwoStartOffsets[index]
                    const phase2End = Math.min(
                        phase2Start + (0.95 - phase2Start) * 0.9,
                        0.95
                    )
                    const finalX = spotlightImgFinalPos[index][0]
                    const finalY = spotlightImgFinalPos[index][1]

                    // Phase 1: Images slide up from bottom (0 -> 0.45)
                    if (progress < phase1Start) {
                        y = 200
                        rotation = initialRotation
                    } else if (progress <= 0.45) {
                        let phase1Progress
                        if (progress >= phase1End) {
                            phase1Progress = 1
                        } else {
                            const linearProgress =
                                (progress - phase1Start) / (phase1End - phase1Start)
                            phase1Progress = 1 - Math.pow(1 - linearProgress, 3)
                        }
                        y = 200 - phase1Progress * 250
                        rotation = initialRotation
                    }
                    // Phase 2: Images move to final positions (0.5 -> 0.95)
                    else if (progress >= phase2Start && progress <= 0.95) {
                        let phase2Progress
                        if (progress >= phase2End) {
                            phase2Progress = 1
                        } else {
                            const linearProgress =
                                (progress - phase2Start) / (phase2End - phase2Start)
                            phase2Progress = 1 - Math.pow(1 - linearProgress, 3)
                        }
                        x = -50 + (finalX + 50) * phase2Progress
                        y = -50 + (finalY + 50) * phase2Progress
                        rotation = initialRotation * (1 - phase2Progress)
                    }
                    // Phase 3: Final position (0.95+)
                    else if (progress > 0.95) {
                        x = finalX
                        y = finalY
                        rotation = 0
                    }
                    // Between phases (0.45 -> 0.5)
                    else {
                        y = -50
                        rotation = initialRotation
                    }

                    gsap.set(img, {
                        transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
                    })
                })
            },
        })

        return () => {
            scrollTrigger.kill()
        }
    }, [])

    const images = [
        "/gridcard/img_3.jpg",
        "/gridcard/img_1.jpg",
        "/gridcard/img_4.jpg",
        "/gridcard/img_1.jpg",
    ]

    return (
        <>
         

            {/* Spotlight Section */}
            <section
                ref={spotlightRef}
               className="relative w-full h-screen px-4 flex items-center justify-center overflow-hidden bg-white"
            >
                <h1 className="w-full md:w-1/2 mx-auto text-center text-black text-[clamp(2rem,10vw,5rem)] font-medium tracking-tight leading-[0.9] relative z-0">
                    time stretches differently inside this{" "}
                    <span className="text-black">frame</span>.
                </h1>
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                if (el) imagesRef.current[index] = el
                            }}
                            className="absolute top-1/2 left-1/2 w-[clamp(20rem,25vw,40rem)] aspect-[7/5] rounded-lg overflow-hidden will-change-transform border border-[var(--theme-border)] shadow-lg"
                            style={{ transform: "translate(-50%, 200%)" }}
                        >
                            <Image
                                src={src}
                                alt={`Spotlight image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1000px) 100vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Outro Section */}
            {/* <section className="relative w-full h-screen px-4 flex items-center justify-center overflow-hidden bg-[var(--theme-dark-base)]">
                <h1 className="w-full md:w-1/2 mx-auto text-center text-[var(--theme-text-primary)] text-[clamp(2rem,10vw,5rem)] font-medium tracking-tight leading-[0.9]">
                    we make visuals breathe with{" "}
                    <span className="text-gradient">quiet precision</span>
                </h1>
            </section> */}
        </>
    )
}
