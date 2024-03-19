---
description: >-
  Let's face it, writing MongoDB validation, casting and business logic
  boilerplate is a drag.
---

# Mongoose

[Mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a [MongoDB](https://www.mongodb.com/) object modeling tool designed to work in an asynchronous environment.

<mark style="color:red;">**Mongoose**</mark> models serve as blueprints for structuring and storing data within MongoDB. They play a crucial role in defining the shape and characteristics of the data that will be stored. When creating Mongoose models, it's essential to carefully consider the types of data that need to be stored, ensuring efficiency and integrity throughout the application.

By delineating the types of data to be stored, such as strings, numbers, dates, or complex nested objects, Mongoose models establish a clear structure for the data stored in MongoDB. This structured approach streamlines data storage and retrieval processes, enhancing the overall efficiency and performance of the application.

Moreover, Mongoose models enable developers to enforce data validation and define constraints, ensuring that only valid and expected data is stored in the database. This helps maintain data integrity and consistency, mitigating the risk of errors and inconsistencies within the application.

In essence, Mongoose models act as molds that shape and define the data storage structure in MongoDB, empowering developers to design robust and efficient data models tailored to the specific requirements of their applications.

<mark style="color:red;">**Must Remember the following lines**</mark>&#x20;

```javascript
import monoose from "mongoose";
const UserSchema = new monoose.Schema({})

export const User=monoose.model("User",UserSchema)
```

basic model Looks like this&#x20;

```javascript
import monoose from "mongoose";
const UserSchema = new monoose.Schema({//must use new 
    userName:String,
    Email:String,
    isActive:Boolean,
    Password:String,    
}, { timestamps:true})

export const User=monoose.model("User",UserSchema)//Always try to use the User name and Inside model"User" is the same  
```

As this Basic Model but Before storing inside the  MongoDB you can be validate so details like this&#x20;

```javascript
import monoose from "mongoose";
const UserSchema = new monoose.Schema({
    userName:{
    type:String,
    required: true,
    unique: true,
    lowercase: true
    },
    Email:{
    type:String,
    required: true,
    unique: true,
    lowercase: true
    },
    isActive:Boolean,
    Password:{
    type:String,
    required:[true,"Password Must required"]
    }
}, { timestamps:true})

export const User=monoose.model("User",UserSchema)
```

```javascript
{ timestamps:true}
```

In Mongoose, <mark style="color:purple;">**`{ timestamps: true }`**</mark> is an option that you can pass when defining a schema. When you include this option in your schema definition, Mongoose automatically adds two fields to your documents: <mark style="color:red;">**`createdAt`**</mark> and <mark style="color:red;">**`updatedAt`**</mark>. These fields record the timestamps for when a document was created and last updated, respectively.

With this setup, whenever you create or update a document using this schema, Mongoose will automatically manage the `createdAt` and `updatedAt` fields for you. This is particularly useful for keeping track of when your data was created or modified without having to manually manage these fields in your application logic.
