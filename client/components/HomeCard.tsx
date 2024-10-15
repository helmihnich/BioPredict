import {
  Box,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HomeCard() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    fetch("http://localhost:4000/api/home")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <VStack spacing={6} minH={"100vh"} pt={10} align="center">
      {/* First Box */}
      <Box
        maxW={"100%"}
        w={"100%"}
        p={6}
        boxShadow={"lg"}
        bgGradient="linear(to-r, #117577, #25AEB1)"
      >
        <Text
          fontSize={"4xl"}
          textAlign={"center"}
          color={"#FFFFFF"}
          fontWeight={"bold"}
          mb={4}
        >
          Forecast your well being
        </Text>
        {/* Search Input with Icon */}
        <FormControl id="search" mb={4} bgColor={"white"} rounded={"full"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              ml={20}
              justifySelf="center"
              mt={2}
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
              height="60px"
              fontSize="xl"
              w={"100%"}
              pl={40}
              bgColor={"white"}
              rounded={"full"}
            />
          </InputGroup>
        </FormControl>

        {/* Centered Bottom Text */}
        <Center>
          <Text
            fontSize={"inherit"}
            w={"50%"}
            textAlign={"center"}
            color={"#FFFFFF"}
            fontWeight={"bold"}
            mt={8}
          >
            Street-level Air Quality, Pollen & Wildfire intelligence means we
            can all make healthier choices to protect ourselves and our loved
            ones.
          </Text>
        </Center>
      </Box>

      {/* Second Box */}
      <Box
        textAlign={"center"}
        p={6}
        maxW={"100%"}
        w={"100%"}
      >
        <Text
          fontSize={"2xl"}  // Main text size
          color={"black"}
          fontWeight={"bold"}
          mb={2}  // Small margin at the bottom
        >
          Air Quality Index By City
        </Text>

        {/* Smaller Text Below Main Text */}
        <Text
          fontSize={"md"}  // Smaller text size
          color={"gray.500"}
          maxW={"70%"}  // Limit the width for better readability
          mx={"auto"}  // Center the text horizontally
        >
          Explore real-time and forecast street-level air quality information around the world.
        </Text>
      </Box>
    </VStack>
  );
}
