const { readFileSync } = require("node:fs")
const [N] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

function calcWaterBillValue(consumption = 0) {
	if (consumption <= 10) return 7
	else if (10 < consumption && consumption <= 30) return (consumption - 10) * 1 + 7
	else if (30 < consumption && consumption <= 100) return (consumption - 30) * 2 + 20 + 7
	else if (consumption > 100) return (consumption - 100) * 5 + 140 + 20 + 7
}

console.log(calcWaterBillValue(N))
