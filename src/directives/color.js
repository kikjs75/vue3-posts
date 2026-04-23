// CSS 색상 변경
// <div v-example:foo.bar="baz">
// binding 매개변수는 다음과 같은 형태의 객체입니다.
//{
// arg: 'foo',
// modifiers: {bar: true},
// value: /* value of baz */
// oldValue: /* value of  baz from previous udpate */
//}

function color(el, binding) {
	el.style.color = binding.value;
}

export default color;
