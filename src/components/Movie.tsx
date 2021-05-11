import React from "react";
import { Movies } from "../pages/DiscoverMoviesPage";

export default function Movie(props: Movies) {
  return (
    <div>
      <h1>{props.Title}</h1>
      <img src={props.Poster}></img>
    </div>
  );
}
