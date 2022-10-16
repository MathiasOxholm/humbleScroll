// Main HumbleScroll Class
class HumbleScroll {
  constructor(options) {
    this.prefix = 'hs'
    this.documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    this.defaultOptions = {
      root: null,
      element: `[data-${this.prefix}]`,
      enableCallback: false,
      callback: `data-${this.prefix}-call`,
      class: `${this.prefix}-inview`,
      initClass: `${this.prefix}-init`,
      threshold: 0.1,
      offset: {
        top: -40,
        right: 0,
        bottom: -40,
        left: 0,
      },
      direction: 'vertical',
      repeat: false,
      mirror: false,
      startEvent: 'DOMContentLoaded',
    }
    this.options = { ...this.defaultOptions, ...options }
    this.observerOptions = {
      root: this.options.root,
      rootMargin: this.calculateOffset(this.options.offset),
      threshold: this.options.threshold,
    }
    this.animationElements = document.querySelectorAll(this.options.element)
    this.callbackElements = document.querySelectorAll(`[${this.options.callback}]`)
    this.init()
  }

  // Initialize HumbleScroll
  init() {
    const completeEvent = new Event(`${this.prefix}:complete`, { bubbles: true })

    // Main animation function
    const animationObserverFunction = (entries) => {
      entries.forEach((entry) => {
        if (!this.options.repeat && entry.isIntersecting) {
          observer.unobserve(entry.target)
          return
        }
        entry.target.classList.toggle(this.options.class, entry.isIntersecting)
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
