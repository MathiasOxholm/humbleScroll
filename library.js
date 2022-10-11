const dsos = (args = {}) => {
  let isInitialized = false
  const body = document.querySelector('body')
  const rootStyle = document.documentElement

  // Default values
  const options = {
    root: args.root ? document.querySelector(args.root) : null,
    element: args.element ? args.element : '[data-dsos]',
    class: args.class ? args.class : 'is-inview',
    threshold: args.threshold ? args.threshold : 0.5,
    repeat: args.repeat ? args.repeat : false,
    disable: false,
    delay: args.delay ? args.delay : 0,
    startEvent: args.startEvent ? args.startEvent : 'DOMContentLoaded',
  }

  // Intersection Observer options
  const observerOptions = {
    root: options.root,
    rootMargin: '0px',
    threshold: options.threshold,
  }

  // Intersection Observer callback
  const observerFunction = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(options.class)
      } else {
        if (options.repeat) {
          entry.target.classList.remove(options.class)
        }
      }
    })
  }

  // Intersection Observer
  const observer = new IntersectionObserver(observerFunction, observerOptions)

  //Change CSS Variable value of element
  const setCSSVariable = (element, property, value) => {
    element.style.setProperty('--' + property, value)
  }

  // Run observer on start event
  const startEventCallback = () => {
    body.classList.add('dsos-loaded')

    document.querySelectorAll(options.element).forEach((el) => {
      let attrValues = el.attributes

      attrValues = [...attrValues].filter((attr) => {
        return attr.name.includes('data-dsos-')
      })

      attrValues.forEach((attr) => {
        let attrName = attr.name.replace('data-dsos-', 'dsos-')
        let attrValue = attr.value
        setCSSVariable(el, attrName, attrValue)
      })

      observer.observe(el)
      el.classList.add('dsos-init')
    })
  }

  window.addEventListener(options.startEvent, startEventCallback)
}

dsos({
  repeat: true,
})
