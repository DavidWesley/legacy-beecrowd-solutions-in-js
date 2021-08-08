const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split(/\s|\n/).filter(s => s !== '').map(Number)
const mediansList = splitArrayInSubArrays(input)

function splitArrayInSubArrays(baseArr, sizeOfSubArr = 3) {
    return Array.from(
        { length: Math.floor(baseArr.length / sizeOfSubArr) },
        (_, i) => baseArr.slice((3*i), sizeOfSubArr + (3*i))
    )
}

function perimeter([...sides]) {
    return sides.reduce((acc, cur) => acc + cur, 0)
}

function heronFormula([...sides]) {
    const semiperimeter = perimeter(sides) / 2
    return Math.sqrt(sides.map(side => semiperimeter - side).reduce((acc, cur) => acc * cur, semiperimeter))
}

function main() {
    const responses = []

    for (const medians of mediansList) {
        if ((perimeter(medians) / 2) - Math.max(...medians) < 0 || medians.includes(0)) responses.push(`${(-1).toFixed(3)}`)
        else responses.push(`${((4.0 / 3.0) * heronFormula(medians) || -1).toFixed(3)}`)
    }

    console.log(responses.join('\n'))
}

main()