"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { UserIcon, Mail, Briefcase, Phone, MapPin } from 'lucide-react'
import { useApi } from "@/hooks/useApi"
import { authAPI, User } from "@/lib/api"

interface ProfilePageProps {
  user: User | null
  token?: string
  isLoggedIn: boolean
  onRequireLogin: () => void
}

export function ProfilePage({ user, token, isLoggedIn, onRequireLogin }: ProfilePageProps) {
  const [formData, setFormData] = useState<Partial<User>>({})
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const updateProfileApi = useApi(() => authAPI.updateProfile(formData, token))

  useEffect(() => {
    if (user) {
      setFormData(user)
    }
  }, [user])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-foreground/60 mb-4">Você precisa estar logado para acessar seu perfil</p>
          <Button onClick={onRequireLogin} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Fazer Login
          </Button>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    const { data, error } = await updateProfileApi.execute()
    if (error) {
      setMessage({ type: "error", text: error })
    } else {
      setMessage({ type: "success", text: "Perfil atualizado com sucesso" })
      setIsEditing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header com avatar */}
        <div className="mb-8 flex items-center gap-6 pb-8 border-b border-border">
          <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl">
            <UserIcon size={48} className="text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{formData.name || "Meu Perfil"}</h1>
            <p className="text-lg text-foreground/60">Gerenciar informações da conta</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar com infos rápidas */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-6">Informações da Conta</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <Mail size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-foreground/60">Email</p>
                    <p className="text-sm font-semibold text-foreground truncate">{formData.email || "Não informado"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <Briefcase size={20} className="text-accent" />
                  <div>
                    <p className="text-xs text-foreground/60">Cargo</p>
                    <p className="text-sm font-semibold text-foreground">{formData.role || "Não informado"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <Phone size={20} className="text-primary" />
                  <div>
                    <p className="text-xs text-foreground/60">Telefone</p>
                    <p className="text-sm font-semibold text-foreground">(83) 98765-4321</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                  <MapPin size={20} className="text-accent" />
                  <div>
                    <p className="text-xs text-foreground/60">Localidade</p>
                    <p className="text-sm font-semibold text-foreground">João Pessoa, PB</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                <p className="text-xs text-foreground/60 mb-2">Status da Conta</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-semibold text-green-600">Ativa</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Formulário principal */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {message && (
                <div
                  className={`mb-6 p-4 rounded-lg border-l-4 ${
                    message.type === "success" 
                      ? "bg-green-500/10 border-green-500 text-green-600" 
                      : "bg-red-500/10 border-red-500 text-red-600"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <h2 className="text-2xl font-bold text-foreground mb-8">Editar Informações</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <UserIcon size={16} className="text-primary" />
                      Nome Completo
                    </label>
                    <Input
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Digite seu nome"
                      className={!isEditing ? "bg-foreground/5" : ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Phone size={16} className="text-accent" />
                      Telefone
                    </label>
                    <Input
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="(83) 98765-4321"
                      className={!isEditing ? "bg-foreground/5" : ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Mail size={16} className="text-primary" />
                    Email
                  </label>
                  <Input 
                    value={formData.email || ""} 
                    disabled 
                    placeholder="seu.email@exemplo.com"
                    className="bg-foreground/5"
                  />
                  <p className="text-xs text-foreground/60 mt-2">O email não pode ser alterado</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Briefcase size={16} className="text-accent" />
                      Cargo
                    </label>
                    <Input 
                      value={formData.role || ""} 
                      disabled 
                      placeholder="Seu cargo"
                      className="bg-foreground/5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <MapPin size={16} className="text-primary" />
                      Cidade
                    </label>
                    <Input
                      value={formData.city || ""}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Sua cidade"
                      className={!isEditing ? "bg-foreground/5" : ""}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex gap-3 justify-end">
                  {isEditing ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData(user || {})
                        }}
                        className="px-8 bg-transparent"
                      >
                        Cancelar
                      </Button>
                      <Button 
                        type="submit" 
                        className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      >
                        {updateProfileApi.loading ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
