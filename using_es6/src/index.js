const arr = [1,2,3];
const tempFunc = () => console.log(...arr);
window.tempFunc = tempFunc;