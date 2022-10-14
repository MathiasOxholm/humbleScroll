// Fire regular DSOS
const scroll = new HumbleScroll({
  repeat: true,
})

// Fire custom DSOS with custom options
const myCustomScroll = new HumbleScroll({
  element: '.my-custom-element',
  visibleClass: 'enter',
})

scroll.on('hs-complete', () => {
  console.log('HumbleScroll is complete!')
})