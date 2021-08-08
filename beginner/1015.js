const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8")

const [x, y] = input.split('\n').map(point => {
    return point.split(' ').map(coordenate => parseFloat(coordenate))
})

function distance([x1, y1], [x2, y2]) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)).toFixed(4)
}

function main() {
    const dist  = distance(x, y)
    console.log(`${dist}`)
}

main()