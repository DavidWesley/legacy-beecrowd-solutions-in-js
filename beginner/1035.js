const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const [A, B, C, D] = input.map(Number)

function isAcceptable(a, b, c, d) {
    return ((b > c) && (d > a) && (c + d > a + b) && (c > 0) && (d > 0) && (a % 2 == 0)) ? true : false
}

function main() {
    const acceptable = isAcceptable(A, B, C, D)

    if (acceptable) console.log("Valores aceitos")
    else console.log("Valores nao aceitos")
}

main()