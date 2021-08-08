const { readFileSync } = require('fs')
const inputs = readFileSync('./dev/stdin', 'utf8').split('\n')

const responses = []
const [numTestCases, ...cases] = inputs

for (let index = 0; cases.length > 0; index++) {
    if (index === Number(numTestCases)) break

    const [roles, keys] = cases.splice(0, 2)
    const hashTable = createHashTable([roles, keys])

    const ordenedhashTable = organizehashTable(hashTable) // Desnecessary Function
    const formatedHashTable = formathashTableToPrint(ordenedhashTable)
    responses.push(`${formatedHashTable}`)
}

function createHashTable([roles, allKeys]) {
    const [mod] = roles.split(' ').map(Number)
    const keys = allKeys.split(' ').map(Number)

    const objKeys = createKeysObjetctValues(mod, [])

    for (const key of keys) {
        const disp = dispersion(key, mod)
        const thisArr = objKeys[disp]

        objKeys[disp] = [...thisArr, key]
    }

    return objKeys
}

function createKeysObjetctValues(size, defaultStartValue = null, frozen = false) {
    const arr = Array(size).fill(defaultStartValue)
    const obj = Object.fromEntries(Object.entries(arr))

    return frozen ? Object.freeze(obj) : obj
}

function dispersion(keyValue, modulus) {
    return keyValue % modulus
}

function organizehashTable(hashTable) {
    // for (const dispersionIndex in hashTable) {
    //     const thisProp = hashTable[dispersionIndex].sort((a, b) => a - b)
    //     hashTable[dispersionIndex] = [...thisProp]
    // }

    return hashTable
}

function formathashTableToPrint(hashTable) {
    const print = []
    for (const [dispersionIndex, values] of Object.entries(hashTable)) {
        const message = [dispersionIndex, ...values]
        print.push(message.join(" -> ").concat(" -> \\"))
    }

    return print.join("\n")
}

console.log(responses.join('\n\n'))