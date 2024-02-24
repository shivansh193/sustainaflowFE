import { useState } from "react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function CityCountryState() {
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [locations, setLocations] = useState<{ countryId: number; stateId: number; }[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const solveTSP= async () => {
    try {
      // Make a POST request to your Flask backend
      const response = await fetch('http://pustak337.pythonanywhere.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cities: cities
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response from the backend if needed
      const data = await response.json();
      console.log(data); // Log the response from the backend
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  const addLocation = () => {
    setLocations([...locations, { countryId: selectedCountry || 0, stateId: 0 }]);
    setCities([...cities, ""]); // Add an empty city for each new location
  };

  const handleStateChange = (e: any, index: number) => {
    const newLocations = [...locations];
    newLocations[index].stateId = e.id;
    setLocations(newLocations);
  };

  const handleCityChange = (e: any, index: number) => {
    const newCities = [...cities];
    newCities[index] = e.name; // Update the city name at the given index
    setCities(newCities);
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <h6>Country</h6>
        <CountrySelect
          onChange={(e) => {
            setSelectedCountry(e.id);
          }}
          placeHolder="Select Country"
        />
      </div>
      {selectedCountry !== null && (
        <div>
          <h6>Locations</h6>
          {locations.map((location, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h6>Location {index + 1}</h6>
              <div style={{ marginRight: "10px" }}>
                <h6>State</h6>
                <StateSelect
                  countryid={selectedCountry}
                  onChange={(e) => handleStateChange(e, index)}
                  placeHolder="Select State"
                />
              </div>
              <div style={{ marginRight: "10px" }}>
                <h6>City</h6>
                <CitySelect
                  countryid={selectedCountry}
                  stateid={locations[index].stateId}
                  onChange={(e) => handleCityChange(e, index)}
                  placeHolder="Select City"
                />
              </div>
            </div>
          ))}
          <button onClick={addLocation}>Add Location</button>
        </div>
      )}
      <div>
        <h6>Selected Locations:</h6>
        <ul>
          {cities.map((city, index) => (
            <li key={index}>
              Country: {selectedCountry}, State: {locations[index]?.stateId}, City: {city}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={solveTSP}>Solve TSP</button>
    </div>
  );
}
