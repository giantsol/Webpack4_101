# Learning Webpack4 - HTML, CSS, ES6 Webpack Starter

[5_using_css](https://github.com/giantsol/Webpack4_101/tree/master/5_using_css)
의 코드와 거의 유사하나, 아래의 차이점이 있다:

- css를 사용할 때, dev 모드에서는 style-loader를 쓰는 반면,
prod 모드에서는 mini-css-extract-plugin을 사용한다. 왜냐하면, 실제 production 상황에서는
css 파일을 밖으로 분리하여, js와 독립적으로 작동하도록 하는 것이 더 바람직하기 때문이다
(e.g. js 파일을 못불러온다고 스타일까지 적용이 안되면 안되지않나!!)
