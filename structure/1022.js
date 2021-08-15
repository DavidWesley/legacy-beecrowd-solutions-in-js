const { readFileSync } = require('fs')
const inputs = readFileSync('/dev/stdin', 'utf8').split('\n')

const [numTestCases, ...equations] = inputs

const sum = (N1 = 1, D1 = 1, N2 = 0, D2 = 0) => `${(N1 * D2 + N2 * D1)}\/${(D1 * D2)}`
const subtract = (N1 = 1, D1 = 1, N2 = 0, D2 = 0) => `${(N1 * D2 - N2 * D1)}\/${(D1 * D2)}`
const multiply = (N1 = 0, D1 = 0, N2 = 1, D2 = 1) => `${(N1 * N2)}\/${(D1 * D2)}`
const divide = (N1 = 0, D1 = 0, N2 = 1, D2 = 1) => `${(N1 * D2)}\/${(N2 * D1)}`

// Run Call all function here

for (const index in equations) {
    if (index === numTestCases) break
    const solvedEquation = returnSolvedEquation(equations[index])
    console.log(solvedEquation)
}

// Return the fraction formatted

function reduceFraction(fraction) {
    const [N, D] = destructFraction(fraction)
    const MDC = mdc(N, D)

    return [N / MDC, D / MDC]
}

// Functions Destructs

function destructFraction(fraction) {
    return fraction.replace(/\s/gs, '').split("\/").map(Number)
}

function destructFullEquation(equation) {
    const destructedEquation = equation.split(/\s/).filter((_, i) => (i != 1 && i != 5))
    return destructedEquation
}

// Set the correct operation for equation input

function defineOperation(equation) {
    const [n1, d1, operator, n2, d2] = equation
    let response = ""

    if (operator === '+') response = sum(n1, d1, n2, d2)
    else if (operator === '-') response = subtract(n1, d1, n2, d2)
    else if (operator === '*') response = multiply(n1, d1, n2, d2)
    else if (operator === '/') response = divide(n1, d1, n2, d2)
    else response = multiply(n1, d1)

    return response
}

// Print the final equation solved

function returnSolvedEquation(equation) {
    const unstructured = destructFullEquation(equation)
    const initialFraction = defineOperation(unstructured)
    const reducedFraction = defineOperation(reduceFraction(initialFraction))

    return `${initialFraction} = ${reducedFraction}`
}

// Adtionals Functions

function mdc(num = 1, den = 1) {
    let rest

    do {
        rest = num % den;
        [num, den] = [den, rest]
    } while (rest !== 0)

    return Math.abs(num)
}
