# Learning Webpack4 - CSS 사용하기

[4_using_html](https://github.com/giantsol/Webpack4_101/tree/master/4_using_html)
까지는 js, html을 사용해서 빌드를 해보았다. 여기에 또 필요한건 css!
Webpack에서 js, html, css를 모두 활용해서 빌드하는 법을 알아보자.

지금까지 해왔던 것들 간략 정리 (자세한 내용은 [4_using_html](https://github.com/giantsol/Webpack4_101/tree/master/4_using_html) 참조)
1. npm init -y
2. npm i webpack webpack-cli -D
3. scripts에 prod & dev 모드 빌드 따로 정의 (npm run dev & npm run build)
4. default entry module인 ./src/index.js 생성
5. npm i babel-core babel-loader babel-preset-env -D
6. .babelrc 파일 생성 및 내용 추가
7. webpack이 js 파일들에 대해서는 babel-loader를 사용하도록 configuration 추가 (webpack.config.js)
8. ./src/index.js에 아무 ES6 코드 추가하고 빌드해서 잘 되는지 확인
9. ./src/index.html 파일 생성 및 내용 추가
10. npm i html-webpack-plugin html-loader -D
11. webpack.config.js에 html-loader관련 설정 추가
12. 빌드해보고, ./dist 폴더에 html 파일이 제대로 생성되었는지 확인.

여기까지 해서, js와 html을 사용해서 빌드해보았다. 여기까지의 코드가 필요하다면
[4_using_html](https://github.com/giantsol/Webpack4_101/tree/master/4_using_html)
을 clone하도록 하자.

Html과 마찬가지로, Webpack은 기본적으로 css를 인식하지 못한다. 따라서, 이를 인식하게
해주는 css-loader를 설치해야 한다. 또한, 인식한 style을 실제로 html에 적용시키기 위해서는
style-loader가 필요하다. 이 둘을 설치해주도록 하자:
```
npm i css-loader style-loader -D
```

그리고, webpack.config.js의 rules 부분에 아래 부분을 추가해주도록 하자:
```
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}
```

위에, loader를 추가해주는 순서가 중요하다. webpack이 css파일을 마주쳤을 때,
우선 그 파일을 인식하고 처리하기 위해 'css-loader'부터 사용한 후,
그 결과를 html에 적용시키기 위해 'style-loader'를 사용해야 한다.
따라서 ```['style-loader', 'css-loader']```순으로 추가해줘야 한다
(webpack은 디폴트로 right-to-left 순으로 loader를 적용한다).

준비는 다 끝났다. 실제로 css가 적용되는지 확인해 보자.
./src/index.html의 body에 ```<div id="app">Hello world!</div>```를 추가해준다:
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
  <div id="app">Hello world!</div>
</body>
</html>
```

그리고, ./src/main.css 파일을 생성하고 아래 내용을 넣어주자:
```css
div {
  background: blue;
}
```

마지막으로, 우리가 지금 css 파일을 생성은 했지만, 어느 곳에서도 이 파일을 부르지는 않고 있다.
Webpack의 디폴트 entry module은 ./src/index.js임을 기억할 것이다.
따라서, 이 파일에 import문을 통해서 main.css를 dependency로 걸어주면,
webpack이 webpack.config.js에 정의된 css 관련된 loader들을 차례차례 적용할 것이다.
./src/index.js파일을 아래와 같이 수정해주자:
```js
import './main.css'

document.getElementsByTagName('body')[0].style.backgroundColor = '#FF0000';
```

이제, ```npm run dev```를 실행하고 ./dist/index.html 파일을 열어보자. Html파일 내에는
어디에도 style 관련된 코드가 없다. 하지만, 브라우저에서 열어보면 스타일이 제대로 적용되어
있는 것을 확인할 수 있을 것이다.
이유는, 우리가 정의한 css가 style-loader에 의해 js 코드로 변환되었기 때문이다.
따라서, ./dist/main.js를 자세히 보면 우리가 정의한 style이 적용되는 코드를 볼 수 있을 것이다.

이로써, js, html, css를 모두 활용하여 빌드해보는 법을 배웠다!


#### **추가
위에서, 우리는 css-loader와 style-loader를 사용해서 css를 사용해 보았다:
```
npm i css-loader style-loader -D
```

이 프로젝트에 실제 적용해보진 않겠지만, 많이 사용하는 다른 방식은
css-loader와 mini-css-extract-plugin이란걸 사용하는 방법이다:
```
npm i css-loader mini-css-extract-plugin -D
```

그리고 우리가 사용했던 방식과 유사하게 webpack.config.js를 변경해주는데, 방식은 당연히 다르다:
```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
```

마지막으로, default entry module인 ./src/index.js에 ```import './main.css'```
식으로 추가해주고, ```npm run dev```를 돌려보면 된다!

우리가 사용했던 방식과는 다르게 ./dist/main.css 파일이 생성되었고,
./dist/index.html을 보면 css 파일이 링크되어있는 것을 확인할 수 있을 것이다.

어느 방식으로나 잘 작동한다!!