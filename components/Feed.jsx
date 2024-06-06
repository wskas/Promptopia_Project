'use client'

import {useState, useEffect} from 'react'

import PromptCard from '@components/PromptCard'

const PromptCardList = ({data , handleTagClick}) => {
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post) => {
        return(<PromptCard
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />)
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filteredPrompts, setFilteredPrompts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)

    const searchedPost = filterPrompts(e.target.value)
    setFilteredPrompts(searchedPost)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)

    const searchedPost = filterPrompts(tag)
    setFilteredPrompts(searchedPost)
  }

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
      setFilteredPrompts(data)
    }
    fetchPosts()
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type = "text"
        placeholder='Search for tag or username'
        value={searchText}
        onChange={handleSearchChange}
        required 
        className='search_input peer'
        />
      </form>

      <PromptCardList
      data = {filteredPrompts}
      handleTagClick = {handleTagClick}
      />
    </section>
  )
}

export default Feed