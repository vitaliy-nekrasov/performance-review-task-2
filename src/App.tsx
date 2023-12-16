import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import Home from './page/Home/Home';

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
