import React, { useState } from "react";
import axios from "axios";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any } // todo: specify the data type too
  | { status: "error"; error: any };

type Movies = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type ApiResult = {
  Response: string;
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

      const data: ApiResult = await axios.get(
        `https://omdbapi.com/?apikey=25a32d1d&s=${queryParam}`
      );

      console.log("Success!", data);
      setSearchState({ status: "success", data: data });
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
    </div>
  );
}
