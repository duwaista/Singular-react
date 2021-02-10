import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import React from "react";
import {FeedListComponent} from "./components/FeedListComponent/FeedListComponent";
import BottomMenuComponent from "./components/BottomMenuComponent/BottomMenuComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <FeedListComponent/>
      <BottomMenuComponent/>
    </div>
  );
}

export default App;
