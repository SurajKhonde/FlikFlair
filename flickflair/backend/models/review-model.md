---
cover: >-
  https://images.unsplash.com/photo-1633613286991-611fe299c4be?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwxfHxyZXZpZXdzfGVufDB8fHx8MTcwNzk3MzI4Mnww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# review-Model

```javascript
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  // owner parentMovie rating content
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parentMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  content: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);

```
