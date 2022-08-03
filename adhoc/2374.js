const { readFileSync } = require("fs")
const [desiredPressure, pressureRead] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map((pressure) => Number.parseInt(pressure, 10))

const pressureDifference = desiredPressure - pressureRead

console.log(pressureDifference)