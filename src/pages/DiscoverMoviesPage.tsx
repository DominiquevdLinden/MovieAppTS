import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../components/Movie";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ApiResult } // todo: specify the data type too
  | { status: "error"; error: any };

export type Movies = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type ApiResult = {
  Response: "true";
  Search: Movies[];
  totalResults: string;
};

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
  });
  const routeParam = useParams<{ searchText: string }>();

  const history = useHistory();

  const navigateToSearch = () => {
    history.push(`/discover/${routeParam}`);
  };

  useEffect(() => {
    const getData = async () => {
      if (!routeParam.searchText) {
        setSearchState({ status: "idle" });
        return;
      }
      const queryParam = encodeURIComponent(routeParam.searchText);
      setSearchState({ status: "loading" });
      const response = await axios.get(
        `https://omdbapi.com/?apikey=25a32d1d&s=${queryParam}`
      );
      try {
        setSearchState({ status: "success", data: response.data });
        console.log(searchState);
      } catch (e) {
        setSearchState({ status: "error", error: e });
      }
    };
    getData();
  }, [routeParam.searchText]);

  //BABYY I love you keep sharing Iwill do sth else :))))
  //Yeah? I love you more ;) sure cutie
  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button onClick={navigateToSearch}>Search</button>
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {searchState.status === "idle" ? "Please search for a movie" : ""}
        {searchState.status === "loading" ? "Loading..." : ""}
        {searchState.status === "error" ? "Oops something went wrong..." : ""}
        {searchState.status === "success"
          ? searchState.data.Search.map((mov) => {
              return (
                <Movie
                  Title={mov.Title}
                  Poster={mov.Poster}
                  imdbID={mov.imdbID}
                  Type={mov.Type}
                  Year={mov.Year}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
}
