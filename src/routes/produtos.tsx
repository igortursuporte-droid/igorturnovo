import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/produtos')({
  component: ProdutosPage,
})

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function ProdutosPage() {
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setMessage(null)

    const { error } = await supabase.from('categories').insert({
      name: name.trim(),
      slug: slugify(name),
      description: description.trim() || null,
      status: 'rascunho',
    })

    setSaving(false)

    if (error) {
      setMessage('Erro ao salvar: ' + error.message)
      return
    }

    setMessage('Categoria cadastrada com sucesso.')
    setName('')
    setDescription('')
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          {showForm ? 'Cancelar' : 'Cadastrar categoria'}
        </button>
      </div>

      {message && (
        <p className="rounded-md border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
          {message}
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6"
        >
          <h2 className="text-lg font-semibold">Nova categoria</h2>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Nome
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border border-border px-3 py-2"
              placeholder="Ex: Passeios de barco"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px] rounded-md border border-border px-3 py-2"
              placeholder="Descrição opcional"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="self-start rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-60"
          >
            {saving ? 'Salvando...' : 'Salvar categoria'}
          </button>
        </form>
      )}
    </div>
  )
}
