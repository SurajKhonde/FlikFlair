---
cover: >-
  https://images.unsplash.com/photo-1600695268275-1a6468700bd5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw3fHxob21lcGFnZXxlbnwwfHx8fDE3MDU3ODE1Mzh8MA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# HomePage

```javascript
import React from "react";
import Container from "./Container";
import HeroSlideshow from "./user/HeroSlideshow";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedTVSeries from "./user/TopRatedTVSeries";
import TopRatedWebSeries from "./user/TopRatedWebSeries";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <Container className="px-2 xl:p-0">
        <NotVerified />
        {/* slider */}
        <HeroSlideshow />
        {/* Most rated movies */}
        <div className="space-y-3 py-8">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
}

```
