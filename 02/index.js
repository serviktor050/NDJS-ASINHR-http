const http = require('http');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const myAPIKey = process.env.myAPIkey

const rl = readline.createInterface({ input, output });

rl.question('В каком городе хотите узнать погоду?', (answer) => {
const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${answer}`

http.get(url, (res) => {
    const {statusCode} = res

    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(parseData)
    })
}).on('error', (err) => {
    console.error(err)
})
    rl.close();
})



