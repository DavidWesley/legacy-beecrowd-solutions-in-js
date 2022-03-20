const { readFileSync } = require("fs")
const sockets = readFileSync("/dev/stdin", "utf8").split(" ").slice(0, 4).map(value => Number.parseInt(value, 10))

const sumValues = (/** @type {number[]} */[...values], initialValue = 0) => values.reduce((acc, cur) => acc + cur, initialValue)

const totalSum = sumValues(sockets)
const availableSockets = totalSum - (sockets.length - 1)

console.log(availableSockets)