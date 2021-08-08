const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split("\n")

const [number, hours, valueByHours] = input.map(Number)

function salary(h = 0, vH = 0) {
    const sal = h * vH
    return sal.toFixed(2)
}

function main() {
    const salaryValue = salary(hours, valueByHours)

    console.log(`NUMBER = ${number}`)
    console.log(`SALARY = U$ ${salaryValue}`)
}

main()