import { useApi } from '../hooks/useApi'
import { patientService } from '../services/patient.service'
import { appointmentService } from '../services/appointment.service'
import { Users, Calendar } from 'lucide-react'

export default function DashboardPage() {
  // Dados de exemplo - serão substituídos por chamadas reais
  const stats = [
    { label: 'Total de Pacientes', value: '24', icon: Users },
    { label: 'Consultas Agendadas', value: '8', icon: Calendar },
  ]

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-card p-6 rounded-lg shadow border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                </div>
                <Icon className="w-12 h-12 text-primary/20" />
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-card p-6 rounded-lg shadow border border-border">
        <h2 className="text-xl font-bold mb-4">Próximas Consultas</h2>
        <p className="text-muted-foreground">Carregando dados...</p>
      </div>
    </div>
  )
}
