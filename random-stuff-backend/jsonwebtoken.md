---
description: Create and parses JWT (JSON Web Tokens)
---

# jsonwebtoken

* [DecodingKey](https://docs.rs/jsonwebtoken/latest/jsonwebtoken/struct.DecodingKey.html)All the different kind of keys we can use to decode a JWT. This key can be re-used so make sure you only initialize it once if you can for better performance.
* [EncodingKey](https://docs.rs/jsonwebtoken/latest/jsonwebtoken/struct.EncodingKey.html)A key to encode a JWT with. Can be a secret, a PEM-encoded key or a DER-encoded key. This key can be re-used so make sure you only initialize it once if you can for better performance.
* [Header](https://docs.rs/jsonwebtoken/latest/jsonwebtoken/struct.Header.html)A basic JWT header, the alg defaults to HS256 and typ is automatically set to `JWT`. All the other fields are optional.
* [TokenData](https://docs.rs/jsonwebtoken/latest/jsonwebtoken/struct.TokenData.html)The return type of a successful call to [decode](https://docs.rs/jsonwebtoken/latest/jsonwebtoken/fn.decode.html).
* [Validation](https://docs.rs/jsonwebtoken/latest/jsonwebtoken/struct.Validation.html)Contains the various validations that are applied after decoding a JWT.

#### jwt.sign(payload, secretOrPrivateKey, \[options, callback])

How use Jwt token&#x20;

```javascript
const jwt = require("jsonwebtoken");
const token = req.headers?.authorization;
```

`req.headers`: In Express.js, the `req` object represents the HTTP request that comes from the client to the server. The `headers` property of the `req` object contains all the HTTP headers sent by the client as key-value pairs.

`authorization`: This is the name of the HTTP header being accessed. In many authentication schemes, including JWT (JSON Web Tokens), the token is typically sent in the `Authorization` header of the HTTP request.

Putting it all together, <mark style="color:red;">`req.headers?.authorization`</mark> is attempting to access the `authorization` header from the `req.headers` object. If `req.headers` is `null` or `undefined`, or if the `authorization` header is not present, the expression will return `undefined`. Otherwise, it will return the value of the `authorization` header.

This line is often used in authentication middleware to check if a JWT token is included in the request headers and to extract it for further processing.

```javascript
const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;
```

the main total code is here\




{% content-ref url="../flickflair/backend/middleware/auth.md" %}
[auth.md](../flickflair/backend/middleware/auth.md)
{% endcontent-ref %}
