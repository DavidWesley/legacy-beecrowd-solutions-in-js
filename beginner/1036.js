const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(' ')

const [A, B, C] = input.map(parseFloat)

function baskharaRoots(a, b = 0, c = 0) {
    if ((Math.pow(b, 2) - 4 * a * c) < 0 || a === 0) return [null, null]
    else {
        const firstRoot = (((-b) + Math.sqrt((Math.pow(b, 2) - 4 * a * c))) / (2 * a))
        const secondRoot = (((-b) - Math.sqrt((Math.pow(b, 2) - 4 * a * c))) / (2 * a))
        return [firstRoot, secondRoot]
    }
}

function main() {
    const [firstRootValue, secondRootValue] = baskharaRoots(A, B, C)

    if (!secondRootValue && !firstRootValue) console.log("impossivel calcular")
    else {
        console.log(`R1 = ${firstRootValue.toFixed(5)}`)
        console.log(`R2 = ${secondRootValue.toFixed(5)}`)
    }
}

main()