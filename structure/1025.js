const { readFileSync } = require('fs')
const inputs = readFileSync('/dev/stdin', 'utf8').split('\n')
const responses = []

let indexCounter = 0

for (const [index, line] of Object.entries(inputs)) {
    if (inputs.length === 0) break
    else if (!isNaN(+line)) continue

    const [marblesNumbers, queriesCount] = line.split(' ').map(Number)
    if (marblesNumbers === 0 && queriesCount === 0) break

    const startIndexOfMarble = +index + 1
    const endIndexOfMarble = marblesNumbers + startIndexOfMarble

    const startIndexOfQueries = endIndexOfMarble
    const endIndexOfQueries = queriesCount + startIndexOfQueries

    const marbles = inputs.slice(startIndexOfMarble, endIndexOfMarble).map(Number).sort((a, b) => a - b)
    const queries = inputs.slice(startIndexOfQueries, endIndexOfQueries).map(Number)

    responses.push(`CASE# ${++indexCounter}:`)

    queries.forEach((query) => {
        if (marbles.includes(query)) {
            const indexOfQuery = marbles.indexOf(query) + 1
            responses.push(`${query} found at ${indexOfQuery}`)
        } else {
            responses.push(`${query} not found`)
        }
    })
}

console.log(responses.join('\n'))
