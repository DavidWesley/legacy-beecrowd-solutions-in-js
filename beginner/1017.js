const { readFileSync } = require("fs")

const [time, velocity] = readFileSync("/dev/stdin", "utf8").split('\n').slice(0, 2).map(Number.parseFloat)

function consumeGas(t, v) {
	const consumDefault = 12
	const consum = (t * v) / consumDefault
	return consum
}

function main() {
	const consum = consumeGas(time, velocity).toFixed(3)
	console.log(consum)
}

main()