import { useNavigate } from 'react-router-dom'
import { Heart, Droplets, Scissors, Zap, Eye, Bluetooth as Tooth } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  const services = [
    {
      icon: Heart,
      name: 'Consultas',
      description: 'Avaliação clínica completa do seu pet',
      price: 'R$ 150,00',
    },
    {
      icon: Droplets,
      name: 'Vacinação',
      description: 'Proteção completa do seu animal',
      price: 'A partir de R$ 80,00',
    },
    {
      icon: Scissors,
      name: 'Banho e Tosa',
      description: 'Higiene e embelezamento profissional',
      price: 'A partir de R$ 100,00',
    },
    {
      icon: Zap,
      name: 'Cirurgia',
      description: 'Procedimentos cirúrgicos especializados',
      price: 'Consultar',
    },
    {
      icon: Eye,
      name: 'Ultrassom',
      description: 'Diagnóstico por imagem avançado',
      price: 'R$ 200,00',
    },
    {
      icon: Tooth,
      name: 'Limpeza Dental',
      description: 'Saúde bucal completa para seu pet',
      price: 'R$ 180,00',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Bem-vindo à Clínica Patinhas</h1>
          <p className="text-xl mb-8">Cuidado veterinário completo e profissional para seu pet</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Começar Agora
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.name} className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <p className="text-lg font-bold text-primary">{service.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-card border-t border-border py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-bold text-lg mb-2">Telefone</h3>
              <p>(83) 3333-0000</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Endereço</h3>
              <p>Rua das Patas, 123 - João Pessoa, PB</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Redes Sociais</h3>
              <p>@ClinicaPatinhas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
