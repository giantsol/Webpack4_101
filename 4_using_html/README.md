# Learning Webpack4 - HTML 사용하기

여태까지 우리는 ./src/index.js라는 디폴트 entry point 파일만을 사용해왔다.
근데 웹페이지를 만들려면 html, css와 같은 파일들도 필요하다.
우선은 html파일을 사용하는 방법부터 보자.
 
Webpack은 기본적으로 js파일을 번들링할 목표로 만들어진 툴이기 때문에,
기본적으로는 html 파일을 읽지 못한다. 따라서, 추가적인 loader들을 추가해줘야 한다:

- html-loader
- html-webpack-plugin

하지만 그 전에, 복습할 겸 처음부터 스텝을 밟아보자:

1. ```npm init -y```: 디렉토리에 package.json 파일을 생성해준다.
2. ```npm i webpack webpack-cli -D```: Webpack을 설치해준다
(현재 webpack 버전은 4.12.0).
3. production & development mode를 따로 돌릴 수 있도록 scripts를 조정해주자.
package.json 파일의 일부분을 아래와 같이 수정해준다:
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```
4. 제대로 되는지 확인하기 위해 default entry point인 ./src/index.js파일을 생성해주고,
아래 내용을 넣어주자 (참고: 아래 문법은 ES6):
```js
const arr = [1,2,3];
const tempFunc = () => console.log(...arr);
window.tempFunc = tempFunc;
```
5. ```npm run dev```를 돌려보자. ./dist/main.js 파일이 성공적으로 생성되어야 한다.
6. 근데 main.js 파일에서 **tempFunc**라는 단어를 찾아보면, ES6문법 그대로 생성된 것을
볼 수 있다. ES6는 아직 모든 브라우저에서 호환되지 않기 때문에, ES5로 transpile해줄 수
있도록 해주자. 필요한 로더들을 설치한다:
```
npm i babel-core babel-loader babel-preset-env -D
```
7. .babelrc 파일을 생성하고, 그 안에 우리가 ES6 -> ES5로 transpile하길 
원한다는 것을 설정해준다:
```
{
  "presets": [
    "env"
  ]
}
```
8. Webpack이 babel-loader를 쓰도록 해주기 위해 configuration 파일을 생성해주자.
webpack.config.js 파일 생성 후, 아래 내용을 넣어주자:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```
9. ```npm run dev```를 돌리고 ./dist/main.js 파일을 확인해보자. ES5 코드로
transpile된 것을 확인할 수 있다.

여기까지가 우리가 지금까지 배워왔던 과정들이다. 아직 어디서도 html 파일을 사용해 본 적은 없다.
이제 본격적으로 html 파일을 사용해보자. 일단, ./src/index.html이라는 파일을 생성해주자:
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
  <div id="app"></div>
</body>
</html>
```

위의 파일이 우리가 열어볼 수 있는 웹 페이지의 template 역할을 할 것이다.
즉, Webpack의 entry point는 여전히 ./src/index.js이고, 우리가 구현할 기능들은
모두 index.js에 들어갈 것이다. 하지만, javascript 파일만으로는 웹페이지를
띄울 수 없으므로, 위의 index.html파일을 template 삼아서, body 부분에
script 태그로 삽입을 하게 될 것이다.

그렇게 하기 위해선, webpack이 html파일을 인식하고 같이 빌드할 수 있게 해줘야한다:
필요한 loader들을 설치하고 configuration을 수정해주자:
```
npm i html-webpack-plugin html-loader -D
```

그리고, webpack.config.js파일을 아래와 같이 되도록 수정해준다:
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
          loader: 'html-loader'
        }
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

위 configuration에 대해 설명을 보태자면,
맨 아래에 plugins 부분에 template 파일이 우리가 만든 ./src/index.html이다.
즉, ```npm run dev```를 통해 빌드를 하면, ./src/index.js가 ./dist/main.js로
빌드가 될텐데, 그 빌드된 js 파일을 ./src/index.html파일의 body부분에 script로 삽입해 준다는 얘기다.
filename 파일이 js가 삽입된 최종 html파일 경로이고, 따라서 ./dist/index.html로 빌드 될 것이다.
filename을 ./app.html로 변경하면, ./dist/app.html로 빌드 될 것이다.

자, 그럼 제대로 빌드가 되는지 확인해보자
```
npm run dev
```

그리고 ./dist/index.html파일을 열어보면, main.js파일이 script로 추가된 것을 볼 수 있다.
지금 ./dist/index.html파일을 열어보면, 그냥 빈 화면이 나올 것이다.
이유는 ./src/index.js에서 DOM에 영향을 끼치는 어떠한 코드도 넣지 않았기 때문이다.
제대로 동작을 하는지 확인하기 위해 ./src/index.js 파일에 아래 내용을 추가해주자:
```js
document.getElementsByTagName('body')[0].style.backgroundColor = '#FF0000';
```

그리고 다시 ```npm run dev```를 실행하고, ./dist/index.html 파일을 열어보자.
온통 새빨간 웹 페이지가 열릴 것이다! 이로써, js와 html을 같이 쓸 수 있게 되었다!

#### ** 추가
위에서 우리는 ```npm run dev```로만 빌드했는데, 현재 우리의 설정에 따르면
```npm run build```를 하면 production mode로 빌드되기 때문에,
파일의 용량을 줄이기 위해 minification등이 진행되어야 한다. 실제로 ```npm run build```를 실행해보자.

그리고 ./dist 폴더에 있는 파일들을 확인해 보자. main.js 파일은 minification이 된 것을
확인할 수 있지만, index.html파일은 그대로인 것을 확인할 수 있다.

Webpack4에서 제공하는 디폴트 development & production 모드 빌드들은 아직
html 파일에 대해서는 딱히 차별점을 두지 않는다.
각각의 모드에 따라 html minification 적용 여부를 조정하고 싶다면, 
configuration 파일을 각 모드에 대해 따로 만들고, html-loader 부분을 아래와 같이 수정해주면 된다:
```
{
  test: /\.html$/,
  use: {
    loader: 'html-loader',
    options: {
      minimize: true
    }
  }
}
```
