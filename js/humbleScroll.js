// Main HumbleScroll Class
class HumbleScroll {
  constructor(options) {
    this.prefix = 'hs' // Prefix for all events
    this.documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight // Document height
    this.defaultOptions = {
      root: null, // Root container to observe (default: Document root)
      element: `[data-${this.prefix}]`, // Element to observe (default: All elements with data-hs attribute)
      enableCallback: false, // Wheter to enable callback function on intersect (default: false)
      callback: `data-${this.prefix}-call`, // Callback data-attribute to call on intersect (default: data-hs-call)
      class: `${this.prefix}-inview`, // Class added when element is visible (default: hs-inview)
      initClass: `${this.prefix}-init`, // Class added when HumbleScroll loaded (default: hs-inview)
      threshold: 0.1, // Intersection threshold where 0.1 is 10% of the element (default: 0.1)
      offset: {
        top: 0,
        right: 0,
        bottom: -40,
        left: 0,
      }, // Offset to add to the root margin (default: { top: 0, right: 0, bottom: -40, left: 0 })
      direction: 'vertical', // Direction to calculate root max height or max width (default: vertical)
      repeat: false, // Wheter to repeat the animation when scrollin from top (default: false)
      mirror: false, // Wheter to mirror the animation when leaving (default: false)
      startEvent: 'DOMContentLoaded', // Event to start the initialization (default: DOMContentLoaded)
    } // Default options
    this.options = { ...this.defaultOptions, ...options }
    this.observerOptions = {
      root: this.options.root,
      rootMargin: this.calculateOffset(this.options.offset),
      threshold: this.options.threshold,
    } // Intersection Observer options
    this.animationElements = document.querySelectorAll(this.options.element) // Elements to animate
    this.callbackElements = document.querySelectorAll(`[${this.options.callback}]`) // Elements to call on intersect
    this.init() // Initialize HumbleScroll
  }

  // Initialize HumbleScroll
  init() {
    const completeEvent = new Event(`${this.prefix}:complete`)

    // Main animation function
    const animationObserverFunction = (entries) => {
      entries.forEach((entry) => {
        const dataAttr = entry.target.dataset.hs
        if (!this.options.repeat && entry.isIntersecting) {
          entry.target.classList.add(this.options.class)
          observer.unobserve(entry.target)
          return
        }

        entry.target.classList.toggle(this.options.class, entry.isIntersecting)
        if (entry.isIntersecting && dataAttr && dataAttr.includes('once')) entry.target.classList.add(`${this.prefix}-once`)
      })
    }

    // Main callback function
    const callbackObserverFunction = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const call = entry.target.getAttribute(this.options.callback)
          window[call] && window[call]()
          caller.unobserve(entry.target)
        }
      })
    }

    // Run observer on start event
    const startEventCallback = () => {
      this.animationElements.forEach((element) => {
        observer.observe(element)
        element.classList.add(this.options.initClass)
      })

      document.body.classList.add(`${this.prefix}-loaded`)
      window.dispatchEvent(completeEvent)
    }

    // Run Caller on start event
    const startCallbackFunction = () => {
      this.callbackElements.forEach((element) => {
        caller.observe(element)
      })
    }

    // Intersection Observers
    const observer = new IntersectionObserver(animationObserverFunction, this.observerOptions)

    let caller = null
    this.options.enableCallback && (caller = new IntersectionObserver(callbackObserverFunction, this.observerOptions))

    window.addEventListener(this.options.startEvent, startEventCallback)
    this.options.enableCallback && window.addEventListener(this.options.startEvent, startCallbackFunction)
    window.dispatchEvent(completeEvent)
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

  // Calculate Root Margin
  calculateOffset(data) {
    let obj = { ...this.defaultOptions.offset, ...data }
    let offset = `${obj.top}px ${obj.right}px ${obj.bottom}px ${obj.left}px`
    let repeatOffset = `${this.documentHeight}px ${obj.right}px ${obj.bottom}px ${obj.left}px`

    if (this.options.repeat) {
      !this.options.mirror && (offset = repeatOffset)
    }

    return offset
  }
}
