const { readFileSync } = require("fs")
const [props, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const [N, P] = props.split(" ")
const sortedNames = lines.slice(0, +N).sort((a, b) => a.localeCompare(b))
const selectedName = sortedNames[+P - 1]

console.log(selectedName)