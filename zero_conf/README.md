# Learning Webpack4 - 설정 없이 사용하기

mkdir \<dirname>

cd \<dirname>

npm init # package.json 초기화

npm i -D webpack webpack-cli # i는 install, -D는 --save-dev의 약자. webpack은 개발 중에만 필요하고 실제 배포 되었을 때 필요한 툴은 아니기떄문에 -D를 한다.

다음, package.json 파일을 열고 scripts 태그 부분을 수정.
```
"scripts": {
    "build": "webpack"
}
```

이 상태에서 ```npm run build```를 실행시키면 아래와 같은 에러 문구가 뜬다:
```
ERROR in Entry module not found: Error: Can't resolve './src' in ...
```

Webpack은 지정된 entry module 파일부터 시작해서, 필요한 리소스들을 모아서 빌드하는데,
Webpack4의 디폴트 entry module인 ./src/index.js 파일이 없어서 생기는 문제이다.
따라서, 위 파일을 만들어주고, 테스트로 아래 내용을 넣어준다:
```js
console.log('Dummy entry point!');
```

그리고 다시 ```npm run build```를 불러주면, 빌드가 완성되면서 ./dist/main.js
파일이 생성된다!

즉, Webpack4에서의 디폴트 설정들은:
1) entry point는 ./src/index.js
2) output file은 ./dist/main.js

예전 버전들에서는 이러한 디폴트 설정들이 없었기에, 아무리 작은 프로젝트라도
webpack.config.js 파일을 따로 만들어서 설정해줘야 했지만, 편리하게도
위와 같은 디폴트가 생겼다.

설정 없이 사용하기를 마무리짓자면, Webpack4부터는 위의 디폴트 설정들이
추가되었기 때문에, 테스트용으로 빌드해보는 작은 프로젝트들은 설정 파일이 아예 필요가 없다!
