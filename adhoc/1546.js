const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const FeedbackTypeCode = {
	1: "Elogios",
	2: "Bugs",
	3: "Duvidas",
	4: "Sugestoes"
}

const FeedbackTypeMember = {
	Elogios: "Rolien",
	Bugs: "Naej",
	Duvidas: "Elehcim",
	Sugestoes: "Odranoel"
}

function main() {
	const responses = []

	let j = +numLines
	let i = 0

	while (j--) {
		let numFeedbacks = +lines[i++]

		while (numFeedbacks--) {
			const code = lines[i++]
			const type = FeedbackTypeCode[code]
			const memberName = FeedbackTypeMember[type]

			responses.push(memberName)
		}
	}

	console.log(responses.join("\n"))
}

main()