import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import NavBar from "./components/NavBar";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/movies/:imdbID" component={DetailPage} />
        <Route path="/discover/:searchText?" component={DiscoverMoviesPage} />
        <Route path="/discover" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
