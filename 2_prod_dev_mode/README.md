# Learning Webpack4 - Production & Development 모드 이해하기

Webpack4 이전의 프로젝트들에는 보통 2개의 다른 configuration 파일을 같이 사용했다:
하나는 dev용, 하나는 prod용. 예컨대, dev용에는 dev server같은 것들을 정의해주는 반면,
prod용에는 uglify, sourcemap같은 것들을 정의해 주는 것이다. 그리고 빌드할 때,
상황에 따라 각기 다른 configuration 파일을 적용했다.

하지만, Webpack4에서는 위와 같은 필요성이 많이 사라졌다! 디폴트로
production 모드와 development 모드를 제공하는데, ```webpack --mode development```
식으로 실행하면 된다 (--mode 지정 안할 시 디폴트는 production).

package.json파일을 조금 수정해보자:
```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```
그리고 ```npm run dev```, ```npm run build```를 한번씩 실행해보면서
./dist/main.js파일을 확인해 보자. dev로 했을때는 minify가 되지 않는 것을
확인할 수 있다!

정리하자면, Webpack4에서 제공하는 production 모드에서는 minification과 같은
우리가 직접 설정해야 했던 기능들을 디폴트로 제공하며, development 모드에서는
최대한 빠른 빌드를 제공하기 위해 optimization을 모두 생략한다.
