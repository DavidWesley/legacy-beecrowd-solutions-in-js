const { readFileSync } = require('fs')
const inputs = readFileSync('/dev/stdin', 'utf8').split('\n')

console.log(inputs)

function main() {
    for (let index = 0; inputs.length > 1; index++) {
        const recentIndexOfZero = inputs.indexOf("0")
        const [len, ...permutations] = inputs.splice(0, recentIndexOfZero + 1)

        if (len === "0") break

        for (const permutationStr of permutations) {
            if (permutationStr === "0") break
            const [...permuts] = permutationStr.split(' ').map(Number)

            if (permuts.length !== Number(len)) break

            const defaultPermut = [...permuts].sort((a, b) => a - b)
            const actualIndexPermuts = permuts.map(wagon => defaultPermut.indexOf(wagon))

            console.log("DEFAULT:", defaultPermut)
            console.log("INDEXES:", actualIndexPermuts)
            console.log("ACTUAL:", permuts, "\n")
        }
    }
}

main()