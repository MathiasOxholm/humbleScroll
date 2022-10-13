// Fire regular DSOS
const scroll = new DSOS({
  threshold: 0.1,
  repeat: true,
})

// Fire custom DSOS with custom options
const myCustomScroll = new DSOS({
  element: '.my-custom-element',
  visibleClass: 'enter',
})

// body = document.querySelector('body')

// body.addEventListener('click', () => {
//   scroll.update()
// })

// scroll.on('dsos-complete', () => {
//   console.log('DSOS is complete!')
// })
