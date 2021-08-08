const { readFileSync } = require("fs")

const [distance] = readFileSync("./dev/stdin", "utf8").split('\n').map(Number)

function distanceBetween(space = 0) {
    const [carX, carY] = [60, 90]
    const distanceTax = Math.abs(carX - carY) / 60

    return Math.round(space / distanceTax)
}

function main() {
    const distTime = distanceBetween(distance)
    console.log(`${distTime} minutos`)
};/
main()