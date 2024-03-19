# Models

Backend Models

Basic Structures of Data Model

```javascript
import mongoose,{Schema} from "mongoose";
const userSchema =new Schema({})
export const User =mongoose.model("User",userSchema)
```

Let's create User Model

<mark style="color:red;">**User.Model.js**</mark>

```javascript
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)
```

`import mongoose, { Schema } from "mongoose";`: Imports the `mongoose` library and the `Schema` object from it. `mongoose` is a MongoDB object modeling tool designed to work in an asynchronous environment, and `Schema` is used to define the structure of documents within a collection in MongoDB

1. `import jwt from "jsonwebtoken";`: Imports the `jsonwebtoken` library, which is used for creating and verifying JSON Web Tokens (JWTs). JWTs are commonly used for authentication and information exchange in web applications.
2. `import bcrypt from "bcrypt";`: Imports the `bcrypt` library, which is used for hashing passwords. Password hashing is a security measure to protect user passwords by converting them into a fixed-length string of characters that cannot be easily reversed.
3. `const userSchema = new Schema({...}, {...});`: Defines a new Mongoose schema for the `User` model. Inside the schema definition, various fields are specified along with their types and validation rules.
4. Field Definitions:
   * `username`, `email`, `fullName`, etc.: These are fields of the user schema, each with its own type and validation rules such as `required`, `unique`, `lowercase`, `trim`, and `index`.
   * `watchHistory`: This field is an array of references to `Video` documents.
   * `password` and `refreshToken`: These fields are for storing the user's password hash and refresh token respectively.
5. `timestamps: true`: Enables automatic timestamps (`createdAt` and `updatedAt`) for documents using this schema. This adds `createdAt` and `updatedAt` fields to documents in the collection to track when they were created and last updated

```javascript
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
```

* `userSchema.pre("save", ...)`: Defines a Mongoose middleware function that runs before saving a user document to the database. This middleware is used to hash the user's password before saving it. It takes a function as its second argument, which is executed before the `save` operation.
* `if(!this.isModified("password")) return next();`: Checks if the `password` field of the user document has been modified. If not, it skips the hashing process and calls the `next()` function to proceed with saving the document.
* `this.password = await bcrypt.hash(this.password, 10)`: Hashes the user's password using `bcrypt.hash()`. The second argument (`10`) is the number of salt rounds used for hashing, which determines the computational cost of hashing.
* `next()`: Calls the `next()` function to continue with the save operation after hashing the password.

```javascript
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
```

`userSchema.methods.isPasswordCorrect = ...`: Defines an instance method (`isPasswordCorrect`) on the user schema. This method is used to compare a plain-text password provided by a user with the hashed password stored in the database. It returns a promise that resolves to a boolean indicating whether the passwords match.

***

<mark style="color:purple;">**In Mongoose, setting**</mark> <mark style="color:red;">**`index: true`**</mark> <mark style="color:purple;">**within a schema definition creates an index on the specified field in MongoDB.**</mark>

Indexes are data structures that improve the speed of data retrieval operations on a database table at the cost of additional writes and storage space.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true // Creating an index on the 'username' field
    },
    // Other fields...
});
```

* efficient disk space to accommodate indexes, especially in production environments with large datasets.
* **Index Key Limitations**: MongoDB imposes a limit on the size of index keys (e.g., 1024 bytes). Ensure that the indexed fields do not exceed this limit to avoid index creation failures.

In summary, setting `index: true` in a Mongoose schema creates an index on the specified field in MongoDB, improving query performance and enforcing uniqueness constraints when necessary. However, consider the trade-offs in terms of write performance, storage overhead, and index key limitations when creating indexes.

`required: [true, 'Password is required']`

When set to `true`, it means that the field must have a value, and if a document is saved without providing a value for the field, Mongoose will throw a validation error.

The syntax `required: [true, 'Password is required']` provides an additional feature where the second element of the array is a custom error message that will be thrown if the validation fails. This allows you to provide a more descriptive error message when a required field is missing.

This syntax is particularly useful when you want to provide more informative error messages for required fields, helping developers understand what went wrong during validation. It enhances the readability and clarity of error messages in your application.

`{ timestamps: true }`\
option that can be passed to the schema constructor to automatically add two fields, `createdAt` and `updatedAt`, to the documents stored in the MongoDB collection. These fields store the timestamp when a document was created and last updated, respectively.

```javascript
const userSchema = new mongoose.Schema({
    // Define your schema fields here
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});
```

In this example, when a document is saved to the MongoDB collection using this schema, Mongoose will automatically add `createdAt` and `updatedAt` fields to the document. These fields will be automatically updated by Mongoose whenever the document is created or updated.

The `createdAt` field is set to the current timestamp when the document is first created, while the `updatedAt` field is updated to the current timestamp whenever the document is modified and saved again.

Using `{ timestamps: true }` simplifies the process of tracking when documents are created and updated in your MongoDB collection. It eliminates the need to manually handle the updating of timestamp fields, making your code cleaner and more efficient.

<mark style="color:red;">**`mongooseAggregatePaginate`**</mark>

Mongoose that adds pagination support to aggregation queries. While Mongoose provides built-in support for pagination with the `skip()` and `limit()` methods on queries, these methods can be inefficient for large datasets because they fetch all documents before applying pagination.

`mongooseAggregatePaginate` addresses this issue by allowing you to paginate the results of aggregation queries efficiently. It paginates results directly within the aggregation pipeline, which can improve performance for large datasets.

