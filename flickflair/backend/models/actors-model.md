---
cover: >-
  https://images.unsplash.com/photo-1705437576510-cd12ae0ebb68?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5Mjc5NDZ8&ixlib=rb-4.0.3&q=85
coverY: 0
---

# Actors Model

```javascript
const mongoose = require("mongoose");
const actorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    about: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

actorSchema.index({ name: "text" });

module.exports = mongoose.model("Actor", actorSchema);
```

```
const mongoose = require("mongoose");
const actorSchema = mongoose.Schema({});
export Actor =mongoose.model("Actor","actorSchema");

```

This line defines a <mark style="color:red;">**Mongoose schema**</mark> for an email verification token. A schema in Mongoose defines the structure of documents within a collection in a MongoDB database.

