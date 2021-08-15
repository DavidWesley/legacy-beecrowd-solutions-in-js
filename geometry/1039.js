const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const coordenatesList = input.map(coords => coords.split(' ').map((int) => Number.parseInt(int)))

function distanceBetween(x1 = 0, y1 = 0, x2 = x1, y2 = y1) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

function main() {
    const responses = []

    for (const [R1, X1, Y1, R2, X2, Y2] of coordenatesList) {
        if (R1 < R2) responses.push('MORTO')
        else responses.push(distanceBetween(X1, Y1, X2, Y2) > (R1 - R2) ? 'MORTO' : 'RICO')
    }

    console.log(responses.join('\n'))
}

main()