'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'  // your axios instance

type post = { id: number; name: string; auther: string }

export default function Posts() {
  const [posts, setPosts] = useState<post[]>([])

  // run once on mount
  useEffect(function () {
    loadPosts()
  }, [])

  async function loadPosts() {
    const res = await fetch('/api/posts');
const data = await res.json();
setPosts(data)

  }

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>Posts</h2>
      <ul>
        {posts.map(function (p) {
          return <li key={p.id}>#{p.id} — {p.name} — {p.auther}</li>
        })}
      </ul>
    </div>
  )
}
