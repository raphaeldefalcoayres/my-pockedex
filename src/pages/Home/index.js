import React, { useState, useEffect } from 'react';

import { Container } from './styles';
import api from '~/services/api';
import * as Utils from '~/utils';

export default function Home() {
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);

  async function loadPokemons() {
    if (!localStorage.getItem('pokemons')) {
      new Promise((resolve, reject) => {
        console.log(resolve);
        Utils.getItemsList('pokemon?limit=20', [], resolve, reject);
      }).then(response => {
        console.log(response);
        setPokemons(response);
        localStorage.setItem('pokemons', JSON.stringify(response));
      });
    }

    setPokemons(JSON.parse(localStorage.getItem('pokemons')));
  }

  function pad(num, size) {
    const s = `00${num}`;
    return s.substr(s.length - size);
  }

  function Paginator(items, per_page) {
    const offset = (page - 1) * per_page;
    const paginatedItems = items.slice(offset).slice(0, per_page);
    const total_pages = Math.ceil(items.length / per_page);
    return {
      page,
      per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages,
      data: paginatedItems,
    };
  }

  async function loadPokemonData() {
    const pokemonsData = await Promise.all(
      pokemons.map(async pokemon => {
        const { data } = await api(pokemon.url);
        console.log(data);
        return {
          id: data.id,
          name: pokemon.name,
          img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
            data.id
          )}.png`,
          weight: data.weight,
          height: data.height,
          base_experience: data.base_experience,
        };
      })
    ).then(result => {
      // return Paginator(result, 10);
      return result;
    });

    localStorage.setItem('pokemonsData', JSON.stringify(pokemonsData));
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) loadPokemonData();
  }, [pokemons]);

  return <h1>Home</h1>;
}
