const { readFileSync } = require("node:fs")
const [C, ...input] = readFileSync("/dev/stdin", "utf8")
  .split(/\s+/, 1000 + 1)
  .map((value) => Number.parseInt(value, 10))

function main() {
  let candidatesAttendedCounter = 0

  for (let index = 0; index < C; index += 1)
    if (input[index] === 1)
      candidatesAttendedCounter += 1

  console.log(candidatesAttendedCounter)
}

main()