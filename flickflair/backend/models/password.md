---
cover: >-
  https://images.unsplash.com/photo-1634979149798-e9a118734e93?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw4fHxwYXNzd29yZHxlbnwwfHx8fDE3MDc5NzE3OTF8MA&ixlib=rb-4.0.3&q=85
coverY: 0
---

# Password

```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordResetTokenSchema = mongoose.Schema({
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

passwordResetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

passwordResetTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

module.exports = mongoose.model(
    "PasswordResetToken",
    passwordResetTokenSchema
);
```

```
  owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
```

`type`: Specifies the data type of the field.

**`mongoose.Schema.Types.ObjectId`:** This refers to the ObjectId type provided by Mongoose. It's a special type used to store MongoDB's <mark style="color:red;">**ObjectIDs.**</mark>This is a property provided by Mongoose that represents the type ObjectId. ObjectId is a unique identifier used in MongoDB to uniquely identify documents in a collection. It is a 12-byte identifier typically represented as a 24-character hexadecimal string.

```javascript
passwordResetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});
```

pre-save middleware function for a Mongoose schema named `passwordResetTokenSchema`. This middleware is designed to automatically hash the `token` field whenever a document of this schema is about to be saved into the database.

1. **`passwordResetTokenSchema.pre("save", async function (next) { ... });`**
   * This line sets up a pre-save hook for the schema. This hook will execute the provided function just before a document is saved into the database. The function receives a `next` parameter, which is a callback function that should be called once the middleware logic is complete to proceed with the saving process.
2. `if (this.isModified("token")) { ... }`
   * Inside the middleware function, this line checks if the `token` field has been modified. This check ensures that the hashing operation is only performed if the token has been changed or newly created.
3. `this.token = await bcrypt.hash(this.token, 10);`
   * If the `token` field has been modified, this line hashes the `token` using bcrypt's `hash` function. The `await` keyword indicates that the hashing operation is asynchronous and returns a Promise, so it waits for the hashing to complete before proceeding. The `10` parameter is the number of salt rounds used in the hashing process, which determines the computational cost of the hash function.
4. `next();`
   * Finally, this line calls the `next` function to proceed with the saving process. This ensures that after the middleware logic is executed, the document is saved with the hashed token.

In summary, this middleware ensures that whenever a document with a `token` field of the `passwordResetTokenSchema` schema is saved into the database, the `token` value is automatically hashed using bcrypt with a salt round of 10, but only if the `token` field has been modified. This helps to securely store password reset tokens in the database, enhancing the overall security of the application.



```javascript
passwordResetTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};
```

`compareToken` for the `passwordResetTokenSchema` schema. This method is used to <mark style="color:red;">**compare a provided plain text token with the hashed token stored in a document of this schema.**</mark> Here's a breakdown of each line:

1. `passwordResetTokenSchema.methods.compareToken = async function (token) { ... };`
   * This line adds a method named `compareToken` to the schema's methods. Methods defined in this way are available to individual documents created from this schema.
2. `const result = await bcrypt.compare(token, this.token);`
   * Inside the `compareToken` method, this line compares the provided plain text `token` with the hashed token stored in the document (`this.token`). It uses bcrypt's `compare` function to perform the comparison. The `await` keyword indicates that this operation is asynchronous and returns a Promise.
3. `return result;`
   * This line returns the result of the comparison. The `result` variable contains a boolean value (`true` if the plain text token matches the hashed token, `false` otherwise). This result is then returned to the caller of the `compareToken` method.

In summary, the `compareToken` method provides a way to securely compare a plain text token with the hashed token stored in a document of the `passwordResetTokenSchema` schema. This is useful for verifying the validity of password reset tokens during the password reset process in an application.



