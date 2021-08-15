const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const [A, B, C] = input.map(value => +parseFloat(value).toFixed(1))

function media(x = 0, y = 0, z = 0) {
    const med = (x * 0.2) + (y * 0.3) + (z * 0.5)
    return med.toFixed(1)
}

function main() {
    const med = media(A, B, C)
    console.log(`MEDIA = ${med}`)
}

main()