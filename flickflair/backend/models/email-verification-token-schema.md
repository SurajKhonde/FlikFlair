---
cover: >-
  https://images.unsplash.com/photo-1567473030492-533b30c5494c?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwyfHxtYWlsfGVufDB8fHx8MTcwNzkzODE2MXww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# email-Verification-Token-Schema

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const emailVerificationTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now(),
    },
});

emailVerificationTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

emailVerificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

module.exports = mongoose.model(
    "EmailVerificationToken",
    emailVerificationTokenSchema
);
```

`const bcrypt = require("bcrypt");`

* This line imports the bcrypt library, which is used for hashing passwords. Bcrypt is commonly used in security-sensitive applications to securely store passwords by hashing them before storing them in a database.

<mark style="color:red;">**`const emailVerificationTokenSchema = mongoose.Schema({ ... });`**</mark>

* This line defines a Mongoose schema for an email verification token. A schema in Mongoose defines the structure of documents within a collection in a MongoDB database.

`createdAt: {`` `<mark style="color:red;">`type: Date`</mark>`, expires: 3600, default: Date.now() },`

* This part of the schema defines a field named `createdAt` which is of type `Date`. The `expires: 3600` option indicates that documents in the collection should automatically be removed from the database after 3600 seconds (1 hour). The `default: Date.now()` sets the default value of this field to the current date and time.

**`if (this.isModified("token")) { this.token = await bcrypt.hash(this.token, 10); }`**

* Inside the pre-save middleware, this condition checks if the `token` field has been modified. If it has, the token is hashed using bcrypt with a salt round of 10.



***

* `owner`: This field represents the owner of the verification token. It's defined as an ObjectId that references documents in the "User" collection. This establishes a relationship between the email verification token and a user. The `required: true` option indicates that this field is mandatory.
* `token`: This field stores the actual verification token, which is a string. It's also marked as required (`required: true`), meaning every document must have a token.
* `createdAt`: This field represents the creation timestamp of the verification token. It's of type `Date` and has an additional option `expires: 3600`, which indicates that documents in the collection will expire after 3600 seconds (one hour) from their creation time. The `default` option is set to `Date.now()`, meaning that if no value is provided for `createdAt`, it will default to the current date and time.

So, this schema is designed to store email verification tokens associated with users in a MongoDB **collection. The tokens have an expiration time of one hour from their creation.**

<mark style="color:orange;">**Instance Method (**</mark><mark style="color:orange;">**`compareToken`**</mark><mark style="color:orange;">**):**</mark>

* This method is added to the schema's methods.
* It allows comparing a given token with the token stored in the document.
* It takes a token as an argument and compares it with the token stored in the current document.
* It returns a promise that resolves to `true` if the provided token matches the stored token, and `false` otherwise.



***

```javascript
emailVerificationTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});
```

middleware function defined using Mongoose's <mark style="color:red;">**`pre`**</mark> method, which is executed before saving a document to the database.

`emailVerificationTokenSchema.pre("save", async function (next) {`: This line indicates that the following function should be executed before saving a document of the `emailVerificationTokenSchema` model in MongoDB.

`if (this.isModified("token")) {`: This line checks if the "token" field of the document has been modified. If it has been modified, then the token is hashed. This is useful for scenarios where the token is updated or changed before saving the document.

`this.token = await bcrypt.hash(this.token, 10);`: If the token has been modified, it is hashed using bcrypt with a salt factor of 10. Bcrypt is a popular library for hashing passwords and sensitive information securely.

`next();`: This line calls the `next()` function, indicating that the middleware has completed its tasks and that the next middleware in the chain (or the save operation itself) should be executed.

In summary, this middleware ensures that whenever a document of `emailVerificationTokenSchema` is being saved, if the "token" field has been modified, it will be hashed using bcrypt before being saved to the database. This enhances security by storing hashed tokens instead of plain text tokens.

```javascript
emailVerificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};
```

This code snippet adds a method to the `emailVerificationTokenSchema` model called `compareToken`. Here's what it does:

1. `emailVerificationTokenSchema.methods.compareToken = async function (token) {`: This line defines a method called `compareToken` on the `emailVerificationTokenSchema` model's methods.
2. `const result = await bcrypt.compare(token, this.token);`: Inside the method, it compares the provided `token` with the hashed token stored in the document (`this.token`). It uses bcrypt's `compare` method to securely compare the two values. The result is stored in the `result` variable.
3. `return result;`: Finally, the method returns the result of the comparison, which will be `true` if the provided token matches the stored hashed token, and `false` otherwise.

In essence, this method allows you to compare a plain text token (presumably received from a user) with the hashed token stored in the document. This is useful for authentication or verification processes where you need to validate a token against the one stored in the database without exposing the plain text token to potential attackers.
