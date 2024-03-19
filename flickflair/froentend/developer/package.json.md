# Package.json

```json
{
  "name": "flickflair",
  "homepage": "https://SurajKhonde.github.io/FlikFlair",
  "version": "1.0.0",
  "description": "This is flikflair movie site",
  "scripts": {
    "predeploy": "rd /s /q dist && parcel build index.html --public-url https://SurajKhonde.github.io/FlikFlair/",
    "deploy": "gh-pages -d dist",
    "start": "parcel index.html",
    "build": "parcel build index.html",
    "test": "jest"
  },
  "author": "suraj",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.6.2",
    "gh-pages": "^6.1.1",
    "ghpages": "^0.0.10",
    "parcel": "^2.10.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-drag-drop-files": "^2.3.10",
    "react-icons": "^4.12.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "buffer": "^6.0.3",
    "postcss": "^8.4.31",
    "process": "^0.11.10",
    "tailwindcss": "^3.3.5"
  }
}

```
