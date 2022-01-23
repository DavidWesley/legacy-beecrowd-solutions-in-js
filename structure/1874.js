const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map((num) => Number.parseInt(num, 10)))

while (input.length > 0) {
	const [H, P, F] = input.shift()

	if ([H, P, F].includes(0)) break

	const stacks = input.splice(0, H)
	const treadMill = input.shift()

	for (let stacksIndex = P - 1; stacksIndex >= 0; stacksIndex--) {
		if (treadMill.length == 0) break

		for (let stacksLevel = H - 1; stacksLevel >= 0; stacksLevel--) {
			if (treadMill.length == 0) break
			else if (stacks[stacksLevel][stacksIndex] == 0)
				stacks[stacksLevel][stacksIndex] = treadMill.shift()
		}
	}

	const resp = []
	for (const level of stacks) resp.push(level.join(" "))

	console.log(resp.join("\n"))
}
