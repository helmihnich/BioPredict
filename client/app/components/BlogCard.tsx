import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Button,
  } from "@chakra-ui/react"
  
  export default function BlogCard() {
    return (
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={6}
      >
        <Stack spacing={4}>
          <Heading size="md">Blog Post Title</Heading>
          <Text>
            This is a brief excerpt of the blog post. It should entice users to
            click and read more about the topic.
          </Text>
          <Flex justifyContent="flex-end">
            <Button as="a" href="/blog/post-id" colorScheme="teal">
              Read More
            </Button>
          </Flex>
        </Stack>
      </Box>
    )
  }