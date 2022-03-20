"use strict"

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(line => Number.parseInt(line, 10))

input.pop() // Remove EOF

const error = input.find((value, index, arr) => value > arr[index + 1]) || input[input.length - 1]
console.log(error + 1)