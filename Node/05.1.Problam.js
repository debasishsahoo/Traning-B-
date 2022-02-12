const { readFile, writeFile } = require('fs')


readFile('./content/1.txt', 'utf8', (err, data) => {
    if (err) { console.log(err); return }
    const one = data
    readFile('./content/2.txt', 'utf8', (err, data) => {
        if (err) { console.log(err); return }
        const two = data
        writeFile(
            './content/AsyncResult2.txt',
            `${one},${two}`,
            err => {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('Done');
            }
        )
    })
})





