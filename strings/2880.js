const { readFileSync } = require("fs")
const [cipheredMessage, crib] = readFileSync("/dev/stdin", "utf8").split("\n", 2)


function countValidsCribPositions(message = "", crib = "") {
	let count = 0

	for (let i = 0; i <= message.length - crib.length; i += 1) {
		let size = 0

		for (let j = 0; j < crib.length; j += 1)
			if (message.charAt(i + j) !== crib.charAt(j))
				size += 1

		if (size === crib.length) count += 1
	}

	return count
}


console.log(countValidsCribPositions(cipheredMessage, crib))
