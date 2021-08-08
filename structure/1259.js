const { readFileSync } = require('fs')
const inputs = readFileSync('./dev/stdin', 'utf8').split('\n')

const [numTestCases, ...numbersList] = inputs

const isOdd = (num) => num % 2 === 1
const isEven = (num) => num % 2 === 0 // Not used

/**
 * @param {Array<string | number>} numbersLists
 */

function sortenerNumbers(numbersLists = []) {
    const oddNumbers = []
    const evenNumbers = []

    for (const [index, value] of Object.entries(numbersLists)) {
        if (index === numTestCases) break
        const thisNumber = +value

        if (isOdd(thisNumber)) oddNumbers.push(thisNumber)
        else evenNumbers.push(thisNumber)
    }

    oddNumbers.sort((a, b) => b - a) // Descending order
    evenNumbers.sort((a, b) => a - b) // Ascending order

    return [...evenNumbers, ...oddNumbers].join('\n')
}

const sortedNumberList = sortenerNumbers(numbersList)
console.log(sortedNumberList)
