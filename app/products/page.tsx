'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

type Product = { id: number; name: string; price: number; type?: string | null };

export default function ProductsPage() {
  const [list, setList] = useState<Product[]>([]);

 useEffect(function () {
  // call a normal async function
  loadProducts();
}, []);

async function loadProducts() {
  const res = await api.get('/products'); // typing optional
  setList(res.data);
}

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;       // keep reference before awaits
    const fd = new FormData(formEl);

    const body = {
      name: String(fd.get('name') || ''),
      price: Number(fd.get('price') || 0),
      type: String(fd.get('type') || ''),
    };

    const res = await api.post<Product>('/products', body);
    setList(prev => [res.data, ...prev]); // prepend new item
    formEl.reset();
  }

  return (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Products</h3>

    {/* Add Product Form */}
    <form onSubmit={create} className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          name="name"
          placeholder="Enter product name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
        <input
          name="price"
          placeholder="Enter price"
          type="number"
          step="0.01"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Type (optional)</label>
        <input
          name="type"
          placeholder="Enter type"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Product
      </button>
    </form>

    {/* Product List */}
    <ul className="divide-y divide-gray-200">
      {list.map((p) => (
        <li key={p.id} className="py-3 flex items-center justify-between">
          <div>
            <p className="text-gray-800 font-medium">
              #{p.id} — {p.name}
            </p>
            <p className="text-sm text-gray-500">
              GHS {p.price} • {p.type || '—'}
            </p>
          </div>
          <span className="text-blue-500 font-semibold">₵{Number(p.price).toFixed(2)}</span>
        </li>
      ))}

      {list.length === 0 && (
        <li className="text-center text-gray-500 py-4">No products yet.</li>
      )}
    </ul>
  </div>
);

}
