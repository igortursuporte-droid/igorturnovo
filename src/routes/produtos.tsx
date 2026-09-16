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
  const [imageUrl, setImageUrl] = useState('')
  const [icon, setIcon] = useState('')
  const [sortOrder, setSortOrder] = useState('0')
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
      image_url: imageUrl.trim() || null,
      icon: icon.trim() || null,
      sort_order: Number.isFinite(Number(sortOrder)) ? Number(sortOrder) : 0,
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
    setImageUrl('')
    setIcon('')
    setSortOrder('0')
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Cadastrar produto
          </button>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            {showForm ? 'Cancelar' : 'Cadastrar categoria'}
          </button>
        </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="image_url" className="text-sm font-medium">
              URL da imagem
            </label>
            <input
              id="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="rounded-md border border-border px-3 py-2"
              placeholder="https://..."
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="icon" className="text-sm font-medium">
              Ícone
            </label>
            <input
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="rounded-md border border-border px-3 py-2"
              placeholder="Ex: nome do ícone"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="sort_order" className="text-sm font-medium">
              Ordem
            </label>
            <input
              id="sort_order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-md border border-border px-3 py-2"
              placeholder="0"
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
