const output = []

const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

for (let i = 0, j = 1.0; i <= 2.0; i += 0.2, j += 0.2) {
	output.push(
		`I=${Float(i, 1)} J=${Float(j + 0, 1)}`,
		`I=${Float(i, 1)} J=${Float(j + 1, 1)}`,
		`I=${Float(i, 1)} J=${Float(j + 2, 1)}`,
	)
}

console.log(output.join("\n"))