# Learning Webpack4 - Webpack Dev Server 사용하기

지금까지 js, html, css 이 3대장을 webpack으로 쉽게 번들링 하는 법을 배웠다.
근데 문제가 있다면, 파일 내용을 바꾸고 결과를 보기 위해서 계속
```npm run dev```를 돌리고, 브라우저를 새로고침 해야한다는 것이다.
번거롭지 않은가!!

그래서 webpack-dev-server가 존재한다. 이 기능은, 우리가 평소 ```npm run dev```를
돌렸던 것 처럼 프로젝트를 빌드해 주고, 우리가 파일 내용을 바꾸고 **저장**할 때 마다
자동적으로 다시 빌드를 하고 웹페이지를 갱신해준다. 아주 편리한 기능이다!

자, 우선 간단하게 setup 과정을 진행한다:
```
npm init -y
npm i webpack webpack-cli -D
```

그리고, webpack-dev-server도 설치해준다:
```
npm i webpack-dev-server -D
```

default entry module인 ./src/index.js 파일도 생성해주고 (비어있어도 상관없다),
package.json의 scripts부분을 수정해주자:
```
"scripts": {
    "start": "webpack-dev-server --mode development --open",
    "build": "webpack --mode production"
}
```

그리고 ```npm run start``` 또는 짧게 ```npm start```를 돌려보자!
바로 웹페이지가 열리면서 (--open이 웹페이지를 바로 열어주는 기능이다),
우리 프로젝트의 파일들이 보일것이다. 쨔쟌~

하지만 지금 이 상태에서는 별로 볼 게 없다. 따라서, 실제로 html 파일을 만들고,
파일을 수정하고 저장하면 그 변경내용이 바로 반영되는지를 확인해보자.

그러기 위해서 [4_using_html](https://github.com/giantsol/Webpack4_101/tree/master/4_using_html)
에 있던 내용을 아주 간략하게 정리하면서 따라가겠다 (편의상 babel은 생략):
1. ./src/index.html 파일 생성 및 내용 추가:
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
2. npm i html-webpack-plugin html-loader -D
3. webpack.config.js 파일 생성 및 내용 추가:
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          }
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

이것으로 준비는 끝났다. ```npm start```를 돌려보자!
쨔쟌~ 빈 화면의 웹페이지가 성공적으로 뜬다면 잘 따라온 것이다.
이제 webpack-dev-server의 힘을 체감해볼 시간이다.

./src/index.html의 body 부분에 아래 내용을 추가하고 파일을 저장해보자:
```html
<div>Hello world!</div>
```

저장을 누르는 순간, ```npm start```를 입력했던 콘솔창에서 다시 빌드가 되는 것을
확인할 수 있을 것이다. 그리고 웹 페이지로 돌아가 보면, 변경 사항이 바로 반영이 되어 있다.

자, 이것으로 개발할때 아주 편리한 webpack-dev-server에 대한 정리를 마치겠다!

#### **추가
1. ```npm start```를 입력한 콘솔에서 <ctrl-c>를 누르면 서버가 종료된다.
2. WebStorm같은 IDE를 쓰고 있다면, 자동 저장은 끄는걸 추천한다. 타이핑을 할 때 마다
자동 저장되는 기능을 켜두었다면, 조금씩 수정할때마다 원치 않게 빌드가 계속 돌아갈것이다.
3. ./dist폴더가 생성되지는 않는 것을 확인할 수 있을 것이다 (npm run build를 돌리지 않았다면!).
이유는, 평소같으면 ./dist에 생성되었을 파일들이 webpack-dev-server가 생성한
가상의 서버 프로그램 내에 생성되었기 때문이다.
