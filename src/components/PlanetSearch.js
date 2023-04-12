import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PlanetSearch = ({selectedPlanet}) => {
  const [planet, setPlanet] = useState();
  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch and set data functions here
  const fetchPeople = async (planet, page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      const residents = response.data.results;
      setPeople(residents);
      setTotalPages(Math.ceil(response.data.count / 10));
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data.');
    }
  };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(1);
  //   fetchPeople(planet, 1);
  // };

  useEffect(()=>{
    setPlanet(selectedPlanet);
    console.log(selectedPlanet);
    fetchPeople(planet, 1);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedPlanet])


  return (
    <div>
      {/* Search UI and people list rendering here */}
      {/* <form onSubmit={handleSearch}>
        <label htmlFor="planet">People: </label>
        <input
          type="text"
          id="planet"
          value={planet}
          onChange={(e) => setPlanet(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form> */}
    {loading ? (
        <CircularProgress style={{ marginTop: "1rem" }} />
      ) : (
        <div style={{display: "flex", width: "100%", flexWrap: "wrap"}}>
        {people.map((person, index) => (
          <Card key={index} sx={{ minWidth: 250 }} style={{ margin: "5px" }}>
            <CardContent>
              <Typography variant="h5" component="div">
              {person.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      )}
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
