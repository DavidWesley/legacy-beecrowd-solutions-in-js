const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function countOperations(operations = '', type, size = 1) {
	const reg = new RegExp(`${type}{1,${size}}`, `gi`)
	return operations.replace(reg, type).length
}

function main() {
	const responses = []

	while (input.length > 0) {
		const processes = input.shift()
		const simultaneousProcessesSize = input.shift() 

		if (processes === '' || simultaneousProcessesSize === '') break // EOFile Condition

		responses.push(countOperations(processes, 'R', +simultaneousProcessesSize))
	}

	console.log(`${responses.join('\n')}`)
}

main()