import React, { useState, useEffect } from 'react';
import filter from 'lodash/filter';
import omit from 'lodash/omit';
import overEvery from 'lodash/overEvery';
import {
  Container,
  Card,
  List,
  Name,
  Img,
  Head,
  Row,
  Col,
  SubCard,
  Id,
  Info,
  SubTitle,
  Evolutions,
  Evolution,
  Colors,
  Color,
  Types,
  Type,
  BoxTypes,
  BasicInfo,
  Habitats,
  Habitat,
} from './styles';
import api from '~/services/api';
import { getItemsList, pad, Paginator } from '~/utils';
import { ContainerGlobal } from '~/styles/global';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [pokemonsShow, setPokemonsShow] = useState([]);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('all');
  const [color, setColor] = useState('all');
  const [habitat, setHabitat] = useState('all');
  const [filters, setFilters] = useState({});

  const [colors, setColors] = useState({
    all: 0,
    black: 0,
    blue: 0,
    brown: 0,
    gray: 0,
    green: 0,
    pink: 0,
    purple: 0,
    red: 0,
    white: 0,
    yellow: 0,
  });

  const [types, setTypes] = useState({
    all: 0,
    normal: 0,
    fighting: 0,
    flying: 0,
    poison: 0,
    ground: 0,
    rock: 0,
    bug: 0,
    ghost: 0,
    steel: 0,
    fire: 0,
    water: 0,
    grass: 0,
    electric: 0,
    psychic: 0,
    ice: 0,
    dragon: 0,
    dark: 0,
    fairy: 0,
    unknown: 0,
    shadow: 0,
  });

  const [habitats, setHabitats] = useState({
    all: 0,
    cave: 0,
    forest: 0,
    grassland: 0,
    mountain: 0,
    rare: 0,
    'rough-terrain': 0,
    sea: 0,
    urban: 0,
    'waters-edge': 0,
    'without-habitat': 0,
  });

  async function evolutionArrayGenerate(evolution_chain) {
    const evolution = [];

    const { data } = await api(evolution_chain.chain.species.url);

    evolution.push({
      id: data.id,
      name: data.name,
      img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
        data.id,
        3
      )}.png`,
    });

    if (evolution_chain.chain.evolves_to.length > 0) {
      const { data: data2 } = await api(
        evolution_chain.chain.evolves_to[0].species.url
      );

      evolution.push({
        id: data2.id,
        name: data2.name,
        minLevel:
          evolution_chain.chain.evolves_to[0].evolution_details[0].min_level,
        img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
          data2.id,
          3
        )}.png`,
      });
    }

    if (
      evolution_chain.chain.evolves_to.length > 0 &&
      evolution_chain.chain.evolves_to[0].evolves_to.length > 0
    ) {
      const { data: data3 } = await api(
        evolution_chain.chain.evolves_to[0].evolves_to[0].species.url
      );

      evolution.push({
        id: data3.id,
        name: data3.name,
        minLevel:
          evolution_chain.chain.evolves_to[0].evolves_to[0].evolution_details[0]
            .min_level,
        img: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pad(
          data3.id,
          3
        )}.png`,
      });
    }

    return evolution;
  }

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
          const evolution = await api(specie.data.evolution_chain.url);
          const evolutionArray = await evolutionArrayGenerate(evolution.data);

          console.log(data, specie, evolution);

          const evolves_from_species = !!specie.data.evolves_from_species;

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
            evolves_from_species,
            types: data.types,
            species: data.species,
            habitat: specie.data.habitat
              ? specie.data.habitat.name
              : 'without-habitat',
            evolution: evolutionArray,
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

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      const newPage = page + 1;
      setPage(newPage);
      console.log('aki');
    }
  }

  useEffect(() => {
    loadPokemons();

    window.addEventListener('scroll', handleScroll, { passive: true });
  }, []);

  useEffect(() => {
    setPokemonsShow(Paginator(pokemonsData, page, 20));
  }, [page]);

  useEffect(() => {
    // console.log('pokemons', pokemons);
    if (pokemons && pokemons.length > 0) loadPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  useEffect(() => {
    // console.log('pokemonsData', pokemonsData);
    setTotal(pokemonsData.length);
    if (pokemonsData && pokemonsData.length > 0) {
      const newPokemonsData = pokemonsData.filter(pokemon => {
        setColors({ ...colors, [pokemon.color]: (colors[pokemon.color] += 1) });
        setHabitats({
          ...habitats,
          [pokemon.habitat]: (habitats[pokemon.habitat] += 1),
        });
        pokemon.types.forEach(i => {
          setTypes({ ...types, [i.type.name]: (types[i.type.name] += 1) });
        });
        return !pokemon.evolves_from_species;
      });

      setPokemonsShow(Paginator(newPokemonsData, 1, 20));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsData]);

  useEffect(() => {
    console.log('pokemonsShow', pokemonsShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonsShow]);

  function handleFilterByColor(e) {
    const colorSelect = e.target.id;

    setColor(colorSelect);
    setFilters(omit(filters, ['color']));

    if (colorSelect !== 'all') {
      setFilters({
        ...filters,
        color: o => {
          return o.color === colorSelect;
        },
      });
    }
  }

  function handleFilterByType(e) {
    const typeSelect = e.target.title;

    setType(typeSelect);
    setFilters(omit(filters, ['type']));

    if (typeSelect !== 'all') {
      setFilters({
        ...filters,
        type: o => {
          return (
            o.types[0].type.name === typeSelect ||
            (o.types[1] && o.types[1].type.name === typeSelect)
          );
        },
      });
    }
  }

  function handleFilterByHabitat(e) {
    const habitatSelect = e.target.title;

    setHabitat(habitatSelect);
    setFilters(omit(filters, ['habitat']));

    if (habitatSelect !== 'all') {
      setFilters({
        ...filters,
        type: o => {
          return o.habitat === habitatSelect;
        },
      });
    }
  }

  useEffect(() => {
    setPokemonsShow(
      Paginator(
        filter(
          filter(
            pokemonsData,
            overEvery(Object.keys(filters).map(key => filters[key]))
          ),
          ['evolves_from_species', false]
        ),
        1,
        20
      )
    );
    console.log('filters', filters);
  }, [filters]); // eslint-disable-line

  return (
    <Container>
      <Head>
        <Row>
          <h1>Pokedex ({total})</h1>
        </Row>
        <Row>
          <Col>
            <h5>Filter by color:</h5>

            <Colors>
              {Object.keys(colors).map(key => (
                <Color
                  key={key}
                  id={key}
                  onClick={e => handleFilterByColor(e)}
                  title={key}
                  className={`bg-${key}`}
                  active={color === key}
                >
                  {key === 'all' ? 'all' : `${key} ${colors[key]}`}
                </Color>
              ))}
            </Colors>
          </Col>
          <Col>
            <h5>Filter by Habitat:</h5>

            <Habitats>
              {Object.keys(habitats).map(key => (
                <Habitat
                  key={key}
                  id={key}
                  onClick={e => handleFilterByHabitat(e)}
                  title={key}
                  active={habitat === key}
                >
                  {key === 'all' ? 'all' : `${key} ${habitats[key]}`}
                </Habitat>
              ))}
            </Habitats>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Filter by type:</h5>

            <Types>
              {Object.keys(types).map(key => (
                <Type
                  key={key}
                  onClick={e => handleFilterByType(e)}
                  title={key}
                  active={type === key}
                >
                  <span title={key}>{key}</span>
                  {key !== 'all' && <strong title={key}>{types[key]}</strong>}
                </Type>
              ))}
            </Types>
          </Col>
        </Row>
      </Head>

      <List>
        {pokemonsShow.data &&
          pokemonsShow.data.map(pokemon => {
            return (
              <Card key={pokemon.id}>
                <Img src={pokemon.img} alt="pokemon" />
                <SubCard className={`bg-${pokemon.color}`}>
                  <Id>#{pad(pokemon.id, 3)}</Id>
                  <BoxTypes>
                    {pokemon.types.map(t => (
                      <Info key={t.type.name}>{t.type.name}</Info>
                    ))}
                  </BoxTypes>
                  <Name>{pokemon.name}</Name>

                  {pokemon.habitat && (
                    <>
                      <BasicInfo>
                        <b>Habitat:</b> {pokemon.habitat}
                      </BasicInfo>
                      <br />
                    </>
                  )}
                  <BasicInfo>
                    <b>Weight:</b> {pokemon.weight}
                  </BasicInfo>
                  <BasicInfo>
                    <b>Height:</b> {pokemon.height}
                  </BasicInfo>

                  <SubTitle>Evoluction</SubTitle>

                  <Evolutions>
                    {pokemon.evolution &&
                      pokemon.evolution.map(e => (
                        <Evolution key={e.id}>
                          <strong>#{pad(e.id, 3)}</strong>
                          <b>{e.name}</b>
                          <img src={e.img} alt="evolution" />
                          <span>{e.minLevel}</span>
                        </Evolution>
                      ))}
                  </Evolutions>
                </SubCard>
              </Card>
            );
          })}
      </List>
    </Container>
  );
}
