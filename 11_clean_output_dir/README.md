# Learning Webpack4 - Cleaning output dir

우선, [html_css_es6_webpack_starter](https://github.com/giantsol/Webpack4_101/tree/master/html_css_es6_webpack_starter)
에 있는 환경을 그대로 복사해오자! 그리고 ```npm run dev```로 빌드를 해보면, ./dist 폴더로
빌드된 파일들이 생길 것이다.

여기서, webpack.config.js 파일의 'HtmlWebpackPlugin' 부분을 아래와 같이 변경해보자:
```js
new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './main.html'
})
```
즉, ./dist에 빌드될 파일 이름을 ./dist/index.html에서 ./dist/main.html로 변경하는 것이다.
그리고 ```npm run dev```를 돌리고 ./dist 폴더를 보자. 앗! 예전의 index.html
파일은 그대로 남아있을 것이다!

즉, webpack은 기본적으로 빌드를 하면, output dir에 있는 내용물들을 clear해주지 않는다.
그렇게 되면, 지금은 사용되지 않는 필요없는 파일들이 남을 수 있기 때문에, 자동으로 clear해주면
좋겠다 싶다. 그것을 위한 플러그인이 clean-webpack-plugin이다!
```
npm i clean-webpack-plugin -D
```

그리고, webpack.config.js 에 아래의 코드를 추가해주자:
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // ... 생략

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // ... 생략
  ]
}
```

그리고 다시 ```npm run dev```를 돌려보자. 짜잔! 필요없는 ./dist/index.html 파일이
사라진 것을 확인할 수 있을 것이다!
