import { Box, Flex, Stack, Heading, Text, Button, useColorModeValue } from "@chakra-ui/react"

export default function PricingCard() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Our Pricing Plans</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Choose the plan that works for you!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Heading size="md">Basic Plan</Heading>
            <Text>Price: $10/month</Text>
            <Button colorScheme="teal">Choose Plan</Button>
          </Stack>
        </Box>
        {/* Ajouter d'autres plans si nécessaire */}
      </Stack>
    </Flex>
  )
}