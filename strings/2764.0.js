const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")[0].split("/")

function main() {
	const [day, month, year] = input.slice(0, 3)

	const responses = [
		`${month}/${day}/${year}`, // MM/DD/AA
		`${year}/${month}/${day}`, // AA/MM/DD
		`${day}-${month}-${year}` // DD-MM-AA
	]

	console.log(responses.join("\n"))
}

main()
