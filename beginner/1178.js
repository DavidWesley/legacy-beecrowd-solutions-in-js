const { readFileSync } = require("fs")

let [value] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(Number)

const FormatFractionNumber = new Intl.NumberFormat("en-US", {
	style: "decimal",
	minimumFractionDigits: 4,
	maximumFractionDigits: 4,
	useGrouping: false,
})

const ARR_SIZE = 100
const output = new Array(ARR_SIZE).fill(0.00)

for (let index = 0; index < output.length; index++) {
	output[index] = `N[${index}] = ${FormatFractionNumber.format(value)}`
	value /= 2.0000
}

console.log(output.join("\n"))