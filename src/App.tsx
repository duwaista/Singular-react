import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";
import React from "react";
import {FeedListComponent} from "./components/FeedListComponent/FeedListComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <BottomMenuComponent/>
      <FeedListComponent/>
    </div>
  );
}

export default App;
