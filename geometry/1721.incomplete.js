/**
 Ulm 48.700 10.500
Freiburg 47.700 9.500
Philadelphia 39.883 -75.250
SanJose 37.366 -121.933
Atlanta 33 -84
Eindhoven 52 6
Orlando 28 -82
Vancouver 49 -123
Honolulu 22 -157
NorthPole 90 0
SouthPole -90 0
#
Ulm Freiburg Philadelphia
SanJose Atlanta Eindhoven
Orlando Vancouver Honolulu
NorthPole SouthPole NorthPole
Ulm SanDiego Orlando
NorthPole SouthPole SouthPole
Ulm Honolulu SouthPole
#
* */

const path = require("path")
const stdin = path.join(__dirname, "..", "dev", "stdin")

const { readFileSync } = require("fs")
const [coordenates, places] = readFileSync(stdin, "utf8").split("#")
// const input = readFileSync("../dev/stdin", "utf8").split('\n')

const RADIUS_EARTH = 6378

function splitList(multineString = "") {
	return multineString
		.trim()
		.split("\n")
		.map((line) => line.split(" "))
}

function distanceBetweenPlaces(places = ['', '', ''], coordList) {
	if (places.every(place => coordList.has(place))) return 0
	// 	TODO: PRECISO CALCULAR A DISTÂNCIA
	return NaN
}

function message([A, B, M] = ['', '', ''], dist) {
	return `${M} is ${Number.isInteger(dist) ? dist : '?'} km off ${A}\/${B} equidistance.`
}

function main() {

	const responses = []

	const coordenatesList = splitList(coordenates).reduce((list, [place, lo, la]) => {
		return list.set(place, {
			longitude: Number.parseFloat(lo),
			latitude: Number.parseFloat(la),
		})

	}, new Map())

	const placesList = splitList(places)

	placesList.forEach(places => {
		const dist = distanceBetweenPlaces(places, coordenatesList)
		const msg = message(places, dist)

		responses.push(msg)
	})

	console.log(`${responses.join("\n")}`)
}

main()


/**

Ulm 48.700 10.500

Freiburg 47.700 9.500

Philadelphia 39.883 - 75.250
* /


/**
R = earth’s radius (mean radius = 6,371km)
Δlat = lat2− lat1
Δlong = long2− long1
a = sin²(Δlat/2) + cos(lat1).cos(lat2).sin²(Δlong/2)
c = 2.atan2(√a, √(1−a))
d = R.c
 */