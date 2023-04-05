import React from 'react';
import './App.css';
import PlanetSearch from './components/PlanetSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Star Wars Planet Search</h1>
      </header>
      <main>
        <PlanetSearch />
      </main>
    </div>
  );
}

export default App;
