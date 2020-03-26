import React from 'react';
import Routes from './routes';

import './styles.css';

import Header from './components/Header';
import Footer from './components/Footer';
//import Main from './pages/main';

const App = () => (
  <div className="App">
    <Header/>
    <Routes/>
    <Footer/>
  </div>
);

export default App;