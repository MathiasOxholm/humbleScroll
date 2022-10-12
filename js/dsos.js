// Default DSOS options
const defaultOptions = {
  root: null,
  element: '[data-dsos]',
  visibleClass: 'is-inview',
  threshold: 0.5,
  repeat: false,
  disable: false,
  delay: 0,
  startEvent: 'DOMContentLoaded',
  rootMargin: '0px',
}

// Main DSOS Class
class DSOS {
  constructor(options) {
    this.options = { ...defaultOptions, ...options }
    this.observerOptions = {
      root: this.options.root,
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold,
    }
  }

  // Initialize the DSOS function
  init() {
    const observerFunction = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.options.visibleClass)
        } else {
          if (this.options.repeat) {
            entry.target.classList.remove(this.options.visibleClass)
          }
        }
      })
    }

    const event = new Event('dsos-complete')
    const body = document.querySelector('body')

    // Run observer on start event
    const startEventCallback = () => {
      document.querySelectorAll(this.options.element).forEach((element) => {
        let attrValues = element.attributes

        attrValues = [...attrValues].filter((attr) => {
          return attr.name.includes('data-dsos-')
        })

        attrValues.forEach((attr) => {
          let attrName = attr.name.replace('data-dsos-', 'dsos-')
          let attrValue = attr.value
          this.setCSSVariable(element, attrName, attrValue)
        })

        observer.observe(element)

        element.classList.add('dsos-init')
      })

      body.classList.add('dsos-loaded')
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
