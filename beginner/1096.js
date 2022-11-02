const output = []

for (let i = 1; i <= 9; i += 2) {
	output.push(
		`I=${i} J=7`,
		`I=${i} J=6`,
		`I=${i} J=5`
	)
}

console.log(output.join("\n"))
