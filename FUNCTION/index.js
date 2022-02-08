function Say(msg) {
    console.log(msg);
}
Say('Hello')

// No Parameter ,No Return Type
function Add() {
    console.log(2 + 2);
}
// With parameter and Return Type
function Sub(a, b) {
    return (a - b);
}
// With parameter but no Return Type
function Prod(x, y) {
    console.log(x * y);
}
// No parameter but with Return Type
function Div() {
    return (10 / 5);
}
Add();
let a = Sub(10, 5)
console.log('a:', a)
Prod(2, 4)
let b = Div()
console.log('b:', b)


