import React, { useState } from "react";
import {
  Box,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { mockCities, City } from './mockCities'; // Ensure this import is correct
import SearchInput from './searchInput'; // Import the new component

export default function HomeCard() {
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
      

        {/* Use the SearchInput Component */}
        <SearchInput mockCities={mockCities} onSelectCity={handleSelectCity} />

        

      {/* Second Box */}
      <Box textAlign={"center"} p={6} maxW={"100%"} w={"100%"}>
        <Text
          fontSize={"2xl"}
          color={"black"}
          fontWeight={"bold"}
          mb={2}
        >
          Air Quality Index By City
        </Text>

        <Text
          fontSize={"md"}
          color={"gray.500"}
          maxW={"70%"}
          mx={"auto"}
        >
          Explore real-time and forecast street-level air quality information around the world.
        </Text>
      </Box>
    </VStack>
  );
}
