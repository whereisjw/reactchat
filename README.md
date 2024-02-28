# 실행

- npm i
- npm i react-router-dom
- npm install @loadable/component
- npm install --save @types/loadable\_\_component
- yarn add @emotion/react @emotion/styled
- npm i react-hook-form

### 폴더패턴

- components
- pages
- layouts
- hooks
- utils
- typings

폴더패턴(리액트)
리액트라우터돔 의미없는 url등이 history api를 통해 router를 나누고 여러 페이지 처럼 사용 할 수 있음
코드스플리팅 어떤컴포넌트를 구분할걳인가? 페이지단위 SSR이 필요없는 페이지들은 코드스플리팅 에디터같은것들도 ssr이 안되게 코드스플리팅해두면 서버 용량을 아낄 수 있음
prettier 설정

npm install @loadable/component
npm install --save @types/loadable\_\_component

이모션 설치
yarn add @emotion/react @emotion/styled

### 프리티어 설정

- .prettierrc 라는 파일 생성

```
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true
}
```

- 위 코드 붙여넣기, 팀프로젝트시 상황에 맞게 코딩컨벤션 설정해서 변경하기

### gravatar 사용하기

- npm install gravatar --save @types/gravatar

```
            <img src={gravatar.url('test', { s: '100', r: 'x', d: 'retro' }, true)} alt="" />
```

- default 종류(d 프로퍼티)
- mp (mystery person): 신비한 인물의 실루엣을 표시합니다.
- identicon: 이메일 해시를 기반으로 생성된 기하학적 패턴을 표시합니다.
- monsterid: 이메일 해시를 기반으로 생성된 몬스터 이미지를 표시합니다.
- wavatar: 이메일 해시를 기반으로 생성된 얼굴 이미지를 표시합니다.
- retro: 이메일 해시를 기반으로 생성된 픽셀 아트 스타일의 얼굴 이미지를 표시합니다.
- robohash: 이메일 해시를 기반으로 생성된 로봇 이미지를 표시합니다.
