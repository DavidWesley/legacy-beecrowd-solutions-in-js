const { readFileSync } = require("fs")
const coordenates = readFileSync("./dev/stdin", "utf8").split(' ')

const [xCoord, yCoord] = coordenates.map(parseFloat)

function quadrants(x = 0, y = 0) {
    if (x === 0 && y === 0) return 'Origem'

    else if (x === 0) return 'Eixo Y'
    else if (y === 0) return 'Eixo X'

    else if (y > 0) return (x > 0) ? 'Q1' : 'Q2'
    else if (y < 0) return (x < 0) ? 'Q3' : 'Q4'
}

function main() {
    const quadrant = quadrants(xCoord, yCoord)
    console.log(quadrant)
}

main()