import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import Home from './page/Home/Home';
import FilmDetails from './page/FilmDetails/FilmDetails';
import Cast from './components/Cast';
import Reviews from './components/Reviews';

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies/:movieId" element={<FilmDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
