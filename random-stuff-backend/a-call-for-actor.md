---
cover: >-
  https://images.unsplash.com/photo-1534073828943-f801091bb18c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw1fHxjYWxsfGVufDB8fHx8MTcwNzkyODg5Mnww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# A call for Actor

```javascript
import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const createActor = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchActor = async (query) => {
  const token = getToken();
  try {
    const { data } = await client(`/actor/search?name=${query}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateActor = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteActor = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete("/actor/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getActors = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/actor/actors?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getActorProfile = async (id) => {
  try {
    const { data } = await client(`/actor/single/${id}`);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

```

let's Look how server response the call &#x20;

&#x20;

```javascript
export const createActor = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/actor/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};
```

```
post("/actor/create")
```

first it decide the route like our cellphone tower which work same way it will decide the tower first in our app we will find first Route on which routes to connect the call in our case we are Actors <mark style="color:red;">**/actor/**</mark> routes&#x20;

Now we defined the routes so what we want to do it when call get connected. don't worry there are only 4 operations we  can perform CRUD(Create, Read, Update, Delete).\
let's Explore one by one \
<mark style="color:red;">**/create:**</mark>

```javascript
router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("avatar"),
  actorInfoValidator,
  validate,
  createActor
);
```

when you just make a single create call from the client side in the server so many operations start to make sure the operation is done smoothly and well organized for collecting all necessary data no less no more.

```javascript
const { isAuth, isAdmin } = require("../middlewares/auth");

```

