"use client"

import type React from "react"
import type { Veterinarian } from "@/types"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'

interface Appointment {
  id?: string
  patientName: string
  patientId: string
  date: string
  time: string
  veterinarian: string
  specialty: string
  diagnosis: string
  status: "scheduled" | "completed" | "cancelled"
  patientImage?: string
  imageFile?: File | null
}

interface AppointmentModalProps {
  appointment?: Appointment
  onSave: (appointment: Appointment) => void
  onClose: () => void
  veterinarians?: any[]
}

export function AppointmentModal({ appointment, onSave, onClose, veterinarians = [] }: AppointmentModalProps) {
  const [formData, setFormData] = useState<Appointment>(
    appointment || {
      patientName: "",
      patientId: "",
      date: "",
      time: "",
      veterinarian: "",
      specialty: "",
      diagnosis: "",
      status: "scheduled",
      patientImage: "",
      imageFile: undefined,
    },
  )

  const [patientImage, setPatientImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [filteredVeterinarians, setFilteredVeterinarians] = useState<any[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPatientImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSpecialtyChange = (specialty: string) => {
    setFormData({ ...formData, specialty, veterinarian: "" })
    
    const vetsBySpecialty = veterinarians.filter((v) => v.specialty === specialty)
    setFilteredVeterinarians(vetsBySpecialty)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const dataToSave = {
      ...formData,
      patientImage: imagePreview,
      imageFile: patientImage,
    }
    onSave(dataToSave)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">{appointment ? "Editar Consulta" : "Agendar Consulta"}</h2>
          <button onClick={onClose} aria-label="Fechar" title="Fechar" className="text-foreground/60 hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {}
          <div>
            <label htmlFor="patientImage" className="block text-sm font-medium text-foreground mb-2">Foto do Animal (Opcional)</label>
            <div className="relative group">
              <input
                id="patientImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                aria-label="Foto do animal"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center bg-background hover:bg-accent/5 transition-colors cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-20 h-20 rounded-lg mx-auto object-cover"
                    />
                    <p className="text-sm text-foreground/60">Clique para trocar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg
                      className="mx-auto h-8 w-8 text-foreground/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <p className="text-sm text-foreground/60">Clique para adicionar foto</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-foreground mb-2">Nome do Paciente</label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, patientName: e.target.value })}
              placeholder="Ex: Rex"
            />
          </div>

          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-foreground mb-2">Data</label>
            <Input
              id="appointmentDate"
              type="date"
              value={formData.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="appointmentTime" className="block text-sm font-medium text-foreground mb-2">Horário</label>
            <Input
              id="appointmentTime"
              type="time"
              value={formData.time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, time: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-foreground mb-2">Especialidade</label>
            <select
              id="specialty"
              value={formData.specialty}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSpecialtyChange(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="">Selecione uma especialidade</option>
              <option value="Clínica Geral">Clínica Geral</option>
              <option value="Dermatologia">Dermatologia</option>
              <option value="Cirurgia">Cirurgia</option>
              <option value="Oftalmologia">Oftalmologia</option>
              <option value="Ortopedia">Ortopedia</option>
              <option value="Cardiologia">Cardiologia</option>
            </select>
          </div>

          <div>
            <label htmlFor="veterinarian" className="block text-sm font-medium text-foreground mb-2">Veterinário</label>
            <select
              id="veterinarian"
              value={formData.veterinarian}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, veterinarian: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="">
                {formData.specialty ? "Selecione um veterinário" : "Selecione uma especialidade primeiro"}
              </option>
              {filteredVeterinarians.map((vet) => (
                <option key={vet.id} value={vet.name}>
                  {vet.name} - {vet.specialty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="diagnosis" className="block text-sm font-medium text-foreground mb-2">Diagnóstico</label>
            <textarea
              id="diagnosis"
              value={formData.diagnosis}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, diagnosis: e.target.value })}
              placeholder="Descreva o diagnóstico ou motivo da consulta"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "scheduled" | "completed" | "cancelled",
                })
              }
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="scheduled">Agendada</option>
              <option value="completed">Realizada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Salvar Consulta
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
