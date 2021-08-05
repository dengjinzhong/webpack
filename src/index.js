import './styles/index.css'
import './styles/common.scss'
import { add } from "./utils/math";

console.log('Hello World!!!')
console.log(add(1, 2))
const root = document.getElementById('root')
const btn = document.createElement('button')
btn.innerHTML = '新增'
root.appendChild(btn)
btn.onclick = function () {
  const div = document.createElement('div')
  div.classList.add('content')
  div.innerText = 'Hello World!!!'
  root.appendChild(div)
}

