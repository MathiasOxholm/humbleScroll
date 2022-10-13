// Default DSOS options
const prefix = 'hs'

const defaultOptions = {
  root: null,
  element: `[data-${prefix}]`,
  visibleClass: 'hs-inview',
  threshold: 0,
  repeat: false,
  disable: false,
  delay: 0,
  startEvent: 'DOMContentLoaded',
  rootMargin: '0px',
  reloadOnContextChange: false,
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
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold,
    }
    this.init()
  }

  // Initialize HumbleScroll
  init() {
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

    const event = new Event(`${prefix}-complete`)
    const body = document.querySelector('body')

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

      body.classList.add(`${prefix}-loaded`)
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
}
