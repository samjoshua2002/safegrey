import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

export function BlogSection() {
  const blogPosts = [
    {
      title: "The Evolution of Ransomware: What to Expect in 2024",
      excerpt:
        "An in-depth analysis of emerging ransomware trends and how organizations can prepare for next-generation attacks.",
      author: "Sarah Chen",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Threat Intelligence",
      image: "/cybersecurity-ransomware-analysis.jpg",
    },
    {
      title: "Zero Trust Architecture: Implementation Best Practices",
      excerpt: "A comprehensive guide to implementing Zero Trust security models in modern enterprise environments.",
      author: "Marcus ",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Security Architecture",
      image: "/zero-trust-network-security.jpg",
    },
    {
      title: "AI-Powered Threat Detection: The Future is Now",
      excerpt:
        "How artificial intelligence is revolutionizing cybersecurity threat detection and response capabilities.",
      author: "Dr. Emily Watson",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "AI Security",
      image: "/ai-artificial-intelligence-cybersecurity.jpg",
    },
    {
      title: "Incident Response Playbook: Lessons from the Field",
      excerpt: "Real-world incident response scenarios and the critical steps that made the difference in containment.",
      author: "James Park",
      date: "February 28, 2024",
      readTime: "15 min read",
      category: "Incident Response",
      image: "/incident-response-cybersecurity-emergency.jpg",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of cyber threats with expert analysis and actionable insights from our security team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="glass-effect hover:glow-accent transition-all duration-300 group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs font-medium text-accent">
                    {post.category}
                  </span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-accent transition-colors">{post.title}</CardTitle>
                <CardDescription className="text-base">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <span>{post.readTime}</span>
                </div>

                <Button variant="ghost" className="p-0 h-auto group/btn">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="glass-effect bg-transparent">
            View All Blog Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
