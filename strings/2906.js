const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

/** @typedef {string} EmailType */

/** @param {EmailType[]} emailList */

function getUniqueEmails(emailList) {
	return new Set(
		emailList.map(
			email => email.replace(
				/([\w.]+)(\+[\w.]+)?(?=@)/,
				(_, g1) => g1.replace(/\W/g, "")
			)
		)
	)
}

function main() {
	const emails = lines.slice(0, +numLines)
	const uniqueEmails = getUniqueEmails(emails)

	console.log(uniqueEmails.size)
}

main()