# HumbleScroll.js (Beta)

HumbleScroll is a lightweight and minimalistic animation on scroll Javascript library. It's easy to use and has no dependencies. The library is based on Intersection Observer combined with CSS Custom Props for easy customization.

---

## 👀 Demo

A quick demo site built with Astro.js - [See HumbleScroll in action](https://humblescroll.oxholm.dev/)

---

## ⚖ Comparison

HumbleScroll is inspired by AOS.js but should load significantly less CSS and JS. Should be around 2kb total when gzip is active. Take a look below for details:

### AOS

- 13.5kb JS (4.8kb gzipped)
- 28kb CSS (2.4kb gzipped)
- Total: 41.5kb (7.2kb gzipped)

### HumbleScroll

- 3.7kb JS (1.3kb gzipped)
- 6.8kb CSS (1.15kb gzipped)
- Total: 11.5kb (2.45kb gzipped)

---

## ⚙ Installation

### 1. Add styles in `<head>`

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/MathiasOxholm/humbleScroll@latest/cdn/css/humbleScroll.min.css"
/>
```

### 2. Add scripts right before closing `</body>`

```html
<script src="https://cdn.jsdelivr.net/gh/MathiasOxholm/humbleScroll@latest/cdn/js/humbleScroll.js"></script>
<script src="script.js"></script>
```

### 3. Initialize HumbleScroll inside your script

```javascript
const scroll = new HumbleScroll();
```

---

## 🧰 Usage

### 1. Customize HumbleScroll

By passing a options object to the HumbleScroll you are able to customize how the animations are calculated.

```javascript
const scroll = new HumbleScroll({
  repeat: true,
  mirror: true,
  threshold: 0.25,
  enableCallback: true,
  offset: {
    top: 0,
    bottom: -40,
  },
});
```

### 2. Define animation using `data-hs` attribute

Wrap the element you want to animate in a div that uses the `data-hs` attribute.
It's very important to wrap the element you want to animate as the CSS targets `['data-hs'] > *` child-elements. Sadly the Intersection Observer in javascript takes transforms into account. To avoid weird behavior we need to devide what we are watching and what we are animating into two elements.

```html
<div class="parent" data-hs="fade up desktop:down">
  <div class="child">
    I'm gonna fade up on mobile and tablet but down on desktop!
  </div>
</div>
```

### 3. Adjust global animation settings in your stylesheet

```css
:root {
  --hs-duration: 800ms;
  --hs-delay: 100ms;
  --hs-translate-x-amount: 10rem;
  --hs-translate-y-amount: 8rem;
  --hs-rotate: -5deg;
  --hs-easing: cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
```

### 4. Adjust individual elements using inline-style or by creating your own class that changes the CSS properties

```html
<div class="parent" data-hs="fade up" style="--hs-delay: 200ms">
  <div class="child">I have a delay of 200ms</div>
</div>
```

```css
.delay-200 {
  --hs-delay: 200ms;
}
```

### Options overview

| Option           | Type      | Default                                    | Description                                                                 |
| ---------------- | --------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| `root`           | `string`  | `null`                                     | Root container to observe                                                   |
| `element`        | `string`  | `[data-hs]`                                | Element to observe for animations                                           |
| `class`          | `string`  | `hs-inview`                                | Class added when element is visible                                         |
| `initClass`      | `string`  | `hs-init`                                  | Class added when HumbleScroll is loaded                                     |
| `repeat`         | `boolean` | `false`                                    | Repeat the animation when scrolling from top                                |
| `mirror`         | `boolean` | `false`                                    | Mirror the animation on leave                                               |
| `threshold`      | `number`  | `0.1`                                      | Intersection threshold where 0.1 is 10% of the element                      |
| `enableCallback` | `boolean` | `false`                                    | Enable callback function on intersect                                       |
| `startEvent`     | `string`  | `DOMContentLoaded`                         | Event to start HumbleScroll initialization                                  |
| `offset`         | `object`  | `{top: 0, right: 0, bottom: -40, left: 0}` | Intersection offset. Use negative numbers to make the observed area smaller |
| `callback`       | `string`  | `[data-hs-callback]`                       | Element to observe for callbacks                                            |

### Tip: Console log the HumbleScroll instance to check current options

```javascript
console.log(scroll);
```

---

## ❗ Before you start

### Remove no-js from HTML (Important)

The library takes account for `.no-js` class on the `:root` element of your website. If you have `<html class="no-js">` HumbleScroll wont work. Furthermore, all animations are by default disabled when `prefers-reduced-motion: reduce` is enabled in the OS / browser.

### With jQuery

HumbleScroll can work fine alongside jQuery eventhough it's written in vanilla javascript. Start off by changing the `startEvent` to `load` instead of `DOMContentLoaded` and place `new HumbleScroll` outside Document ready. This setup is tested on a WordPress site running jQuery.

```javascript
$(document).ready(function () {
  // All your regular jQuery code
});

// Place HumbleScroll outside any Document ready
const scroll = new HumbleScroll({
  startEvent: "load",
});
```

---

## 🖱 JS events

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

## 👁 Animation overview

### CSS Custom Props

All Custom props that can be customized.

```css
:root {
  /* Transition */
  delay: 0ms,
  easing: var(hs-ease-out),
  duration: 600ms,
  /* Transition easings */
  ease-in: cubic-bezier(0.4, 0, 1, 1),
  ease-in-out: cubic-bezier(0.4, 0, 0.2, 1),
  ease-out: cubic-bezier(0, 0, 0.2, 1),
  ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1),
  /* Visibility */
  opacity: 1,
  /* Transfrom */
  translate-y: 0,
  translate-x: 0,
  scale: 1,
  rotate: 0deg,
  perspective: 0,
  rotate-x: 0deg,
  rotate-y: 0deg,
  skew-x: 0deg,
  skew-y: 0deg,
  /* Ratio */
  translate-ratio: 1,
  scale-ratio: 0.2,
  duration-ratio: 1,
  /* Amount */
  translate-x-amount: 2rem,
  translate-y-amount: 3rem,
  flip-x-amount: 100deg,
  flip-y-amount: -100deg,
  perspective-amount: 2000px,
  stagger-amount: 100ms,
  skew-amount: 20deg,
  reveal-amount: 100%,
  /* Efects */
  blur: 0,
  blur-amount: 5px
}
```

### 1. Fade animation

Fades in by default but can be combined with one or two directions.

```html
<div data-hs="fade"></div>
<div data-hs="fade up"></div>
<div data-hs="fade down left"></div>
```

### 2. Diretional

Customize by overriding `--hs-translate-y-amount` or `--hs-translate-x-amount` in your css or directly on the element as inline-style. Works like a slide without `fade` applied.

```html
<div data-hs="up"></div>
<div data-hs="down"></div>
<div data-hs="left"></div>
<div data-hs="right"></div>
```

### 3. Zoom

Customize by overriding `--hs-scale-ratio` in your css or directly on the element as inline-style.

```html
<div data-hs="zoom-in"></div>
<div data-hs="zoom-out"></div>
```

### 4. Flip

Flip in any direction. Customize by overriding `--hs-flip-x-amount` and `--hs-flip-y-amount`.

```html
<div data-hs="flip-up"></div>
<div data-hs="flip-down"></div>
<div data-hs="flip-left"></div>
<div data-hs="flip-right"></div>
```

### 5. Skew

Combine with blur to make them feel blazingly fast. Customize by overriding `--hs-skew-amount`.

```html
<div data-hs="skew-up"></div>
<div data-hs="skew-down"></div>
<div data-hs="skew-left"></div>
<div data-hs="skew-right"></div>
```

### 6. Reveal

Parent has overflow hidden and child slides from 100% to 0. Cusomize by overriding `--hs-reveal-amount`.

```html
<div data-hs="reveal-up"></div>
<div data-hs="reveal-down"></div>
<div data-hs="reveal-left"></div>
<div data-hs="reveal-right"></div>
```

### 7. Blur

Who doesn't like motion blur? Customize by overriding `--hs-blur` on an element.

```html
<div data-hs="blur"></div>
<div data-hs="blur" style="--hs-blur: 40px"></div>
```

### 8. Easings

Customize by overriding `--hs-ease`, `--hs-ease-in`, `--hs-ease-out` or `--hs-ease-out-back` or just create your own. These are based on TailwindCSS' three basic easings.

```html
<div data-hs="ease-in"></div>
<div data-hs="ease-out"></div>
<div data-hs="ease-in-out"></div>
<div data-hs="ease-out-back"></div>
```

### 9. Size variations

Default variation for the translation amount on directional animations (up, down, left, right).
Customize by overriding `--hs-translate-ratio`.

```html
<!-- Translate ratio * 0.5 -->
<div data-hs="sm"></div>
<!-- Translate ratio * 0.75 -->
<div data-hs="md"></div>
<!-- Translate ratio * 1.75 -->
<div data-hs="lg"></div>
<!-- Translate ratio * 2 -->
<div data-hs="xl"></div>
<!-- Translate ratio * 3 -->
<div data-hs="2xl"></div>
```

### 10. Speed variations

Default variation for animation durations (scales from `--hs-duration`).

```html
<!-- Duration * 3 -->
<div data-hs="extra-slow"></div>
<!-- Duration * 1.5  -->
<div data-hs="slow"></div>
<!-- Duration * 0.5  -->
<div data-hs="fast"></div>
<!-- Duration * 0.25 -->
<div data-hs="extra-fast"></div>
```

### 11. Run once

Ensure the animation only runs once - even with `repeat` and `mirror` enabled.

```html
<div data-hs="once"></div>
```

### 12. Responsive animations

In this responsive age developers need the ability to animate differrently based on screensizes. Use the `phone:`, `tablet:` or `desktop:` prefix before animations to apply a media query.
CSS doesn't support variable media queries just yet. Therefore the prefixes are hardcoded values.

```html
<!-- Fade up on mobile and tablet but fade down on desktop -->
<div data-hs="fade up desktop:down"></div>
<!-- Left on mobile, right on tablet and left again on desktop -->
<div data-hs="fade left tablet:right desktop:left"></div>
<!-- Only fade up on mobile -->
<div data-hs="fade phone:up"></div>
```

#### Responsive values in CSS

```css
:root {
  --hs-duration: 0.4s;
  --hs-easing: ease-in-out;
  --hs-translate-x-amount: 2.5rem;
}

@media (min-width: 768px) {
  :root {
    --hs-duration: 0.6s;
    --hs-easing: ease-in;
    --hs-translate-x-amount: 4rem;
  }
}
```

### 13. Combine them

Combine animations inside the `data-hs` attribute (space seperated).

```html
<div data-hs="fade up right xl slow"></div>
<div data-hs="fade left down fast"></div>
<div data-hs="zoom-in up left extra-slow"></div>
<div data-hs="flip-right up lg slow once"></div>
<div data-hs="skew-right fade right 2xl blur fast ease-out-back"></div>
```

---

## 👬 Multiple HumbleScrolls?

Sure why not! Add as many different HumbleScrolls as you need for your website.

```javascript
// Default HumbleScroll targeting [data-hs]
const scroll = new HumbleScroll({
  enableCallback: true,
  repeat: true,
  mirror: true,
  threshold: 0.25,
  offset: {
    bottom: -150,
  },
});

// Second instance of HumbleScroll observing .my-custom-element
const myCustomScroll = new HumbleScroll({
  root: document.queryselector("#customRoot"),
  element: ".my-custom-element",
  class: "enter",
});
```

---

## ❗Disclaimer

HumbleScroll.js is currently under development and features and API is exspected to change. Download the CSS and JS locally to ensure the setup works in the future. NPM and module support is coming in the future as well as a Vue and React component library.

---

## 🐛 Have you found a bug?

Just let me know and I'll update the files ASAP.

---

Last updated: 28/10/2022
