const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const numTestCases = input.shift()
const nthFibonacciList = input.map(Number)

const fibonacciList = {
  0: { call: 0, value: 0 },
  1: { call: 0, value: 1 },
  2: { call: 2, value: 1 },
}

function fibonacci(n = 0) {
  if (n < 0) return 0
  else if (n in fibonacciList) return fibonacciList[n]

  const fibA = fibonacci(n - 2)
  const fibB = fibonacci(n - 1)

  fibonacciList[n] = {
    call: (fibA !== 0 ? fibA.call + 1 : 0) + (fibB !== 0 ? fibB.call + 1 : 0),
    value: (fibA !== 0 ? fibA.value : 0) + (fibB !== 0 ? fibB.value : 0),
  }

  return fibonacciList[n]
}

function main() {
  const responses = []

  for (let [index, nthfibonacci] of Object.entries(nthFibonacciList)) {
    if (numTestCases === index) break
    const { call, value } = fibonacci(nthfibonacci)
    responses.push(`fib(${nthfibonacci}) = ${call} calls = ${value}`)
  }

  console.log(responses.join("\n"))
}

main()