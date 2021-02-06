import './App.css';
import HeaderComponent from './components/HeaderComponent/HeaderComponent'
import React from "react";
import {FeedListComponent} from "./components/FeedListComponent/FeedListComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent/>
      <FeedListComponent/>
    </div>
  );
}

export default App;
