# Middleware

<figure><img src="../../../.gitbook/assets/When-you-came-late-in-office-Boss-be-like-meme.jpg" alt=""><figcaption><p>Real meaning of Middleware</p></figcaption></figure>

##

<figure><img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*C4WbFuLBN71Fi7ETTzeSzQ.jpeg" alt=""><figcaption></figcaption></figure>

<mark style="color:green;">**Node.js middleware**</mark> is a crucial component of web application development that helps handle incoming requests and provides a way to execute functions and processes in a sequential manner. Middleware functions sit between the server and the application’s routes, allowing for the modification of incoming requests, the addition of extra functionality, and the handling of responses. In this response, we will explore how Node.js middleware works in-depth, along with an example to illustrate its usage.

Node.js middleware functions are typically functions that take three parameters: `request`, `response`, and `next`. These parameters represent the incoming HTTP request, the response to be sent back, and a callback function that moves the request to the next middleware in the chain, respectively. The middleware can manipulate the request or response objects, perform additional operations, and decide whether to pass the request to the next middleware or send a response

The **middleware** functions are registered with the Node.js application using the `app.use()` or `app.METHOD()` methods provided by popular web frameworks like Express.js. These methods define the middleware at the application level or for specific HTTP methods such as `GET`, `POST`, `PUT`, etc. The middleware functions are executed in the order they are registered, allowing for sequential processing of the request.

Let’s consider an example where we want to create a middleware that logs each incoming request. We can define a middleware function as follows

```javascript
function requestLogger(req, res, next) {
  console.log(`Received ${req.method} request at ${req.url}`);
  next(); // Move to the next middleware
}
```

In this example, the `requestLogger` function logs the HTTP method and the URL of the incoming request. The `next()` function is called to move the request to the next middleware in the chain.

To use this middleware in an Express.js application, we register it using the `app.use()` method:

Middleware functions can also perform tasks like authentication, error handling, data parsing, and more. For example, the following middleware checks if a user is authenticated before allowing access to protected routes:

```javascript
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next(); // Move to the next middleware
  } else {
    res.redirect('/login');
  }
}
```

In this case, the `isAuthenticated` middleware checks if the user is authenticated using a function like `req.isAuthenticated()` and either allow access to the next middleware or redirects the user to the login page.

Middleware functions can be chained together to perform multiple operations on a request. The order of registration matters, as it determines the sequence in which the middleware functions are executed.

In summary, **Node.js middleware** provides a way to extend the functionality of web applications by intercepting and manipulating incoming requests and outgoing responses. Middleware functions allow for sequential processing, modification of request/response objects, and the ability to decide whether to pass the request to the next middleware or send a response.



## What _<mark style="color:red;">app.use( )</mark>_ do in  our Express app? <a href="#id-579b" id="id-579b"></a>

An Express application can use 5 different types of middleware. The **.use()** method in the express is an **Application-level middleware**.

## how many types of Middlewares do we have in express? <a href="#id-2750" id="id-2750"></a>

these are all 5 different middleware of an express application.

* Application-level middleware.
* Router-level middleware.
* Error-handling middleware.
* Built-in middleware.
* Third-party middleware.

> <mark style="color:red;">**application-level middleware**</mark>

