import {
  Flex,
  Box,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react"

export default function HomeCard() {

  const [ message, setMessage ] = useState("Loading")

  useEffect(() => {
    fetch("http://localhost:4000/api/home").then(
      response => 
        response.json()
    ).then(
      data => {
      setMessage(data.message)
    })
  }, []);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Box
        maxW={"100%"} // Set the box to full width
        w={"100%"}
        p={6}
        boxShadow={"lg"}
        bgGradient="linear(to-r, #117577, #25AEB1)" // Linear gradient background
      >
        <Text fontSize={"4xl"} textAlign={"center"} color={'#FFFFFF'} fontWeight={'bold'} mb={4}mt={4}>
            Forecast your well being
          </Text>
        {/* Search Input with Icon */}
        <FormControl id="search" mb={4} bgColor={'white'} rounded={"full"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              ml={20} // Added margin to the left to center the icon
              justifySelf="center"
              mt={2} // Added margin to the top to center the icon
              children={
                <Button as="a" href="/" variant={"link"}>
                  <Image
                    src="/search (1).png"
                    alt="Search"
                    width={30}
                    height={30}
                  />
                </Button>
              }
            />
            <Input
              type="text"
              placeholder="Search about a city"
              size="lg"
              _placeholder={{ color: "gray.500" }}
              height="60px" // Increased height to make input larger
              fontSize="xl" // Increased font size for larger text
              w={"100%"}
              pl={40}
              bgColor={'white'}
              rounded={"full"}
            />
          </InputGroup>
        </FormControl>
      </Box>
    </Flex>
  );
}
