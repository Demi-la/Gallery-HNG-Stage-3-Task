import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import Search from './Search';
import Gallery from './Gallery';
import Login from './Login';
import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGES_PER_PAGE = 12;

const Home = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const log = localStorage.getItem('HNGuser');
    if (log === null) {
      setLoginSuccess(false);
      setLoggedIn(false);
    } else {
      setLoginSuccess(true);
      setLoggedIn(true);
    }

    const getGalleryImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos?page=${page}&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`
        );

        const data = await response.json();
        setGalleryImages(data);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(
          'Oops, error fetching gallery images. Please check your internet connection.'
        );
      }
    };

    getGalleryImages();
  }, [page, loggedIn]);

  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setError('');
        const { data } = await axios.get(
          `${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_API_KEY}`
        );
        setImages(data.results);
        setTotalPages(data.total_pages);
        // console.log('res', data.results);
      }
    } catch (error) {
      setError('Oops, error fetching images. Check your internet connection.');
      //   console.error(error);
    }
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.current) {
        fetchImages();
      } else {
        setGalleryImages();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [fetchImages]);

  const searchInput = useRef(null);
  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };
  const handleSelection = selection => {
    searchInput.current.value = selection;
    resetSearch();
  };
  const handleSearch = event => {
    event.preventDefault();
    console.log(searchInput.current.value);
    resetSearch();
  };

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      if (
        values.email === 'user@example.com' &&
        values.password === '1Password'
      ) {
        setLoginSuccess(true);
        localStorage.setItem('HNGuser', 'user@example.com');

        setTimeout(() => {
          setLoggedIn(true);
        }, 1000);
      } else {
        setErrors({
          email: 'Incorrect email or password',
          password: 'Incorrect email or password',
        });
      }
      setSubmitting(false);
    }, 1000);
  };

  const hello = id => {
    console.log('how you' + id);
  };

  return (
    <Box>
      <Search
        searchInput={searchInput}
        handleSearch={handleSearch}
        handleSelection={handleSelection}
        images={images}
        totalPages={totalPages}
        error={error}
        page={page}
        setPage={setPage}
      />
      {loggedIn ? (
        <Gallery
          galleryImages={galleryImages}
          searchImages={images}
          totalPages={totalPages}
          error={error}
          page={page}
          setPage={setPage}
        />
      ) : (
        <Login
          hello={id => hello(id)}
          handleSubmit={(value, { setSubmitting, setErrors, resetForm }) =>
            handleSubmit(value, { setSubmitting, setErrors, resetForm })
          }
        />
      )}
    </Box>
  );
};

export default Home;
