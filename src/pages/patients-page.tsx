"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { PatientsList } from "@/components/patients-list"
import { PatientModal } from "@/components/patient-modal"

interface PatientsPageProps {
  isLoggedIn: boolean
  onRequireLogin: () => void
}

export function PatientsPage({ isLoggedIn, onRequireLogin }: PatientsPageProps) {
  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "Rex",
      species: "Cachorro",
      breed: "Labrador",
      owner: "João Silva",
      phone: "(11) 98765-4321",
      age: 5,
      weight: 32.5,
    },
    {
      id: "2",
      name: "Miau",
      species: "Gato",
      breed: "Persa",
      owner: "Maria Santos",
      phone: "(11) 99876-5432",
      age: 3,
      weight: 4.2,
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSave = (patient: any) => {
    if (editingId) {
      setPatients(patients.map((p) => (p.id === editingId ? { ...patient, id: editingId } : p)))
    } else {
      setPatients([...patients, { ...patient, id: Date.now().toString() }])
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
    setPatients(patients.filter((p) => p.id !== id))
  }

  const handleAddPatient = () => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setEditingId(null)
    setIsModalOpen(true)
  }

  const patientToEdit = patients.find((p) => p.id === editingId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                Meus Pacientes
              </h2>
              <p className="text-lg text-foreground/60">
                Gerenciamento e acompanhamento de todos os animais da clínica
              </p>
            </div>
            <Button
              onClick={handleAddPatient}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-6 py-6 h-auto text-base"
            >
              <Plus size={20} />
              Adicionar Paciente
            </Button>
          </div>
        </div>

        <PatientsList
          patients={patients}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoggedIn={isLoggedIn}
          onRequireLogin={onRequireLogin}
        />
      </div>

      {isModalOpen && (
        <PatientModal
          patient={patientToEdit}
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
