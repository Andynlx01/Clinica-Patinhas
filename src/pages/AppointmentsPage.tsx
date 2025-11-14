import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { appointmentService } from '../services/appointment.service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppointmentSchema } from '../schemas'
import { Plus, X } from 'lucide-react'

type AppointmentInputs = {
  patientId: string
  veterinarianId: string
  serviceId: string
  scheduledDate: string
  notes?: string
}

export default function AppointmentsPage() {
  const [showModal, setShowModal] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentInputs>({
    resolver: zodResolver(AppointmentSchema),
  })

  const onSubmit = async (data: AppointmentInputs) => {
    await appointmentService.create(data)
    reset()
    setShowModal(false)
  }

  const handleCancel = async (id: string) => {
    if (confirm('Deseja cancelar esta consulta?')) {
      await appointmentService.cancel(id)
    }
  }

  const filteredAppointments = appointments.filter(apt =>
    apt.patient?.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Consultas</h1>
        <button
          onClick={() => {
            reset()
            setShowModal(true)
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus size={20} /> Nova Consulta
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Pesquisar por paciente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Nova Consulta</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Paciente</label>
                <select
                  {...register('patientId')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Selecionar</option>
                </select>
                {errors.patientId && <p className="text-destructive text-sm mt-1">{errors.patientId.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Veterinário</label>
                <select
                  {...register('veterinarianId')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Selecionar</option>
                </select>
                {errors.veterinarianId && <p className="text-destructive text-sm mt-1">{errors.veterinarianId.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Serviço</label>
                <select
                  {...register('serviceId')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Selecionar</option>
                </select>
                {errors.serviceId && <p className="text-destructive text-sm mt-1">{errors.serviceId.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Data e Hora</label>
                <input
                  {...register('scheduledDate')}
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.scheduledDate && <p className="text-destructive text-sm mt-1">{errors.scheduledDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Observações</label>
                <textarea
                  {...register('notes')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    reset()
                  }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                >
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center text-muted-foreground border border-border">
            Nenhuma consulta agendada
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{appointment.patient?.name}</h3>
                  <p className="text-muted-foreground">
                    {new Date(appointment.scheduledDate).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm mt-2">{appointment.service?.name}</p>
                </div>
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
