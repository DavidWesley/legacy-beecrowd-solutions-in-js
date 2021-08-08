const { readFileSync } = require('fs')
const inputs = readFileSync('./dev/stdin', 'utf8').split('\n')

let actualIndex = 0

for (const [cityIndex, properties] of Object.entries(inputs)) {
    if (inputs.length === 0) break
    else if (properties === '0') break
    else if (isNaN(+properties)) continue

    const startIndexProperties = +cityIndex + 1
    const endIndexProperties = (+properties) + startIndexProperties
    const listOfHousesByCities = inputs.slice(startIndexProperties, endIndexProperties)

    // DYNAMIC VALUES - BEGIN
    const consumedList = []
    const orderResidentsByConsum = []
    let totalConsumed = 0, totalResidents = 0
    // DYNAMIC VALUES - END

    for (const house of listOfHousesByCities) {
        const [residents, consumed] = house.split(' ').map(Number)
        const consumedByResidents = Math.floor(consumed / residents)

        totalResidents += residents
        totalConsumed += consumed

        if (consumedList.includes(consumedByResidents))
            orderResidentsByConsum[consumedList.indexOf(consumedByResidents)] += residents
        else {
            consumedList.push(consumedByResidents)
            orderResidentsByConsum.push(residents)
        }
    }

    let media = (totalConsumed / totalResidents).toFixed(4)
    media = media.substring(0, media.length - 2)

    const print = [
        `Cidade# ${++actualIndex}:`,
        organizeListOfConsum(consumedList, orderResidentsByConsum),
        `Consumo medio: ${media} m3.`
    ].join('\n')

    console.log(print)
}

/**
 * @param {number[]} arr1
 * @param {number[]} arr2
*/

function organizeListOfConsum(arr1 = [], arr2 = []) {
    const arrK = [...arr1]
    const sorted = arrK.sort((a, b) => a - b)
    const list = arrK.map((_, index, arr) => {
        return `${arr2[arr1.indexOf(sorted[index])]}-${arr[index]}`
    })
    return list.join(' ')
}
