const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const RA = {
	0: ["G", "Q", "a", "k", "u"],
	1: ["I", "S", "b", "l", "v"],
	2: ["E", "O", "Y", "c", "m", "w"],
	3: ["F", "P", "Z", "d", "n", "x"],
	4: ["J", "T", "e", "o", "y"],
	5: ["D", "N", "X", "f", "p", "z"],
	6: ["A", "K", "U", "g", "q"],
	7: ["C", "M", "W", "h", "r"],
	8: ["B", "L", "V", "i", "s"],
	9: ["H", "R", "j", "t"],
}

function RAConverter(char) {
	for (const key in RA) if (RA[key].includes(char)) return key
}

function convertToRAPass(str) {
	return str
		.replace(/[ ]/g, "")
		.substring(0, 12)
		.replace(/./g, (char) => RAConverter(char) ?? "")
}

function main() {
	const responses = lines.slice(0, +numLines).map(convertToRAPass)
	console.log(responses.join("\n"))
}

main()