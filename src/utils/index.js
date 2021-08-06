import $ from 'jquery'
import awatar from "../images/awatar.jpg";

function appendBtn(root, name) {
  const btn = $(`<button>${name}</button>`)
  root.append(btn)
  return btn
}

function appendDiv(root) {
  const div = $('<div class="content">Hello World</div>')
  asyncFun().then(res => {
    root.append(div)
  })
}

function appendImage(root) {
  const image = $(`<img src="${awatar}"></img>`)
  root.append(image)
}

const asyncFun = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Promise')
      resolve(true)
    }, 1000)
  })
}

export {
  appendDiv, appendImage, appendBtn
}
