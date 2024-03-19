# Auth

```javascript
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;

  if (!token) return sendError(res, "Invalid token!");
  const jwtToken = token.split("Bearer ")[1];

  if (!jwtToken) return sendError(res, "Invalid token!");
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "unauthorized access!");

  req.user = user;

  next();
};

exports.isAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin") return sendError(res, "unauthorized access!");

  next();
};

```



```javascript
const token = req.headers?.authorization;
```

In this case, it's specifically trying to extract the JWT token from the `Authorization` header in the HTTP request. If the `Authorization` header is present, `token` will hold its value (which typically is in the format `Bearer <token>`). If the `Authorization` header is missing or if `req.headers` itself is not defined, `token` will be `undefined`.



