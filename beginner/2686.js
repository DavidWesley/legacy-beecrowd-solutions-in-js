const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(Number.parseFloat)

const TIME_UNITS = {
	get MILLISECOND() { return 1 },
	get SECOND() { return 1000 * this.MILLISECOND },
	get MINUTE() { return 60 * this.SECOND },
	get HOUR() { return 60 * this.MINUTE },
	get DAY() { return 24 * this.HOUR },
	//...
}

function formatTimeDurationToParts(duration = 0) {
	const hours = Math.floor(duration / 3600)
	const minutes = Math.floor(duration / 60) % 60
	const seconds = duration % 60

	return [hours, minutes, seconds]
}

function main() {
	const output = []

	for (let angle of input) {
		if (Number.isNaN(angle)) break // EOF

		angle %= 360

		if (0 <= angle && angle < 90) output.push("Bom Dia!!")
		else if (90 <= angle && angle < 180) output.push("Boa Tarde!!")
		else if (180 <= angle && angle < 270) output.push("Boa Noite!!")
		else if (270 <= angle && angle < 360) output.push("De Madrugada!!")

		output.push(
			formatTimeDurationToParts(Math.round(((angle + 90) % 360) / 360 * (TIME_UNITS.DAY / TIME_UNITS.SECOND)))
				.map(t => t.toString(10).padStart(2, "0"))
				.join(":")
		)
	}

	console.log(output.join("\n"))
}

main()
