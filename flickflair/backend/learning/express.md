---
cover: >-
  https://images.unsplash.com/photo-1523238469729-2aa7b7f067f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwxfHxleHByZXNzfGVufDB8fHx8MTcwODc2MTg1OXww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# Express

When it comes to build web applications using Node.js, creating a server can take a lot of time. Over the years Node.js has matured enough due to the support from community. Using Node.js as a backend for web applications and websites help the developers to start working on their application or product quickly.

### **What is Express?** <a href="#what-is-express" id="what-is-express"></a>

Express is the most popular Node.js framework because it requires minimum setup to start an application or an API and is fast, and unopinionated at the same time. In other words, it does not enforces its own philosophy that a application or API should be built in a specific way, unlike Rails and Django. Its flexibility can be calculated by the number of `npm` modules available which makes it pluggable at the same time. If you have basic knowledge of HTML, CSS, and JavaScript and how Node.js works in general, in no time you will be able to get started with Express.

### **Why use Express?** <a href="#why-use-express" id="why-use-express"></a>

Before we start with mechanism of using Express as the backend framework, let us first explore why we should consider it using or the reasons of its popularity.

* Express lets you build single page, multi-page, and hybrid web and mobile applications. Other common backend use is to provide an API for a client (whether web or mobile).
* It comes with a default template engine, Jade which helps to facilitate the flow of data into a website structure and does support other template engines.
* It supports MVC (Model-View-Controller), a very common architecture to design web applications.
* It is cross-platform and is not limited to any particular operating system.
* It leverages upon Node.js single threaded and asynchronous model.

### **Building a Server with Express** <a href="#building-a-server-with-express" id="building-a-server-with-express"></a>

To use our installed package for Express framework and create a simple server application, we will create the file, `index.js`, at the root of our project’s directory.

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

### **Anatomy of an Express Application** <a href="#anatomy-of-an-express-application" id="anatomy-of-an-express-application"></a>

A typical structure of an Express server file will most likely contain the following parts:

<mark style="color:red;">**Dependencies**</mark>

Importing the dependencies such as the express itself. These dependencies are installed using `npm` like we did in the previous example.

<mark style="color:red;">**Instantiations**</mark>

These are the statements to create an object. To use express, we have to instantiate the `app` variable from it.

<mark style="color:red;">**Configurations**</mark>

These statements are the custom application based settings that are defined after the instantiations or defined in a separate file (more on this when discuss the project structure) and required in our main server file.

<mark style="color:red;">**Middleware**</mark>

These functions determine the flow of request-response cycle. They are executred after every incoming request. We can also define custom middleware functions. We have section on them below.

<mark style="color:red;">**Routes**</mark>

They are the endpoints defined in our server that helps to perform operations for a particular client request.

### **Routing** <a href="#routing" id="routing"></a>

Routing refers to how an server side application responds to a client request to a particular endpoint. This endpoint consists of a URI (a path such as `/` or `/books`) and an HTTP method such as GET, POST, PUT, DELETE, etc.

Routes can be either good old web pages or REST API endpoints. In both cases the syntax is similar syntax for a route can be defined as:

```javascript
app.METHOD(PATH, HANDLER);
```

Routers are helpful in separating concerns such as different endpoints and keep relevant portions of the source code together. They help in building maintainable code. All routes are defined before the function call of `app.listen()`. In a typical Express application, `app.listen()` will be last function to execute.

#### **Routing Methods** <a href="#routing-methods" id="routing-methods"></a>

HTTP is a standard protocol for a client and a server to communicate over. It provides different methods for a client to make request. Each route has at least on hanlder function or a callback. This callback function determines what will be the response from server for that particular route. For example, a route of `app.get()` is used to handle GET requests and in return send simple message as a response.

```
/ GET method route
app.get('/', (req, res) => res.send('Hello World!'));
```

#### **Routing Paths** <a href="#routing-paths" id="routing-paths"></a>

