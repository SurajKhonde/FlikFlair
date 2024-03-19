# MovieList

```javascript
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getPoster } from "../../utils/helper";
import GridContainer from "../GridContainer";

const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};

export default function MovieList({ title, movies = [] }) {
  if (!movies.length) return null;

  return (
    <div>
      {title ? (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      ) : null}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem key={movie.id} movie={movie} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const { id, responsivePosters, title, poster, reviews } = movie;
  return (
    <Link to={"/movie/" + id}>
      <img
        className="aspect-video object-cover w-full"
        src={getPoster(responsivePosters) || poster}
        alt={title}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      {reviews?.ratingAvg ? (
        <p className="text-highlight dark:text-highlight-dark flex items-center space-x-1">
          <span>{reviews?.ratingAvg}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No reviews</p>
      )}
    </Link>
  );
};

```

```
const trimTitle = (text = "") => {
  if (text.length <= 20) return text;
  return text.substring(0, 20) + "..";
};
```

* **`(text = "")`:**
  * The function takes a single parameter `text`, which is a string. The `= ""` part is a default parameter, which means that if no argument is provided for `text`, it defaults to an empty string.
* **`if (text.length <= 20) return text;`:**
  * Checks if the length of the provided text is 20 characters or less.
  * If true, it means the text is already short enough, so the original text is returned as is.
* **`return text.substring(0, 20) + "..";`:**
  * If the text is longer than 20 characters, it uses the `substring` method to extract the first 20 characters of the text.
  * It then appends ".." to the end of the extracted substring.
  * The resulting string is returned.

This function is useful for scenarios where you want to display a truncated version of a title or text, especially when dealing with limited space or user interface constraints. For example, it might be used to display shortened titles in a list or grid view.

```
```

<pre class="language-javascript"><code class="lang-javascript">import { getPoster } from "../../utils/helper";
<strong>export const getPoster = (posters = []) => {
</strong>  const { length } = posters;

  if (!length) return null;

  // if poster has more then 2 items then selecting second poster.
  if (length > 2) return posters[1];

  // other wise the first one
  return posters[0];
};
</code></pre>

{% content-ref url="../most-common-pages/gridcontainer.md" %}
[gridcontainer.md](../most-common-pages/gridcontainer.md)
{% endcontent-ref %}



{% content-ref url="../reusable-code/poster.md" %}
[poster.md](../reusable-code/poster.md)
{% endcontent-ref %}
