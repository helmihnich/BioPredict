"use client"
import BlogCard from "../components/BlogCard"
import { Stack, Heading } from "@chakra-ui/react"

export default function BlogPage() {
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Heading as="h1" size="xl" textAlign="center">
        Our Blog
      </Heading>
      <Stack spacing={4}>
        {/* You can map through your blog posts here and render BlogCard for each */}
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Stack>
    </Stack>
  )
}