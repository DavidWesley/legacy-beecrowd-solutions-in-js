const { readFileSync } = require("fs")
const [E, D] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map((date) => Number.parseInt(date, 10))

if (E > D) {
	console.log("Eu odeio a professora!")
} else if (E <= D - 3) {
	console.log("Muito bem! Apresenta antes do Natal!")
} else {
	console.log("Parece o trabalho do meu filho!")

	if (E + 2 < 24) console.log("TCC Apresentado!")
	else console.log("Fail! Entao eh nataaaaal!")
}