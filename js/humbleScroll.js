// Default DSOS options
const prefix = 'hs'

const defaultOptions = {
  root: null,
  element: `[data-${prefix}]`,
  visibleClass: `${prefix}-inview`,
  threshold: 0.15,
  offset: '0px',
  repeat: false,
  startEvent: 'DOMContentLoaded',
}

function isIntersectingFromTop(entry) {
  return entry.boundingClientRect.bottom != entry.intersectionRect.bottom
}

function isIntersectingFromBottom(entry) {
  return entry.boundingClientRect.top != entry.intersectionRect.top
}

// Main HumbleScroll Class
class HumbleScroll {
  constructor(options) {
    this.options = { ...defaultOptions, ...options }
    this.observerOptions = {
      root: this.options.root,
      rootMargin: this.options.offset,
      threshold: this.options.threshold,
    }
    this.init()
  }

  // Initialize HumbleScroll
  init() {
    const event = new Event(`${prefix}-complete`, {
      bubbles: true,
      cancelable: true,
      composed: false
    })

    const observerFunction = (entries) => {
      entries.forEach((entry) => {

        entry.target.classList.toggle(this.options.visibleClass, entry.isIntersecting)

        if (isIntersectingFromTop(entry)) {
          entry.target.classList.add(`${prefix}-from-top`)
        } else if (isIntersectingFromBottom(entry)) {
          entry.target.classList.add(`${prefix}-from-bottom`)
        }

        if (entry.target.getAttribute(`data-${prefix}-call`) && entry.intersectionRatio > 0) {
          const call = entry.target.getAttribute(`data-${prefix}-call`)
          window[call]()
        }

        if (!this.options.repeat && entry.isIntersecting) observer.unobserve(entry.target)
      })
    }

    // Run observer on start event
    const startEventCallback = () => {
      document.querySelectorAll(this.options.element).forEach((element) => {
        let attrValues = element.attributes

        attrValues = [...attrValues].filter((attr) => {
          return attr.name.includes(`data-${prefix}-`)
        })

        attrValues.forEach((attr) => {
          let attrName = attr.name.replace(`data-${prefix}-`, `${prefix}-`)
          let attrValue = attr.value
          this.setCSSVariable(element, attrName, attrValue)
        })

        observer.observe(element)

        element.classList.add(`${prefix}-init`)
      })

      document.body.classList.add(`${prefix}-loaded`)
      window.dispatchEvent(event)
    }

    // Intersection Observer
    const observer = new IntersectionObserver(observerFunction, this.observerOptions)

    window.addEventListener(this.options.startEvent, startEventCallback)
    window.dispatchEvent(event)
  }

  update() {
    this.init()
  }

  on(event, callback) {
    window.addEventListener(
      event,
      (e) => {
        callback(e)
      },
      false
    )
  }

  //Change CSS Variable value of element
  setCSSVariable(element, property, value) {
    element.style.setProperty('--' + property, value)
  }

  // Helper function to debug HumbleScroll
  debug() {
    console.log("HumbleScroll Debug is active. Remember to disable it in production.")
    console.table(this.options)

    const help = document.createElement('div')
    const helpInner = document.createElement('div')

    help.setAttribute('style', `position: fixed; top: 0; left: 0; z-index: 9999; ; width: 100%; height: 100%; display:block; opacity: 1; pointer-events: none; padding: ${this.options.offset.replaceAll('-', '')};`)
    helpInner.setAttribute('style', `width: 100%; height: 100%; border-top: 1px solid yellow; border-bottom: 1px solid yellow;`)

    document.head.insertAdjacentHTML("beforeend", `<style>${this.options.element} >* {outline: 1px solid red; position:relative;} ${this.options.element} > *::before, ${this.options.element} > *::after { content: ""; position: absolute; top: 0; left: 0; background: red; width: 100%; height: ${this.options.threshold * 100}%;pointer-events: none; opacity:0.25;} ${this.options.element} > *::after{bottom:0; top: auto;}</style >`)
    document.querySelector('body').appendChild(help);
    help.appendChild(helpInner);
  }
}
