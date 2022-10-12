// Fire regular DSOS
const scroll = new DSOS()
scroll.init()

// Fire custom DSOS with custom options
const myCustomScroll = new DSOS({
  element: '.my-custom-element',
  visibleClass: 'enter',
  repeat: true,
})
myCustomScroll.init()

body = document.querySelector('body')

body.addEventListener('click', () => {
  scroll.update()
})

scroll.on('dsos-complete', () => {
  console.log('DSOS is complete!')
})
