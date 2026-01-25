import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

export function TeamSection() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/placeholder-user.jpg",
      color: "bg-[var(--theme-accent)]", // Red
      textColor: "text-white",
      description: "Former NSA cybersecurity analyst with 15+ years of experience."
    },
    {
      name: "Marcus ",
      role: "CTO & Co-Founder",
      image: "/placeholder-user.jpg",
      color: "bg-white", // White
      textColor: "text-black",
      description: "Ex-Google security engineer specializing in AI-powered threat detection."
    },
    {
      name: "Dr. Emily Watson",
      role: "Head",
      image: "/placeholder-user.jpg",
      color: "bg-black", // Black
      textColor: "text-white",
      description: "PhD in Computer Security with expertise in nation-state attack patterns."
    },
    {
      name: "James Park",
      role: "Director of Incident Response",
      image: "/placeholder-user.jpg",
      color: "bg-[var(--theme-accent)]", // Red
      textColor: "text-white",
      description: "Former FBI cybercrime investigator"
    },
    {
      name: "Alex Rivera",
      role: "Head of Operations",
      image: "/placeholder-user.jpg",
      color: "bg-white", // Red
      textColor: "text-black",
      description: "Former FBI cybercrime investigator with extensive experience in digital forensics."
    },
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/placeholder-user.jpg",
      color: "bg-black", // Red
      textColor: "text-white",
      description: "Former NSA cybersecurity analyst with 15+ years of experience."
    },
  ]

  // Array of artistic "blob" shapes
  const shapes = [
    "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
    "rounded-[50%_50%_20%_80%/25%_80%_20%_75%]",
    "rounded-[70%_30%_50%_50%/30%_30%_70%_70%]",
    "rounded-[30%_70%_70%_30%/30%_30%_70%_70%]",
    "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
    "rounded-[50%_50%_70%_30%/50%_20%_80%_50%]"
  ];

  return (
    <section className="pb-10 px-8 lg:px-16 relative bg-[var(--theme-dark-base)] overflow-hidden" id="team">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--theme-accent)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
            Our Team
          </h2>
          {/* <div className="h-2 w-24 bg-[var(--theme-accent)] mx-auto rounded-full mb-6" /> */}
          <p className="text-xl text-[var(--theme-text-secondary)] max-w-3xl mx-auto font-light">
            The minds behind the shield. Veterans, researchers, and strategists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 pb-16">
          {team.map((member, index) => {
            const shapeClass = shapes[index % shapes.length];
            return (
              <div key={index} className="group relative">
                {/* Backing 'Brush Stroke' / Shadow Element */}
                <div
                  className={`absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] opacity-50 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6 ${member.color === "bg-black" ? "bg-[var(--theme-accent)]" : "bg-black"
                    }`}
                />

                {/* Main Card */}
                <div className={`relative h-[500px] rounded-[2rem] p-8 flex flex-col items-center text-center transition-transform duration-300 group-hover:-translate-y-2 overflow-hidden ${member.color}`}>

                  {/* Decorative Pattern overlay */}
                  <div className={`absolute inset-0 opacity-15 bg-[url('/noise.png')] ${member.color === "bg-white" ? "mix-blend-multiply" : "mix-blend-overlay"
                    }`} />

                  {/* Image Container with 'Brush' Mask Look */}
                  <div className="relative w-48 h-48 mb-8 mx-auto transform transition-transform duration-500 group-hover:scale-110">
                    <div className={`absolute inset-0 bg-current opacity-20 rotate-6 ${shapeClass}`} />
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`relative w-full h-full object-cover shadow-xl ${shapeClass}`}
                    />
                  </div>

                  {/* Content */}
                  <div className={`relative z-10 flex-1 flex flex-col justify-between ${member.textColor}`}>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 font-sans tracking-tight uppercase">{member.name}</h3>
                      <div className={`text-sm font-bold uppercase tracking-widest mb-4 opacity-80 border-b-2 inline-block pb-1 ${member.textColor === "text-white" ? "border-white/30" : "border-black/30"
                        }`}>
                        {member.role}
                      </div>
                      <p className={`text-base font-medium leading-relaxed opacity-90 line-clamp-3`}>
                        {member.description}
                      </p>
                    </div>

                    {/* Socials */}
                    <div className="flex justify-center gap-4 mt-6">
                      <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${member.color === "bg-white"
                        ? "bg-black text-white hover:bg-[var(--theme-accent)]"
                        : "bg-white text-black hover:bg-[var(--theme-accent)] hover:text-white"
                        }`}>
                        <Linkedin size={18} />
                      </button>
                      <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer ${member.color === "bg-white"
                        ? "bg-black text-white hover:bg-[var(--theme-accent)]"
                        : "bg-white text-black hover:bg-[var(--theme-accent)] hover:text-white"
                        }`}>
                        <Twitter size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
