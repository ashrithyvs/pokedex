/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Spinner } from "react-bootstrap";
import Pokemon from "./components/Pokemon/Pokemon";

const App = () => {
  const [pokedex, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const { data } = await axios
      .get(loadMore)
      .catch((err) => console.error(err));

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const { data } = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .catch((err) => console.error(err));
        setAllPokemons((currentList) => [...currentList, data]);
        await pokedex.sort((a, b) => a.id - b.id);
        setLoading(false);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <Container className="text-center my-5">
      <h1>The Pokedex</h1>
      <div className="pokemon-container">
        <div className="d-flex flex-wrap justify-content-center">
          {!loading ? (
            pokedex.map((pokemon, index) => (
              <Pokemon
                key={index}
                image={pokemon.sprites.other.dream_world.front_default}
                name={pokemon.name}
                weight={pokemon.weight}
                type={pokemon.types[0].type.name}
                move={pokemon.moves[2].move.name}
              />
            ))
          ) : (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
        <Button variant="outline-dark" onClick={() => getAllPokemons()}>
          Load more
        </Button>
      </div>
    </Container>
  );
};

export default App;
