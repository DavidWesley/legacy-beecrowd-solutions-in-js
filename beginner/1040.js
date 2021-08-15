const { readFileSync } = require("fs")
const notas = readFileSync("/dev/stdin", "utf8").split('\n')

const [N1, N2, N3, N4] = notas.shift().split(' ').map(parseFloat)
const N5 = parseFloat(notas.shift()) || 0

function media(a, b, c, d) {
    return (a * 2 + b * 3 + c * 4 + d * 1) / 10
}

function studentStatus(media) {
    if (media >= 7.0)
        console.log('Aluno aprovado.')
    else if (media >= 5.0) {
        console.log('Aluno em exame.')
        console.log(`Nota de exame: ${N5.toFixed(1)}`)

        const lastMed = (N5 + media) / 2.0

        if (lastMed > 5.0) console.log('Aluno aprovado.')
        else console.log('Aluno reprovado.')

        console.log(`Media Final: ${lastMed.toFixed(1)}`)
    }
    else
        console.log('Aluno reprovado.')
}

function main() {
    let med = media(N1, N2, N3, N4)
    console.log(`Media: ${med.toFixed(1)}`)
    studentStatus(med)
}

main()