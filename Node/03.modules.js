const info = require('./modules/info')
const SayHi = require('./modules/greeting')
const cal = require('./modules/calculation')
const Alternative = require('./modules/singlePerson')

console.log(info.Name);
console.log(info.Title);
SayHi(info.Name, info.Title)
cal(10, 5)

console.log(Alternative.item);
console.log(Alternative.singlePerson);
console.log(Alternative.singleStack);

console.log(Alternative.singlePerson.name);
console.log(Alternative.singleStack.name);

