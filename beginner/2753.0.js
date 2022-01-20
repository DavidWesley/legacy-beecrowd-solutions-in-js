const start = 97
const output = new Array(26)

for (let i = 0; i < output.length; i++)
	output[i] = `${(start + i)} e ${String.fromCharCode(start + i)}`

console.log(output.join("\n"))