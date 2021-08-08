const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const factorialValues = new Map()
const factorialsPairList = input.map(factorialPair => factorialPair.split(' ').map((int) => parseInt(int)))

function factorialList(num) {
    if (factorialValues.has(num)) return factorialValues.get(num)
    else return factorialValues.set(num, fact(num)).get(num)
}

function fact(num) {
    let returnedValue = 1
    for (let f = 2; f <= num; f++) returnedValue *= f
    return BigInt(returnedValue)
    // return Number.isSafeInteger(returnedValue) ? returnedValue : BigInt(returnedValue)
}

function main() {
    const responses = []
    const MAX_LIMIT_FACTORIAL = 20

    for (const [firstFact, secondFact] of factorialsPairList) {
        if (Math.max(firstFact, secondFact) > MAX_LIMIT_FACTORIAL) continue
        const sum = factorialList(firstFact) + factorialList(secondFact)
        responses.push(sum)
    }

    console.log(responses.join('\n'))
}

main()