// Fire regular DSOS
const options = {
  repeat: true,
  rootMargin: '0px 0px -80px 0px',
}

const scroll = new HumbleScroll(options)

// Fire custom DSOS with custom options
const myCustomScroll = new HumbleScroll({
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

function hallo() {
  console.log('hallo')
}
