import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PokemonCard from './PokemonCard';

type GetListPokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: async () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 16}&limit=16`
      ).then((res) => res.json() as Promise<GetListPokemonResponse>),
  });

  return (
    <Container maxWidth={'container.xl'}>
      <Flex gap={60} alignItems='flex-end' paddingBlock={6}>
        <Flex flexDirection='column'>
          <Heading as='h1'>Pokedéx</Heading>
          <Text>
            Search for Pokémon by name or using the National Pokédex number
          </Text>
        </Flex>

        <Box flex={1}>
          <InputGroup size='lg'>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input placeholder='What Pokémon are you looking for?' />
          </InputGroup>
        </Box>
      </Flex>

      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.results.map((pokemon) => <PokemonCard url={pokemon.url} />)
        )}
      </Grid>

      <Flex justifyContent='center' marginTop={5} gap={1}>
        <Button
          onClick={() => setPage(1)}
          colorScheme={page == 1 ? 'purple' : 'gray'}>
          1
        </Button>
        <Button
          onClick={() => setPage(2)}
          colorScheme={page == 2 ? 'purple' : 'gray'}>
          2
        </Button>
        <Button
          onClick={() => setPage(3)}
          colorScheme={page == 3 ? 'purple' : 'gray'}>
          3
        </Button>
      </Flex>
    </Container>
  );
}

export default App;
