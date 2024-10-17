import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react"
  
  export default function ContactCard() {
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Contact Us</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              We'd love to hear from you! Here are our contact details:
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Team Information:
              </Text>
              <Text>Email: yourteam@example.com</Text>
              <Text>Phone: +123 456 7890</Text>
              <Text>Address: 123 Example St, City, Country</Text>
              <Text>Follow us on social media!</Text>
              <Text>Twitter: @yourteam</Text>
              <Text>Facebook: facebook.com/yourteam</Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }