import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
          <Link to="/" className="font-semibold">
            Big World
          </Link>
          <Link
            to="/produtos"
            className="text-muted-foreground hover:text-foreground"
          >
            Produtos
          </Link>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
