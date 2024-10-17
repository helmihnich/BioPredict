import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { mockCities } from '../../app/components/mockCities'; // Adjust import as needed

const SearchPage: React.FC = () => {
  const router = useRouter();
  const { query } = router.query; // Get the 'query' parameter from the URL
  const [cityData, setCityData] = useState<any>(null); // Store the matched city data

  useEffect(() => {
    if (query) {
      // Split the query into city and country if it exists
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
        setCityData(null); // If no match, reset data
      }
    }
  }, [query]); // Run this effect whenever the query changes

  // Display content based on the found city
  return (
    <div>
        <div>
          <h1>{cityData.city}, {cityData.country}</h1>
          <p>Details about {cityData.city}.</p>
          {/* Render other data related to the city */}
        </div>
      ) : (
        <div>
          <h1>No data found for "{query}"</h1>
        </div>
    </div>
  );
};

export default SearchPage;
