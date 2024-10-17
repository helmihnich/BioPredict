"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { mockCities, City } from '../components/mockCities'; // Ensure this import is correct
import SearchInput from '../components/searchInput'; // Import the new component
import { FiShare2 } from 'react-icons/fi'; // Import a share icon from react-icons
import Image from "next/image";

export default function MainCard() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    sendCityToBackend(city);
  };

  const sendCityToBackend = (city: City) => {
    console.log("Sending to backend:", city);
  };

  return (
    <VStack spacing={6} minH={"100vh"} pt={10} align="center">
      {/* First Box */}
      <SearchInput mockCities={mockCities} onSelectCity={handleSelectCity} />

      {/* Combined Box with Background Color and Shadow */}
      <Flex justify="center" align="center">
        <Box
          bg="#F1EFEF" // Set the background color
          borderColor={"#CCC8AA"}
          p={4}
          borderRadius="md"
          boxShadow="lg" // Add shadow effect
          width="100%"
          maxW="600px"
        >
          {/* City and Share Button */}
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" color={"#238CF6"} fontWeight={"semibold"}>
              Tunis, Tunisia, (36.8065, 10.1815)
            </Text>
            <IconButton
              aria-label="Share"
              icon={<FiShare2 />}
              variant="outline"
              colorScheme="teal"
              ml={2}
            />
          </Flex>

          {/* Green Rectangle with Smile and "Good" */}
          <Box
            bg="green.300"
            color="white"
            p={2}
            borderRadius="md"
            textAlign="center"
            my={2} // Margin on the Y-axis
            
          >
            <Flex justify="center" align="center"> {/* Added margin bottom */}
            <Image src="/smile.png" alt="Smile" width={35} height={35} />
            <Text fontSize={"38px"} fontWeight={"black"} color={"#FFFFFF"} ml={5}> {/* Added margin left */}
              Good
            </Text>
          </Flex>
          </Box>

          {/* Additional Information */}
          <Flex justify="center" align="center" mb={2}> {/* Added margin bottom */}
            <Text fontSize="lg" color={"#7C7C7C"}>Updated</Text>
            <Text fontSize="lg" color={"#000000"} ml={1}> {/* Added margin left */}
              Sat 11 PM
            </Text>
          </Flex>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">AQI: 50</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">PM2.5: 10</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">PM10: 20</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">O3: 30</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">NO2: 40</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">SO2: 50</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">Temp: 60</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">Humidity: 70</Text>
          <Text fontSize="lg" color="#000000" fontWeight="semibold">Wind: 80</Text>
        </Box>
        <Box
          bg="#F1EFEF" // Set the background color
          borderColor={"#CCC8AA"}
          p={4}
          borderRadius="md"
          boxShadow="lg" // Add shadow effect
          width="100%"
          w={"600px"}
          ml={4}
        >
        </Box>
        </Flex>
    </VStack>
  );
}
