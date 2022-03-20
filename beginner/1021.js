const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const cash = Number.parseFloat(input.shift())

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

	return [sequenceNotes, defaultNotes, value - Math.floor(value)]
}

/**
 * @param {number[]} multsNotes
 * @param {number[]} defaultNotes
 * @param {string} defaultCashWord
 */

function createMessagesNotes(multsNotes = [], defaultNotes, defaultCashWord = "nota(s)", defaultTitleMessage = "") {
	const multiples = multsNotes
	const messagesArray = []

	for (const [index, multiple] of Object.entries(multiples)) {
		messagesArray.push(`${multiple} ${defaultCashWord} de R$ ${defaultNotes[index].toFixed(2)}`)
	}

	return [defaultTitleMessage, ...messagesArray]
}

function main() {
	console.log(cash)

	const cashesNotes = [100, 50, 20, 10, 5, 2, 1]
	const cashesCoins = [0.50, 0.25, 0.10, 0.05, 0.01]

	const [multiplesNotes, defaultNotesArray, resultingValue] = getFewestNotesSequence(cash, cashesNotes)
	const [multiplesCoins, defaultCoinsArray] = getFewestNotesSequence(resultingValue, cashesCoins)

	const notesMessage = createMessagesNotes(multiplesNotes, defaultNotesArray, "nota(s)", "NOTAS:")
	const coinsMessage = createMessagesNotes(multiplesCoins, defaultCoinsArray, "moeda(s)", "MOEDAS:")

	for (const msg of [...notesMessage, ...coinsMessage])
		console.log(msg)
}

main()