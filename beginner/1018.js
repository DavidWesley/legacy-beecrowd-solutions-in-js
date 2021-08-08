const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split('\n')

const cash = parseInt(input.shift())

/**
 * @param {number} value
 * @param {number[] | null} notes
 * @return {[number[], number[], (number | null)?]}
 */

function getFewestNotesSequence(value, notes = null) {
    const sequenceNotes = []
    const defaultNotes = notes ?? [100, 50, 20, 10, 5, 2, 1]

    let sum = 0

    for (const note of defaultNotes) {
        const cashBack = value - sum
        const multiple = Math.floor(cashBack / note)
        const cashValue = note * multiple

        sum += (multiple >= 1) ? cashValue : 0
        sequenceNotes.push(multiple)
    }

    return [sequenceNotes, defaultNotes]
}

/**
 * @param {number[]} defaultNotes
 */

function createMessagesNotes(multsNotes = [], defaultNotes) {
    const multiples = multsNotes
    const messagesArray = []

    for (const [index, multiple] of Object.entries(multiples)) {
        messagesArray.push(`${multiple} nota(s) de R$ ${defaultNotes[index].toFixed(2)}`)
    }

    return messagesArray
}

function main() {
    console.log(cash)
    const [multiples, defaultNotes] = getFewestNotesSequence(cash)

    for (const msg of createMessagesNotes(multiples, defaultNotes))
        console.log(msg)
}

main()