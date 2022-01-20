const start = 97
const output = Array.from({ length: 26 }, (_, i) => `${(start + i)} e ${String.fromCharCode(start + i)}`)

console.log(output.join("\n"))