const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const [A, B, C, D] = input.map(int => Number.parseInt(int))

const diff = (w = 0, x = 0, y = 0, z = 0) => w * x - y * z

function main() {
    const diffValue = diff(A, B, C, D)
    console.log(`DIFERENCA = ${diffValue}`)
}

main()