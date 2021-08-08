const { readFileSync } = require('fs')
const inputs = readFileSync('./dev/stdin', 'utf8').split('\n')
const [numTestCases, ...cases] = inputs

for (const caseIndex in cases) {
    if (caseIndex === numTestCases) break

    const sign = [...cases[caseIndex]]
    const diamondsQuantity = diamonds(sign)

    console.log(diamondsQuantity)
}

/**
 * @param {string[]} sign
*/

function diamonds(sign = []) {
    const signs = {
        sign: sign,
        stacks: {
            LTS: [],
            GTS: []
        },
        codes: {
            LTS: String.fromCharCode(60), // <
            GTS: String.fromCharCode(62) // >
        },
        diamonds: {
            counter: 0
        }
    }

    signs.sign.forEach((symbol, index) => {
        if (symbol === signs.codes.LTS)
            signs.stacks.LTS.push(index)
        else if (symbol === signs.codes.GTS) {
            signs.stacks.GTS.push(index)

            if (signs.stacks.LTS.length > 0) {
                signs.stacks.LTS.pop()
                ++signs.diamonds.counter
            }
        }
    })

    return signs.diamonds.counter
}
