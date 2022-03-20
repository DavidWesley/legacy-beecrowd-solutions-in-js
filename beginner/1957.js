const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split("\n")

const ConvertBase = (num) => ({
	from: (baseFrom) => ({
		to: (baseTo) => parseInt(num, baseFrom).toString(baseTo)
	})
})

const hexString = ConvertBase(num).from(10).to(16).toUpperCase()

console.log(hexString)