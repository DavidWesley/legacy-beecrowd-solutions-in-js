const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

for (
	let instanceIndex = 1, has = false;
	input.length > 0;
	instanceIndex++, has = false
) {
	const intQuantities = Number.parseInt(input.shift(), 10)
	if (isNaN(intQuantities)) break

	const intengerList = input.shift().split(" ", intQuantities)
	console.log("Instancia %d", instanceIndex)

	for (let index = 0, sum = 0; index < intengerList.length; index++) {
		const intValue = Number.parseInt(intengerList[index], 10)

		if (sum === intValue) {
			console.log(`${intValue}\n`)
			has = true
			break
		}

		sum += intValue
	}

	if (has == false) console.log("nao achei\n")
}