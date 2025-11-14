"use client"
import { useState } from "react"
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface VaccinationModalProps {
  onClose: () => void
  onBook: (data: VaccinationData) => void
  requiresLogin: boolean
  onRequireLogin: () => void
  onNavigateToAppointments: () => void
}

interface VaccinationData {
  petName: string
  animalSize: string
  breed: string
  weight: string
  vaccine: string
  price: number
  date: string
}

interface VaccineOption {
  id: string
  name: string
  basePrices: {
    pequeno: number
    medio: number
    grande: number
  }
  description: string
  protection: string[]
}

export function VaccinationModal({ onClose, onBook, requiresLogin, onRequireLogin, onNavigateToAppointments }: VaccinationModalProps) {
  const [step, setStep] = useState(1)
  const [petName, setPetName] = useState("")
  const [animalSize, setAnimalSize] = useState("medio")
  const [breed, setBreed] = useState("")
  const [weight, setWeight] = useState("")
  const [selectedVaccine, setSelectedVaccine] = useState("v10")
  const [appointmentDate, setAppointmentDate] = useState("")

  const vaccines: VaccineOption[] = [
    {
      id: "v10",
      name: "Vacina V10",
      basePrices: { pequeno: 75, medio: 85, grande: 95 },
      description: "Proteção contra 10 doenças principais",
      protection: ["Cinomose", "Parvovirose", "Traqueobronquite", "Leptospirose"],
    },
    {
      id: "v8",
      name: "Vacina V8",
      basePrices: { pequeno: 65, medio: 75, grande: 85 },
      description: "Proteção contra 8 doenças principais",
      protection: ["Cinomose", "Parvovirose", "Traqueobronquite"],
    },
    {
      id: "raiva",
      name: "Vacina Antirrábica",
      basePrices: { pequeno: 50, medio: 60, grande: 70 },
      description: "Proteção contra raiva",
      protection: ["Raiva"],
    },
    {
      id: "leishmaniose",
      name: "Vacina Leishmaniose",
      basePrices: { pequeno: 120, medio: 140, grande: 160 },
      description: "Proteção contra leishmaniose visceral",
      protection: ["Leishmaniose"],
    },
    {
      id: "tosse",
      name: "Vacina Tosse dos Canis",
      basePrices: { pequeno: 80, medio: 90, grande: 100 },
      description: "Proteção contra tosse dos canis",
      protection: ["Traqueobronquite"],
    },
    {
      id: "bordetela",
      name: "Vacina Bordetela",
      basePrices: { pequeno: 70, medio: 80, grande: 90 },
      description: "Proteção contra Bordetella bronchiseptica",
      protection: ["Bordetella"],
    },
  ]

  const getCurrentPrice = () => {
    const vaccine = vaccines.find((v) => v.id === selectedVaccine)
    return vaccine ? vaccine.basePrices[animalSize as keyof typeof vaccine.basePrices] : 0
  }

  const handleBook = () => {
    if (requiresLogin) {
      onRequireLogin()
      return
    }

    if (!petName || !breed || !weight || !appointmentDate) {
      alert("Por favor, preencha todos os campos")
      return
    }

    onBook({
      petName,
      animalSize,
      breed,
      weight,
      vaccine: selectedVaccine,
      price: getCurrentPrice(),
      date: appointmentDate,
    })

    onClose()
  }

  const handleConsultVaccines = () => {
    onNavigateToAppointments()
    onClose()
  }

  const vaccine = vaccines.find((v) => v.id === selectedVaccine)
  const currentPrice = getCurrentPrice()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-foreground/60 hover:text-foreground transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          <h2 className="text-3xl font-bold text-primary mb-6">Marcar Vacinação</h2>

          {step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Informações do Animal</label>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Nome do animal"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full"
                  />

                  <select
                    value={animalSize}
                    onChange={(e) => setAnimalSize(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pequeno">Pequeno (até 10kg)</option>
                    <option value="medio">Médio (10-25kg)</option>
                    <option value="grande">Grande (acima de 25kg)</option>
                  </select>

                  <Input
                    type="text"
                    placeholder="Raça"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full"
                  />

                  <Input
                    type="number"
                    placeholder="Peso (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Continuar
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Selecione a Vacina</label>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {vaccines.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVaccine(v.id)}
                      className={`w-full p-4 rounded-lg text-left border-2 transition-all ${
                        selectedVaccine === v.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{v.name}</h4>
                        <span className="text-accent font-bold text-lg">
                          R$ {v.basePrices[animalSize as keyof typeof v.basePrices]}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70 mb-2">{v.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {v.protection.map((p) => (
                          <span key={p} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            {p}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Data da Consulta</label>
                <Input
                  type="datetime-local"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground font-semibold">Vacina Selecionada:</span>
                  <span className="text-foreground">{vaccine?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground font-semibold">Porte do Animal:</span>
                  <span className="text-foreground capitalize">{animalSize}</span>
                </div>
                <div className="border-t border-primary/30 pt-2 mt-2 flex justify-between items-center">
                  <span className="text-foreground font-bold">Preço Total:</span>
                  <span className="text-accent text-2xl font-bold">R$ {currentPrice}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Voltar
                </Button>
                <Button
                  onClick={handleBook}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  {requiresLogin ? "Fazer Login para Continuar" : "Confirmar Vacinação"}
                </Button>
                <Button
                  onClick={handleConsultVaccines}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  Consultar Minhas Vacinações
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
