"use client"

import { useState } from "react"
import { Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { EditConfirmDialog } from "@/components/edit-confirm-dialog"

interface Patient {
  id: string
  name: string
  species: string
  breed: string
  owner: string
  phone: string
  age: number
  weight: number
  photo?: string
}

interface PatientsListProps {
  patients: Patient[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isLoggedIn: boolean
  onRequireLogin: () => void
}

export function PatientsList({ patients, onEdit, onDelete, isLoggedIn, onRequireLogin }: PatientsListProps) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [confirmEdit, setConfirmEdit] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({})
  const [editedPatient, setEditedPatient] = useState<{ [key: string]: any }>({})

  const handleEditClick = (patient: Patient) => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setEditedPatient({
      ...editedPatient,
      [patient.id]: { ...patient },
    })
    setEditMode({
      ...editMode,
      [patient.id]: true,
    })
  }

  const handleEditConfirm = (id: string) => {
    setConfirmEdit(id)
  }

  const handleEditComplete = (id: string) => {
    setEditMode({
      ...editMode,
      [id]: false,
    })
    setConfirmEdit(null)
  }

  const handleDeleteClick = (id: string) => {
    if (!isLoggedIn) {
      onRequireLogin()
      return
    }
    setConfirmDelete(id)
  }

  const handleDelete = (id: string) => {
    onDelete(id)
    setConfirmDelete(null)
  }

  const getSpeciesImage = (species: string) => {
    const speciesMap: { [key: string]: string } = {
      cachorro: "/dog-portrait.jpg",
      gato: "/cat-portrait.jpg",
      coelho: "/rabbit-portrait.jpg",
      pássaro: "/bird-portrait.jpg",
      hamster: "/hamster-portrait.jpg",
    }
    return speciesMap[species.toLowerCase()] || "/pet-portrait.jpg"
  }

  return (
    <div className="space-y-4">
      {patients.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl border-2 border-dashed border-border">
          <p className="text-foreground/60 text-lg">Nenhum paciente registrado</p>
        </div>
      ) : (
        patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-card border border-border/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary/30"
          >
            {editMode[patient.id] ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-4">Editar Paciente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Nome</label>
                    <input
                      type="text"
                      value={editedPatient[patient.id]?.name || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], name: e.target.value },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Espécie</label>
                    <input
                      type="text"
                      value={editedPatient[patient.id]?.species || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], species: e.target.value },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Raça</label>
                    <input
                      type="text"
                      value={editedPatient[patient.id]?.breed || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], breed: e.target.value },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Idade</label>
                    <input
                      type="number"
                      value={editedPatient[patient.id]?.age || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], age: Number.parseInt(e.target.value) },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Proprietário</label>
                    <input
                      type="text"
                      value={editedPatient[patient.id]?.owner || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], owner: e.target.value },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Telefone</label>
                    <input
                      type="text"
                      value={editedPatient[patient.id]?.phone || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], phone: e.target.value },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground/70">Peso (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editedPatient[patient.id]?.weight || ""}
                      onChange={(e) =>
                        setEditedPatient({
                          ...editedPatient,
                          [patient.id]: { ...editedPatient[patient.id], weight: Number.parseFloat(e.target.value) },
                        })
                      }
                      className="w-full mt-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={getSpeciesImage(patient.species) || "/placeholder.svg"}
                    alt={patient.name}
                    className="w-28 h-28 rounded-xl object-cover shadow-md"
                  />
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Nome</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Espécie</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.species}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Raça</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.breed}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Idade</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.age} anos</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Proprietário</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Contato</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">Peso</p>
                    <p className="text-lg font-bold text-foreground mt-1">{patient.weight} kg</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
              {!editMode[patient.id] ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(patient)}
                    className="flex items-center gap-2 border-primary/30 hover:bg-primary/5"
                  >
                    <Edit2 size={16} />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(patient.id)}
                    className="flex items-center gap-2 text-destructive hover:bg-destructive/10 border-destructive/30"
                  >
                    <Trash2 size={16} />
                    Deletar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleEditConfirm(patient.id)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                  >
                    Confirmar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditMode({
                        ...editMode,
                        [patient.id]: false,
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </div>

            {confirmDelete === patient.id && (
              <ConfirmDialog
                title="Deletar Paciente"
                message={`Tem certeza que deseja deletar ${patient.name}? Esta ação não pode ser desfeita.`}
                onConfirm={() => handleDelete(patient.id)}
                onCancel={() => setConfirmDelete(null)}
              />
            )}

            {confirmEdit === patient.id && <EditConfirmDialog onConfirm={() => handleEditComplete(patient.id)} />}
          </div>
        ))
      )}
    </div>
  )
}
