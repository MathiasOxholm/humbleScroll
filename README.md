# HumbleScroll.js

HumbleScroll is a lightweight animation on scroll Javascript library. It's easy to use and has no dependencies.
The library is based on Intersection Observer combined with CSS Custom Props for easy customization.

---

## Demo

Demo site coming soon...

---

## Comparison

HumbleScroll is inspired by AOS.js but should load significantly less CSS and JS. Take a look below:

### AOS:

- 13.5kb JS
- 28kb CSS
- 41.5kb in total without gzip

### HumbleScroll

- 3.7kb JS
- 3.4kb CSS
- 7.1kb in total without gzip

---

## Installation

### 1. Add styles in `<head>`

```html
<link rel="stylesheet" href="humbleScroll.min.css" />
```

### 2. Add scripts right before closing `</body>`

```html
<script src="humbleScroll.min.js"></script>
<script src="script.js"></script>
```

### 3. Initialize HumbleScroll inside your script

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
  repeat: true, // whether to repeat the animation when scrollin from top (default: false)
  mirror: true, // whether to mirror the animation when leaving (default: false)
  threshold: 0.25, // Intersection threshold where 0.1 is 10% of the element (default: 0.1)
  enableCallback: true, // whether to enable callback function on intersect (default: false)
  callback: "data-hs-call", // Callback data-attribute to call on intersect (default: data-hs-call)
  startEvent: "DOMContentLoaded", // Event to start the initialization (default: DOMContentLoaded)
});
```

### 2. Define animation using `data-hs` attribute

Wrap the element you want to animate in a div that uses the `data-hs` attribute.
It's very important to wrap the element you want to animate as the CSS targets `['data-hs'] > *` child-elements.

```html
<div data-hs="fade up">
  <div class="card">I'm gonna fade up!</div>
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
  --hs-easing: cubic-bezier(0.17, 0.67, 0.83, 0.67);
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

### Run JS when HumbleScroll is initialized

```javascript
scroll.on("hs:complete", () => {
  console.log("HumbleScroll is complete!");
});
```

---

## Animation overview

### CSS Custom Props

```css
:root {
  --hs-delay: 0ms;
  --hs-easing: var(--hs-ease-out);
  --hs-duration: 600ms;
  --hs-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --hs-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --hs-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --hs-opacity: 1;
  --hs-visibility: visible;
  --hs-translate-y: 0;
  --hs-translate-x: 0;
  --hs-scale: 1;
  --hs-rotate: 0deg;
  --hs-ratio: 1;
  --hs-translate-ratio: 1;
  --hs-scale-ratio: 0.2;
  --hs-duration-ratio: 1;
  --hs-translate-x-amount: 2rem;
  --hs-translate-y-amount: 3rem;
  --hs-blur: 0;
}
```

### 1. Fade animation

Fades in by default

```html
<div data-hs="fade"></div>
```

### 2. Diretional

Customize by overriding `--hs-translate-y-amount` or `--hs-translate-x-amount` in your css or directly on the element as inline-style

```html
<div data-hs="up"></div>
<div data-hs="down"></div>
<div data-hs="left"></div>
<div data-hs="right"></div>
```

### 3. Zoom

Customize by overriding `--hs-scale-ratio` in your css or directly on the element as inline-style

```html
<div data-hs="zoom-in"></div>
<div data-hs="zoom-out"></div>
```

### 4. Flip

Flip in any direction. Cannot be customized

```html
<div data-hs="flip-up"></div>
<div data-hs="flip-down"></div>
<div data-hs="flip-left"></div>
<div data-hs="flip-right"></div>
```

### 5. Blur

Who doesn't like motion blur? Customize by overriding `--hs-blur` on an element

```html
<div data-hs="blur"></div>
<div data-hs="blur" style="--hs-blur: 40px"></div>
```

### 6. Easings

Customize by overriding `--hs-ease`, `--hs-ease-in` or `--hs-ease-out` or just create your own

```html
<div data-hs="ease-in"></div>
<div data-hs="ease-out"></div>
<div data-hs="ease-in-out"></div>
```

### 7. Size variations

Default variation for the translation amount on directional animations (up, down, left, right)
Customize by overriding `--hs-translate-ratio`

```html
<div data-hs="sm"></div>
<div data-hs="md"></div>
<div data-hs="lg"></div>
<div data-hs="xl"></div>
<div data-hs="2xl"></div>
```

### 8. Speed variations

Default variation for animation durations (scales from `--hs-delay`)

```html
<div data-hs="extra-slow"></div>
<div data-hs="slow"></div>
<div data-hs="fast"></div>
<div data-hs="extra-fast"></div>
```

### Combine them!

Combine animations inside the `data-hs` attribute (space seperated)

```html
<div data-hs="fade up right xl slow"></div>
<div data-hs="fade left down fast"></div>
<div data-hs="zoom-in up left extra-slow"></div>
<div data-hs="flip-right up lg slow"></div>
```
