const { readFileSync, writeFileSync } = require('fs')
const { readFile, writeFile } = require('fs')


// const Start = async () => {
//     try {
//         const one = await readFileSync('./content/1.txt', 'utf8')
//         console.log('one:', one)

//         const two = await readFileSync('./content/2.txt', 'utf8')
//         console.log('two:', two)

//         await writeFileSync(
//             './content/AsyncResult.txt',
//             `The Result of Sync:${one},${two}`,
//             { flag: 'a' })
//     }
//     catch (err) {
//         console.log('err:', err)
//     }
// }
// Start()

const GetText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

const SetText = (path, data) => {
    return new Promise((resolve, reject) => {
        writeFile(path, data, { flag: 'a' }, (err) => {
            if (err) {
                reject(err)
            } else {
                let result = GetText(path);
                resolve(result)
            }
        })
    })

}

const StartAganin = async () => {
    try {
        const one = await GetText('./content/1.txt')
        const two = await GetText('./content/2.txt')
        const data = `The Result of Sync:${one},${two}`
        const result = await SetText('./content/AsyncResult1.txt', data)
        console.log('result:', result)
    }
    catch (err) {
        console.log('err:', err)
    }
}
StartAganin()






