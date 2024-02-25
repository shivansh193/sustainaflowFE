import { useState } from "react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function CityCountryState() {
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [locations, setLocations] = useState<{ countryId: number; stateId: number; }[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [optimalRoute, setOptimalRoute] = useState<string[]>([]);
  const solveTSP = async () => {
    try {
      // Make a POST request to your Flask backend
      const response = await fetch('http://pustak337.pythonanywhere.com/solve-tsp', {
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
      console.log(data);
      setOptimalRoute(data.optimal_route) 
      console.log(data.optimal_route)// Log the response from the backend
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
    <div className="p-4">
      <div className="mb-4">
        <h6 className="mb-2">Country</h6>
        <CountrySelect
          onChange={(e) => {
            setSelectedCountry(e.id);
          }}
          placeHolder="Select Country"
        />
      </div>
      {selectedCountry !== null && (
        <div>
          <h6 className="mb-2">Locations</h6>
          {locations.map((location, index) => (
            <div key={index} className="mb-4">
              <h6 className="mb-2">Location {index + 1}</h6>
              <div className="mr-4">
                <h6 className="mb-2">State</h6>
                <StateSelect
                  countryid={selectedCountry}
                  onChange={(e) => handleStateChange(e, index)}
                  placeHolder="Select State"
                />
              </div>
              <div className="mr-4">
                <h6 className="mb-2">City</h6>
                <CitySelect
                  countryid={selectedCountry}
                  stateid={locations[index].stateId}
                  onChange={(e) => handleCityChange(e, index)}
                  placeHolder="Select City"
                />
              </div>
            </div>
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addLocation}>
            Add Location
          </button>
        </div>
      )}
      <div>
        <h6 className="mb-2">Selected Locations:</h6>
        <ul>
          {cities.map((city, index) => (
            <li key={index}>
              Country: {selectedCountry}, State: {locations[index]?.stateId}, City: {city}
            </li>
          ))}
        </ul>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={solveTSP}>
        Solve TSP
      </button>
      <div>
        <h6 className="mb-2">Optimal Route:</h6>
        <ul>
          {optimalRoute.map((city, index) => (
            <li key={index}>{cities[city]}</li>
          ))}
        </ul>
        </div>
    </div>
  );
}
