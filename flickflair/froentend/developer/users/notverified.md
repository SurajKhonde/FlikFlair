# NotVerified

```javascript
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import Container from "../Container";

export default function NotVerified() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };

  return (
    <div>
      {isLoggedIn && !isVerified ? (
        <p className="text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified your account,{" "}
          <button
            onClick={navigateToVerification}
            className="text-blue-500 font-semibold hover:underline"
          >
            click here to verify your account.
          </button>
        </p>
      ) : null}
    </div>
  );
}

```

## What is `useNavigate`? <a href="#id-80d7" id="id-80d7"></a>

The `useNavigate` hook is a new addition to React Router 6. It's a replacement for the `useHistory` and `useLocation` hooks in previous versions of React Router. The `useNavigate` hook provides a simple and intuitive API for navigating between pages in your React application. It's designed to be used with functional components and hooks, and it simplifies the process of handling URL changes in your application.



```javascript
function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/other-page');
  };

  return (
    <button onClick={handleClick}>Go to other page</button>
  );
}
```

In this example, we’re using the `useNavigate` hook to create a `navigate` function that we can use to navigate to a different page. We then use this function in the `handleClick` function to navigate to the `/other-page` URL when the button is clicked.

The `navigate` function can also accept an options object as a second parameter, which can be used to control the navigation behavior. For example, you can use the `replace` option to replace the current URL in the history stack instead of adding a new entry:



```javascript
function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/other-page', { replace: true });
  };

  return (
    <button onClick={handleClick}>Go to other page</button>
  );
}
```



```javascript
 navigate("/auth/verification", { state: { user: authInfo.profile } });
```

the `state` parameter is being used to pass data between different routes in a web application.

When navigating from one route to another using a router library like React Router, the `state` parameter allows you to pass along additional data that may be needed by the destination route. In this case, it looks like the `authInfo.profile` object is being passed as part of the state to the "/auth/verification" route.

Using `state` in this context is a common practice for passing data between routes while navigating in web applications. This approach is often used when you need to transfer information about the current user or other contextual data to another part of your application.
