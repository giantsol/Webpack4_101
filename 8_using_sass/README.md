# Learning Webpack 4 - Sass 사용하기

Webpack에서 Sass를 써보도록 하자. 여기까지 왔으면 아주 간단하게 세팅할 수 있다.
우선, [html_css_es6_webpack_starter](https://github.com/giantsol/Webpack4_101/tree/master/html_css_es6_webpack_starter)
에 있는 코드를 그대로 가져와서 기본 세팅을 완성해두도록 하자.
```npm run dev```를 돌렸을 때, 성공적으로 빌드가 된다면 준비 끝!

Webpack에서 css를 쓰기 위해 **style-loader**와 **css-loader**를 설치했는데,
sass를 쓰기 위해서는 추가적으로 **sass-loader**와 **node-sass**를 설치해 주어야 한다:
```
npm i sass-loader node-sass -D
```

그리고, webpack.config.js 파일의 rules 부분에 아래 내용을 추가해주자:
```js
// css와 scss 확장자를 동시에 쓸 생각이면 바로 위에 있을 css 부분은 지우지 않아도 무관하다.
// 물론, scss만 쓸 생각이면 지워도 무관하고!
{
    test: /\.scss$/,
    use: [
      argv.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ]
}
```

다시 말하자면, 위에서 loader를 정의한 순서에 유의하자. 위의 순서를 꼭 지켜야한다!
Webpack은 loader를 right-to-left순으로 적용하기 때문에,
sass -> css -> style 순으로 적용해야한다!

다음, ./src/main.css를 ./src/main.scss로 확장자를 바꿔주고, sass문법을 살짝
적용해보자:
```scss
$background-color: blue;

div {
  background: $background-color;
}
```

마지막으로, ./src/index.js에서 import문도 알맞게 고쳐주자:
```js
import './main.scss'
```

```npm start```를 돌려보자. 페이지가 잘 뜨면 완성!
./src/main.scss에서 **$background-color**를 **red**로 바꾸고 저장해보자.
성공적으로 다시 빌드되고, 웹페이지가 갱신되는 것을 확인할 수 있을 것이다!