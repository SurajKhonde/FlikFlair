---
cover: >-
  https://images.unsplash.com/photo-1528779794993-d2f7f51a53a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwxMHx8ZGVlcCUyMHNlYXxlbnwwfHx8fDE3MDU2NjQ2OTV8MA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# 🦈 Master the Authentication Shark 🦈



Buckle up, cowboy! We're galloping into the wild west of code. Here, we're unleashing an angry <mark style="color:orange;">**bull.**</mark>

```
const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
}
```

this defultAuth info we setting&#x20;

```
const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }
```

In simpler terms, the `handleLogin` function is like sending a message to a faraway server to sign in a user. While waiting for the server's response, we set a flag (`isPending`) to show that something is happening. Once we get a response, we check if there's an error. If there is, we stop waiting (`isPending` becomes false). If everything goes well, we get user information (`userInfo`)

```
 navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
```

The `{ replace: true }` option is used to replace the current entry in the navigation history, meaning that **clicking the back button won't take the user back to the previous page.** It's like changing the page and not leaving a trail behind.

The `signInUser` function is making an asynchronous request to the server to sign in the user. If there's no error (`error` is falsy), it means the server has responded successfully, and the `user` variable should contain the user details retrieved from the server side.\


```
// setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });
```

After Logged user refresh the page or server got disconnected&#x20;

```javascript
localStorage.setItem("auth-token", user.token);
```

Here's what's happening:

* `localStorage`: This is a web storage API in browsers that allows you to store key-value pairs locally in the <mark style="color:orange;">**user's browser.**</mark>
* `.setItem("auth-token", user.token)`: This method is used to set a key-value pair in the local storage. In this case, it's storing the authentication token under the key "auth-token". The value of the token is taken from the `user` object.

This is a common practice in web development for handling user authentication. Storing the authentication token locally allows the application to persist the user's authentication state even if the <mark style="color:orange;">**user refreshes the page or navigates away and comes back later**</mark>. The stored token can be used for subsequent requests to authenticate the user on the server.

how do i know whatever token i got is real or blong to the same user?

```
const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };
```

<mark style="color:orange;">**Above code who will call it Or how it will execute ?**</mark>

```
  useEffect(() => {
    isAuth();
  }, []);
  
```

`useEffect(() => {}, [])` is a common usage pattern where the effect runs once when the component mounts and does [**not depend on any specific prop or state changes**](#user-content-fn-1)[^1]..

&#x20;Is local storage is good? and how are you handling and when you are removing it from browser?

1.When a user signs in and later returns to the same site, we need to retain crucial user information. As a developer, I've opted to use <mark style="color:orange;">**local storage**</mark> to store the user's token. There are several storage options available, such as session storage and cookies. Here we are not handling any money related things .so security is not my prior things.\
2.when user want to sign-out  token is removed from storage also.\


```
    const handleLogout = () => {
     localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };
```

look storing token help me to retain the user without asking <mark style="color:orange;background-color:green;">repeated sign-in</mark>&#x20;

<mark style="color:orange;">**final code for Auth-handling**</mark>



{% code fullWidth="true" %}
```javascript
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIsAuth, signInUser } from "../api/auth";
import { useNotification } from "../hooks";

export const AuthContext = createContext();

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });
  const { updateNotification } = useNotification();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    navigate("/", { replace: true });
    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: "",
    });

    localStorage.setItem("auth-token", user.token);
  };

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;

    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await getIsAuth(token);
    if (error) {
      updateNotification("error", error);
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    isAuth();
  }, []);

  //  handleLogout
  return (
    <AuthContext.Provider
      value={{ authInfo, handleLogin, handleLogout, isAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

```
{% endcode %}



[^1]: If dependancy Array is Empty
