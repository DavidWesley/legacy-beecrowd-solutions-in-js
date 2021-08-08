// const { readFileSync } = require("fs")
// const input = readFileSync("./dev/stdin", "utf8").split('\n')

// const [numTestCases, ...cases] = input.map(Number)

const powerList = new Map()
powerList.set(0, 0n)
powerList.set(1, 1n)
powerList.set(2, 4n)


function power(base) {
    if (base === 0) return 0
    else if (powerList.has(base)) return powerList.get(base)

    const newPower = BigInt(power(base - 1)) ** 2n
    powerList.set(base, BigInt(newPower))

    return BigInt(powerList.get(base))
}

power(10)
// function fastPowering(base, power) {
//     if (power === 0) return 1
//     if (power % 2 === 0) {
//         const multiplier = fastPowering(base, power / 2)
//         return multiplier * multiplier
//     }

//     const multiplier = fastPowering(base, Math.floor(power / 2))
//     return multiplier * multiplier * base
// }


// function

// function main() {
//    const responses = []


//     console.log(responses.join('\n'))
// }

// main()


/**
 * 12 trigos === 1 grama
 * Math.floor()
 */