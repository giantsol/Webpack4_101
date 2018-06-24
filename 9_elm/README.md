# Learning Webpack 4 - Elm 사용하기

Elm!! 요즘 내가 한창 빠져있는 웹 프레임워크이다!
React, Vue와 같은 웹 프론트 프레임워크인데, 나온지 얼마 안되었고, 그 패러다임이
마음에 들어서 요즘 관심을 많이 갖고 있다. [7_react](https://github.com/giantsol/Webpack4_101/tree/master/7_react)
때 React 개발 환경을 만들었던 것 처럼, 이번에는 Elm 개발 환경을 구축해보자!
(우선, [html_css_es6_webpack_starter](https://github.com/giantsol/Webpack4_101/tree/master/html_css_es6_webpack_starter)
에 있는 환경을 그대로 복사해오자!)

Webpack은 Elm 파일을 기본적으로 이해할 수 없다. Elm을 이해할 수 있도록 loader를 설치해준다:
```
npm i elm-webpack-loader -D
```
다음으로, .elm 확장자의 파일들에 한해, Webpack이 위의 loader를 사용하도록
webpack.config.js 파일의 rules부분에 아래 내용을 추가해주자:
```js
{
    test: /\.elm$/,
    exclude: [/elm-stuff/, /node_modules/],
    use: {
      loader: 'elm-webpack-loader'
    }
}
```

자, 그럼 사실 Elm 개발환경을 끝났다고 볼 수 있다!
Elm 파일을 생성해보자. 혹시, Elm이 아직 안깔려있다면 Elm 홈페이지를 참조하길 바란다.

일단, Elm의 core 패키지를 설치한다:
```
elm-package install elm-lang/core
```

그리고, ./src/Main.elm 파일을 생성해주고 아래 내용을 추가해주자:
```elm
import Html exposing (text)

main = text "Hello Elm!"
```

Webpack의 default entry point인 ./src/index.js에 dependency를 걸어주어야
Webpack이 파일을 로딩한다는 것을 기억하는가! ./src/index.js파일에 아래 내용을
추가해주자:
```js
const Elm = require('./Main.elm')
// template html 파일에서 'app'이라는 id를 가진 태그에 Elm을 삽입함.
const app = Elm.Main.embed(document.getElementById('app'))
```

마지막으로, Elm이 삽입될 엘리먼트를 ./src/index.html의 body 부분에 추가해준다:
```html
<body>
  <div id="app"></div>
</body>
```

```npm start```를 돌려보면, **Hello Elm!**이 제대로 뜨는 것을 확인할 수 있을 것이다!
이로써 Elm 개발 환경 세팅도 끝~

