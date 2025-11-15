"use client"

import { Button } from "@/components/ui/button"

interface ConfirmDialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg shadow-xl max-w-sm w-full border border-border">
        <div className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
          <p className="text-foreground/70 mb-6">{message}</p>

          <div className="flex gap-3">
            <Button
              onClick={onConfirm}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Deletar
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
