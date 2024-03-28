# animated-navigation



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Animated Navigation</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Menu Overlay -->
  <div class="overlay overlay-slide-left" id="overlay">
    <!-- Menu Items -->
    <nav>
      <ul>
        <li id="nav-1" class="slide-out-1"><a href="#">Home</a></li>
        <li id="nav-2" class="slide-out-2"><a href="#about">About</a></li>
        <li id="nav-3" class="slide-out-3"><a href="#skills">Skills</a></li>
        <li id="nav-4" class="slide-out-4"><a href="#projects">Projects</a></li>
        <li id="nav-5" class="slide-out-5"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
  <!-- Menu Bars -->
  <div class="menu-bars" id="menu-bars">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
  </div>
  <!-- Sections -->
  <section id="home"><a href="https://jacinto.design" target="_blank">Jacinto Design</a></section>
  <section id="about"><h1>Learn More About Me</h1></section>
  <section id="skills"><h1>These Are My Strengths</h1></section>
  <section id="projects"><h1>These Are My Results</h1></section>
  <section id="contact"><h1>Available Anytime</h1></section>
  <!-- Script -->
  <script src="script.js"></script>
</body>
</html>

```

```javascript
const menuBars = document.getElementById('menu-bars');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItems = [nav1, nav2, nav3, nav4, nav5];

// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
  });
}

function toggleNav() {
  // Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle('change');
  // Toggle: Menu Active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')) {
    // Animate In - Overlay
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In - Nav Items
    navAnimation('out', 'in');
  } else {
    // Animate Out - Overlay
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate Out - Nav Items
    navAnimation('in', 'out');
  }
}

// Event Listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((nav) => {
  nav.addEventListener('click', toggleNav);
});

```
