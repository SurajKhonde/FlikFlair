---
cover: >-
  https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw0fHxoZWxwZXJ8ZW58MHx8fHwxNzA1NzgwNTg1fDA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# helper

```javascript
export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

export const getToken = () => localStorage.getItem("auth-token");

export const catchError = (error) => {
  const { response } = error;
  if (response?.data) return response.data;

  return { error: error.message || error };
};

export const renderItem = (result) => {
  return (
    <div className="flex rounded overflow-hidden">
      <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};

export const getPoster = (posters = []) => {
  const { length } = posters;

  if (!length) return null;

  // if poster has more then 2 items then selecting second poster.
  if (length > 2) return posters[1];

  // other wise the first one
  return posters[0];
};

export const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;

  return parseFloat(count / 1000).toFixed(2) + "k";
};

```



```
export const getToken = () => localStorage.getItem("auth-token");
```

The `getToken` function is a utility function that retrieves the authentication token from the browser's localStorage.

The `getItem("auth-token")` method retrieves the value stored in the localStorage under the key "auth-token."

In summary, when you call `getToken()`, it fetches the authentication token stored in the localStorage under the key <mark style="color:orange;">**"auth-token"**</mark> and returns it. This is commonly used in web applications to manage user authentication, where the token is stored locally and sent with each request to authenticate the user on the server.

