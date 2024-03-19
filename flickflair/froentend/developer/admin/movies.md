---
cover: >-
  https://images.unsplash.com/photo-1535016120720-40c646be5580?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwzfHxtb3ZpZXxlbnwwfHx8fDE3MDU3NDM4NjJ8MA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# Movies

<figure><img src="../../../../.gitbook/assets/Movie .png" alt=""><figcaption><p><mark style="color:orange;"><strong>Admin Movie panel</strong></mark></p></figcaption></figure>

```javascript
import React, { useEffect } from "react";
import { useMovies} from "../../hooks";
import MovieListItem from "../MovieListItem";
import NextAndPrevButton from "../NextAndPrevButton";

const limit = 10;
let currentPageNo = 0;

export default function Movies() {
  
  const {
    fetchMovies,
    movies: newMovies,
    fetchPrevPage,
    fetchNextPage,
  } = useMovies();

  const handleUIUpdate = () => {
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies(currentPageNo);
  }, []);

  return (

      <div className="space-y-3 p-5">
        {newMovies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
           
            />
          );
        })}

        <NextAndPrevButton
          className="mt-5"
          onNextClick={fetchNextPage}
          onPrevClick={fetchPrevPage}
        />
      </div>
  );
}

```



{% content-ref url="../most-common-pages/movielistitem.md" %}
[movielistitem.md](../most-common-pages/movielistitem.md)
{% endcontent-ref %}



{% content-ref url="../most-common-pages/nextandprevbutton.md" %}
[nextandprevbutton.md](../most-common-pages/nextandprevbutton.md)
{% endcontent-ref %}
