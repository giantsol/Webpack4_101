# Learning Webpack4 - Markdown 파일 사용하기

오늘은 개인적으로 Markdown을 사용할 필요가 있어서, Webpack에서 markdown 파일을 사용하는 법을 진행해보고자 한다.
예컨대, 자신의 블로그를 직접 만들게 된다면, 각가의 포스트를 markdown 파일로 만들 수 있으면 아주
편리할 것이다 (그것이 [Jekyll](https://jekyllrb.com/)이 해주는 것!)

우리가 .md 형식의 파일을 만들면, 그 마크다운을 파싱해서 제대로 보여줄 수 있는 라이브러리가 필요하다.
그 라이브러리로는 [markdown-js](https://github.com/evilstreak/markdown-js)을 사용하도록 하겠다:
```
npm i markdown -D
```

그리고, 이번에는 ./src 폴더 안에 말고, ./mds 라는 폴더를 생성한 후, 그 안에 home.md라는 파일을 만들어보자
(즉, ./mds/home.md):
```md
# Welcome to my home!

#### I am a smaller header!
```

다음으로, ./src/index.js에서 위의 마크다운 파일을 불러온 후, 그 안의 내용을
제대로 파싱해서 보여줄 수 있도록 하자:
```js
// ./src/index.js
import {markdown} from 'markdown'

fetch('../mds/home.md')
  .then(response => response.text())
  .then(text => {
    const placeholder = document.getElementById('app')
    placeholder.innerHTML = markdown.toHTML(text)
  })
```
fetch 문법에 대해서는 자세히 설명하지 않겠다. 어찌됐든, home.md라는 파일을 읽어들이고,
```markdown.toHTML()```이라는 함수를 통해 마크다운을 html 형식으로 변형한다.
그리고, app이라는 id를 가진 엘리먼트 안에 innerHTML로 삽입하는 코드이다.

마지막으로, app이라는 id를 가진 엘리먼트를 ./src/index.html에 추가해주자:
```html
<div id="app"></div>
```

```npm start```를 실행해보면, 우리 마크다운이 제대로 뜨는 것을 확인할 수 있을 것이다!
