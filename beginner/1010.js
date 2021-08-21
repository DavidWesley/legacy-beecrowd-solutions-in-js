const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function pay(part) {
    const [, num, cost] = part.split(' ').map(Number)
    const total = (num * cost).toFixed(2)

    return Number.parseFloat(total)
}

function cost(parts = []) {
    const total = parts.reduce((acc, cur) => acc + cur, 0)
    return total.toFixed(2)
}

function main() {
    const parts = input.map(pay)
    const totalCost = cost(parts)

    console.log(`VALOR A PAGAR: R$ ${totalCost}`)
}

main()