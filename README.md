# HumbleScroll.js

HumbleScroll is a lightweight animation on scroll Javascript library. It's easy to use and has no dependencies.

## Installation

Add styles in `<head>`

```html
<link rel="stylesheet" href="humbleScroll.min.css" />
```

Add scripts right before closing `</body>`

```html
<script src="humbleScroll.min.js"></script>
<script src="script.js"></script>
```

Initialize HumbleScroll inside your script

```javascript
const scroll = new HumbleScroll();
```

---

## How to use?

### 1. Initialize HumbleScroll

By passing a options object to the HumbleScroll you are able to customize how the animations are calculated.

```javascript
const scroll = new HumbleScroll({
  root: document.queryselector(".custom-container"), // Root container to observe (default: Document root)
  element: "[data-hs]", // Element to observe (default: All elements with data-hs attribute)
  class: "hs-inview", // Class added when element is visible (default: hs-inview)
  initClass: "hs-inview", // Class added when HumbleScroll loaded (default: hs-inview)
  repeat: true, // Wheter to repeat the animation when scrollin from top (default: false)
  mirror: true, // Wheter to mirror the animation when leaving (default: false)
  threshold: 0.25, // Intersection threshold where 0.1 is 10% of the element (default: 0.1)
  enableCallback: true, // Wheter to enable callback function on intersect (default: false)
  callback: "data-hs-call", // Callback data-attribute to call on intersect (default: data-hs-call)
  startEvent: "DOMContentLoaded", // Event to start the initialization (default: DOMContentLoaded)
});
```

### 2. Define animation using `data-hs` attribute

Wrap the element you want to animate in a div that uses the `data-hs` attribute

```html
<div data-hs="fade up">
  <div class="card"></div>
</div>
```

### 3. Adjust global animation settings in your stylesheet

```css
:root {
  --hs-duration: 800ms;
  --hs-easing: ease-in;
  --hs-delay: 100ms;
  --hs-translate-x-amount: 10rem;
  --hs-translate-y-amount: 8rem;
  --hs-rotate: -5deg;
}
```

### 4. Adjust individual elements using inline-style or by applying a class that changes the CSS properties

```html
<div data-hs="fade up" style="--hs-delay: 200ms"></div>
```

```css
.delay-200 {
  --hs-delay: 200ms;
}
```

### Tip: Console log the HumbleScroll instance to check current options

```javascript
console.log(scroll);
```

---

## JS events

### 1. Enable HumbleScroll to watch your `data-hs-call` attributes

```javascript
const scroll = new HumbleScroll({
  enableCallback: true,
});
```

### 2. Set a `data-hs-call` attribute on the element

```html
<div data-hs-call="myFunction"></div>
```

### 3. Define your function in your script

```javascript
function myFunction() {
  console.log("Hello world");
}
```
