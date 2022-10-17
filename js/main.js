// Fire regular DSOS
const scroll = new HumbleScroll({
  enableCallback: true,
  repeat: true,
  mirror: true,
  threshold: 0.25,
  offset: {
    top: -64,
    bottom: -150,
  },
})

// Fire custom DSOS with custom options
const myCustomScroll = new HumbleScroll({
  element: '.my-custom-element',
  class: 'enter',
})

const verticalScroll = new HumbleScroll({
  root: document.querySelector('#horizontal-scroll'),
  element: '.my-custom-element',
  class: 'enter',
  repeat: true,
  mirror: true,
})

scroll.on('hs:complete', () => {
  console.log('HumbleScroll is complete!')
})

function firstCall() {
  const card = document.querySelector('#callback-1')
  const cardHeading = document.querySelector('#callback-1-heading')
  card.style = 'background-color: purple; border-radius: 100%; transform: scale(0.75);'
  setTimeout(() => {
    cardHeading.innerHTML = 'Kinda cool right?'
  }, 4000)
}

function secondCall() {
  const section = document.querySelector('#callback-section')
  section.style = 'background-color: #27272a; color: #a3e635;'
}

