# Multers

```javascript
const multer = require("multer");
const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb("Supported only image files!", false);
  }
  cb(null, true);
};

const videoFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("video")) {
    cb("Supported only image files!", false);
  }
  cb(null, true);
};

exports.uploadImage = multer({ storage, fileFilter: imageFileFilter });
exports.uploadVideo = multer({ storage, fileFilter: videoFileFilter });

```

**`const imageFileFilter = (req, file, cb) => {`**

* `const imageFileFilter`: This declares a variable named `imageFileFilter` and assigns it a function value.
*   `(req, file, cb)`: This function takes three parameters:

    * `req`: The request object.
    * `file`: <mark style="color:red;">**The file object being uploaded.**</mark>
    * `cb`: The callback function to indicate whether the file passes the filter or not.



    1. `if (!file.mimetype.startsWith("image")) {`
       * <mark style="color:red;">**`file.mimetype`**</mark>: This property represents the <mark style="color:red;">**MIME**</mark> type of the uploaded file. MIME types describe the nature and format of a document, file, or assortment of bytes. For example, image files typically have MIME types like <mark style="color:red;">**"image/jpeg" or "image/png".**</mark>
       * `.startsWith("image")`: This method checks whether the MIME type starts with the string "image". <mark style="color:purple;">This indicates whether the uploaded file is an image file.</mark>
       * `!file.mimetype.startsWith("image")`: This condition checks if the uploaded file's MIME type does not start with "image".
    2. `cb("Supported only image files!", false);`
       * `cb`: This is the callback function provided by Multer to indicate whether the file passes the filter or not.
       * `"Supported only image files!"`: This is the error message passed to the callback if the file does not pass the filter. It indicates that only image files are supported.
       * `false`: This is the second argument passed to the callback, indicating that the file does not pass the filter.
    3. `cb(null, true);`
       * If the condition in the `if` statement is not met (i.e., the file is an image file), this line invokes the callback with `null` (no error) and `true` (indicating that the file passes the filter).

    So, in summary, the `imageFileFilter` function checks whether the uploaded file is an image file based on its MIME type. If it's an image file, it indicates that the file passes the filter; otherwise, it provides an error message indicating that only image files are supported.
