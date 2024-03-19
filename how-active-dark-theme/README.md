# How Active Dark theme

Tailwind CSS makes it easy to configure dark mode for your website. Here's how you can set it up:// tailwind.config.js



```javascript
module.exports = { darkMode: 'class', // 'media' or 'class' // ... }
```



{% content-ref url="tailwindcss.config.md" %}
[tailwindcss.config.md](tailwindcss.config.md)
{% endcontent-ref %}

To make the Tailwind CSS theme available throughout your application without passing it down through props in every component, you can utilize React's Context API. Here's how you can set it up:

```jsx
import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
    const toggleTheme = () => {
      
    const oldTheme = getTheme();
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;
    updateTheme(newTheme, oldTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (!theme) updateTheme(defaultTheme);
    else updateTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => localStorage.getItem("theme");

const updateTheme = (theme, themeToRemove) => {
  if (themeToRemove) document.documentElement.classList.remove(themeToRemove);

  document.documentElement.classList.add(theme);
  localStorage.setItem("theme", theme);
};

```

```javascript
import React from "react";
import ThemeProvider from "./ThemeProvider";

export default function ContextProviders({ children }) {
  return (
    // <NotificationProvider>
    //   <SearchProvider>
    //     <MoviesProvider>
    //       <AuthProvider>
             <ThemeProvider>{children}</ThemeProvider>
    //       </AuthProvider>
    //     </MoviesProvider>
    //   </SearchProvider>
    // </NotificationProvider>
  );
}

```

```jsx
import {ThemeContext} from "../Context/ThemeProvider";
import { useContext } from "react";
export const useTheme = () => useContext(ThemeContext);
```

```javascript
import React from 'react'
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from '../hooks/helper';




export const MostPriority = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className='flex justify-center items-center fixed inset-0  flex-col dark:bg-black bg-white'>
      <h1 className='dark:text-white text-black '>Hello suraj we are testing our Theme</h1>
      <button className='border-2 border-black p-1 rounded dark:border-white dark:text-white' onClick={toggleTheme}>theme </button>
      </div>
  )
}

```

```javascript
import React from 'react'
import ReactDOM from "react-dom/client";
import { MostPriority } from "./components/MostPriority"
import ContextProviders from './Context';
const Script = () => {
    console.log("hello")
  return (
    <ContextProviders>
      <MostPriority />
    </ContextProviders>
      
  )
}
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<Script/>)
```
