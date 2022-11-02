const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "utf8").split("\n", 1 + 1e3)

const vehicleLicensePlateFormatValidator = (plate = "") => /^[A-Z]{3}-[0-9]{4}$/.test(plate)

function main() {
	const size = Number.parseInt(N, 10)
	const output = Array.from(
		{ length: size },
		(_, index) => {
			const plate = input[index]
			if (vehicleLicensePlateFormatValidator(plate))
				switch (plate.slice(-1)) {
					case "1": case "2": return "MONDAY"
					case "3": case "4": return "TUESDAY"
					case "5": case "6": return "WEDNESDAY"
					case "7": case "8": return "THURSDAY"
					case "9": case "0": return "FRIDAY"
				}
			else return "FAILURE"
		})

	console.log(output.join("\n"))
}

main()
