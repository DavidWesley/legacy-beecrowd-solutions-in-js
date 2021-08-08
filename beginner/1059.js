const responses = []

function main() {
    for (let i = 2; i <= 100; i+= 2) responses.push(i)
    console.log(responses.join('\n'))
}

main()