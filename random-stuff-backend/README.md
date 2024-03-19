---
description: Higher Order Components
---

# Random stuff backend



```javascriptreact
import React from "react";

export default function GridContainer({ children, className }) {
  return (
    <div
      className={
        "grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-3 " + className
      }
    >
      {children}
    </div>
  );
}

```

this is higher order components. basically what are  higher-order components ?\
like we saw many  higher-order components just we don't know they called by that name also like **Map and filter**. In our context which fiction can other argument or JSX pass as children are higher order components.\
