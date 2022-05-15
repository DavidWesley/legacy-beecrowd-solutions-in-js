const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")


const TIJOLAO_KEYBOARD_ENTRIES = Object.entries({
	"2": ["a", "b", "c"],
	"3": ["d", "e", "f"],
	"4": ["g", "h", "i"],
	"5": ["j", "k", "l"],
	"6": ["m", "n", "o"],
	"7": ["p", "q", "r", "s"],
	"8": ["t", "u", "v"],
	"9": ["w", "x", "y", "z"],
	"0": [" "]
})

function getStepsToDisplayACharFromTijolaoKeyboard(char = "") {
	const isUpper = char.toUpperCase() === char && char !== " " ? true : false
	const loweredChar = char.toLowerCase()

	for (const [key, values] of TIJOLAO_KEYBOARD_ENTRIES)
		if (values.includes(loweredChar))
			return (isUpper ? "#" : "").concat(key.repeat(values.indexOf(loweredChar) + 1))

	return ""
}

function main() {

	const steps = lines
		.slice(0, Number.parseInt(numLines))
		.map(line => line
			.split("")
			.map(getStepsToDisplayACharFromTijolaoKeyboard)
			.join("*")
			.replace(/(\d)\*((?!\1))/g, "$1$2")
		)

	console.log(steps.join("\n"))
}

main()
