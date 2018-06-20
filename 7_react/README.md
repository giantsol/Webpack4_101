# Learning Webpack4 - React 사용하기

여태까지 우리는 웹 개발의 3대장 JS, HTML, CSS를 Webpack에서 사용하는 법을 배웠고,
또 개발 속도에 큰 이득을 주는 webpack-dev-server의 사용법도 배웠다.

웹 프론트엔드 프레임워크 중 가장 유명한 것 중에 하나가 React이다.
뭐, 당연히 꼭 그걸 쓸 필요는 없다만, Webpack 튜토리얼들이 많은 경우
React 개발 환경을 꾸려나가는 것을 보여주기 때문에, 여기서도 React 환경을 꾸려보겠다.
나중엔 실제로 Vue를 하든 Ember를 하게 되든, 여러분이 이 튜토리얼을 처음부터 따라왔다면
조금 다른 환경 세팅을 마주치게 되더라도 큰 어려움 없이 해낼 수 있을 것이다 ^.^

React를 설치하기 전에, 여태까지 우리가 셋업해온 환경들을 처음부터 아주 간략하게
요약해 보겠다. 아래 내용들이 이해가 안가시는 분들은 [첫번째 튜토리얼](https://github.com/giantsol/Webpack4_101/tree/master/1_zero_conf)
부터 찬찬히 진행해보길 바란다:
1. npm init -y #아 여태 말 안했나? -y는 모두 yes 하겠다는 뜻이다!
2. npm i webpack webpack-cli -D #webpack 설치
3. npm i babel-core babel-loader babel-preset-env -D #babel (ES6 -> ES5 transpiler) 설치
4. npm i html-webpack-plugin html-loader -D #html 사용하기 위한 툴 설치
5. npm i css-loader style-loader -D #css 사용하기 위한 툴 설치
6. npm i webpack-dev-server -D #webpack-dev-server 설치
7. 아래와 같이 package.json 파일의 scripts 부분을 변경:
```json
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development --open"
},
```
8. webpack의 default entry module인 ./src/index.js 파일 생성 및 아래 내용 추가:
```js
const foo = () => console.log('foo!'); //ES6 -> ES5로 잘 변환되나 확인하기 위해
```
9. webpack.config.js 파일 생성 및 아래 내용 추가:
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
};
```
10. template 파일 ./src/index.html 파일 생성 및 아래 내용 추가:
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Learning Webpack4</title>
</head>
<body>

</body>
</html>
```
11. .babelrc 파일 생성 및 아래 내용 추가:
```
{
  "presets": [
    "env"
  ]
}
```

다 진행했으면, ```npm run dev```를 실행해보자! 그리고 ./dist/index.html과
./dist/main.js 파일이 제대로 생성되는지 확인하자
(편의상 css는 만들지 않음 ㅎvㅎ. 필요하신 분들은 [참조](https://github.com/giantsol/Webpack4_101/tree/master/5_using_css)).

우와! 돌아보니 우리는 정말 많은 것을 배웠다. 튜토리얼을 처음부터 따라왔다면,
이제 위 과정들은 아주 익숙해졌을 것이다.
이제 React를 추가해보자! (아주 간단하다!)

우선, react를 설치한다:
```
npm i react react-dom -D
```

그리고 기억하는가? ./babelrc에 "env"라는 값을 넣음으로써, ES6로 된 JS 코드를
babel이 ES5로 변화해주길 원한다고 명시했었다.
React도 비슷하다. 우리는 ES6에 더해서 React로 짜여진 JS 코드를 babel이
plain ES5 JS 코드로 변환해주길 원한다. 우선, babel-preset-env를 설치했듯이
babel-preset-react를 설치해준다:
```
npm i babel-preset-react -D
```

그리고 ./babelrc를 아래와 같이 수정하자:
```
{
  "presets": [
    "env",
    "react"
  ]
}
```

그리고, 만약 React 코드를 짤 때 .js 파일이 아닌 .jsx 파일을 쓴다면,
webpack이 .jsx 파일을 마주쳤을 때 babel-loader를 적용하도록 webpack.config.js의
babel-loader부분을 아래와 같이 수정해주자:
```js
{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
},
```

자, 이제 아주 심플한 React 파일을 생성해보자. ./src/App.js 파일을 생성하고
아래 내용을 넣어주자:
```js
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <p>React here!</p>
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
```

React를 아직 잘 모르면, 위 코드를 이해할 필요는 없다. 단, 맨 마지막 줄에 따르면,
HTML의 document에서 "app"이라는 id를 가진 엘리먼트에 React를 삽입한다고 되어있다.
따라서, 우리의 template인 ./src/index.html의 body부분에 더미 div를 만들어주자:
```html
<body>
  <div id="app"></div>
</body>
```

마지막으로, 기억하는가? Webpack의 default entry module은 ./src/index.js이다
(./src/App.js가 아니다!). 따라서 지금, index.js 파일 어디에서도 ./src/App.js 파일을
사용하고 있지 않기 때문에, Webpack이 빌드할 때 App.js를 무시하고 지나쳐버릴 것이다.
따라서, 아래 import문을 ./src/index.js 파일의 최상단에 입력해주자:
```js
import './App'
```

드디어, ```npm run start``` (또는 ```npm start```)를 입력해보자.
지금까지의 과정을 제대로 따라왔다면, 웹 페이지가 뜨면서 'React here!'가 뜨는 것을
확인할 수 있을 것이다!

이로써, HTML, CSS, JS를 모두 사용해보고, webpack-dev-server도 세팅해 보았으며,
React 개발 환경까지 구축해보았다. 짝짝~~

#### **추가
위에서, entry point가 ./src/index.js이기 때문에 ```import './App'```을 넣어줘야 했다.
차라리 default entry point를 ./src/App.js로 바꿀 수는 없을까?

있다!
package.json의 scripts 부분을 아래와 같이 조정해줘보자:
```json
"scripts": {
    "dev": "webpack --mode development ./src/App.js",
    "build": "webpack --mode production ./src/App.js",
    "start": "webpack-dev-server --mode development --open --entry ./src/App.js"
}
```

딱 보면 느낌이 오겠지만, entry point를 ./src/App.js로 바꾸는 간단한 방법이다.
그럼 이제 ./srx/index.js파일은 필요가 없겠지? 과감하게 삭제해보자
(덜 과감하다면, ```import './App'``` 부분만 주석 처리를 해보자).
그리고 ```npm start```를 돌려보자! 결과가 똑같이 나올 것이다. Hooray~
