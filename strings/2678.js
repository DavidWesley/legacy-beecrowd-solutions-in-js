const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.toUpperCase()
	.split("\n", 300)


const MAPPED_CHARS_DIALER_BOARD = Object.freeze({
	Chars: Object.freeze({
		"A": Object.freeze({ button: "2", clicks: 1 }),
		"B": Object.freeze({ button: "2", clicks: 2 }),
		"C": Object.freeze({ button: "2", clicks: 3 }),
		"D": Object.freeze({ button: "3", clicks: 1 }),
		"E": Object.freeze({ button: "3", clicks: 2 }),
		"F": Object.freeze({ button: "3", clicks: 3 }),
		"G": Object.freeze({ button: "4", clicks: 1 }),
		"H": Object.freeze({ button: "4", clicks: 2 }),
		"I": Object.freeze({ button: "4", clicks: 3 }),
		"J": Object.freeze({ button: "5", clicks: 1 }),
		"K": Object.freeze({ button: "5", clicks: 2 }),
		"L": Object.freeze({ button: "5", clicks: 3 }),
		"M": Object.freeze({ button: "6", clicks: 1 }),
		"N": Object.freeze({ button: "6", clicks: 2 }),
		"O": Object.freeze({ button: "6", clicks: 3 }),
		"P": Object.freeze({ button: "7", clicks: 1 }),
		"Q": Object.freeze({ button: "7", clicks: 2 }),
		"R": Object.freeze({ button: "7", clicks: 3 }),
		"S": Object.freeze({ button: "7", clicks: 4 }),
		"T": Object.freeze({ button: "8", clicks: 1 }),
		"U": Object.freeze({ button: "8", clicks: 2 }),
		"V": Object.freeze({ button: "8", clicks: 3 }),
		"W": Object.freeze({ button: "9", clicks: 1 }),
		"X": Object.freeze({ button: "9", clicks: 2 }),
		"Y": Object.freeze({ button: "9", clicks: 3 }),
		"Z": Object.freeze({ button: "9", clicks: 4 }),
		"*": Object.freeze({ button: "*", clicks: 1 }),
		"#": Object.freeze({ button: "#", clicks: 1 }),
	})
})


function main() {
	const output = []

	for (const line of input) {
		if (line === "") break

		output.push(
			line
				.replace(/[^A-Z0-9*#]/gi, "")
				.replace(/[A-Z]/gi, (char) => MAPPED_CHARS_DIALER_BOARD.Chars[char].button)
		)
	}

	console.log(output.join("\n"))
}

main()
