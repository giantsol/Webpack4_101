import './main.css'
import {markdown} from 'markdown'

fetch('../mds/home.md')
  .then(response => response.text())
  .then(text => {
    const placeholder = document.getElementById('app')
    placeholder.innerHTML = markdown.toHTML(text)
  })
