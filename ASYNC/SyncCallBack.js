console.log('START');
let start = Date.now()
console.log(start)

const roll = [1, 2, 3, 4, 5, 6, 7, 8, 9]

roll.forEach(r => { console.log(r); })

let end = Date.now()
console.log(end - start);
console.log('END');
