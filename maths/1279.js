const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function isLeapYear(year = "") {
	if (Number(year.substr(-4)) % 400 === 0) return true
	else if (year.substr(-2) !== "00" && Number(year.substr(-2)) % 4 === 0) return true
	else return false
}

function isHuluculuYear(year = "") {
	return (
		["0", "5"].includes(year.substr(-1)) && [...year].reduce((sum, digit) => sum + Number(digit), 0) % 3 === 0
	)
}

function isBulukuluYear(year = "") {
	let left = 0, right = 0

	if (isLeapYear(year)) {
		[...year].forEach((value, index) => {
			if (index % 2 === 0) left += Number(value)
			else right += Number(value)
		})

		return Math.abs((right - left) % 11) === 0
	}

	return false
}

function main() {
	const responses = []

	for (const year of input) {
		if (year === "") break // EOFile Condition Verification

		const messages = []

		if (isLeapYear(year)) messages.push("This is leap year.")
		if (isHuluculuYear(year)) messages.push("This is huluculu festival year.")
		if (isBulukuluYear(year)) messages.push("This is bulukulu festival year.")

		if (messages.length === 0) messages.push("This is an ordinary year.")

		responses.push(messages.join("\n"))
	}

	console.log(responses.join("\n\n"))
}

main()