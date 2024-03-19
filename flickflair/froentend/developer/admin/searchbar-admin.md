# searchBar Admin

<figure><img src="../../../../.gitbook/assets/Screenshot (60).png" alt=""><figcaption></figcaption></figure>

```javascript
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin, updateMovie } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieListItem from "../MovieListItem";
import NotFoundText from "../NotFoundText";

export default function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("title");

  const { updateNotification } = useNotification();

  const searchMovies = async (val) => {
    const { error, results } = await searchMovieForAdmin(val);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }

    setResultNotFound(false);
    setMovies([...results]);
  };

  const handleAfterDelete = (movie) => {
    const updatedMovies = movies.filter((m) => m.id !== movie.id);
    setMovies([...updatedMovies]);
  };

  const handleAfterUpdate = (movie) => {
    console.log("run");
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };

  useEffect(() => {
    if (query.trim()) searchMovies(query);
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      <NotFoundText text="Record not found!" visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}
            />
          );
        })}
    </div>
  );
}

```

```
import { useSearchParams } from "react-router-dom";
```

The `useSearchParams` hook is part of the React Router library, which is commonly used for handling navigation and routing in React applications. Specifically, the `useSearchParams` hook is used to <mark style="color:orange;">**access and manipulate the query parameters in the URL.**</mark>

const \[searchParams, setSearchParams] = useSearchParams();

The `useSearchParams` hook returns an array with two elements:

* `searchParams`: An object representing the current query parameters in the URL.
* `setSearchParams`: A function that allows you to update the query parameters.

<mark style="color:red;">**// Assuming the URL is "/example?param1=value1\&param2=value2"**</mark>

<mark style="color:green;">console.log(searchParams.get("param1")); // Outputs: "value1" console.log(searchParams.get("param2")); // Outputs: "value2"</mark>

**setSearchParams({ param1: "new\_value", param2: "new\_value" });**

In this example, `searchParams` is an object representing the query parameters in the current URL. The `get` method is used to retrieve the values of specific parameters. The `setSearchParams` function is used to update the query parameters.

```
 const [searchParams] = useSearchParams();
  const query = searchParams.get("title");
```

<mark style="color:orange;">**MovieList**</mark>

```
<MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}
            />
```



{% content-ref url="../most-common-pages/movielistitem.md" %}
[movielistitem.md](../most-common-pages/movielistitem.md)
{% endcontent-ref %}
