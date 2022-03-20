const { readFileSync } = require("fs")
const [num] = readFileSync("/dev/stdin", "utf8").split("\n")

const esMalaSuerte = (str = "") => /13/.test(str)

console.log(`${num}${esMalaSuerte(num) ? "" : " NO"} es de Mala Suerte`)