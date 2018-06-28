import './main.css'

const secondUrl = new URL('/second', window.location.href)
const elem = document.getElementById('go-to-second')
elem.innerHTML = "Click me!!"
elem.setAttribute('href', '/second')