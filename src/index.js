import "@babel/polyfill";
import './styles/index.css'
import './styles/common.scss'
import { add } from "./utils/math";
import awatar from './images/awatar.jpg'
console.log('Hello World!!!')
console.log(add(1, 2))
const root = document.getElementById('root')
const btn = document.createElement('button')
btn.innerHTML = '新增'
root.appendChild(btn)
const btnImg = document.createElement('button')
btnImg.innerHTML = '新增图片'
root.appendChild(btnImg)

btn.onclick = function () {
  const div = document.createElement('div')
  div.classList.add('content')
  div.innerText = 'Hello World'
  asyncFun().then(res => {
    root.appendChild(div)
  })
}

btnImg.onclick = () => {
  const image = document.createElement('img')
  image.src = awatar
  root.appendChild(image)
}

const asyncFun = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Promise')
      resolve(true)
    }, 1000)
  })
}
