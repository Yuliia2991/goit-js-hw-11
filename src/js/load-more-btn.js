// export default class LoadMoreBtn {
//   constructor({ selector, hidden = false }) {
//     this.refs = this.getRefs(selector);
//     hidden && this.hide();
//   }

//   getRefs(selector) {
//     const refs = {};
//     refs.submitBtn = document.querySelector(selector);
//     return refs;
//   }

//   enable() {
//     this.refs.submitBtn.disabled = false;
//     this.refs.submitBtn.classList.remove('is-hidden');
//   }
//   disable() {
//     this.refs.submitBtn.disabled = true;
//     this.refs.submitBtn.classList.add('is-hidden');
//   }
//   show() {
//     this.refs.submitBtn.classList.remove('is-hidden');
//   }
//   hide() {
//     this.refs.submitBtn.classList.add('is-hidden');
//   }
// }
