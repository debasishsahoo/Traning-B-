function add(a, b) {
    return a + b
}

console.log(add(2, 4));

add = (function (a, b) {
    return a + b
})(10, 20)

console.log(add);

(function (a, b, c) {
    console.log(a + b + c);
})(10, 20, 30)

//((a, b) => { console.log(a + b); })(10, 20);