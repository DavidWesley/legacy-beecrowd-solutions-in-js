/*
	Este código não segue os padrões de estilo dos demais arquivos
	Já que, por se tratar de uma problema que requer multiplas otimizações
	Alguns recursos da linguagem tiveram que ser evitados, como o parse sem ponto-e-virgula.

	-> CASO FOR COPIAR ISSO, SEJA EDUCADO(A), AVISE-ME PREVIAMENTE
	-> SUBMETA O CÓDIGO SEM OS COMENTÁRIOS (por questões de perfomance)
*/

const { createReadStream } = require("fs");
const { createInterface } = require("readline");

// Pode ser "ascii" ou "utf8"
// "utf8" parece mais rápido
const ENCODING = "utf8";
const PATH = "/dev/stdin";

/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */

function createReadLineInterface(path, encoding) {
	return createInterface({
		input: createReadStream(path, encoding),
		crlfDelay: Infinity,
		terminal: false
	});
}

const RLI = createReadLineInterface(PATH, ENCODING);

const nextLine = (function () {
	const nextLineGen = (async function* () {
		for await (const line of RLI) {
			yield line.split(" ").map(Number.parseFloat);
		}
	})();

	return async () => (await nextLineGen.next()).value;
})();

const main = async function () {
	// Número de caso de teste
	// equivalente ao tamanho do array
	// que será usado para impressão
	const size = Number.parseInt((await nextLine())[0], 10);

	// Criar um array in memory é mais rápido
	// do que incrementar seu tamanho com o `.push` method
	const output = new Array(size);

	for (let i = 0; i < size; i++) {
		// Desnecessário, para otimização,
		// pode-se evitar atribuir essa linha a alguma variável
		await nextLine()

		output[i] = await nextLine();
	}

	for (let i = 0; i < size; i++) {
		// Nenhuma implementação hard-coded
		// será mais perfomático que o método de
		// sort nativo da própria linguagem
		output[i] = output[i].sort((a, b) => a - b).join(" ");
	}

	console.log(output.join("\n"));
};

main();