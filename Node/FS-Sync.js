const { readFileSync, writeFileSync } = require('fs')

const one = readFileSync('./content/1.txt', 'utf8')
console.log('one:', one)

const two = readFileSync('./content/2.txt', 'utf8')
console.log('two:', two)

writeFileSync('./content/SyncResult.txt', `The Result of Sync:${one},${two}`, { flag: 'a' })
