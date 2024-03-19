---
description: >-
  To handle file uploads in Express, you can use middleware like multer. multer
  is a node.js middleware for handling multipart/form-data, which is primarily
  used for uploading files.
cover: >-
  https://images.unsplash.com/photo-1616401784845-180882ba9ba8?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHwzfHxzdG9yYWdlJTIwfGVufDB8fHx8MTcwNzk3NTM3MXww&ixlib=rb-4.0.3&q=85
coverY: 0
---

# File Upload

<mark style="color:red;">**Multer**</mark>: It's a middleware for Express and Node.js that specifically handles file uploads to your server. It's typically used to receive files uploaded via HTML forms, process them, and store them on your server's disk. Multer provides an easy-to-use API for handling file uploads, including options for configuring file storage, limits, and handling multipart/form-data.

<mark style="color:red;">**Cloudinary**</mark>: It's a cloud-based service specifically designed for managing media assets like images and videos. It offers features like cloud storage, image and video manipulation (resizing, cropping, filtering, etc.), optimization, and delivery through a Content Delivery Network (CDN). Cloudinary can be integrated into your application to handle file uploads, storage, and delivery of media assets.



Let's break down the options passed to `multer.diskStorage()`:

1. `destination`: This option specifies the directory where the uploaded files will be stored. In the example provided, `./uploads/` is the destination directory. This directory should exist before using `multer`, otherwise, `multer` will throw an error.
2. `filename`: This option is a function that determines the name of the uploaded file. It takes three parameters:
   * `req`: The Express request object.
   * `file`: Information about the uploaded file.
   * `cb`: A callback function to be called when the filename is generated. It follows the Node.js convention of passing an error as the first argument (if any) and the filename as the second argument.

In the example you provided, the filename is constructed using the following logic:

* `file.fieldname`: This is the name of the field in the form that the file is uploaded from.
* `'-' + Date.now()`: This adds a timestamp to the filename to ensure it is unique.
* `path.extname(file.originalname)`: This extracts the file extension from the original filename and adds it to the generated filename.



```javascript
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

```

Putting it all together, the `filename` function generates a unique filename by combining the original field name, a timestamp, and the original file extension.

Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. It is written on top of [busboy](https://github.com/mscdex/busboy) for maximum efficiency.

Multer adds a `body` object and a `file` or `files` object to the `request` object. The `body` object contains the values of the text fields of the form, the `file` or `files` object contains the files uploaded via the form.

Basic usage example:

<mark style="color:red;">**Don't forget the**</mark><mark style="color:red;">** **</mark><mark style="color:red;">**`enctype="multipart/form-data"`**</mark><mark style="color:red;">** **</mark><mark style="color:red;">**in your form.**</mark>

```javascript
<form action="/profile" method="post" enctype="multipart/form-data">
```

```javascript
const storage = multer.diskStorage({});
```

The `diskStorage` function creates a storage engine that stores files on disk.

```javascript
const express = require('express')
```

Let's Handle the path files in our way&#x20;



```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // File size limit (in bytes), change according to your needs
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myFile'); // Name of the file input field in your form

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Route to handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: 'Error: No file selected!' });
      } else {
        res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
      }
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

```



***



<mark style="color:red;">**To upload files to Cloudinary, you typically follow a two-step process:**</mark>

1. **Upload files to your server**: You use a middleware like `multer` to handle file uploads in your Express application. This middleware receives files from the client, stores them temporarily on your server, and provides you with access to those files. After the files are uploaded to your server, you can choose to process them further if needed.
2. **Upload files from your server to Cloudinary**: Once the files are uploaded to your server, you can use Cloudinary's Node.js SDK or API to upload those files to Cloudinary. Cloudinary provides methods for uploading files, specifying options like transformations (resizing, cropping, etc.), tags, and folders where the files should be stored in Cloudinary.

{% code overflow="wrap" fullWidth="false" %}
```javascript
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2; // Cloudinary Node.js SDK
const fs = require('fs');
const path = require('path');

const app = express();

// Multer setup for uploading files to your server
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Cloudinary setup
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret'
});

// Route for handling file uploads to your server
app.post('/upload', upload.single('file'), (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // File was uploaded, now upload it to Cloudinary
  cloudinary.uploader.upload(req.file.path, { folder: 'uploads' }, (error, result) => {
    if (error) {
      // Error uploading file to Cloudinary
      fs.unlinkSync(req.file.path); // Delete file from server
      res.status(500).json({ message: 'Error uploading file to Cloudinary', error: error });
    } else {
      // File was successfully uploaded to Cloudinary
      fs.unlinkSync(req.file.path); // Delete file from server
      res.status(200).json({ message: 'File uploaded to Cloudinary', result: result });
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


```
{% endcode %}

In this code:

* Multer is used to handle file uploads to your server.
* After a file is uploaded to your server, it's then uploaded to Cloudinary using the Cloudinary Node.js SDK (`cloudinary.uploader.upload()`).
* If there's an error uploading the file to Cloudinary, the file is deleted from the server using `fs.unlinkSync(req.file.path)` and an error response is sent.
* If the file is successfully uploaded to Cloudinary, it's also deleted from the server using `fs.unlinkSync(req.file.path)` and a success response is sent.

This ensures that the file is always removed from your server after the upload attempt, whether it succeeds or fails. Additionally, appropriate responses are sent based on the upload status.

\
final my code&#x20;



```javascript
  const uploadonCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Log and return the Cloudinary URL
        console.log("File uploaded successfully on Cloudinary ", response.url);
        return response.url;
    } catch (error) {
        // Handle error
        console.error("Error uploading file to Cloudinary:", error);
        
        // Remove saved temporary file as upload operation failed
        fs.unlinkSync(localFilePath);
        return null;
    }
};  
```

