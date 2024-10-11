import React, {useState} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async() => {
    setError("");
    setPokemon(null);
    try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      setPokemon(response.data);
    } catch (err) {
      setError('Pokemon not found');
    }
  };

  return (
    <div className="container">
      <h1>Pokemon Search App</h1>
      <input type="text" 
      placeholder="Enter Pokemon name or ID" 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error">{error}</p>}
      {pokemon && (
        <div className="pokemon-result">
          <h2>{pokemon.name}</h2>
          <img className="pokemon-image" 
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>
      )}
    </div>
  );
}

export default App;
