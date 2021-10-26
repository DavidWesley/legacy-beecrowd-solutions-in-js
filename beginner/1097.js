const responses = []

for (let i = 1, j = 5; i <= 9; i += 2, j += 2) {
	responses.push(
		`I=${i} J=${j + 2}`,
		`I=${i} J=${j + 1}`,
		`I=${i} J=${j}`
	)
}

console.log(`${responses.join("\n")}`)