```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

> <mark style="color:red;">**Error-handling middleware**</mark>

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature `(`**`err`**`,`` `**`req`**`,`` `**`res`**`,`` `**`next`**`)`:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

> Built-in middleware

Express has the following built-in middleware functions:

```javascript
app.use(express.static()) 
// serves static assets such as HTML files, images, and so on   
app.use(express.json())
// parses incoming requests with JSON payloads. NOTE: Available with Express 4.16.0+
app.use(express.urlencoded()) 
// parses incoming requests with URL-encoded payloads. NOTE: Available with Express 4.16.0+
```

> <mark style="color:red;">**Third-party middleware**</mark>

you can install the node.js module for the required functionality, then load it in your app at the application level or at the router level.

```javascript
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```





## Middleware for Node.js

[Node.js](https://www.turing.com/blog/why-and-when-to-use-node-js-framework/) gives developers complete freedom and privilege to develop high-performing dynamic web applications. It also helps in caching and comes with excellent and prompt community support.

<mark style="color:red;">**Express.js**</mark>, meanwhile, is an open-source backend framework for Node.js. It is an enterprise-based application and is used by the world’s leading companies. It plays a major role in tracking and preventing users from performing any specific action or recording the path of each incoming request.

The <mark style="color:purple;">**middleware in Node.js helps in making Express JS custom middleware.**</mark> Middleware functions are essential when dealing with common functions in web applications.

#### _<mark style="color:purple;">**How does Node.js middleware pattern work?**</mark>_

Middleware comes in the middle of the request and response cycle of the node.js execution. It also provides access to many functions like request and response objects with the <mark style="color:orange;">**Next**</mark> function of the cycle.

Tasks that can be performed with the middleware functions include:

* Making quick changes to the request and response objects
* Calling the next middleware immediately as per the stack
* Effectively executing any code
* Automatically terminating the request-response cycle

\


<figure><img src="../../../.gitbook/assets/65980e59531ac2845a272811_How_Node_js_Middleware_works_e09cc37e20.avif" alt=""><figcaption></figcaption></figure>

When the active middleware function doesn’t stop the request-response cycle, it will call the <mark style="color:orange;">**next() function to pass on the control to the next middleware function**</mark>, making sure that none of the requests are pending.

#### **What is next( )?**

<mark style="color:red;">**Next() is a middleware**</mark> function that calls for the control of another middleware once the code is completed. You can wait till the network operations are completed before you go to the next step. As with the functionality of route handlers, a middleware will ensure the receipt of the request and response objects effortlessly.

Now, the request object is referred to as the req variable and the response object as the res variable. The next middleware function is referred to as the next function. It plays a responsible role in creating the request-response cycle of the application.

Here are some vital tasks performed by the middleware functions:

* Completing the request and response cycle
* Executing the codes
* Calling the subsequent middleware function in the line
* Making necessary changes to the request and response objects as per the requirement

The request should not be left in the queue, especially when there is no automatic end to the request-response cycle of the current middleware function.

#### **Middleware in Node.js**

With Node.js middleware, you can run any code and modify the request and response objects. You can also call for the next middleware in the stack when the current one is completed. The example below will help you with the process of creating your Node.js middleware.

```javascript
let express = require(‘require’)
let app = express()
let requestTime = function (req, res, next)
{
req.requestTime = Date.now()
next()
}
app.use(requestTime)
app.get (‘/’, function (req, res) {
let responseText = ‘Hi Familly!<br>’
responseText += ‘<small>Requested at: ‘+req.requestTime + ‘</small>’
res.send (responseText)
})
app.listen(3000)
```

### **What is Express middleware?**

Middleware is an abstraction layer that works as an intermediate between the software layers. Express middleware is a function that is compiled during the lifecycle of the Express server. There is always a competition between Express and Koa for better middleware.

<figure><img src="https://images.prismic.io/turing/65980e5a531ac2845a272812_Express_middleware_11zon_bf752a6bd4.webp?auto=format,compress" alt=""><figcaption></figcaption></figure>

### **Types of middleware in Node.js**

#### **1. Application-level middleware**

In the application-level middleware, we consider an authentication middleware and how it can be created. When the user is not authenticated, it will not be possible to call the mentioned routes. When it is necessary to build an authentication for every GET, POST call, the development of an authentication middleware will follow.

When you receive the authentication request, the authentication middleware makes progress towards the authentication code logic that is available inside it. Once the authentication is successful, the rest of the route can be called using the next function. However, when it fails, you may not be able to perform the next route as the middleware will show errors.

#### **2. Router-level middleware**

Router-level middleware is almost like the application-level middleware and works in the same way. The difference is that it can generate and limit an instance using the Express.Router() function. You can make use of the router.use() and router.METHOD() functions to load router-level middleware.

#### **3. Build-in middleware**

The build-in middleware doesn't depend on the ‘Connect’ function and unlike the previous 4.X version types, Express now acts as a module. Generally, under the Express types of middleware, you can utilize these listed middleware functions:

* json - a function that computes the incoming request by adding JSON payloads
* static - a function that acts as a static asset to the application.

#### **4. Error-handling middleware**

Express.js is capable of handling any default errors and can also define error-handling middleware functions, which are similar to the other middleware functions. The major difference is the error-handling functions.

#### **5. Third-party middleware**

Sometimes, you will need to have some additional features in the backend operations. For that, you can install the Node.js module for the specific function and then apply the same to your application (either on the application or router level).

<figure><img src="https://miro.medium.com/v2/resize:fit:750/format:webp/1*SqWPnJd6L_geVN-Y2qqkDQ.png" alt=""><figcaption></figcaption></figure>

