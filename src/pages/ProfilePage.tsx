import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const ProfileSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
})

type ProfileInputs = z.infer<typeof ProfileSchema>

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  const { register, handleSubmit, reset } = useForm<ProfileInputs>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  })

  const onSubmit = async (data: ProfileInputs) => {
    try {
      await updateProfile(data)
      setMessage('Perfil atualizado com sucesso')
      setIsEditing(false)
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Erro ao atualizar perfil')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Meu Perfil</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('sucesso') ? 'bg-green-500/10 text-green-700' : 'bg-destructive/10 text-destructive'}`}>
          {message}
        </div>
      )}

      <div className="bg-card p-8 rounded-lg border border-border max-w-md">
        {!isEditing ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="font-semibold">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="font-semibold">{user?.phone}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                {...register('name')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                {...register('phone')}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
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
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
