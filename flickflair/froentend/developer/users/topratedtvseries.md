# TopRatedTVSeries

```javascript
import React, { useState, useEffect } from "react";

import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import GridContainer from "../GridContainer";
import MovieList from "./MovieList";

export default function TopRatedTVSeries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies("TV Series", signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchMovies(ac.signal);
    return () => {
      ac.abort();
    };
  }, []);

  return <MovieList movies={movies} title="Viewers choice (TV Series)" />;
}

```

The `useEffect` hook is used to perform side effects, in this case, fetching top-rated TV series when the component mounts.

An `AbortController` is used to handle the cleanup of asynchronous operations. The asynchronous operation is initiated by calling `fetchMovies` with the signal from the `AbortController`.

Overall, this component encapsulates the logic for fetching and displaying a list of top-rated TV series, and it ensures proper cleanup of asynchronous operations when the component is unmounted. The fetched data is then passed down to a child component (`MovieList`) for rendering.

{% content-ref url="movielist.md" %}
[movielist.md](movielist.md)
{% endcontent-ref %}
