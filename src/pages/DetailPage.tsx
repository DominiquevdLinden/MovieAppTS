import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import MovieDetails from "../components/MovieDetails";

export type Ratings = {
  Source: string;
  Value: string;
};

export type MovieData = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Ratings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

export default function DetailPage() {
  const routeParams = useParams<{ imdbID: string }>();
  const [movies, setMovies] = useState<MovieData>();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${routeParams.imdbID}&apikey=25a32d1d`
      );
      setMovies(response.data);
    };
    getData();
  }, [routeParams.imdbID]);

  return (
    <div>{movies ? <MovieDetails data={movies} /> : <p>Loading...</p>}</div>
  );
}
