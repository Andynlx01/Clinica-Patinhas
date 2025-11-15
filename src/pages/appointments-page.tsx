"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Plus } from "lucide-react"
import { AppointmentsList } from "@/components/appointments-list"
import { AppointmentModal } from "@/components/appointment-modal"

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
}

interface AppointmentsPageProps {
  isLoggedIn: boolean
  onRequireLogin: () => void
}

export function AppointmentsPage({ isLoggedIn, onRequireLogin }: AppointmentsPageProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      patientName: "Rex",
      patientId: "1",
      date: "2024-11-15",
      time: "14:00",
      veterinarian: "Dr. Carlos Silva",
      specialty: "Clínica Geral",
      diagnosis: "Vacinação anual de rotina",
      status: "scheduled",
      patientSpecies: "Cachorro",
    },
    {
      id: "2",
      patientName: "Miau",
      patientId: "2",
      date: "2024-11-20",
      time: "10:30",
      veterinarian: "Dra. Ana Costa",
      specialty: "Dermatologia",
      diagnosis: "Alopecia felina",
      status: "completed",
      patientSpecies: "Gato",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const filteredAppointments = appointments.filter((apt) =>
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSave = (appointment: Omit<Appointment, "id">) => {
    if (editingId) {
      setAppointments(appointments.map((a) => (a.id === editingId ? { ...appointment, id: editingId } : a)))
    } else {
      setAppointments([...appointments, { ...appointment, id: Date.now().toString() }])
    }
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleEdit = (id: string) => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setEditingId(id)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setAppointments(appointments.filter((a) => a.id !== id))
  }

  const handleAddAppointment = () => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setEditingId(null)
    setIsModalOpen(true)
  }

  const appointmentToEdit = appointments.find((a) => a.id === editingId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Calendar size={32} className="text-primary" />
              </div>
              <div>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
                  Consultas
                </h2>
                <p className="text-lg text-foreground/60">Agende, gerencie e acompanhe as consultas dos pacientes</p>
              </div>
            </div>
            <Button
              onClick={handleAddAppointment}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-6 py-6 h-auto text-base"
            >
              <Plus size={20} />
              Agendar Consulta
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Pesquisar paciente..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border-2 border-border/50 hover:border-primary/30 transition-colors text-base"
              />
              <svg
                className="absolute left-4 top-3.5 w-5 h-5 text-foreground/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <AppointmentsList
          appointments={filteredAppointments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoggedIn={isLoggedIn}
          onRequireLogin={onRequireLogin}
        />
      </div>

      {isModalOpen && (
        <AppointmentModal
          appointment={appointmentToEdit}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false)
            setEditingId(null)
          }}
        />
      )}
    </div>
  )
}
