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

//! FLAG SYSTEM
function Compare(a, b) {
    if (a > b) {
        return -1
    }
    else if (a < b) {
        return 1
    }
    return 0
}

a = Compare(5, 2)
console.log('a:', a)


function add() {
    let Sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        Sum += arguments[i];
    }
    return Sum;
}
console.log(add(1, 2, [1, 1, 1], [9, 5]));
console.log(add(1, [20, 78], [96, 18], 45));
console.log(add([2, 2]));




//WHERE FUNCTION IS THE FIRST CLASS CITIZEN

b = ShowMe();  // A HOISTING 
console.log('b:', b)

function ShowMe() {
    return 0
}

//Functiuon as Argument
function Sum() {
    let Sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        Sum += arguments[i];
    }
    return Sum;
}
function Crocess() {
    let prod = 1;
    for (let i = 0; i < arguments.length; i++) {
        prod *= arguments[i];
    }
    return prod;
}
function Cal(x, y, fn) {
    return (fn(x, y) / 2)
}

let Result = Cal(10, 12, Sum);
console.log('Result:', Result)

Result = Cal(10, 12, Crocess);
console.log('Result:', Result)

function compareBy(propName) {
    return function (a, b) {
        let x = a[propName],
            y = b[propName];
        if (x > y) {
            return 1;
        } else if (x < y) {
            return -1;
        } else {
            return 0;
        }
    }
}

let Products = [
    { name: 'sumsung', price: 900 },
    { name: 'iphone', price: 1500 },
    { name: 'oneplus', price: 1000 },
    { name: 'sony', price: 1300 }
]
console.log('Product Sorted By Name');
Products.sort(compareBy('name'))
console.table(Products)
Products.sort()
console.table(Products)

console.log('Product Sorted By Price');
Products.sort(compareBy('price'))
console.table(Products)

