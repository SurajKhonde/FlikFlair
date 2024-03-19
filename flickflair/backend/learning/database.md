# DataBase

To connect to the MongoDB database when the `index.js` file is loaded, you can follow these steps:

**Create a `.env` file**: In your project directory, create a file named `.env` if it doesn't exist already. This file will store your environment variables, including the MongoDB connection URL.\
Adjust the MongoDB URL according to your MongoDB configuration.

```javascript
plaintextCopy codeMongoDB_url=mongodb://localhost:27017/myDatabase
```

**Install dotenv**: Install the `dotenv` package to load environment variables from the `.env` file into `process.env`

**Configure index.js**: In your `index.js` file, load the `dotenv` package and configure it to load the environment variables from the `.env` file. Then, establish a connection to the MongoDB database using the MongoDB Node.js driver.

```javascript
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

/** @type {typeof mongoose | undefined} */
export let dbInstance = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    dbInstance = connectionInstance;
    console.log(
      `\n☘️  MongoDB Connected! Db host: ${connectionInstance.connection.host}\n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
```

`process.exit(1);`: This line terminates the Node.js process with an exit code of `1`. Terminating the process in this way indicates an abnormal termination, typically used to signify an error condition. It's common to use a non-zero exit code (`1` in this case) to indicate that an error occurred.

Always remember that whenever you talk with DataBase always wrap your code inside the&#x20;

Try{}

catch{}

robustness and reliability of your application. Wrapping database-related code inside a `try...catch` block is a common practice to catch and handle any errors that may occur during database operations.

Additionally, considering that database operations involve network communication and can take some time to complete, it's advisable to use asynchronous programming techniques such as `async/await` in JavaScript. This ensures that your application remains responsive and doesn't block while waiting for database operations to complete.&#x20;

Regarding the professional way to connect to a database using an <mark style="color:red;">**Immediately Invoked Function Expression**</mark> (IIFE), it's a technique commonly used to encapsulate code and create a self-contained scope. This can be especially useful for database connection setup, as it allows you to define and execute the connection logic in a controlled manner.

<mark style="color:red;">**How write IIFE ?**</mark>

An <mark style="color:orange;">**Immediately Invoked Function Expression**</mark> (IIFE) is a JavaScript function that is executed immediately after it's defined. It's a design pattern used to create a new scope for variables and functions to prevent them from polluting the global scope.

better approach is start with <mark style="color:green;">**(;)**</mark>

```javascript
;(function() {
    // Code inside this function is executed immediately
})();
```

Immediately Invoked Function Expression (IIFE) that attempts to establish a connection to a MongoDB database using Mongoose and start an Express.js server.

```javascript
import mongoose from "mongoose";
import express from "express";
import { DB_NAME } from "./constants";

const app = express();

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.on("error", (error) => {
            console.log("MongoDB connection error:", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})();

```

This code should now properly connect to the MongoDB database using Mongoose, handle any connection errors, and start the Express.js server to listen for incoming requests on the specified port.



<mark style="color:red;">**2ND**</mark> APPROACH

```javascript
import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

export default connectDB;

```

