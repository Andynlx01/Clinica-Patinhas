import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Página não encontrada</p>
      <p className="text-muted-foreground mb-8">A página que você está procurando não existe.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
      >
        Voltar ao Início
      </Link>
    </div>
  )
}
