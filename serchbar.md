---
description: we can create simple serchbar but optimized searchbar have different story
coverY: 0
---

# SerchBar

```javascript
import React, { createContext, useState } from "react";
import { useNotification } from "../hooks";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export default function SearchProvider({ children }) {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const { updateNotification } = useNotification();

  const search = async (method, query, updaterFun) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResults([]);
      updaterFun && updaterFun([]);
      return setResultNotFound(true);
    }

    setResultNotFound(false);
    setResults(results);
    updaterFun && updaterFun([...results]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updaterFun) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFun && updaterFun([]);
      return resetSearch();
    }

    debounceFunc(method, query, updaterFun);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, resetSearch, searching, resultNotFound, results }}
    >
      {children}
    </SearchContext.Provider>
  );
}

```

```javascript
let timeoutId;
const debounce = (func, delay) => { // Defines a debounce function that takes two parameters: func (the function to debounce) and delay (the delay in milliseconds).
  return (...args) => { // Returns a function that takes any number of arguments using the rest parameter syntax (...args).
    if (timeoutId) clearTimeout(timeoutId); // Clears the timeout if it's already set to avoid executing the function prematurely.
    timeoutId = setTimeout(() => { // Sets a new timeout.
      func.apply(null, args); // Executes the function passed to debounce with the provided arguments after the specified delay.
    }, delay);
  };
};
```

```javascript
export const SearchContext = createContext();
```

The purpose of a debounce function like this is to limit the rate at which a function can be called. It's commonly used in scenarios like event handlers (e.g., input field change events) where you want to delay the execution of a function until after the user has stopped performing the action for a certain period of time, thereby reducing the number of times the function is called unnecessarily.

{% content-ref url="flickflair/froentend/developer/react-notes/hooks/usecontext.md" %}
[usecontext.md](flickflair/froentend/developer/react-notes/hooks/usecontext.md)
{% endcontent-ref %}

<pre class="language-javascript"><code class="lang-javascript"><strong>func.apply(null, args);
</strong></code></pre>

`apply`: This is a method available on all JavaScript functions. It allows you to call a function with a specific context (the first argument) and an array of arguments (the second argument).

```javascript
const debounceFunc = debounce(search, 300);
```

Here, <mark style="color:red;">**`debounce`**</mark> is a higher-order function that takes two parameters: `search` (the function to be debounced) and `300` (the delay in milliseconds). The result of calling `debounce(search, 300)` is a new function `debounceFunc` that will delay the execution of the `search` function by 300 milliseconds.

```javascript
const handleSearch = (method, query, updaterFun) => {
  setSearching(true); // Indicates that a search is in progress.
  if (!query.trim()) {
    updaterFun && updaterFun([]); // If the query is empty, update the results to an empty array.
    return resetSearch(); // Reset the search (presumably clearing any previous search results).
  }

  debounceFunc(method, query, updaterFun); // Call the debounced search function with the provided method, query, and updater function.
};

```

In summary, the `handleSearch` function orchestrates search operations, while the `debounceFunc` function ensures that the `search` function is called with a delay, optimizing performance and preventing unnecessary invocation of the `search` function in rapid succes
