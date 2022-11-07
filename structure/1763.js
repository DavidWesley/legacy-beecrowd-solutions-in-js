const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const ChristmasMessagesFromCountries = {
	"brasil": "Feliz Natal!",
	"alemanha": "Frohliche Weihnachten!",
	"austria": "Frohe Weihnacht!",
	"coreia": "Chuk Sung Tan!",
	"espanha": "Feliz Navidad!",
	"grecia": "Kala Christougena!",
	"estados-unidos": "Merry Christmas!",
	"inglaterra": "Merry Christmas!",
	"australia": "Merry Christmas!",
	"portugal": "Feliz Natal!",
	"suecia": "God Jul!",
	"turquia": "Mutlu Noeller",
	"argentina": "Feliz Navidad!",
	"chile": "Feliz Navidad!",
	"mexico": "Feliz Navidad!",
	"antardida": "Merry Christmas!",
	"canada": "Merry Christmas!",
	"irlanda": "Nollaig Shona Dhuit!",
	"belgica": "Zalig Kerstfeest!",
	"italia": "Buon Natale!",
	"libia": "Buon Natale!",
	"siria": "Milad Mubarak!",
	"marrocos": "Milad Mubarak!",
	"japao": "Merii Kurisumasu!",
}

function main() {
	const output = []

	for (const country of input) {
		if (country === "") break // EOFile

		output.push(
			Object.hasOwn(ChristmasMessagesFromCountries, country)
				? ChristmasMessagesFromCountries[country]
				: "--- NOT FOUND ---",
		)
	}

	console.log(output.join("\n"))
}

main()
