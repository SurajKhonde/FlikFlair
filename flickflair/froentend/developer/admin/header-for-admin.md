# Header for Admin

<figure><img src="../../../../.gitbook/assets/Screenshot (56).png" alt=""><figcaption><p><mark style="color:orange;"><strong>Header</strong></mark></p></figcaption></figure>

```javascript
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks";
import AppSearchForm from "../form/AppSearchForm";

export default function Header({ onAddActorClick, onAddMovieClick }) {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useTheme();

  const navigate = useNavigate();

  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;

    navigate("/search?title=" + query);
  };

  return (
    <div className="flex items-center justify-between relative p-5">
      <AppSearchForm
        onSubmit={handleSearchSubmit}
        placeholder="Search Movies..."
      />

      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>

        <button
          onClick={() => setShowOptions(true)}
          className="flex items-center space-x-2 dark:border-dark-subtle border-light-subtle dark:text-dark-subtle text-light-subtle hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>

        <CreateOptions
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          options={options}
        />
      </div>
    </div>
  );
}

const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "options-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;

      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleClick = (fn) => {
    fn();
    onClose();
  };

  if (!visible) return null;

  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 z-50 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {options.map(({ title, onClick }) => {
        return (
          <Option key={title} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};

```

Let's handle the Search box in header&#x20;

```
 const handleSearchSubmit = (query) => {
    if (!query.trim()) return;

    navigate("/search?title=" + query);
  };
```

```
const container = useRef();
```

The `useRef` hook in React is used to create a mutable object that persists across renders. It returns a `ref` object with a `current` property that can be used to store a mutable value. The primary use cases for `useRef` include accessing and interacting with a DOM element, persisting values across renders without triggering a re-render, and interacting with imperative APIs.

* If you need to interact with a DOM element, such as attaching event listeners or manipulating the element directly, `useRef` is useful.
* Example: `const container = useRef();` can be associated with a DOM element like `<div ref={container}>`.
* If you need to store a value that should not trigger a re-render when changed (unlike state), `useRef` is a good choice.



```
const handleClose = (e) => {
  // Check if the options container is visible
  if (!visible) return;

  // Destructure properties from the event target
  const { parentElement, id } = e.target;

  // Check if the click occurred within the options container or its parent
  if (parentElement.id === containerID || id === containerID) return;

  // Check if the container ref exists and does not have the "animate-scale" class
  if (container.current) {
    if (!container.current.classList.contains("animate-scale")) {
      // Add the "animate-scale-reverse" class to initiate the reverse animation
      container.current.classList.add("animate-scale-reverse");
    }
  }
};
```

Explanation:

1. **Check Visibility:**
   * The function begins by checking whether the options container is currently visible (`visible` is a prop/state).
   * If it's not visible, there's no need to proceed with handling the click.
2. **Destructuring Event Target Properties:**
   * The `e.target` represents the element that triggered the event (in this case, a click).
   * The `parentElement` is the immediate parent of the clicked element.
   * The `id` is the ID of the clicked element.
3. **Check Click Location:**
   * It checks whether the click occurred within the options container or its parent. If so, it means the click was inside the container, and the function returns early without further actions.
4. **Check Container Ref and Add Class:**
   * It then checks whether the `container` ref exists (`container.current`).
   * If the container exists and does not have the "animate-scale" class, it means the container hasn't started the animation yet.
   * In that case, the "animate-scale-reverse" class is added to initiate a reverse animation.

This function is likely used in the context of a dropdown or modal where clicking outside the container should trigger a reverse animation or hide the container. The specific classes and animation logic might be part of a broader CSS animation strategy.

In summary, this function handles the click event outside the options container, triggering a reverse animation if the container is currently visible and hasn't started the animation yet.
