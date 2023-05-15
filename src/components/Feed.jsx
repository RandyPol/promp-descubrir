'use client'

import { useState, useEffect } from 'react'
import PromptCardList from './PromptCardList'

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('searchText', searchText)
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()

      setPosts(data)
    }
    fetchData()
  }, [])

  return (
    <section className="feed">
      <form onSubmit={handleSubmit} className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Buscar etiqueta o nombre de usuario"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
