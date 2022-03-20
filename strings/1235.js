const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function decodeScrambledString(scrambledStr = "") {
	scrambledStr = [...scrambledStr].reverse().join("")
	const mid = Math.floor(scrambledStr.length / 2)

	const lef = scrambledStr.substring(mid)
	const rig = scrambledStr.substring(0, mid)

	return `${lef}${rig}`
}

function main() {
	const responses = lines.slice(0, +numLines).map(decodeScrambledString)
	console.log(responses.join("\n"))
}

main()