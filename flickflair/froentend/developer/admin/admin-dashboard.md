---
cover: >-
  https://images.unsplash.com/photo-1610913721979-b20ede600e63?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwxfHxkYXNofGVufDB8fHx8MTcwNTY5MTE0M3ww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# Admin Dashboard

<figure><img src="../../../../.gitbook/assets/Screenshot (57).png" alt=""><figcaption></figcaption></figure>

```javascript
import React, { useEffect, useState } from "react";
import { getAppInfo } from "../../api/admin";
import { useNotification } from "../../hooks";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import MostRatedMovies from "../MostRatedMovies";

export default function Dashboard() {
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  });

  const { updateNotification } = useNotification();

  const fetchAppInfo = async () => {
    const { appInfo, error } = await getAppInfo();

    if (error) return updateNotification("error", error);

    setAppInfo({ ...appInfo });
  };

  useEffect(() => {
    fetchAppInfo();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox
        title="Total Uploads"
        subTitle={appInfo.movieCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subTitle={appInfo.reviewCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Users"
        subTitle={appInfo.userCount.toLocaleString()}
      />

      <LatestUploads />
      <MostRatedMovies />
    </div>
  );
}

```

lets create a AppInfoBox &#x20;

```javascript
import React from "react";

export default function AppInfoBox({ title, subTitle }) {
  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary p-5 rounded">
      <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        {title}
      </h1>
      <p className="text-xl text-primary dark:text-white">{subTitle}</p>
    </div>
  );
}

```
