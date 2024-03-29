import { Box, Image, Button, Grid, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import Sortable from 'sortablejs';

const Gallery = ({
  totalPages,
  page,
  setPage,
  searchImages,
  galleryImages,
}) => {
  const imagesToDisplay =
    searchImages.length > 0 ? searchImages : galleryImages;
  const sortableContainerRef = useRef(null);
  const loggedIn = localStorage.getItem('HNGuser');
  console.log(loggedIn);

  useEffect(() => {
    const sortableContainer = sortableContainerRef.current;

    if (sortableContainer) {
      const sortable = new Sortable(sortableContainer, {
        swapThreshold: 10,
        invertSwap: true,
        animation: 150,
        emptyInsertThreshold: 8,
      });
      return () => {
        sortable.destroy();
      };
    }
  }, [imagesToDisplay]);

  return (
    <>
      <Box width={'100%'}>
        <Box>
          {!imagesToDisplay || imagesToDisplay.length === 0 ? (
            <Box>
              <Text>Loading...</Text>
            </Box>
          ) : (
            <Grid
              gridTemplateColumns={{
                base: '1fr 1fr ',
                md: '1fr 1fr 1fr 1fr ',
                lg: '1fr 1fr 1fr 1fr ',
              }}
              gridGap={'2rem'}
              p={'2rem'}
              ref={sortableContainerRef}
            >
              {imagesToDisplay.map(image => (
                <Box key={image.id}>
                  <Image
                    src={image.urls.regular}
                    alt={image.alt_description}
                    width={'25rem'}
                    height={{base:"15rem", lg:'20rem'}}
                    _hover={{
                      filter: 'blur(2px)',
                      cursor: 'grab',
                    }}
                    transition={'transform 0.5s'}
                    data-aos="fade-right"
                    data-aos-anchor="#example-anchor"
                    data-aos-offset="500"
                    data-aos-duration="500"
                  />
                </Box>
              ))}
            </Grid>
          )}
        </Box>
        <Box
          display={'flex'}
          gap={'1rem'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {page > 1 && (
            <Button onClick={() => setPage(page - 1)}>Previous</Button>
          )}
          {page < totalPages && (
            <Button onClick={() => setPage(page + 1)}>Next</Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Gallery;
