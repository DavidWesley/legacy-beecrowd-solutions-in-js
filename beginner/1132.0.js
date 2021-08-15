// @ts-nocheck

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const [firstLimit, secondLimit] = input.map((limitt) => Number.parseInt(limitt))

const isMultiple = (targetNumber, divisor = 1) => targetNumber % divisor === 0
const sumsArray = (arr = [0], initialValue = 0) => arr.reduce((acc, cur) => acc + cur, initialValue)

function orderLimits([firstLimit, secondLimit = firstLimit]) {
	const inferior = Math.min(firstLimit, secondLimit)
	const superior = Math.max(firstLimit, secondLimit)
	return [inferior, superior]
}

function getClosestMultiplesOfLimitsOfARange([minLimit, maxLimit = minLimit], divisor = 1) {
	const isAValidMultiple = (nearestMultiple) => nearestMultiple >= minLimit && nearestMultiple <= maxLimit

	const nearestFromGround = () => {
		const nearest = minLimit - (minLimit % divisor) + divisor
		const nearestGround = isAValidMultiple(nearest) ? nearest : null
		return isMultiple(minLimit, divisor) ? minLimit : nearestGround
	}

	const nearestFromCeil = () => {
		const nearest = maxLimit - (maxLimit % divisor)
		const nearestCeil = isAValidMultiple(nearest) ? nearest : null
		return isMultiple(maxLimit, divisor) ? maxLimit : nearestCeil
	}

	return [nearestFromGround(), nearestFromCeil()]
}

function getQuantityNumbersFromStepsInARange(
	firstLimit,
	secondLimit = firstLimit,
	step = 1
) {
	const ordenedLimits = orderLimits([firstLimit, secondLimit]) // @ts-ignore
	const [smallest, largest] = getClosestMultiplesOfLimitsOfARange(ordenedLimits, step)
	return 1 + (largest - smallest) / step
}

function sumPA(firstLimit, secondLimit, step = 1) {
	const sumLimits = firstLimit + secondLimit
	const multiplesQuantity = getQuantityNumbersFromStepsInARange(
		firstLimit,
		secondLimit,
		step
	)
	return (sumLimits * multiplesQuantity) / 2
}

function setMultiplesNumbersInARange(
	fLimit = 0,
	sLimit = fLimit,
	baseDivisor = 1
) {
	const [smallerMultiple, largerMultiple] =
		getClosestMultiplesOfLimitsOfARange(
			orderLimits([fLimit, sLimit]),
			baseDivisor
		)
	const intervalSize = (largerMultiple - smallerMultiple) / baseDivisor + 1

	return Array.from(
		{ length: intervalSize },
		(_, i) => smallerMultiple + baseDivisor * i
	)
}

function sumOfNonDivisibleNumbersInRange(
	firstLimit = 0,
	secondLimit = firstLimit,
	notDivisibleNumbersArr = []
) {
	const [minLimVal, maxLimVal] = orderLimits([firstLimit, secondLimit])
	const PA = sumPA(minLimVal, maxLimVal)

	let sumOfUnvailableNumbers = 0

	for (let notDivisibleNumber of notDivisibleNumbersArr) {
		const multiplesOfNotAvailableNumbersInRange =
			setMultiplesNumbersInARange(
				minLimVal,
				maxLimVal,
				notDivisibleNumber
			)
		sumOfUnvailableNumbers += sumsArray(
			multiplesOfNotAvailableNumbersInRange
		)
	}

	return PA - sumOfUnvailableNumbers
}

function main() {
	const notDivisibleNumbers = [13]
	const sum = sumOfNonDivisibleNumbersInRange(
		firstLimit,
		secondLimit,
		notDivisibleNumbers
	)
	console.log(sum)
}

main()
