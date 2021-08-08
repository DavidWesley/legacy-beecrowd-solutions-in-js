const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const [a, b] = input.map(value => +parseFloat(value).toFixed(1))

function media(x, y = x) {
    const med = (x * 0.35 + y * 0.75) * 10 / 11
    return med.toFixed(5)
}

function main() {
    const med = media(a, b)
    console.log(`MEDIA = ${med}`)
}

main()