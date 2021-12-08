const { readFileSync } = require("fs")
const [Xstring, K, ...YstringsList] = readFileSync("/dev/stdin", "utf8").split('\n').slice(0, 7)

/**
 * @param {string} str1
 * @param {string} str2
 */
function hammingDistance(str1, str2 = str1) {
	const [longerWord, shorterWord] = str1.length >= str2.length ? [str1, str2] : [str2, str1]

	return Array
		.from(longerWord)
		.reduce((counter, char, index) => (char !== shorterWord.charAt(index) ? counter++ : counter, counter), 0)
}

function main() {
	const [minDistance, index] = [...YstringsList]
		.map((YStr, index) => [hammingDistance(Xstring, YStr), index + 1])
		.sort(([distanceA], [distanceB]) => distanceB - distanceA)
		.pop()

	if (minDistance > +K)
		console.log('-1')
	else {
		console.log(index)
		console.log(minDistance)
	}
}

main()