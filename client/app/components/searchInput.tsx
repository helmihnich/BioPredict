import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  InputGroup,
    Box,
    Text,
    Center,
  InputLeftElement,
  List,
  ListItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { City } from './mockCities'; // Adjust the import according to your file structure

interface SearchInputProps {
  mockCities: City[];
  onSelectCity: (city: City) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ mockCities, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set the component as mounted on the client side
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Delay in milliseconds

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      const filteredCities = mockCities.filter((city) =>
        city.city.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  // Detect "Enter" key press to trigger search
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const [inputCity, inputCountry] = searchTerm.split(',').map(part => part.trim().toLowerCase());
  
      // Find a valid city-country pair in the mockCities
      const validCity = mockCities.find(
        (city) =>
          city.city.toLowerCase() === inputCity && 
          city.country.toLowerCase() === inputCountry
      );
  
      if (validCity) {
        // Redirect to the dynamic search page
        // window.location.href = `/search/${validCity.city.toLowerCase()},${validCity.country.toLowerCase()}`;
        window.location.href = `/search/${validCity.city.toLowerCase()},${validCity.country.toLowerCase()}`;
      } else {
        alert("Invalid city or country, please select from the list.");
      }
    }
  };
  
  

  if (!isMounted) {
    return null; // Ensure nothing renders server-side before mounting
  }

  return (
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
            <FormControl id="search" mb={4} bgColor={"white"} rounded={"full"}>
            <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                ml={20}
                justifySelf="center"
                mt={2}
                children={
                    <Image
                    src="/search (1).png"
                    alt="Search"
                    width={30}
                    height={30}
                    />
                }
                />
                <Input
                type="text"
                placeholder="Search for a city"
                size="lg"
                _placeholder={{ color: "gray.500" }}
                height="60px"
                fontSize="xl"
                w={"100%"}
                pl={40}
                bgColor={"white"}
                rounded={"full"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Trigger search on Enter key
                />
            </InputGroup>
            {/* Suggestions List */}
            {suggestions.length > 0 && (
                <List bg="white" borderRadius="md" shadow="md">
                {suggestions.map((suggestion, index) => (
                    <ListItem
                    key={index}
                    p={2}
                    ml={50}
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                    onClick={() => {
                        onSelectCity(suggestion);
                        setSearchTerm(`${suggestion.city}, ${suggestion.country}`);
                        setSuggestions([]);
                    }}
                    >
                    {suggestion.city}, {suggestion.country}
                    </ListItem>
                ))}
                </List>
            )}
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
  );
};

export default SearchInput;
