---
description: >-
  A magical container who handles all Creation like movie uploads or Actor
  Upload
---

# ModalContainer

```javascript
import React from "react";
export default function ModalContainer({
  visible,
  ignoreContainer,
  children,
  onClose,
}) {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose && onClose();
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;

    return (
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {children}
      </div>
    );
  };

  if (!visible) return null;
  return (
    <div
      onClick={handleClick}
      id="modal-container"
      className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
}

```

```
  return (
    <div
      onClick={handleClick}
      id="modal-container"
      className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
}
```

**`{renderChildren()}`:** This is where the `renderChildren()` function is invoked. It's enclosed in curly braces `{}` within the JSX, which allows you to include dynamic content or execute JavaScript expressions.

The reason why `renderChildren` is not passed as an argument but rather invoked directly is that it might be intended to return JSX content or perform some computation/rendering logic that is immediately injected into the JSX structure. If `renderChildren` were passed as an argument, it would be treated as a function reference rather than being immediately executed to provide the JSX content.
