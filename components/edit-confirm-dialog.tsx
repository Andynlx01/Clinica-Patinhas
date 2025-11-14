"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface EditConfirmDialogProps {
  onConfirm: () => void
}

export function EditConfirmDialog({ onConfirm }: EditConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl max-w-sm w-full border border-border">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4">
            <Check className="text-primary" size={24} />
          </div>
          <h2 className="text-lg font-bold text-foreground text-center mb-2">Sucesso!</h2>
          <p className="text-foreground/70 text-center mb-6">Dados alterados com sucesso! ✓</p>

          <Button onClick={onConfirm} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
