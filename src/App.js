import React from 'react';
import {Switch,Route} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart/Cart';
import Default from './Components/Default';
import Details from './Components/Details';
import Modal from "./Components/Modal"

function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={ProductList}/>
        <Route path="/details" component={Details}/>
        <Route path="/cart" component={Cart}/>
        <Route component={Default}/>
      </Switch>
      <Modal/>
    </div>
  );
}

export default App;
