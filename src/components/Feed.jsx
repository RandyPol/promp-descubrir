'use client'

import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { ClipLoader } from 'react-spinners'
import PromptCardList from './PromptCardList'

const override = css`
  display: block;
  margin: 0 auto;
`

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('searchText', searchText)
  }

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()

      setPosts(data)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  return (
    <section className="feed">
      {/* Future feature to implement for prompt searches */}
      {/* <form onSubmit={handleSubmit} className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Buscar etiqueta o nombre de usuario"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form> */}
      {isLoading ? (
        <div className="sweet-loading">
          <ClipLoader
            css={override}
            size={60}
            color={'#123abc'}
            loading={isLoading}
          />
        </div>
      ) : (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  )
}

export default Feed
