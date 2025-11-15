"use client"

import { useState } from "react"
import { Edit2, Trash2, Calendar, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Appointment {
  id: string
  patientName: string
  patientId: string
  date: string
  time: string
  veterinarian: string
  specialty: string
  diagnosis: string
  status: "scheduled" | "completed" | "cancelled"
  patientSpecies?: string
  patientImage?: string
}

interface AppointmentsListProps {
  appointments: Appointment[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isLoggedIn: boolean
  onRequireLogin: () => void
}

export function AppointmentsList({
  appointments,
  onEdit,
  onDelete,
  isLoggedIn,
  onRequireLogin,
}: AppointmentsListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return ""
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  const handleEditClick = (id: string) => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    onEdit(id)
  }

  const handleDeleteClick = (id: string) => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setConfirmDelete(id)
  }

  const getSpeciesImage = (species?: string) => {
    const speciesMap: { [key: string]: string } = {
      cachorro: "/dog-portrait.jpg",
      gato: "/cat-portrait.jpg",
      coelho: "/rabbit-portrait.jpg",
      pássaro: "/bird-portrait.jpg",
      hamster: "/hamster-portrait.jpg",
    }
    return speciesMap[species?.toLowerCase() || ""] || "/pet-portrait.jpg"
  }

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border-2 border-dashed border-border">
          <p className="text-foreground/60 text-lg">Nenhuma consulta encontrada</p>
        </div>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-card border border-border/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/30 overflow-hidden"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <img
                  src={appointment.patientImage || getSpeciesImage(appointment.patientSpecies) || "/placeholder.svg"}
                  alt={appointment.patientName}
                  className="w-24 h-24 rounded-xl object-cover shadow-md"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{appointment.patientName}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}
                  >
                    {appointment.status === "scheduled"
                      ? "Agendada"
                      : appointment.status === "completed"
                        ? "Realizada"
                        : "Cancelada"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-start gap-3 bg-background rounded-lg p-3">
                    <Calendar size={18} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-foreground/60 font-semibold">Data e Hora</p>
                      <p className="font-bold text-foreground text-sm">
                        {formatDate(appointment.date)} às {appointment.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-background rounded-lg p-3">
                    <User size={18} className="text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-foreground/60 font-semibold">Veterinário</p>
                      <p className="font-bold text-foreground text-sm">{appointment.veterinarian}</p>
                    </div>
                  </div>

                  <div className="bg-background rounded-lg p-3">
                    <p className="text-xs text-foreground/60 font-semibold">Especialidade</p>
                    <p className="font-bold text-foreground text-sm">{appointment.specialty}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-4 border border-border/30">
                  <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1">Diagnóstico</p>
                  <p className="text-foreground/80 font-medium">{appointment.diagnosis}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border/30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditClick(appointment.id)}
                className="flex items-center gap-2 border-primary/30 hover:bg-primary/5"
              >
                <Edit2 size={16} />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteClick(appointment.id)}
                className="flex items-center gap-2 text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                <Trash2 size={16} />
                Deletar
              </Button>
            </div>

            {confirmDelete === appointment.id && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 rounded-lg">
                <div className="bg-card rounded-2xl p-8 shadow-xl max-w-md w-full mx-4">
                  <h2 className="text-2xl font-bold text-foreground mb-4">Deletar Consulta</h2>
                  <p className="text-foreground/70 mb-8">
                    Tem certeza que deseja deletar a consulta de {appointment.patientName}? Esta ação não pode ser
                    desfeita.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setConfirmDelete(null)} className="flex-1">
                      Cancelar
                    </Button>
                    <Button
                      className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                      onClick={() => {
                        onDelete(appointment.id)
                        setConfirmDelete(null)
                      }}
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
