// SearchInput.tsx
import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  InputGroup,
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

  return (
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
  );
};

export default SearchInput;
