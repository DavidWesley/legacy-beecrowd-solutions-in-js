const responses = []

for (let i = 1, j = 60; j >= 0; j -= 5, i += 3) {
	responses.push(`I=${i} J=${j}`)
}

console.log(`${responses.join('\n')}`)