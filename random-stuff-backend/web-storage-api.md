# Web Storage API

The **Web Storage API** provides mechanisms by which browsers can store key/value pairs, in a much more intuitive fashion than using [cookies](https://developer.mozilla.org/en-US/docs/Glossary/Cookie).

### [Web Storage concepts and usage](https://developer.mozilla.org/en-US/docs/Web/API/Web\_Storage\_API#web\_storage\_concepts\_and\_usage) <a href="#web_storage_concepts_and_usage" id="web_storage_concepts_and_usage"></a>

The two mechanisms within Web Storage are as follows:

* `sessionStorage` maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores).
  * Stores data only for a session, meaning that the data is stored until the browser (or tab) is closed.
  * Data is never transferred to the server.
  * Storage limit is larger than a cookie (at most 5MB).
*   `localStorage` does the same thing, but persists even when the browser is closed and reopened.

    * Stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.
    * Storage limit is the maximum amongst the two.

    These mechanisms are available via the [`Window.sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) properties (to be more precise, the `Window` object implements the `WindowLocalStorage` and `WindowSessionStorage` objects, which the `localStorage` and `sessionStorage` properties hang off) — invoking one of these will create an instance of the [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) object, through which data items can be set, retrieved and removed. A different Storage object is used for the `sessionStorage` and `localStorage` for each origin — they function and are controlled separately.

### [Web Storage interfaces](https://developer.mozilla.org/en-US/docs/Web/API/Web\_Storage\_API#web\_storage\_interfaces) <a href="#web_storage_interfaces" id="web_storage_interfaces"></a>

[`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

Allows you to set, retrieve and remove data for a specific domain and storage type (session or local).

[`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

The Web Storage API extends the [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object with two new properties — [`Window.sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) and [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — which provide access to the current domain's session and local [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) objects respectively, and a [`storage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage\_event) event handler that fires when a storage area changes (e.g., a new item is stored).

## HTTP headers

An **HTTP header** is a field of an HTTP request or response that passes additional context and metadata about the request or response. For example, a request message can use headers to indicate it's preferred media formats, while a response can use header to indicate the media format of the returned body. Headers are case-insensitive, begin at the start of a line and are immediately followed by a `':'` and a header-dependent value. The value finishes at the next CRLF or at the end of the message.

## Request header

Contain more information about the resource to be fetched, or about the client requesting the resource.

* [Response header](https://developer.mozilla.org/en-US/docs/Glossary/Response\_header): Headers with additional information about the response, like its location or about the server itself (name, version, …).
* [Representation header](https://developer.mozilla.org/en-US/docs/Glossary/Representation\_header): metadata about the resource in the message body (e.g. encoding, media type, etc.).
* [Fetch metadata request header](https://developer.mozilla.org/en-US/docs/Glossary/Fetch\_metadata\_request\_header): Headers with metadata about the resource in the message body (e.g. encoding, media type, etc.).

<mark style="color:red;">**`Accept: application/json`**</mark>:

* The <mark style="color:green;">**`Accept`**</mark> header is used by the client to specify the media types that are acceptable for the response.
* In this case, <mark style="color:blue;">**`application/json`**</mark> indicates that the client prefers to receive JSON (JavaScript Object Notation) data in the response.
* This header allows the server to understand the client's preference for the type of data it wants to receive, helping to ensure compatibility between the client and server.

1. `Accept: application/json`:
   * The `Accept` header is used by the client to specify the media types that are acceptable for the response.
   * In this case, `application/json` indicates that the client prefers to receive JSON (JavaScript Object Notation) data in the response.
   * This header allows the server to understand the client's preference for the type of data it wants to receive, helping to ensure compatibility between the client and server.
2. `User-Agent`:
   * The `User-Agent` header is sent by the client (e.g., web browser) to identify itself to the server.
   * It contains information about the client software, such as its name, version, and operating system.
   * Servers can use this information to tailor responses to specific clients or to gather statistics about the usage of their services.
3. <mark style="color:green;">**`Authorization: Bearer token`**</mark><mark style="color:green;">**:**</mark>
   * The `Authorization` header is used to send credentials (such as authentication tokens) to the server for authentication purposes.
   * In the case of the `Bearer` authentication scheme, the token is included after the word "Bearer" (e.g., `Bearer <token>`).
   * This header is commonly used in APIs that require authentication, allowing clients to access protected resources by presenting valid credentials.
4. `Content-Type: image/jpeg`:
   * The `Content-Type` header is used to indicate the media type of the content in the request or response body.
   * In this example, `image/jpeg` indicates that the content is in JPEG (Joint Photographic Experts Group) image format.
   * This header helps the receiving party to properly interpret and handle the content.
5. `Cookies`:
   * The `Cookies` header is used to send previously stored cookies from the client to the server with each request.
   * Cookies are small pieces of data sent by the server and stored by the client's browser.
   * They are commonly used for session management, user authentication, and tracking user behavior across multiple requests.
6. `Cache-Control: max-age=3600`:
   * The `Cache-Control` header is used to specify directives for caching mechanisms in both requests and responses.
   * In this example, `max-age=3600` indicates that the response can be cached by the client or intermediary caches for up to 3600 seconds (1 hour).
   * This header helps to optimize performance by controlling how long responses can be stored in cache before they expire and must be revalidated with the server.

These headers are essential for controlling various aspects of the HTTP communication, including content negotiation, authentication, content handling, and caching behavior.
