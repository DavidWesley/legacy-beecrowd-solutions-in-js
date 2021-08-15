const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const numTestCases = input.shift()
const foods = input.map(parseFloat)

function daysToFinishFood(food, tax) {
    if (food <= 0) return 1
    const exponent = Math.log(1 / food) / Math.log(tax)
    return Math.ceil(exponent)
}

function main() {
    const tax = 0.5
    const messageDaysList = []

    for (const [index, food] of Object.entries(foods)) {
        if (index === numTestCases) break
        const days = daysToFinishFood(food, tax)
        messageDaysList.push(`${days} dias`)
    }

    console.log(messageDaysList.join('\n'))
}

main()