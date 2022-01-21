const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

/**
 * @param {string} str1
 * @param {string} str2
 */

function longestCommonSubstringBetweenSingleWords(str1, str2) {
	if (str1 === str2) return str2
	if (str2.split("").some((char) => str1.includes(char)) == false) return ""

	let substr = ""
	const storage = []

	for (let i = 0; i < str2.length; i++) {
		let ind = str1.indexOf(str2[i])
		if (ind === -1) continue

		for (let j = i, k = ind; j < str2.length; j++, k++) {
			if (str2[j] === str1[k]) substr += str2[j]
			else {
				storage.push(substr)
				substr = ""
			}
		}

		storage.push(substr)
		substr = ""
	}

	return storage.sort((a, b) => b.length - a.length)[0]
}

function main() {
	const commonSubst = lines
		.slice(0, +numLines)
		.reduceRight((res, str) => longestCommonSubstringBetweenSingleWords(res, str))

	console.log(commonSubst)
}

main()