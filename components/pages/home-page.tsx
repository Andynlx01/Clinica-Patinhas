"use client"
import { Footer } from "@/components/footer"
import { VaccinationModal } from "@/components/vaccination-modal"
import { useState } from "react"

interface HomePageProps {
  onNavigate: (page: string) => void
  isAuthenticated: boolean
  onShowLogin: () => void
}

export function HomePage({ onNavigate, isAuthenticated, onShowLogin }: HomePageProps) {
  const [showVaccinationModal, setShowVaccinationModal] = useState(false)

  const handleVaccinationClick = () => {
    if (!isAuthenticated) {
      onShowLogin()
    } else {
      setShowVaccinationModal(true)
    }
  }

  const handleVaccinationBook = (data: any) => {
    console.log("[v0] Vacinação marcada:", data)
    // API integration point
  }

  const services = [
    {
      title: "Consulta Geral",
      price: "R$ 150,00",
      description: "Avaliação completa de saúde do seu animal",
      image: "/dog-consultation-veterinary.jpg",
    },
    {
      title: "Vacinação",
      price: "R$ 80,00",
      description: "Vacinação com proteção contra doenças",
      image: "/vaccination-pet-clinic.jpg",
    },
    {
      title: "Banho e Tosa",
      price: "R$ 120,00",
      description: "Higiene e estética completa do pet",
      image: "/grooming-dog-bath.jpg",
    },
    {
      title: "Limpeza de Dentes",
      price: "R$ 200,00",
      description: "Higiene bucal profissional para o pet",
      image: "/dental-cleaning-pet.jpg",
    },
    {
      title: "Cirurgia",
      price: "R$ 500,00 +",
      description: "Procedimentos cirúrgicos com anestesia segura",
      image: "/pet-surgery-veterinary-clinic.jpg",
    },
    {
      title: "Ultrassom",
      price: "R$ 250,00",
      description: "Diagnóstico por imagem de alta precisão",
      image: "/ultrasound-diagnostic-veterinary.jpg",
    },
  ]

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-foreground">
                  Bem-vindo à{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Clinica Patinhas
                  </span>
                </h2>
                <p className="text-xl text-foreground/70 mb-8">
                  Cuidado profissional, acolhimento genuíno. Aqui seu pet é nossa prioridade.
                </p>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      onShowLogin()
                    } else {
                      onNavigate("appointments")
                    }
                  }}
                  data-allow-interaction
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 text-lg px-8 py-6 h-auto rounded-lg transition-colors"
                >
                  Agendar Consulta
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="relative">
                <img src="/happy-pets-in-veterinary-clinic.jpg" alt="Pets felizes" className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold mb-4 text-foreground">Nossos Serviços</h3>
              <p className="text-xl text-foreground/60">Tudo que seu pet precisa em um único lugar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold mb-2 text-foreground">{service.title}</h4>
                    <p className="text-accent font-bold text-xl mb-4">{service.price}</p>
                    <p className="text-foreground/70 mb-6">{service.description}</p>
                    <button
                      data-allow-interaction
                      onClick={() => {
                        if (!isAuthenticated) {
                          onShowLogin()
                        } else if (service.title === "Vacinação") {
                          handleVaccinationClick()
                        } else {
                          onNavigate("appointments")
                        }
                      }}
                      className="w-full border border-primary/30 hover:bg-primary/5 text-foreground px-4 py-2 rounded-lg transition-colors"
                    >
                      {service.title === "Vacinação" ? "Consultar Vacinas" : "Agendar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-16 text-foreground">Por que nos escolher?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">01</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">Equipe Experiente</h4>
                <p className="text-foreground/70">
                  Veterinários especializados com anos de experiência no cuidado animal
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">02</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">Equipamento Moderno</h4>
                <p className="text-foreground/70">
                  Tecnologia de ponta para diagnósticos precisos e tratamentos eficazes
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">03</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground">Ambiente Acolhedor</h4>
                <p className="text-foreground/70">Espaço tranquilo e seguro onde seu pet se sente confortável</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showVaccinationModal && (
        <VaccinationModal
          onClose={() => setShowVaccinationModal(false)}
          onBook={handleVaccinationBook}
          requiresLogin={!isAuthenticated}
          onRequireLogin={() => {
            setShowVaccinationModal(false)
            onShowLogin()
          }}
          onNavigateToAppointments={() => {
            setShowVaccinationModal(false)
            onNavigate("appointments")
          }}
        />
      )}

      <Footer />
    </div>
  )
}
