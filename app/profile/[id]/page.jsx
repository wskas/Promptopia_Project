'use client'

import {useState, useEffect} from 'react'
import {useRouter, useSearchParams} from 'next/navigation' // to navigate back to home

import Profile from "@components/Profile"

const userProfile = ({params}) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [posts, setPosts] = useState([])
    const userName = searchParams.get("name")
    const userId = params.id

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${userId}/posts`)
          const data = await response.json()
    
          setPosts(data)
        }
        fetchPosts()
    },[])


  return (
    <Profile 
        name = {userName} //Change to the user id
        desc = {`Welcome to ${userName}'s profile page`}
        data = {posts}
        handleEdit = {()=> {}}
        handleDelete = {()=> {}}
    />
  )
}

export default userProfile