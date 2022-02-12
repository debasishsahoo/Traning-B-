const { createWriteStream } = require('fs')
const stream = createWriteStream('./content/StreamResult.txt', { flag: 'a' })

for (let i = 0; i <= 1000; i++) {
    stream.write(`THE RESULT IS ${i},\n`)
}
