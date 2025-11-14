import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { patientService } from '../services/patient.service'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PatientSchema } from '../schemas'
import { Plus, Trash2, Edit2 } from 'lucide-react'

type PatientInputs = {
  name: string
  species: string
  breed: string
  weight: number
  birthDate: string
  photo?: string
}

export default function PatientsPage() {
  const [showModal, setShowModal] = useState(false)
  const [patients, setPatients] = useState<any[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientInputs>({
    resolver: zodResolver(PatientSchema),
  })

  const onSubmit = async (data: PatientInputs) => {
    if (editingId) {
      await patientService.update(editingId, data)
      setEditingId(null)
    } else {
      await patientService.create(data)
    }
    reset()
    setShowModal(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este paciente?')) {
      await patientService.delete(id)
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Pacientes</h1>
        <button
          onClick={() => {
            setEditingId(null)
            reset()
            setShowModal(true)
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus size={20} /> Novo Paciente
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Editar Paciente' : 'Novo Paciente'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  {...register('name')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Espécie</label>
                <select
                  {...register('species')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">Selecionar</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="coelho">Coelho</option>
                  <option value="hamster">Hamster</option>
                  <option value="passaro">Pássaro</option>
                </select>
                {errors.species && <p className="text-destructive text-sm mt-1">{errors.species.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Raça</label>
                <input
                  {...register('breed')}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.breed && <p className="text-destructive text-sm mt-1">{errors.breed.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Peso (kg)</label>
                <input
                  {...register('weight', { valueAsNumber: true })}
                  type="number"
                  step="0.1"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.weight && <p className="text-destructive text-sm mt-1">{errors.weight.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Data de Nascimento</label>
                <input
                  {...register('birthDate')}
                  type="date"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {errors.birthDate && <p className="text-destructive text-sm mt-1">{errors.birthDate.message}</p>}
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
                  {editingId ? 'Atualizar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Espécie</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Raça</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Peso</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  Nenhum paciente cadastrado
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-muted/50 transition">
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.species}</td>
                  <td className="px-6 py-4">{patient.breed}</td>
                  <td className="px-6 py-4">{patient.weight} kg</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(patient.id)
                        setShowModal(true)
                      }}
                      className="p-2 hover:bg-primary/10 text-primary rounded transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
