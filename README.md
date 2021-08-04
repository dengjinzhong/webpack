# webpack
## 前端工程化
开局一张图 ![前端工程化](./readme-img/前端工程化.jpg)

介绍 webpack 之前先了解一下前端工程化
这里有一篇文章介绍的比较详细 [前端工程化](https://www.mengfansheng.com/2020/01/01/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/)

> 前端工程化工具
> - 脚手架工具
> - 打包构建工具
> - 测试工具
> - 自动化工具

## webpack OR gulp

#### Gulp 是什么
gulp是一个基于流的构建工具，可以自动执行指定的任务，简洁且高效
#### Gulp 能做什么？
- 开发环境下，想要能够按模块组织代码，监听实时变化
- css/js预编译，postcss等方案，浏览器前缀自动补全等
- 条件输出不同的网页，比如app页面和mobile页面
- 线上环境下，我想要合并、压缩 html/css/javascritp/图片，减少网络请求，同时降低网络负担
- 等等...

#### webpack 是什么？
webpack是模块化打包工具，使用webpack可以对模块进行压缩、预处理、按需打包、按需加载等。
####  webpack 有哪些重要特征？
- 插件化：webpack本身非常灵活，提供了丰富的插件接口。基于这些接口，webpack开发了很多插件作为内置功能。
- 速度快：webpack使用异步IO以及多级缓存机制。所以webpack的速度是很快的，尤其是增量更新。
- 丰富的Loaders：loaders用来对文件做预处理。这样webpack就可以打包任何静态文件。
- 高适配性：webpack同时支持AMD/CommonJs/ES6模块方案。webpack会静态解析你的代码，自动帮你管理他们的依赖关系。此外，webpack对第三方库的兼容性很好。
- 代码拆分：webpack可以将你的代码分片，从而实现按需打包。这种机制可以保证页面只加载需要的JS代码，减少首次请求的时间。
- 优化：webpack提供了很多优化机制来减少打包输出的文件大小，不仅如此，它还提供了hash机制，来解决浏览器缓存问题。
- 开发模式友好：webpack为开发模式也提供了很多辅助功能。比如SourceMap、热更新等。
- 使用场景多：webpack不仅适用于web应用场景，也适用于Webworkers、Node.js场景

参考文章： [Gulp 和 webpack 入门](https://juejin.cn/post/6844903850663493639)

## 模块化
随着前端页面复杂性增加，嵌入网页的 JavaScript 代码越来越庞大， 越来越复杂，
原生开发的 JavaScript 代码变得越来越难管理， 难以维护
![不可维护代码](./readme-img/可维护.jpg)

Javascript模块化编程，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

学习 JavaScript 语言，你会发现它有两种格式的模块。

- 一种是 ES6 模块，简称 ESM；
- 另一种是 Node.js 专用的 CommonJS 模块，简称 CJS。 

这两种模块不兼容。
#### 两种模块的差异
ES6 模块和 CommonJS 模块有很大的差异。

语法上面，CommonJS 模块使用require()加载和module.exports输出，ES6 模块使用import和export。

用法上面，require()是同步加载，后面的代码必须等待这个命令执行完，才会执行。import命令则是异步加载，或者更准确地说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。

使用示例：
* AMD
  ```javascript
  // math.js
  define(function () {
    function add(a, b) {
      return a + b
    }
    return { add }
  })
  
  // index.js
  (function() {
    require(['math'], function(math) {
      console.log(math.add(1, 2))
    });
  })()
  ```
* CommonJS
    ```javascript
    // math.js
    function add(a, b) {
      return a + b
    }
    
    module.exports = {
      add
    }
    
    // index.js
    const math = require('./math.js')
    console.log(math.add(1, 2))
    ```
* MSM
  ```javascript
  // math.js
  export function add(a, b) {
    return a + b
  }
  // index.js
  import { add } from './math'
  
  console.log(add(1, 2))
  ```

参考文章：
- [Javascript模块化编程 (一)](https://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [Javascript模块化编程 (二)](https://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
- [Javascript模块化编程 (三)](https://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [最详细、最全面的“前端模块化”总结](https://juejin.cn/post/6844904133011439623)

## Hello World
初始化项目, 生成包管理文件 `package.json`
```shell
npm init -y
```
安装 webpack
```shell
npm i webpack webpack-cli -D
```
在文件根目录创建 `src` 目录， 并添加 `index.js`
```javascript
console.log('Hello World!')
```
执行命令
```shell
npx webpack ./src/index.js
```

## 模块打包
webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。
当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，
此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

## `srcipt` 打包命令
在 `package.json` 里面可以配置打包命令

```json
{
  "scripts": {
      "bundle": "webpack"
  }
}
```

配置完成后可以直接运行 `npm run bundle` 进行打包

打包后两个问题：
1. 打包后文件为什么叫 main.js
2. 打包后文件夹为什么是 dist

## webpack.config.js
webpack 打包可以通过 `webpack.config.js` 文件进行配置
```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  }
}
```
* `entry` 入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
* `output` output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中

## 模式（mode）
#### 用法
只需在配置对象中提供 mode 选项：
```javascript
module.exports = {
  mode: 'development',
};
```
或者从 CLI 参数中传递：
```shell
webpack --mode=development
```
支持以下字符串值：

| **选项**    | **描述**                                                     |
| ----------- | ------------------------------------------------------------ |
| development | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。 |
| production  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。 |
| none        | 不使用任何默认优化选项                                       |



## devtool
此选项控制是否生成，以及如何生成 source map。

sourceMap 它是一个映射关系，打包后代码与源代码的映射关系

选择一种 source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

#### source-map

构建速度变慢， 打包速度变慢

#### inline-source-map

将 map 文件 变成 base64 文件

#### eval-source-map

以 eval 的形式解析映射关系， 打包速度较快， 但是报错信息可能不太准确

#### cheap-source-map

只显示代码行位置， 忽略列位置

#### model-source-map

将安装依赖的错误也映射出

#### 最佳实践

* **测试环境**  `eval-cheap-module-source-map`
* **生产环境**  `cheap-module-source-map`

## 插件（plugins）
每次重新打包的时候如果设置了 `clean: true` 的话都是删除一遍 html 文件，
如果 `output` 中输出文件配置了 hash 值的话，每次不同打包都会生产不同的 html 文件，
这样就比较麻烦了， 那有什么好的方法可以解决这个问题呢

#### htmlWebpackPlugin
htmlWebpackPlugin 会在打包结束后， 自动生成一个 html 文件， 并吧
打包生成的 js 自动引入到这个 html 文件中

安装
```shell
npm install html-webpack-plugin -D
```

使用
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
   plugins: [new HtmlWebpackPlugin({
       title: 'HtmlWebpackPlugin',
       template: "./src/index.html",
       filename: "index.html"
   })]
}
```

如果要使用 title 属性， 那么模板文件需要占位符配置title
```html
<title><%= htmlWebpackPlugin.options.title %></title>
```
其他配置请参考 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options)

更多插件请查询 [plugins](https://webpack.docschina.org/plugins/)

## devServer
安装
```shell
npm install -D webpack-dev-server
```

webpack 启用本地服务器配置
```javascript
devServer: {
    contentBase: './dist',
    open: true,
    port: '9000'
}
```
并在 `package.json` 中配置打包命令

```json
"scripts": {
    "dev": "webpack serve",
    "build": "webpack"
}
```
 执行命令
```shell
npm run dev
```

## Loader

webpack 只能理解 JavaScript 和 JSON 文件，
这是 webpack 开箱可用的自带能力。
loader 让 webpack 能够去处理其他类型的文件，
并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

::: warning
注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），
这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。
我们认为这种语言扩展是很有必要的，因为这可以使开发人员创建出更准确的依赖关系图。
:::

在 webpack 的配置中，loader 有两个属性：

1. test 属性，识别出哪些文件会被转换。
2. use 属性，定义出在进行转换时，应该使用哪个 loader。

## 打包样式文件
打包样式文件需要使用 css-loader 与 style-loader
- css-loader 将 CSS 转化成 CommonJS 模块
- style-loader 将 JS 字符串生成为 style 节点
首先进行安装
```
npm install --save-dev style-loader css-loader
```
webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

#### 打包 sass

除了 css 文件， 我们平常会使用 css 预处理器
Sass、Less和Stylus， 以 Sass 为例， 首先安装依赖
```shell
npm install sass-loader sass webpack --save-dev
```
webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
};
```

#### 样式处理

