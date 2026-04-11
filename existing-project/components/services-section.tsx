export function ServicesSection() {
  const services = [
    {
      title: "Subscribe",
      description: "Subscribe to a plan & request as many designs as you'd like.",
      icon: "📝",
    },
    {
      title: "Receive",
      description: "Receive your design within a few business days on average, Monday to Friday.",
      icon: "📨",
    },
    {
      title: "Continue",
      description: "Happy with your design? Great! If not, we'll continue to revise until you're 100% satisfied.",
      icon: "🔄",
    },
  ]

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-16 text-balance">We design. You grow</h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="space-y-4">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
