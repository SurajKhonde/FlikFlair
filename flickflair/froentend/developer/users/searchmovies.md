# SearchMovies

```javascript
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import Container from "../Container";
import NotFoundText from "../NotFoundText";
import MovieList from "./MovieList";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");
//Returns the first value associated with the given search parameter.

  const { updateNotification } = useNotification();

  const searchMovies = async (val) => {
    const { error, results } = await searchPublicMovies(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="px-2 xl:p-0">
        <NotFoundText text="Record not found!" visible={resultNotFound} />
        <MovieList movies={movies} />
      </Container>
    </div>
  );
}

```

this is best way to find the data inside the backend&#x20;

{% content-ref url="../most-common-pages/container.md" %}
[container.md](../most-common-pages/container.md)
{% endcontent-ref %}

{% content-ref url="../most-common-pages/notfoundtext.md" %}
[notfoundtext.md](../most-common-pages/notfoundtext.md)
{% endcontent-ref %}

{% content-ref url="movielist.md" %}
[movielist.md](movielist.md)
{% endcontent-ref %}
