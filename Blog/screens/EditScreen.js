import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { Context } from '../context/BlogContext'
import BlogPostForm from '../components/BlogPostForm'

export default function EditScreen({ navigation,route }) {
  const { state,editBlogPost } = useContext(Context)
  const id = route.params.id
  console.log(route.params.id)
  const blogPost = state.find((blogPost) => blogPost.id === route.params.id)
  return (
    <BlogPostForm isEditable={true}
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPost(id,title, content, () => navigation.pop())
      }} />
  )
}

const styles = StyleSheet.create({})