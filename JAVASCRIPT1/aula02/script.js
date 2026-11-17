// Aula 2: funções, condicionais, validação e repetição (Console)

// Função de validação: repete até o usuário digitar uma nota válida (0 a 10)
function lerNota(mensagem) {
  let nota;
  do {
    nota = Number(prompt(mensagem));
    if (isNaN(nota) || nota < 0 || nota > 10) {
      console.log("Nota inválida! Digite um valor entre 0 e 10.");
    }
  } while (isNaN(nota) || nota < 0 || nota > 10);
  return nota;
}

// Função com condicionais: classifica a média
function classificar(media) {
  if (media >= 7) {
    return "Aprovado";
  } else if (media >= 5) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

// Programa principal: repete para vários alunos
let continuar = true;
while (continuar) {
  const nome = prompt("Nome do aluno:");
  const nota1 = lerNota("Digite a nota 1:");
  const nota2 = lerNota("Digite a nota 2:");
  const media = (nota1 + nota2) / 2;

  console.log(`${nome}: média ${media.toFixed(1)} → ${classificar(media)}`);

  continuar = confirm("Deseja classificar outro aluno?");
}
console.log("Fim do programa.");
