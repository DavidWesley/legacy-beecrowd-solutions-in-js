const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const toInt = (value = "") => Number.parseInt(value, 10)

for (let index = 0, cityIndex = 1; index < input.length; index++) {
	if (input[index] === "") break
	if (input[index] === "0") break

	const housesList = toInt(input[index])

	const startHouseListIndex = index + 1
	const endHouseListIndex = housesList + startHouseListIndex

	// DYNAMIC VALUES - BEGIN
	const consumedList = []
	const orderResidentsByConsum = []
	let totalConsumed = 0, totalResidents = 0
	// DYNAMIC VALUES - END

	for (let i = startHouseListIndex; i < endHouseListIndex; i++, index++) { // housesByCityList
		const house = input[i] //=
		const [residents, consumed] = house.split(" ", 2).map(toInt)
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

	const formattedAverageValue = (totalConsumed / totalResidents).toFixed(4).slice(0, -2)

	const formmatedOutput = [
		`Cidade# ${cityIndex++}:`,
		`${organizeListOfConsum(consumedList, orderResidentsByConsum)}`,
		`Consumo medio: ${formattedAverageValue} m3.`
	].join("\n")

	console.log(formmatedOutput)
}

/**
 * @param {number[]} arrA
 * @param {number[]} arrB
*/

function organizeListOfConsum(arrA, arrB) {
	return [...arrA]
		.sort((a, b) => a - b)
		.map((sortedValue) => `${arrB[arrA.indexOf(sortedValue)]}-${sortedValue}`)
		.join(" ")
}