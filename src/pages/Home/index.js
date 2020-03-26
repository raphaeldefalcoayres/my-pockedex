import React, { useState, useEffect } from 'react';

import { Container, Card, List, Name, Img, Col } from './styles';
import api from '~/services/api';
import { getItemsList, pad, Paginator } from '~/utils';
import { ContainerGlobal } from '~/styles/global';

export default function Home() {
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonsShow, setPokemonsShow] = useState([]);

  async function loadPokemons() {
    if (!localStorage.getItem('pokemons')) {
      new Promise((resolve, reject) => {
        getItemsList('pokemon?limit=20', [], resolve, reject);
      }).then(response => {
        setPokemons(response);
        localStorage.setItem('pokemons', JSON.stringify(response));
      });
    }

    setPokemons(JSON.parse(localStorage.getItem('pokemons')));
  }

  async function loadPokemonData() {
    if (!localStorage.getItem('pokemonsData')) {
      const pokemonsData = await Promise.all(
        pokemons.map(async pokemon => {
          const { data } = await api(pokemon.url);
          const specie = await api(data.species.url);
          console.log(data, specie);
          // console.log(data, color);
          return {
            id: data.id,
            name: pokemon.name,
            img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
              data.id,
              3
            )}.png`,
            weight: data.weight,
            height: data.height,
            base_experience: data.base_experience,
            color: specie.data.color ? specie.data.color.name : null,
            evolves_from_species: !specie.data.evolves_from_species
              ? false
              : true,
          };
        })
      ).then(result => {
        // return Paginator(result, 10);
        return result;
      });

      localStorage.setItem('pokemonsData', JSON.stringify(pokemonsData));
    }
    setPokemonsData(JSON.parse(localStorage.getItem('pokemonsData')));
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    console.log('pokemons', pokemons);
    if (pokemons && pokemons.length > 0) loadPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  useEffect(() => {
    console.log('pokemonsData', pokemonsData);
    if (pokemonsData && pokemonsData.length > 0)
      setPokemonsShow(Paginator(pokemonsData, 1, 20));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsData]);

  useEffect(() => {
    console.log('pokemonsShow', pokemonsShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsShow]);

  return (
    <Container>
      <ContainerGlobal>
        <h1>Pokedex</h1>

        <List>
          {pokemonsShow.data &&
            pokemonsShow.data.map(pokemon => {
              return (
                <Card key={pokemon.id} className={`bg-${pokemon.color}`}>
                  <Col>
                    <Name>{pokemon.name}</Name>
                  </Col>
                  <Col>
                    <Img src={pokemon.img} alt="pokemon" />
                  </Col>
                </Card>
              );
            })}
        </List>
      </ContainerGlobal>
    </Container>
  );
}
