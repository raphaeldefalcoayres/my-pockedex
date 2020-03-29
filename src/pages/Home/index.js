import React, { useState, useEffect } from 'react';
import filter from 'lodash/filter';
import omit from 'lodash/omit';
import overEvery from 'lodash/overEvery';
import LazyLoad from 'react-lazyload';
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
  ButtonTop,
} from './styles';
import api from '~/services/api';
import { pad } from '~/utils';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('all');
  const [color, setColor] = useState('all');
  const [habitat, setHabitat] = useState('all');
  const [filters, setFilters] = useState({});

  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);
  const [habitats, setHabitats] = useState([]);

  const [colorsDash, setColorsDash] = useState([]);
  const [typesDash, setTypesDash] = useState([]);
  const [habitatsDash, setHabitatsDash] = useState([]);

  async function loadPokemons() {
    // const response = await api.get('pokemons?_page=1&_limit=20');
    const response = await api.get('pokemons');
    console.log(response.data);
    setPokemons(response.data);
  }

  async function loadColors() {
    const response = await api.get('colors');
    console.log(response.data);
    setColors(response.data);
  }

  async function loadHabitats() {
    const response = await api.get('habitats');
    console.log(response.data);
    setHabitats(response.data);
  }

  async function loadTypes() {
    const response = await api.get('types');
    console.log(response.data);
    setTypes(response.data);
  }

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  function filtered() {
    const newPokemons = filter(
      filter(
        pokemons,
        overEvery(Object.keys(filters).map(key => filters[key]))
      ),
      ['evolves_from_species', false]
    );

    setPokemons(newPokemons);
  }

  useEffect(() => {
    const newPokemons = filter(
      filter(
        pokemons,
        overEvery(Object.keys(filters).map(key => filters[key]))
      ),
      ['evolves_from_species', false]
    );

    setPokemons([...pokemons, ...newPokemons]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setTotal(pokemons.length);

    const colorsArray = [];

    if (pokemons && pokemons.length > 0) {
      console.log('pokemons', pokemons);

      const colorsArray = [];
      const habitatsArray = [];
      const typesArray = [];

      pokemons.forEach(pokemon => {
        if (!colorsArray[pokemon.color]) {
          colorsArray[pokemon.color] = 1;
        }
        colorsArray[pokemon.color] += 1;

        if (!habitatsArray[pokemon.habitat]) {
          habitatsArray[pokemon.habitat] = 1;
        }
        habitatsArray[pokemon.habitat] += 1;

        pokemon.types.forEach(i => {
          if (!typesArray[i.type.name]) {
            typesArray[i.type.name] = 1;
          }
          typesArray[i.type.name] += 1;
        });
      });

      setColorsDash(colorsArray);
      setHabitatsDash(habitatsArray);
      setTypesDash(typesArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  useEffect(() => {
    console.log('colorsDash', colorsDash);
  }, [colorsDash]);

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
    filtered();
    console.log('filters', filters);
  }, [filters]); // eslint-disable-line

  return (
    <Container>
      <ButtonTop onClick={() => handleScrollTop()}>⮝</ButtonTop>
      <Head>
        <Row>
          <h1>Pokedex ({total})</h1>
        </Row>
        <Row>
          <Col>
            <h5>Filter by color:</h5>

            <Colors>
              {Object.keys(colorsDash).map(key => (
                <Color
                  key={key}
                  id={key}
                  onClick={e => handleFilterByColor(e)}
                  title={key}
                  className={`bg-${key}`}
                  active={color === key}
                >
                  {key === 'all' ? 'all' : `${key} ${colorsDash[key]}`}
                </Color>
              ))}
            </Colors>
          </Col>
          <Col>
            <h5>Filter by Habitat:</h5>

            <Habitats>
              {Object.keys(habitatsDash).map(key => (
                <Habitat
                  key={key}
                  id={key}
                  onClick={e => handleFilterByHabitat(e)}
                  title={key}
                  active={habitat === key}
                >
                  {key === 'all' ? 'all' : `${key} ${habitatsDash[key]}`}
                </Habitat>
              ))}
            </Habitats>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>Filter by type:</h5>

            <Types>
              {Object.keys(typesDash).map(key => (
                <Type
                  key={key}
                  onClick={e => handleFilterByType(e)}
                  title={key}
                  active={type === key}
                >
                  <span title={key}>{key}</span>
                  {key !== 'all' && (
                    <strong title={key}>{typesDash[key]}</strong>
                  )}
                </Type>
              ))}
            </Types>
          </Col>
        </Row>
      </Head>

      <List>
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map(pokemon => {
            return (
              <Card key={pokemon.name}>
                <LazyLoad>
                  <Img src={pokemon.img} alt="pokemon" />
                </LazyLoad>
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
                          <LazyLoad once>
                            <img src={e.img} alt="evolution" />
                          </LazyLoad>
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
