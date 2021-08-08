const { readFileSync, writeFileSync } = require("fs")

const words = readFileSync("./dev/stdin", "utf8").split('\n')
const wordsInLowerCase = words.map(word => word.toLowerCase()).sort((a, b) => a.localeCompare(b, 'pt-BR'))
const wordsSorted = Array(...wordsInLowerCase).sort((a, b) => b.length - a.length)

const wordsSized = wordsSorted.map(w => `${w.length} ${w} ${w.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()}`)

writeFileSync("./dev/res", String(wordsSized.join('\n')))