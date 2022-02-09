// setTimeout(() => {
//     console.log('5 Second Later');
// }, 5000);
// setInterval(() => { console.log('3 Second Later'); }
//     , 3000)
let Show = function () {
    return ('Debasish');
}
let a = Show();
console.log('a:', a)

//Callback
let numbers = [1, 12, 4, 5, 7, 9, 3, 10, 6, 8]
function isOddNumber(number) {
    return number % 2;
}
let oddNumber = numbers.filter(isOddNumber);
console.log(oddNumber);



// ES6
oddNumber = numbers.filter(number => number % 2);
console.log(oddNumber);

//Sync Call Back

let Short = numbers.sort((a, b) => a - b);
console.log('Short:', Short)














