---
description: How use react components reused
---

# 💚 Reusable Components

<figure><img src="../../../../.gitbook/assets/signIn (1).png" alt=""><figcaption></figcaption></figure>

Thank goodness <mark style="color:red;">**React.js**</mark> is here for me! I've developed a versatile component, which I reused for both user registration and password sending. Not only that, I utilized the same component for password management. Efficiency at its finest!"

Taking a glance at the page above, <mark style="color:blue;">**there's a trio of common elements**</mark>: the page name, an input field, and a set of butto

<mark style="color:orange;">**The OuterMost components**</mark>

```javascript
import React from "react";

export default function FormContainer({ children }) {
  return (
    <div className="fixed inset-0 dark:bg-primary bg-white -z-10 flex justify-center items-center">
      {children}
    </div>
  );
}


```

```javascript
import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={"max-w-screen-xl mx-auto " + className}>{children}</div>
  );
}

```

Here is the input field. The number of input fields varies based on the requirements. For instance, the signup page may have three input fields, while the sign-in page only has two. Let's see how we handle these variations

```javascript
import React from "react";

export default function FormInput({ name, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        type="text"
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary w-full text-lg outline-none p-1 dark:text-white peer transition"
        placeholder={placeholder}
        {...rest}
      />
      <label
        className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
}

```

<mark style="color:orange;">**now Buttons**</mark>

```javascript
import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ value, busy, type, onClick }) {
  return (
    <button
      type={type || "submit"}
      className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
  );
}

```

custom link last of the form&#x20;

```javascript
import React from "react";
import { Link } from "react-router-dom";

export default function CustomLink({ to, children }) {
  return (
    <Link
      className="dark:text-dark-subtle text-light-subtle dark:hover:text-white hover:text-primary transition"
      to={to}
    >
      {children}
    </Link>
  );
}
```
