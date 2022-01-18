const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

/**
 * @param {number | string} hours
 * @param {number | string} mins
 */
const formaSingleTime = (hours = "0", mins = "0") => `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`

function main() {
	const responses = lines.slice(0, +numCases).map(([H, M, bool]) => {
		const doorState = bool != "0" ? "abriu" : "fechou"
		return `${formaSingleTime(H, M)} - A porta ${doorState}!`
	})

	console.log(responses.join("\n"))
}

main()