---
cover: >-
  https://images.unsplash.com/photo-1545843882-755262a6b52f?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw2fHxtb25nb29zZXxlbnwwfHx8fDE3MDc5MzUyNTV8MA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# mongoose

### Why do you need Mongoose? <a href="#why-do-you-need-mongoose" id="why-do-you-need-mongoose"></a>

To understand why we need Mongoose, let's understand how MongoDB (and a database) works on the architecture level.

* You have a database server (MongoDB community server, for example)
* You have a Node.js script running (as a process)

MongoDB server listens on a TCP socket (usually), and your Node.js process can connect to it using a TCP connection.

But on the top of TCP, MongoDB also has its own protocol for understanding what exactly the client (our Node.js process) wants the database to do.

For this communication, instead of learning the messages we have to send on the TCP layer, we abstract that away with the help of a "driver" software, called MongoDB driver in this case. MongoDB driver is available as an [npm package here](https://www.npmjs.com/package/mongodb).

Now remember, the MongoDB driver is responsible for connecting and abstracting the low level communication request/responses from you – but this only gets you so far as a developer.

Because MongoDB is a schemaless database, it gives you way more power than you need as a beginner. More power means more surface area to get things wrong. You need to reduce your surface area of bugs and screw-ups you can make in your code. You need something more.

Meet Mongoose. Mongoose is an abstraction over the native MongoDB driver (the npm package I mentioned above).

The general rule of thumb with abstractions (the way I understand it) is that with every abstraction you lose some low-level operation power. But that doesn't necessarily mean it is bad. Sometimes it boosts productivity 1000x+ because you never really need to have full access to the underlying API anyway.

Mongoose gives you options for two things:

1. Cursor-based querying
2. Full fetching query

#### Cursor-based querying <a href="#cursor-based-querying" id="cursor-based-querying"></a>

Cursor-based querying means that you work with a single record at a time while you fetch a single or a batch of documents at a time from the database. This is an efficient way of working with huge amounts of data in a limited memory environment.

Imagine that you have to parse documents of 10GB in total size on a 1GB/1core cloud server. You cannot fetch the whole collection because that will not fit on your system. Cursor is a good (and the only?) option here.

#### Full fetching querying <a href="#full-fetching-querying" id="full-fetching-querying"></a>

This is the type of query where you get the full response of your query all at once. For the most part, this is what you'll be using. Therefore, we'll be focusing mostly on this method here.

### How to use Mongoose Models <a href="#how-to-use-mongoose-models" id="how-to-use-mongoose-models"></a>

Models are the superpower of Mongoose. They help you enforce "schema" rules and provide a seamless integration of your Node code into database calls.

The very first step is to define a good model:\


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

1. Try to keep `required: true` on all fields which are required. This can be a huge pain saver for you if you don't use a static type checking system like TypeScript to assist you with correct property names while creating an object. Plus the free validation is super cool, too.
2. Define indexes and unique fields. `unique` property can also be added within a schema. Indexes are a broad topic, so I will not go into depth here. But on a large scale they can really help you to speed up your queries a lot.
3. Restrict values if you can, using enums.

<mark style="color:orange;">**Basically, Mongoose helps to create a fixed  module or Structure which is same like mold or clay structures .**</mark>

Mongoose is an <mark style="color:red;">Object Data Modeling</mark> (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data. Mongoose allows you to define schemas with data types, validators, and other configurations, which are then used to interact with MongoDB databases.
