# let's Build Book\_Keeper

<figure><img src="../.gitbook/assets/Screenshot (123).png" alt=""><figcaption></figcaption></figure>

why?\
if looking one place for all Important Links then this is one\
It must be Store on the local System\
no react , Tailwindcss and it's plain javascript



How?

\


let's Start

<mark style="color:purple;">**Index.Html**</mark>



```html
<body>
    <!-- Open Modal -->
    <h1 id="show-modal">Add Bookmark</h1>
    <!-- Bookmarks Container -->
    <div class="container" id="bookmarks-container"></div>
    <!-- Modal -->
    <div class="modal-container" id="modal">
        <div class="modal">
            <i class="fas fa-times close-icon" id="close-modal"></i>
            <div class="modal-header">
                <h3>Add Bookmark</h3>
            </div>
            <div class="modal-content">
                <form id="bookmark-form">
                    <!-- Website Name -->
                    <div class="form-group">
                        <label class="form-label" for="website-name">Website Name</label>
                        <input class="form-input" type="text" id="website-name">                      
                    </div>
                    <!-- Website URL -->
                    <div class="form-group">
                        <label class="form-label" for="website-url">Website URL</label>
                        <input class="form-input" type="text" id="website-url">          
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>
    <!-- Script -->
    <script src="script.js"></script>
</body>
```

```css
@import url("https://fonts.googleapis.com/css?family=Karla&display=swap");

:root {
  --primary-color: #7c59b0;
  --border-radius: 5px;
}

html {
  box-sizing: border-box;
}

body {
  background: var(--primary-color);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80' width='80' height='80'%3E%3Cpath fill='%23b8b8b8' fill-opacity='0.4' d='M14 16H9v-2h5V9.87a4 4 0 1 1 2 0V14h5v2h-5v15.95A10 10 0 0 0 23.66 27l-3.46-2 8.2-2.2-2.9 5a12 12 0 0 1-21 0l-2.89-5 8.2 2.2-3.47 2A10 10 0 0 0 14 31.95V16zm40 40h-5v-2h5v-4.13a4 4 0 1 1 2 0V54h5v2h-5v15.95A10 10 0 0 0 63.66 67l-3.47-2 8.2-2.2-2.88 5a12 12 0 0 1-21.02 0l-2.88-5 8.2 2.2-3.47 2A10 10 0 0 0 54 71.95V56zm-39 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm40-40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm40 40a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'%3E%3C/path%3E%3C/svg%3E");
  font-family: Karla, sans-serif;
}
```

```html
<h1 id="show-modal">Add Bookmark</h1>
```

```css
.show-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

```css
h1 {
  color: white;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--border-radius);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  width: 275px;
  margin: 20px auto 10px;
  user-select: none;
}
```

```css
h1:hover {
  background: rgba(0, 0, 0, 0.8);
}
```

```html
<div class="container" id="bookmarks-container"></div>
```

```css
/* Bookmarks */
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

```

<figure><img src="../.gitbook/assets/Screenshot (125).png" alt=""><figcaption></figcaption></figure>

```html
<div class="modal-container" id="modal">
        <div class="modal">
            <i class="fas fa-times close-icon" id="close-modal"></i>
            <div class="modal-header">
                <h3>Add Bookmark</h3>
            </div>
            <div class="modal-content">
                <form id="bookmark-form">
                    <!-- Website Name -->
                    <div class="form-group">
                        <label class="form-label" for="website-name">Website Name</label>
                        <input class="form-input" type="text" id="website-name">                      
                    </div>
                    <!-- Website URL -->
                    <div class="form-group">
                        <label class="form-label" for="website-url">Website URL</label>
                        <input class="form-input" type="text" id="website-url">          
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>
```

```css
.modal {
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  max-width: 95%;
  width: 500px;
  animation: modalopen 1s;
}
@keyframes modalopen {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

```html
<i class="fas fa-times close-icon" id="close-modal"></i>
```

```css
.close-icon {
  float: right;
  color: white;
  font-size: 24px;
  position: relative;
  top: 13px;
  right: 13px;
  cursor: pointer;
}
```

```html
<div class="modal-header">
    <h3>Add Bookmark</h3>
</div>
```

```css
:root {
  --primary-color: #7c59b0;
  --border-radius: 5px;
}
.modal-header {
  background: var(--primary-color);
  color: #fff;
  padding: 15px;
}
```

```html
<div class="modal-content">
                <form id="bookmark-form">
                    <!-- Website Name -->
                    <div class="form-group">
                        <label class="form-label" for="website-name">Website Name</label>
                        <input class="form-input" type="text" id="website-name">                      
                    </div>
                    <!-- Website URL -->
                    <div class="form-group">
                        <label class="form-label" for="website-url">Website URL</label>
                        <input class="form-input" type="text" id="website-url">          
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
```

````html
<div class="modal-content">
```css
.modal-content {
  padding: 20px;
  background: whitesmoke;
}
```
<div class="form-group">
```css
.form-group {
  height: 55px;
}
```
  <label class="form-label" for="website-url">Website URL</label>
```css
.form-group {
  height: 55px;
}
```
    <input class="form-input" type="text" id="website-url">  
    ```css
.form-input {
  width: 97%;
  padding: 5px;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  display: block;
  outline: none;
}
```
    
````

