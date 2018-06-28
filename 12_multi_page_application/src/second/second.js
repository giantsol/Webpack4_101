const removingElem = document.getElementById('go-to-second')
removingElem.parentNode.removeChild(removingElem)

const newElem = document.createElement('div')
newElem.innerHTML = "I am second page!"
document.getElementsByTagName('body')[0].appendChild(newElem)