const media = []

function main() {
	for (let i = 2; i <= 100; i += 2) media.push(i)
	console.log(media.join("\n"))
}

main()