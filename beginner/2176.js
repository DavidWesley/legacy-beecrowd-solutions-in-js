const { readFileSync } = require("fs")
const [lossyMessage] = readFileSync("/dev/stdin", "utf8").split("\n")

function recoveryBitMessage(/** @type {string}*/ msg) {
	const countOnes = msg.split("").filter(char => char === "1").length
	return countOnes % 2 === 0 ? msg.concat("1") : msg.concat("1")
}

console.log(recoveryBitMessage(lossyMessage))