import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  Grid,
} from '@chakra-ui/react';

import React from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = ({ handleSearch, handleSelection, error, searchInput }) => {
  return (
    <>
      <Box
        mt={'2rem'}
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text
          fontSize={'30px'}
          fontWeight={'700'}
          color={'black'}
          mb={'2rem'}
          mt={'1rem'}
        >
          GALLERY
        </Text>
        {error && <Text color={'black'}>{error}</Text>}
        <form onSubmit={handleSearch}>
          <InputGroup
            width={{
              base: '20rem',
              md: '32.8125rem',
              lg: '32.8125rem',
            }}
          >
            <Input
              placeholder="search for a picture........"
              border={' 2px solid var(--gray-300, #D1D5DB)'}
              color={'black'}
              type="search"
              ref={searchInput}
            />
            <InputRightElement>
              <BiSearch fontSize={'1rem'} />
            </InputRightElement>
          </InputGroup>
        </form>

        <Grid
          mt={'1.5rem'}
          gap={'1rem'}
          gridTemplateColumns={{
            base: '1fr 1fr 1fr',
            md: '1fr 1fr 1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr 1fr',
          }}
        >
          <Button onClick={() => handleSelection('nature')}>Nature</Button>
          <Button onClick={() => handleSelection('flowers')}>Flowers</Button>
          <Button onClick={() => handleSelection('jewelry')}>Jewelry</Button>
          <Button onClick={() => handleSelection('cats')}>Cats</Button>
          <Button onClick={() => handleSelection('shoes')}>Shoes</Button>
        </Grid>
      </Box>
    </>
  );
};

export default Search;
