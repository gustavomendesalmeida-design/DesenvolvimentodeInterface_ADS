// Aula 1: variáveis, operadores e entrada de dados (Console)

// Entrada de dados: prompt devolve texto, então convertemos com Number()
const numero1 = Number(prompt("Digite o primeiro número:"));
const numero2 = Number(prompt("Digite o segundo número:"));

// Operadores aritméticos
const soma = numero1 + numero2;
const subtracao = numero1 - numero2;
const multiplicacao = numero1 * numero2;
const divisao = numero1 / numero2;
const resto = numero1 % numero2;

// Saída no console
console.log("=== Calculadora simples ===");
console.log(`${numero1} + ${numero2} = ${soma}`);
console.log(`${numero1} - ${numero2} = ${subtracao}`);
console.log(`${numero1} * ${numero2} = ${multiplicacao}`);
console.log(`${numero1} / ${numero2} = ${divisao}`);
console.log(`${numero1} % ${numero2} = ${resto}`);
