const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(lines => lines.split(" "))

const { format } = new Intl.NumberFormat("en-US", {
	useGrouping: false,
	minimumIntegerDigits: 2,
	style: "decimal",
})

const FULL_BACK_ANGLE = 360
const HOUR_ANGLE = FULL_BACK_ANGLE / 12
const MINUTE_ANGLE = FULL_BACK_ANGLE / 60

function main() {
	const responses = []

	for (const [H, M] of input) {
		if (H == "" || M == "") break // EOFile Condition
		const hours = (+H % FULL_BACK_ANGLE) / HOUR_ANGLE
		const minutes = (+M % FULL_BACK_ANGLE) / MINUTE_ANGLE

		responses.push(`${format(hours)}:${format(minutes)}`)
	}

	console.log(responses.join("\n"))
}

main()