import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold text-foreground">Big World</h1>
      <p className="text-muted-foreground">Painel do sistema de viagens.</p>
      <Link
        to="/produtos"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Ir para Produtos
      </Link>
    </div>
  )
}
