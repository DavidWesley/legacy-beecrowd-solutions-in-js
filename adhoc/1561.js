const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {string} time
 * @description Must have the 00:00 Time Format
*/

function binaryClockMask(time = "00:00") {
	const o = (num = 0, spacing = 1, maskLen = 0) => {
		return Number(num)
			.toString(2)
			.padStart(maskLen, "0")
			.split("")
			.map((d) => (d === "1" ? "o" : " "))
			.join(" ".repeat(spacing))
	}

	const [, hour, min] = time.match(/(\d{1,2}):(\d{1,2})/).map((t) => Number.parseInt(t, 10))

	const BINARY_CLOCK_MASK =
		` ____________________________________________
|                                            |
|    ____________________________________    |_
|   |                                    |   |_)
|   |   8         4         2         1  |   |
|   |                                    |   |
|   |   ${o(hour, 9, 4)}  |   |
|   |                                    |   |
|   |                                    |   |
|   |   ${o(min, 5, 6)}  |   |
|   |                                    |   |
|   |   32    16    8     4     2     1  |   |_
|   |____________________________________|   |_)
|                                            |
|____________________________________________|
`
	return BINARY_CLOCK_MASK
}

function main() {
	const responses = []

	for (const time of input)
		if (time == "") break
		else responses.push(binaryClockMask(time))

	console.log(responses.join("\n"))
}

main()