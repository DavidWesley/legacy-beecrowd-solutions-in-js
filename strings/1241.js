const { readFileSync } = require("fs")
const input = readFileSync('/dev/stdin', 'utf8').split('\n')

const [[numTestCases], ...pairTextList] = input.map(line => line.split(' '))
const responses = []

function fitIn([firstValueString = '', secondValueString = '']) {
    const firstStringLen = firstValueString.length
    const secondStringLen = secondValueString.length

    if (firstStringLen < secondStringLen) return false
    const lastFirstSubstring = firstValueString.substr(firstStringLen - secondStringLen)

    return lastFirstSubstring === secondValueString
}

function main() {
    for (const [index, [firstValue, secondValue]] of Object.entries(pairTextList)) {
        if (index === numTestCases) break
        const isFit = fitIn([firstValue, secondValue])

        if (isFit) responses.push('encaixa')
        else responses.push('nao encaixa')
    }

    console.log(responses.join('\n'))
}

main()