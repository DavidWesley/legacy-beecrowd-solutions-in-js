const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')
const list = input.map(pair => pair.split(' ').map(int => parseInt(int)))

const distanceTravelled = (velocity, time) => velocity * time

function main() {
    const responses = []

    for (const [velocity, time] of list) {
        const distance = distanceTravelled(velocity, time * 2)
        responses.push(distance)
    }

    console.log(responses.join('\n'))
}

main()