const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split('\n').shift()

function formatDuration(dur) {
	let s = (dur % 60)
	let m = ((dur - s) / 60) % 60
	let h = ((dur - m * 60 - s) / 3600)

	return `${h}:${m}:${s}`
}

function main() {
	const duration = Number.parseInt(input, 10)
	const formattedDur = formatDuration(duration)

	console.log(formattedDur)
}

main()