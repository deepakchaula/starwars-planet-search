import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from '@mui/material/Container';
// import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PlanetSearch from './components/PlanetSearch';

function App() {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState("");
  const [planetResidents, setPlanetResidents] = useState([]);
  const [inputTxt, setInputTxt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  const fetchPlanets = async () => {
    try {
      const response = await axios.get("https://swapi.dev/api/planets/");
      setPlanets(response.data.results);
    } catch (error) {
      console.error("Error fetching planets data:", error);
    }
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  const searchPlanet = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${inputTxt}`
      );

      if (response.data.results.length > 0) {
        const residents = await Promise.all(
          response.data.results[0].residents
            .slice(0, 10 * page)
            .map((resident) => axios.get(resident))
        );
        setPlanetResidents(residents.map((r) => r.data.name));
      } else {
        setPlanetResidents([]);
        setError("No residents found for the selected planet");
      }
    } catch (error) {
      console.error("Error fetching planet data:", error);
      setError("An error occurred while searching for the planet");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage(page + 1);
    searchPlanet();
  };

  return (
    <Container maxWidth="sm">
      <h1>Star Wars Planet Search</h1>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="planet">Planet Name</InputLabel>
        <Select
          labelId="planet"
          id="planet"
          value={selectedPlanet}
          onChange={(e) => setSelectedPlanet(e.target.value)}
          label="Planet Name"
        >
          {planets.map((planet, index) => (
            <MenuItem key={index} value={planet.name}>
              {planet.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        marginTop: '1rem',
      }}
    >
    <div style={{display: "flex", alignItems: "center"}}>
      <TextField fullWidth label="People" size="small" id="fullWidth" />
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={searchPlanet}
        style={{ marginLeft: "1rem" }}
      >
        Search
      </Button>
      </div>
    </Box>
     
      {selectedPlanet && <PlanetSearch selectedPlanet={selectedPlanet} />}
      {loading ? (
        <CircularProgress style={{ marginTop: "1rem" }} />
      ) : (
        <List>
          {planetResidents.map((resident, index) => (
            <ListItem key={index}>
              <ListItemText primary={resident} />
            </ListItem>
          ))}
          {planetResidents.length > 0 && (
            <ListItem>
              <Button variant="contained" color="primary" onClick={loadMore}>
                Load More
              </Button>
            </ListItem>
          )}
        </List>
      )}
      {error && (
        <Typography color="error" style={{ marginTop: "1rem" }}>
          {error}
    </Typography>
  )}
</Container>
);
}

export default App;
