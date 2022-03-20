const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const FuelCodesEnum = {
	1: "Alcool",
	2: "Gasolina",
	3: "Diesel",
}

const endPointCode = "4"
const isValidFuelCode = (code = "") => Reflect.has(FuelCodesEnum, code)

function main() {
	const fuelTypeNamesObj = Object.fromEntries(
		Object.values(FuelCodesEnum).map(fuelTypeName => [`${fuelTypeName}`, 0])
	)

	for (const code of input)
		if (code === endPointCode) break
		else if (isValidFuelCode(code)) fuelTypeNamesObj[FuelCodesEnum[code]]++

	const responses = Object.entries(fuelTypeNamesObj).map(
		([fuelType, quantity]) => `${fuelType}: ${quantity}`
	)

	console.log(responses.join("\n"))
	console.log("MUITO OBRIGADO")
}

main()