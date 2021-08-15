const { readFileSync } = require("fs")
const [limit] = readFileSync('/dev/stdin', 'utf8').split("\n")

const responses = []

function main() {
    for (let num = 1; num <= Number(limit); num += 2) {
        responses.push(num)
    }

    console.log(responses.join("\n"))
}

main()