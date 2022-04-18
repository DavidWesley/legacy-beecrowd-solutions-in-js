const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const WERTYU_KEYBOARD = Object.freeze({
	"=": "-",
	"-": "0",
	"0": "9",
	"9": "8",
	"8": "7",
	"7": "6",
	"6": "5",
	"5": "4",
	"4": "3",
	"3": "2",
	"2": "1",
	"1": "`",

	"\\": "]",
	"]": "[",
	"[": "P",
	"P": "O",
	"O": "I",
	"I": "U",
	"U": "Y",
	"Y": "T",
	"T": "R",
	"R": "E",
	"E": "W",
	"W": "Q",

	"'": ";",
	";": "L",
	"L": "K",
	"K": "J",
	"J": "H",
	"H": "G",
	"G": "F",
	"F": "D",
	"D": "S",
	"S": "A",

	"/": ".",
	".": ",",
	",": "M",
	"M": "N",
	"N": "B",
	"B": "V",
	"V": "C",
	"C": "X",
	"X": "Z",

	" ": " "
})

const convertInputToWERTYUMode = (chars = "") => chars.replace(/./gi, (char) => WERTYU_KEYBOARD[char.toUpperCase()] ?? "")

function main() {
	const responses = []

	for (const line of input)
		if (line === "") break // EOFile Condition Verification
		else responses.push(convertInputToWERTYUMode(line))

	console.log(responses.join("\n"))
}

main()