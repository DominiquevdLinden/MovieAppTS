import React from "react";

export default function MovieDetails(props: any) {
  const data = props.data;
  return (
    <div>
      <p>{data.Title}</p>
      <img src={data.Poster} />
    </div>
  );
}
