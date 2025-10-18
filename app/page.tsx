// app/page.tsx
'use client';

import { useEffect, useState } from 'react';

type User = { id: number; name: string; email: string };

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState<User | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/users', { cache: 'no-store' });
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', email: '' });
    await load();
  }

  async function updateUser(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    await fetch(`/api/users/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editing.name, email: editing.email }),
    });
    setEditing(null);
    await load();
  }

  async function deleteUser(id: number) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    await load();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Create */}
      <form onSubmit={createUser} className="mb-6 space-y-3">
        <div className="flex gap-2">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <button className="bg-black text-white px-4 rounded">Add</button>
        </div>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.id} className="border p-3 rounded flex items-center gap-3">
              {editing?.id === u.id ? (
                <form onSubmit={updateUser} className="flex-1 flex gap-2">
                  <input
                    className="border p-2 flex-1 rounded"
                    value={editing.name}
                    onChange={(e) => setEditing((x) => x && { ...x, name: e.target.value })}
                  />
                  <input
                    className="border p-2 flex-1 rounded"
                    value={editing.email}
                    onChange={(e) => setEditing((x) => x && { ...x, email: e.target.value })}
                  />
                  <button className="bg-black text-white px-3 rounded">Save</button>
                  <button
                    type="button"
                    className="px-3 rounded border"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-sm text-gray-600">{u.email}</div>
                  </div>
                  <button className="px-3 py-1 border rounded" onClick={() => setEditing(u)}>
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
