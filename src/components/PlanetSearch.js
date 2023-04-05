import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PlanetSearch = () => {
  const [planet, setPlanet] = useState('');
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch and set data functions here
  const fetchPeople = async (planet, page) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
      const residents = response.data.results;
      setPeople(residents);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPeople(planet, 1);
  };


  return (
    <div>
      {/* Search UI and people list rendering here */}
      <form onSubmit={handleSearch}>
        <label htmlFor="planet">Planet: </label>
        <input
          type="text"
          id="planet"
          value={planet}
          onChange={(e) => setPlanet(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {people.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
      <div>
        {currentPage > 1 && (
          <button onClick={() => {
            setCurrentPage(currentPage - 1);
            fetchPeople(planet, currentPage - 1);
          }}>
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => {
            setCurrentPage(currentPage + 1);
            fetchPeople(planet, currentPage + 1);
          }}>
            Next
          </button>
        )}
      </div>

    </div>
  );
};

export default PlanetSearch;