A routing path is a combination of a request method to define the endpoints at which requests can be made by a client. Route paths can be strings, string patterns, or regular expressions.

```javascript
app.get('/home', (req, res) => {
  res.send('Home Page');
});
app.get('/about', (req, res) => {
  res.send('About');
});
```

Consider the above code as a bare minimum website which has two endpoints, `/home` and `/about`. If a client makes a request for home page, it will only response with `Home Page` and on `/about` it will send the response: `About Page`. We are using the `res.send` function to send the string back to the client if any one of the two routes defined is selected.

#### **Routing Parameters** <a href="#routing-parameters" id="routing-parameters"></a>

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. `req.params` object is used in this case because it has access to all the parameters passed in the url.

```javascript
app.get('/books/:bookId', (req, res) => {
  res.send(req.params);
});
```

The request URL from client in above source code will be `http://localhost:3000/books/23`. The name of route parameters must be made up of characters (\[A-Za-z0-9\_]). A very general use case of a routing parameter in our application is to have 404 route.

```javascript
// For invalid routes
app.get('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});
```

If we now start the server from command line using `node index.js` and try visiting the URL: `http://localhost:3000/abcd`. In response, we will get the 404 message.

### **Middleware Functions** <a href="#middleware-functions" id="middleware-functions"></a>

Middleware functions are those functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle. The objective of these functions is to modify request and response objects for tasks like parsing request bodies, adding response headers, make other changes to request-response cycle, end the request-response cycle and call the next middleware function.

The `next` function is a function in the Express router which is used to execute the other middleware functions succeeding the current middleware. If a middleware function does include `next()` that means the request-response cycle is ended there. The name of the function `next()` here is totally arbitary and you can name it whatever you like but is important to stick to best practices and try to follow a few conventions, especially if you are working with other developers.

Also, when writing a custom middleware do not forget to add `next()` function to it. If you do not mention `next()` the request-response cycle will hang in middle of nowhere and you servr might cause the client to time out.

<mark style="color:red;">Let use create a custom middleware function to grasp the understanding of this concept.</mark>

```javascript
const express = require('express');
const app = express();

// Simple request time logger
app.use((req, res, next) => {
   console.log("A new request received at " + Date.now());

   // This function call tells that more processing is
   // required for the current request and is in the next middleware
   function/route handler.
   next();  
});

app.get('/home', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

To setup any middleware, whether a custom or available as an npm module, we use `app.use()` function. It as one optional parameter path and one mandatory parameter callback. In our case, we are not using the optional paramaeter path.

```javascript
app.use((req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});
```

The above middleware function is called for every request made by the client. When running the server you will notice, for the every browser request on the endpoint `/`, you will be prompt with a message in your terminal:

```
A new request received at 1467267512545
```

Middleware functions can be used for a specific route. See the example below:

```javascript
const express = require('express');
const app = express();

//Simple request time logger for a specific route
app.use('/home', (req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});

app.get('/home', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

### <mark style="color:red;">**Serving Static Files**</mark> <a href="#serving-static-files" id="serving-static-files"></a>

To serve static files such as CSS stylesheets, images, etc. Express provides a built in middleware function `express.static`. Static files are those files that a client downloads from a server.

It is the only middleware function that comes with Express framework and we can use it directly in our application. All other middlewares are third party.

By default, Express does not allow to serve static files. We have to use this middleware function. A common practice in the development of a web application is to store all static files under the ‘public’ directory in the root of a project. We can serve this folder to serve static files include by writing in our `index.js` file:

```javascript
app.use(express.static('public'));
```

The advantage of using a Template Engine over raw HTML files is that they provide support for performing tasks over data. HTML cannot render data directly. Frameworks like Angular and React share this behaviour with template engines.

You can also pass values to template engine directly from the route handler function.

```javascript
app.get('/', (req, res) => {
  res.render('index', { title: 'Hello from Pug', message: 'Hello World!' });
});
```

