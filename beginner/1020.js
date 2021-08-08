const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const ageInDays = parseInt(input.shift())

function formatDataByDaysNums(numDays = 0) {
    const Y = parseInt(String(numDays / 365))
    const M = parseInt(String((numDays - (Y * 365)) / 30))
    const D = parseInt(String((numDays % 365) % 30))

    return [D, M, Y]
}

function main() {
    const [days, months, years] = formatDataByDaysNums(ageInDays)
    const print = `${years} ano(s) ${months} mes(s) ${days} dia(s)\n`

    console.log(print)
}

main()