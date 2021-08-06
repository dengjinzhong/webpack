import "@babel/polyfill";
import './styles/index.css'
import './styles/common.scss'
import { add } from "./utils/math";
import { appendDiv, appendImage, appendBtn } from './utils'

import $ from 'jquery'

console.log('Hello World')
console.log(add(1, 2))
const root = $('#root')
const divBtn = appendBtn(root, '新增div')
divBtn.on('click', appendDiv.bind(null, root))

const divImage = appendBtn(root, '新增Image')
divImage.on('click', appendImage.bind(null, root))

