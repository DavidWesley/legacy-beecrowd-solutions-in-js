const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(' ')

const [N1, N2, N3] = input.map((int) => Number.parseInt(int))

const sortSequence = ([...nums]) => nums.sort((a, b) => a - b)

function main() {
    const three = [N1, N2, N3]
    const sortedTrhee = sortSequence(three)

    for (const n of [...sortedTrhee, '', ...three]) console.log(n)
    // for (const r of sortedTrhee) console.log(r)
    // for (const s of three) console.log(s)
}

main()