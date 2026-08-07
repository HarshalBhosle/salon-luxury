import { useCallback, useState } from 'react'
import { adminService } from '../../../services/adminService'

interface ResourceApi<T, C> {
  list: () => Promise<T[]>
  create: (data: C) => Promise<T>
  update: (id: string, data: Partial<T>) => Promise<T>
  remove: (id: string) => Promise<{ deleted: boolean }>
}

export function useAdminResource<T extends { _id?: string }, C = Partial<T>>(
  api: ResourceApi<T, C>,
  initial: T[],
) {
  const [items, setItems] = useState<T[]>(initial)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.list()
      setItems(data)
      setError('')
    } catch {
      setItems(initial)
      setError('Backend unavailable — showing local data. Start the API server to enable editing.')
    } finally {
      setLoading(false)
    }
  }, [api, initial])

  const create = async (data: C) => {
    setSaving(true)
    try {
      const created = await api.create(data)
      setItems((prev) => [created, ...prev])
      return created
    } finally {
      setSaving(false)
    }
  }

  const update = async (id: string, data: Partial<T>) => {
    setSaving(true)
    try {
      const updated = await api.update(id, data)
      setItems((prev) => prev.map((it) => (it._id === id ? updated : it)))
      return updated
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    setSaving(true)
    try {
      await api.remove(id)
      setItems((prev) => prev.filter((it) => it._id !== id))
    } finally {
      setSaving(false)
    }
  }

  return { items, loading, saving, error, refresh, create, update, remove }
}