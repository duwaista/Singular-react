import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";
import React from "react";

function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <BottomMenuComponent/>
    </div>
  );
}

export default App;
