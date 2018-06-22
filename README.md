# Learning Webpack 4

Webpack은 웹개발에 쓰이는 여러 리소스들을 원클릭으로 번들링하여 빌드해주는 엄청난 툴이지만, 세팅하는 것이 입문자들에게는 너무나도 어려워 보인다.
그래서, 우리가 직접 세팅을 건드리지 않아도 바로 쓸 수 있도록 여러 사람들이 'starter'라고 불리는 Webpack template들을 만들었다. 예컨대, React 개발에 바로 착수하고 싶으면, react-starter라는 키워드로 찾아보면, 수많은 사람들이 풀세팅된 Webpack을 공유해둔 것을 볼 수 있다.

그러나, 언젠가는 Webpack을 직접 건드려야 할 때가 올 것이다. 따라서, 사람들이 만들어둔 template들이 왜 제대로 동작하는지 이해하고 있어야 할 필요가 있다. 이 튜토리얼은 Webpack (특히 Webpack4)의 동작 원리를 이해하기 위한 것이다.

## 튜토리얼

### 1_zero_conf

다른 사람들이 공유하는 webpack template들을 보면, 이미 엄청나게 많은 세팅이 되어 있는 상태라서 '이것들을 처음부터 다 알아야 쓸 수 있는건가?'라는 착각을 불러일으킨다.

첫 번째 튜토리얼에서는, 아무 설정도 넣지 않은 최소한의 Webpack project를 소개함으로써, Webpack의 순수한 목적, 기능에 대해 알아본다.

### 2_prod_dev_mode

Webpack에는 production mode와 development mode라는 것이 있다.
이 둘을 간략하게 소개하고, 최소한의 설정을 적용해 본다.

### 3_using_es6

요즘 웹 개발자들은 거의 ES6 문법을 사용하는데, 아쉽게도 모든 브라우저가 ES6를 지원하지는 않는다.
이 때, Babel이라는 툴을 통해 ES6로 짜여진 코드를 ES5로 변환할 수 있는데,
Webpack에서 Babel을 사용하는 법에 대해 알아본다.

### 4_using_html

웹 페이지를 띄우려면 HTML이 있어야 한다! 그런데, Webpack은 애초에 JS 파일들을 번들링할
목표로 만들어졌던 툴이기 때문에, 디폴트 환경에서는 HTML을 인지하지 못한다.
HTML을 사용하기 위한 설정 방법에 대해 알아본다.

### 5_using_css

CSS 파일도 웹개발에 있어 필수적인 파일 중 하나인데, Webpack은 기본적으로
CSS 파일을 인지하지 못한다. CSS 파일을 적용하는 방법에 대해 알아본다.

### 6_webpack_dev_server

웹 개발을 하는 도중에, 코드를 조금 고칠 때 마다 다시 빌드를 돌리고 웹페이지를 리로딩하려면
얼마나 귀찮을까? 다행이다, webpack_dev_server라는 기능을 사용하면, 코드를 수정하고
저장할 때 마다 자동적으로 빌드를 다시 해주고 웹페이지를 새로고침 해준다.
이 기능의 설정 방법에 대해 알아본다.

### 7_react

여기까지 HTML, CSS, JS를 Webpack으로 번들링 하는 법에 대해 알아왔다면,
유명한 프론트엔드 프레임워크를 Webpack에서 사용하는 방법도 간단하게 알아보자.
React 개발 환경을 세팅해본다.

### html_css_es6_webpack_starter

[5_using_css](https://github.com/giantsol/Webpack4_101/tree/master/5_using_css)
의 거의 복제본으로, HTMl, CSS, ES6, 그리고 webpack-dev-server가 세팅된
기본적인 웹개발 환경이다. 이 뒤에 나올 튜토리얼들의 대다수는 이 디렉토리를 copy해서
쓰게 될 예정이다.

## Resources:
- https://www.valentinog.com/blog/webpack-tutorial/
- https://medium.freecodecamp.org/part-1-react-app-from-scratch-using-webpack-4-562b1d231e75
