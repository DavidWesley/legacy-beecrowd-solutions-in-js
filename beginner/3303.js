const { readFileSync } = require("fs")
const [word] = readFileSync("/dev/stdin", "utf8").split("\n")

const getWordType = (str = "") => str.length >= 10 ? "palavrao" : "palavrinha"

console.log(getWordType(word))