import React, { useState } from "react";
import axios from "axios";
import Movie from "../components/Movie";

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

  const search = async () => {
    try {
      console.log("Start searching for:", searchText);
      setSearchState({ status: "loading" });

      // Best practice: encode the string so that special characters
      //  like '&' and '?' don't accidentally mess up the URL
      const queryParam = encodeURIComponent(searchText);

      // Option B: use the `axios` library like we did on Tuesday

      const response = await axios.get(
        `https://omdbapi.com/?apikey=25a32d1d&s=${queryParam}`
      );

      console.log("Success!", response);

      setSearchState({ status: "success", data: response.data });
    } catch (e) {
      setSearchState({ status: "error", error: e });
    }
  };

  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
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
