import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import Home from './page/Home/Home';
import FilmDetails from './page/FilmDetails/FilmDetails';
import CastList from "./components/CastList";
import Reviews from './components/Reviews';
import SignUp from './page/SignUp/SignUp';
import SignIn from './page/SignIn/SignIn';
import Favorites from './page/Favorites/Favorites';
import PrivateRoute from './components/PrivateRoute';
import { Footer } from './components/Footer';

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="favorites"
          element={<PrivateRoute redirectTo="/" component={Favorites} />}
        />
        <Route path="movies/:movieId" element={<FilmDetails />}>
          <Route path="cast" element={<CastList />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
