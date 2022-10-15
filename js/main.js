// Fire regular DSOS
const scroll = new HumbleScroll({
  repeat: true,
  enableCallback: true,
})

// Fire custom DSOS with custom options
const myCustomScroll = new HumbleScroll({
  element: '.my-custom-element',
  class: 'enter',
})

/* scroll.on('hs-complete', () => {
  console.log('HumbleScroll is complete!')
}) */

//scroll.debug()

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
  section.style = 'background-color: white; color: #a3e635;'
}
