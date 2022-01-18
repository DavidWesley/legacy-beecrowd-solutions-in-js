const responses = []

for (let i = 1; i <= 9; i += 2) {
	responses.push(
		`I=${i} J=7`,
		`I=${i} J=6`,
		`I=${i} J=5`
	)
}

console.log(responses.join("\n"))