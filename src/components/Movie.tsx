import React from "react";
import { Movies } from "../pages/DiscoverMoviesPage";

export default function Movie(props: Movies) {
  return (
    <div
      style={{
        display: "flex",
        width: 250,
        height: 270,
        flexDirection: "column",
        margin: 20,
        padding: 40,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        transition: "0.3s",
      }}
    >
      <img style={{ width: 250, height: 250 }} src={props.Poster}></img>
      <h1 style={{ fontSize: 13, textAlign: "center" }}>{props.Title}</h1>
    </div>
  );
}
