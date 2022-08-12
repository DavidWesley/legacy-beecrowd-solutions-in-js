const { readFileSync } = require("fs")
const [state] = readFileSync("/dev/stdin", "utf8").split("\n", 1).map(s => s.toLowerCase())

const BRAZILLIAN_STATES_OF_NORTH_REGION = ["acre", "amapa", "amazonas", "para", "rondonia", "roraima", "tocantins"]

console.log(
	BRAZILLIAN_STATES_OF_NORTH_REGION.includes(state) ? "Regiao Norte" : "Outra regiao"
)