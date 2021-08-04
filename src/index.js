import './styles/index.css'
import './styles/common.scss'
import { add } from "./utils/math";

console.log('Hello World!')
console.log(add(1, 2))

const root = document.getElementById('root')
const div = document.createElement('div')
div.classList.add('content')
div.innerText = 'Hello World'
root.appendChild(div)
