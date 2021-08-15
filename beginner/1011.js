const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n')

const PI = +Math.PI.toFixed(5)
const radius = Number(input.shift())

function volumeOfSphere(R) {
    const volume = (4 / 3) * Math.pow(R, 3) * PI
    return volume
}

function main() {
    const volSphere = volumeOfSphere(radius)
    console.log(`VOLUME = ${volSphere}`)
}

main()