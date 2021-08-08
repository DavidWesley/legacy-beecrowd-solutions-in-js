// let j, z = 1, n = 15
// const b = Array(n).fill(0).reduce((acc) => {
//     z > n ? j = j - 2 : j = z
//     z += 2
//     const spaces = ' '.repeat((n - j) / 2)
//     const stars = '*'.repeat(j) + '\n'
//     return `${acc}${spaces}${stars}`
// }, '\n')

// const { readFileSync } = require("fs")
// const sizes = readFileSync("./dev/stdin", "utf8").split('\n').map(size => parseInt(size))

Array(Math.round(12 / 2)).fill('\n').forEach((line, index, arr) => {
	let len = arr.length //=
	let rep = index * 2 + 1

	let stars = '*'.repeat(rep) //=
	let spaces = ' '.repeat(Math.floor(len - rep / 2)) //=

	// Math.foor(len - rep / 2) //=
	console.log(`${spaces}${stars}\n`)
	// `${spaces}${starts}\n`)
})

// function main() {
// 	const responses = []


// 	console.log(responses.join('\n'))
// }

// main()