"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from 'lucide-react'
import { AutocompleteSelect } from "@/components/autocomplete-select"

const SPECIES_OPTIONS = [
  "Cão",
  "Gato",
  "Coelho",
  "Hamster",
  "Passaro",
  "Tartaruga",
  "Peixe",
  "Porquinho da Índia",
  "Chinchila",
  "Ferret",
]

const BREED_BY_SPECIES: Record<string, string[]> = {
  Cão: [
    "Labrador",
    "Pastor Alemão",
    "Golden Retriever",
    "Bulldog",
    "Poodle",
    "Shih Tzu",
    "Dálmata",
    "Husky",
    "Beagle",
    "Pinscher",
  ],
  Gato: [
    "Persa",
    "Siamês",
    "Maine Coon",
    "Ragdoll",
    "Bengal",
    "Abissínio",
    "Birmanês",
    "Cornish Rex",
    "Sphynx",
    "Sem Raça Definida",
  ],
  Coelho: ["Holandês", "Angorá", "Líop", "Califórnia", "Gigante Flamengo"],
  Hamster: ["Sírio", "Russo", "Chinês", "Roborovski"],
  Passaro: ["Calopsita", "Papagaio", "Canário", "Periquito", "Tucano"],
  Tartaruga: ["Aquática", "Terrestre", "Grega"],
  Peixe: ["Betta", "Koi", "Guppy", "Acará", "Neon"],
  "Porquinho da Índia": ["Inglês", "Abissínio", "Coroado", "Texel"],
  Chinchila: ["Padrão", "Pele Negra"],
  Ferret: ["Doméstico"],
}

interface Patient {
  id?: string
  name: string
  species: string
  breed: string
  owner: string
  phone: string
  age: number
  weight: number
  image?: string
  imageFile?: File
}

interface PatientModalProps {
  patient?: Patient
  onSave: (patient: Patient) => void
  onClose: () => void
}

export function PatientModal({ patient, onSave, onClose }: PatientModalProps) {
  const [formData, setFormData] = useState<Patient>(
    patient || {
      name: "",
      species: "",
      breed: "",
      owner: "",
      phone: "",
      age: 0,
      weight: 0,
    },
  )

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(patient?.image || "")

  const availableBreeds = formData.species ? BREED_BY_SPECIES[formData.species] || [] : []

  const handleSpeciesChange = (species: string) => {
    setFormData({ ...formData, species, breed: "" })
  }

  const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, breed: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const patientData = {
      ...formData,
      image: imagePreview,
      imageFile,
    } as any
    onSave(patientData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-2xl shadow-xl max-w-md w-full border border-border max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-xl font-bold text-foreground">{patient ? "Editar Paciente" : "Novo Paciente"}</h2>
          <button onClick={onClose} className="text-foreground/60 hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Foto do Animal</label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
            <label className="block text-sm font-medium text-foreground mb-2">Nome do Animal</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Rex"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Espécie</label>
            <AutocompleteSelect
              options={SPECIES_OPTIONS}
              value={formData.species}
              onChange={handleSpeciesChange}
              placeholder="Selecione ou digite a espécie"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Raça</label>
            <Input
              type="text"
              value={formData.breed}
              onChange={handleBreedChange}
              placeholder="Digite a raça do pet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Proprietário</label>
            <Input
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="Nome do dono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(11) 98765-4321"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Idade (anos)</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Peso (kg)</label>
              <Input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: Number.parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Salvar Paciente
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
