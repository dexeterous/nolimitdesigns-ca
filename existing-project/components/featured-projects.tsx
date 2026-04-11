import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedProjects() {
  const projects = [
    {
      title: "Create Winning Proposals in Minutes",
      image: "/business-proposal-creation-tool-interface.jpg",
      color: "bg-slate-900",
    },
    {
      title: "Empowering The Decentralized Future",
      image: "/blockchain-decentralized-platform-design.jpg",
      color: "bg-blue-500",
    },
    {
      title: "Turn Meetings Into Action",
      image: "/meeting-productivity-dashboard.jpg",
      color: "bg-slate-800",
    },
    {
      title: "Unique Playlist with AI",
      image: "/ai-music-streaming-interface.jpg",
      color: "bg-purple-600",
    },
  ]

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">Featured Projects</h2>
          <p className="text-muted-foreground">Some of our recent work that we're proud of.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`${project.color} h-64 relative overflow-hidden`}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-semibold text-lg leading-tight text-balance">{project.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
