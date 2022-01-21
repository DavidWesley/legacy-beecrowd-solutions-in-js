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
	let longest = ""

	for (let i = 0; i < str2.length; i++) {
		let of = str1.indexOf(str2[i])
		if (of === -1) continue

		for (let j = i, k = of; j < str2.length; j++, k++) {
			if (str2[j] === str1[k]) substr += str2[j]
			else {
				if (substr.length > longest.length) longest = substr
				substr = ""
			}
		}

		if (substr.length > longest.length) longest = substr
		substr = ""
	}

	return longest
}

function main() {
	const commonSubst = lines
		.slice(0, +numLines)
		.reduceRight((res, str) => longestCommonSubstringBetweenSingleWords(res, str))

	console.log(commonSubst)
}

main()