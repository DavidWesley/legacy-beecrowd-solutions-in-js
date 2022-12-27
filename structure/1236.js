const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "ascii").split("\n")

/** @param { string | number } value */
function print(value) {
	let buffer

	if (typeof value === "string") buffer = Buffer.from(value, "ascii")
	else if (typeof value === "number" && Number.isSafeInteger(value)) buffer = Buffer.from([value])
	// else if (Array.isArray(value)) buffer = Buffer.from(value.join(""), "ascii")

	process.stdout.write(buffer)
}

function main() {
	for (let i = 0, j = 0; i < Number.parseInt(N, 10); i += 1, j = 0) {
		const str = input.at(i).substring(0, 2000)

		while (j < str.length) {
			switch (str.charAt(j)) {
				case "0": {
					let count = 0
					while (str.charAt(j) == "0" && count < 255) { j++; count++ }
					if (count > 2) { print("#"); print(count) }
					else { print("0".repeat(count)) }
					break
				}
				case " ": {
					let count = 0
					while (str.charAt(j) == " " && count < 255) { j++; count++ }
					if (count > 2) { print("$"); print(count) }
					else { print(" ".repeat(count)) }
					break
				}
				default:
					print(str.charAt(j++)); break
			}
		}

		print("\n")
	}
}

main()
