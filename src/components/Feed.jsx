'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('searchText', searchText)
  }

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
      <PromptCard />
    </section>
  )
}

export default Feed
