# Directives Hooks
디렉티브 정의 객체는 다음과 같은 여러 훅을 사용할 수 있습니다.(모든 훅은 필수가 아닌 선택사항)
`javascript
const myDirective = {
  // 바인딩된 요소의 속성 전에 호출됨
  // 또는 이벤트 리스너가 적용된.
  created(el, binding, vnode, prevVnode) {
  // 인수에 대한 자세한 내용은 아래를 참조하십시오.
  },
  // 요소가 DOM 에 삽입되기 직접에 호출됩니다.
  beforeMount() {},
  // 바인딩된 요소의 부모 구성 요소가 있을 때 호출됩니다.
  // 모든 자식이 마운트됩니다.
  mounted() {},
  // 상위 컴포넌트가 업데이트되기 전에 호출됨
  beforeUpdate() {},
  // 상위 컴포넌트 다음에 호출되고
  // 모든 자식이 업데이트되었습니다.
  updated() {},
  // 상위 컴포넌트가 마운트 해제되기 전에 호출됨
  beforeUnmount() {},
  // 상위 컴포넌트가 마운트 해제될 때 호출됩니다.
  unmounted() {}
}
`;
