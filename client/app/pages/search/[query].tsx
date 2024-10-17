// app/pages/search/[query].tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { mockCities } from '../../components/mockCities'; // Adjust the import based on your file structure

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { query } = router.query; // Get the 'query' parameter from the URL
  const [cityData, setCityData] = useState<any>(null); // State to store matched city data

  useEffect(() => {
    if (query) {
      const [searchCity, searchCountry] = (query as string)
        .toLowerCase()
        .split(',')
        .map(part => part.trim());

      // Find a matching city-country pair from the mockCities data
      const foundCity = mockCities.find(
        (city) =>
          city.city.toLowerCase() === searchCity &&
          city.country.toLowerCase() === searchCountry
      );

      // Update state with found city data
      if (foundCity) {
        setCityData(foundCity);
      } else {
        setCityData(null); // Reset data if no match
      }
    }
  }, [query]); // Run effect when query changes

  // Display content based on the found city
  return (
    <div>
        <div>
          <h1>{cityData.city}, {cityData.country}</h1>
          <p>Details about {cityData.city}.</p>
          {/* Render additional data related to the city here */}
        </div>
      ) : (
        <div>
          <h1>No data found for "{query}"</h1>
        </div>
      
    </div>
  );
};

export default SearchPage;
