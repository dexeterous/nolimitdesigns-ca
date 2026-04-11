import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="w-full px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-foreground">Designpro</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground hover:text-[#ff4f01] transition-colors">
            Home
          </a>
          <a href="#" className="text-foreground hover:text-[#ff4f01] transition-colors">
            About
          </a>
          <a href="#" className="text-foreground hover:text-[#ff4f01] transition-colors">
            Services
          </a>
          <a href="#" className="text-foreground hover:text-[#ff4f01] transition-colors">
            Portfolio
          </a>
          <a href="#" className="text-foreground hover:text-[#ff4f01] transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
        </div>
      </div>
    </header>
  )
}
