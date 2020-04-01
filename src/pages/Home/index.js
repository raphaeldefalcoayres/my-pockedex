import React, { useState, useEffect } from 'react';
import omit from 'lodash/omit';
import LazyLoad from 'react-lazyload';
import { FaChevronUp } from 'react-icons/fa';
import { FiChevronsRight } from 'react-icons/fi';

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
  Select,
  Option,
  BoxTypes,
  BasicInfo,
  ButtonTop,
  Stat,
  StatLabel,
  StatBar,
} from './styles';
import api from '~/services/api';
import { pad } from '~/utils';

export default function Home() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [pokemons, setPokemons] = useState([]);
  const [total, setTotal] = useState(0);
  const [color, setColor] = useState('all');
  const [type, setType] = useState('');
  const [habitat, setHabitat] = useState('');
  const [filters, setFilters] = useState({});

  const [colors, setColors] = useState([]);
  const [types, setTypes] = useState([]);
  const [habitats, setHabitats] = useState([]);

  async function loadPokemons() {
    const arrayFilters = Object.keys(filters);
    let stringFilters = '';

    if (arrayFilters.length > 0) {
      arrayFilters.forEach(key => {
        stringFilters += `&${key}=${filters[key]}`;
      });
    }

    const url = `pokemons?_page=${page}&_limit=${perPage}${stringFilters}`;

    const response = await api.get(url);
    setTotal(response.headers['x-total-count']);
    console.log('loadPokemons', response);

    setPokemons([...pokemons, ...response.data]);
  }

  async function loadColors() {
    const response = await api.get('colors');

    setColors(response.data);
  }

  async function loadHabitats() {
    const response = await api.get('habitats');

    setHabitats(response.data);
  }

  async function loadTypes() {
    const response = await api.get('types');

    setTypes(response.data);
  }

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY + 100 >=
      document.body.scrollHeight
    ) {
      const newPage = page + 1;

      const maxPage = Math.round(total / perPage);

      if (page < maxPage) {
        setPage(newPage);
      }
    }
  }

  useEffect(() => {
    loadColors();
    loadHabitats();
    loadTypes();
    loadPokemons();
  }, []);

  useEffect(() => {
    if (pokemons.length === 0) {
      loadPokemons();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (page > 1) {
      loadPokemons();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearData() {
    setPage(1);
    setPokemons([]);
  }

  function handleFilterByColor(e) {
    const colorSelect = e.target.id;

    clearData();

    setColor(colorSelect);
    setFilters(omit(filters, 'color'));
    if (colorSelect !== '') {
      setFilters({ ...filters, color: colorSelect });
    }
  }

  function handleFilterByType(e) {
    const typeSelect = e.target.value;

    clearData();

    setType(typeSelect);
    setFilters(omit(filters, ['type']));
    if (typeSelect !== '') {
      setFilters({ ...filters, types_like: typeSelect });
    }
  }

  function handleFilterByHabitat(e) {
    const habitatSelect = e.target.value;

    clearData();

    setHabitat(habitatSelect);
    setFilters(omit(filters, ['habitat']));

    if (habitatSelect !== '') {
      setFilters({ ...filters, habitat: habitatSelect });
    }
  }

  return (
    <Container>
      <ButtonTop onClick={() => handleScrollTop()}>
        <FaChevronUp />
      </ButtonTop>
      <Head>
        <Row>
          <h1>Pokedex ({total})</h1>
        </Row>
        <Row>
          <Col>
            <h5>Filter by color:</h5>

            <Colors>
              <Color
                className="bg-all"
                title="all"
                onClick={e => handleFilterByColor(e)}
              >
                All
              </Color>
              {Object.keys(colors).map(key => (
                <Color
                  key={key}
                  id={key}
                  onClick={e => handleFilterByColor(e)}
                  title={key}
                  className={`bg-${key}`}
                  active={color === key}
                >
                  {key} ({colors[key]})
                </Color>
              ))}
            </Colors>
          </Col>
          <Col>
            <h5>Filter by Habitat:</h5>

            <Select onChange={e => handleFilterByHabitat(e)}>
              <Option value="">All habitat</Option>
              {Object.keys(habitats).map(key => (
                <Option
                  key={key}
                  id={key}
                  title={key}
                  active={habitat === key}
                  value={key}
                >
                  {key} {habitats[key]}
                </Option>
              ))}
            </Select>
          </Col>

          <Col>
            <h5>Filter by type:</h5>

            <Select onChange={e => handleFilterByType(e)}>
              <Option value="">All types</Option>
              {Object.keys(types).map(key => (
                <Option key={key} title={key} active={type === key} value={key}>
                  {key} {types[key]}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Head>

      <List>
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map(pokemon => {
            return (
              <Card
                key={`pokemon-${pokemon.name}`}
                id={`pokemon-${pokemon.name}`}
              >
                {/* <LazyLoad> */}
                <Img src={pokemon.img} alt="pokemon" />
                {/* </LazyLoad> */}
                <SubCard className={`bg-${pokemon.color}`}>
                  <Id>#{pad(pokemon.id, 3)}</Id>
                  <BoxTypes>
                    {pokemon.types.split(',').map(t => (
                      <Info key={t}>{t}</Info>
                    ))}
                  </BoxTypes>
                  <Name>{pokemon.name}</Name>

                  {pokemon.habitat && (
                    <BasicInfo>
                      <b>Habitat:</b>
                      {pokemon.habitat}
                    </BasicInfo>
                  )}
                  <BasicInfo>
                    <b>Weight:</b>
                    {pokemon.weight}
                  </BasicInfo>
                  <BasicInfo>
                    <b>Height:</b>
                    {pokemon.height}
                  </BasicInfo>

                  {pokemon.stats
                    .filter(
                      o =>
                        o.stat.name !== 'special-defense' &&
                        o.stat.name !== 'special-attack'
                    )
                    .map(s => (
                      <Stat key={s.stat.name}>
                        <StatLabel>{s.stat.name}</StatLabel>
                        <StatBar base_stat={s.base_stat} title={s.base_stat} />
                      </Stat>
                    ))}

                  {pokemon.evolution.length > 0 && (
                    <SubTitle>Evolution</SubTitle>
                  )}

                  <Evolutions>
                    {pokemon.evolution &&
                      pokemon.evolution.map(e => (
                        <Evolution
                          key={`evolution-${e.id}`}
                          id={`evolution-${e.id}`}
                        >
                          <strong>#{pad(e.id, 3)}</strong>
                          <b>{e.name}</b>
                          <FiChevronsRight />
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
