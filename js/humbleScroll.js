// Default DSOS options
function isIntersectingFromTop(entry) {
  return entry.boundingClientRect.bottom != entry.intersectionRect.bottom
}

function isIntersectingFromBottom(entry) {
  return entry.boundingClientRect.top != entry.intersectionRect.top
}

// Main HumbleScroll Class
class HumbleScroll {
  constructor(options) {
    this.prefix = 'hs'
    this.documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    this.defaultOptions = {
      root: null,
      element: `[data-${this.prefix}]`,
      enableCallback: false,
      callback: `[data-${this.prefix}-call]`,
      class: `${this.prefix}-inview`,
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
    this.callbackElements = document.querySelectorAll(this.options.callback)
    this.init()
  }

  // Initialize HumbleScroll
  init() {
    const event = new Event(`${this.prefix}-complete`, {
      bubbles: true,
      cancelable: true,
      composed: false,
    })

    // Main animation function
    const animationObserverFunction = (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(this.options.class, entry.isIntersecting)
        if (!this.options.repeat && entry.isIntersecting) observer.unobserve(entry.target)
      })
    }

    // Main callback function
    const callbackObserverFunction = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const call = entry.target.getAttribute(`data-${this.prefix}-call`)
          window[call] && window[call]()
          caller.unobserve(entry.target)
        }
      })
    }

    // Run observer on start event
    const startEventCallback = () => {
      this.animationElements.forEach((element) => {
        let attrValues = element.attributes

        attrValues = [...attrValues].filter((attr) => {
          return attr.name.includes(`data-${this.prefix}-`)
        })

        attrValues.forEach((attr) => {
          let attrName = attr.name.replace(`data-${this.prefix}-`, `${this.prefix}-`)
          let attrValue = attr.value
          this.setCSSVariable(element.firstElementChild, attrName, attrValue)
        })

        observer.observe(element)
        element.classList.add(`${this.prefix}-init`)
      })

      document.body.classList.add(`${this.prefix}-loaded`)
      window.dispatchEvent(event)
    }

    // Run Caller on start event
    const startCallbackFunction = () => {
      this.callbackElements.forEach((element) => {
        caller.observe(element)
      })
    }

    // Intersection Observers
    const observer = new IntersectionObserver(animationObserverFunction, this.observerOptions)
    const caller = new IntersectionObserver(callbackObserverFunction, this.observerOptions)

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

  //Change CSS Variable value of element
  setCSSVariable(element, property, value) {
    element.style.setProperty('--' + property, value)
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

  // Helper function to debug HumbleScroll
  debug() {
    console.log('HumbleScroll Debug is active. Remember to disable it in production.')
    console.table(this.options)

    const help = document.createElement('div')
    const helpInner = document.createElement('div')

    help.setAttribute('style', `position: fixed; top: 0; left: 0; z-index: 9999; ; width: 100%; height: 100%; display:block; opacity: 1; pointer-events: none; padding: ${this.options.offset.replaceAll('-', '')};`)
    helpInner.setAttribute('style', `width: 100%; height: 100%; border-top: 1px solid yellow; border-bottom: 1px solid yellow;`)

    document.head.insertAdjacentHTML('beforeend', `<style>${this.options.element} >* {outline: 1px solid red; position:relative;} ${this.options.element} > *::before, ${this.options.element} > *::after { content: ""; position: absolute; top: 0; left: 0; background: red; width: 100%; height: ${this.options.threshold * 100}%;pointer-events: none; opacity:0.25;} ${this.options.element} > *::after{bottom:0; top: auto;}</style >`)
    document.querySelector('body').appendChild(help)
    help.appendChild(helpInner)
  }
}
