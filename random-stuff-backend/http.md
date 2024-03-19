---
description: Hypertext Transfer Protocol (HTTP)
cover: >-
  https://images.unsplash.com/photo-1580163661417-3606299aba72?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwzfHxodHRwfGVufDB8fHx8MTcwODc3ODY1Mnww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# HTTP

protocol for transmitting hypermedia documents, such as HTML. It was designed for communication between web browsers and web servers, but it can also be used for other purposes.

<figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Client-server-model.svg/1024px-Client-server-model.svg.png" alt=""><figcaption></figcaption></figure>

### World Wide Web Communication

The World Wide Web is about communication between web **clients** and web **servers**.

**Clients** are often browsers (Chrome, Edge, Safari), but they can be any type of program or device.

**Servers** are most often computers in the cloud.

### HTTP Request / Response

Communication between clients and servers is done by requests and responses:

1. A client (a browser) sends an **HTTP request** to the web
2. A web server receives the request
3. The server runs an application to process the request
4. The server returns an **HTTP response** (output) to the browser
5. The client (the browser) receives the response

***

### The HTTP Request Circle

A typical HTTP request / response circle:

1. The browser requests an HTML page. The server returns an HTML file.
2. The browser requests a style sheet. The server returns a CSS file.
3. The browser requests an JPG image. The server returns a JPG file.
4. The browser requests JavaScript code. The server returns a JS file
5. The browser requests data. The server returns data (in XML or JSON).

##

## An overview of HTTP

**HTTP** is a [protocol](https://developer.mozilla.org/en-US/docs/Glossary/Protocol) for fetching resources such as HTML documents. It is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient, usually the Web browser. A complete document is reconstructed from the different sub-documents fetched, for instance, text, layout description, images, videos, scripts, and more.

<figure><img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview/fetching_a_page.png" alt=""><figcaption></figcaption></figure>

Clients and servers communicate by exchanging individual messages (as opposed to a stream of data). The messages sent by the client, usually a Web browser, are called _requests_ and the messages sent by the server as an answer are called _responses_.

<figure><img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview/http-layers.png" alt=""><figcaption></figcaption></figure>

## HTTP caching

HTTP (Hypertext Transfer Protocol) and HTTPS (Hypertext Transfer Protocol Secure) are both protocols used for transferring data over the internet, but they differ in terms of security.

HTTP:

* HTTP operates over a plain text protocol.
* Data sent via HTTP is not encrypted, making it vulnerable to interception or modification by attackers.
* URLs beginning with "http://" use HTTP.

HTTPS:

* HTTPS is an extension of HTTP that adds a layer of security through SSL/TLS encryption.
* Data sent via HTTPS is encrypted, ensuring confidentiality and integrity of the information being transmitted.
* URLs beginning with "https://" use HTTPS.

HTTP headers

HTTP headers are additional pieces of information sent along with an HTTP request or response. They provide metadata about the request or response and can serve various purposes including controlling caching behavior, authentication, encoding/compression, and more. Headers are key-value pairs structured in the format: `HeaderName: Value`.

There are several types of headers:

1. Request Headers:
   * Request headers are sent by the client (e.g., web browser) to the server as part of an HTTP request.
   * They contain information such as the type of browser making the request, the type of content it can accept, any authentication credentials, etc.
   * Examples of common request headers include `User-Agent`, `Accept`, `Authorization`, `Cookie`, etc.
2. Response Headers:
   * Response headers are sent by the server to the client in response to an HTTP request.
   * They contain information about the server, the data being returned, caching directives, etc.
   * Examples of common response headers include `Server`, `Content-Type`, `Set-Cookie`, `Cache-Control`, etc.
3. Representation Headers:
   * Representation headers provide metadata about the representation of the resource being transferred (e.g., encoding, compression).
   * They specify how the data in the response body should be interpreted or processed.
   * Examples include `Content-Encoding`, `Content-Language`, `Content-Disposition`, etc.
4. Payload Headers:
   * Payload headers provide metadata about the payload (message body) of the HTTP request or response.
   * They include information such as content length, content type, etc.
   * Examples include `Content-Length`, `Content-Type`, `Content-Disposition`, etc.

## Using HTTP cookies

An **HTTP cookie** (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. The browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is used to tell if two requests come from the same browser—keeping a user logged in, for example. It remembers stateful information for the [stateless](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http\_is\_stateless\_but\_not\_sessionless) HTTP protocol.

Cookies are mainly used for three purposes:

[Session management](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#session\_management)

Logins, shopping carts, game scores, or anything else the server should remember

[Personalization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#personalization)

User preferences, themes, and other settings

[Tracking](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#tracking)

Recording and analyzing user behavior
