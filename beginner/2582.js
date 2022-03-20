const { readFileSync } = require("fs")
const [numTestCases, ...btnsPressedsList] = readFileSync("/dev/stdin", "utf8").split("\n")


const SystemOfADownloadMusicsList = Object.freeze(
	new Map([
		[0, "PROXYCITY"],
		[1, "P.Y.N.G."],
		[2, "DNSUEY!"],
		[3, "SERVERS"],
		[4, "HOST!"],
		[5, "CRIPTONIZE"],
		[6, "OFFLINE DAY"],
		[7, "SALT"],
		[8, "ANSWER!"],
		[9, "RAR?"],
		[10, "WIFI ANTENNAS"]
	])
)


function main() {
	const responses = []

	const btnsPressedsValues = btnsPressedsList.slice(0, +numTestCases).map(
		btnsPresseds => btnsPresseds
			.split(" ")
			.map(num => Number.parseInt(num, 10))
	)

	btnsPressedsValues.forEach(([firstBTNValue, secondBTNValue = 0]) => {
		responses.push(
			SystemOfADownloadMusicsList.get(firstBTNValue + secondBTNValue)
		)
	})

	console.log(responses.join("\n"))
}

main()