const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(line => line.split(" "))

const output = []

while (input.length > 0) {
	const [A, D] = input.shift()

	if (+A == 0 || +D == 0) break
	if (isNaN(+A) || isNaN(+D)) break

	const aluminisList = new Array(+A).fill(true)
	const dinnersList = input.splice(0, +D).map(dinner => dinner.slice(0, +A))

	for (const dinner of dinnersList) {
		for (let index = 0; index < dinner.length; index++) {
			if (aluminisList[index] == false) continue
			else if (dinner[index] == "0") aluminisList[index] = false
		}
	}

	output.push(aluminisList.includes(true) ? "yes" : "no")
}

console.log(output.join("\n"))