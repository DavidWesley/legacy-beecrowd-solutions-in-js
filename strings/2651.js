const { readFileSync } = require("fs")
const wordInput = readFileSync("/dev/stdin", "utf8").split("\n").shift()

function linkMoodFromSurname(surnameLink) {
	const surname = String(surnameLink).toLowerCase()
	return `Link ${surname.includes("zelda") ? "Bolado" : "Tranquilo"}`
}

console.log(linkMoodFromSurname(wordInput))