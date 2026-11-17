// Aula 3: DOM, eventos, formulário e mensagens

const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");

function classificar(media) {
  if (media >= 7) return { texto: "Aprovado", classe: "aprovado" };
  if (media >= 5) return { texto: "Recuperação", classe: "recuperacao" };
  return { texto: "Reprovado", classe: "reprovado" };
}

function mostrarMensagem(texto, classe) {
  mensagem.textContent = texto;
  mensagem.className = classe;
  mensagem.style.display = "block";
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita recarregar a página

  const nome = document.getElementById("nome").value.trim();
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);

  // Validação
  if (nome === "") {
    mostrarMensagem("Digite o nome do aluno.", "erro");
    return;
  }
  if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
    mostrarMensagem("As notas devem estar entre 0 e 10.", "erro");
    return;
  }

  const media = (nota1 + nota2) / 2;
  const resultado = classificar(media);

  mostrarMensagem(`${nome}: média ${media.toFixed(1)} - ${resultado.texto}`, resultado.classe);

  // Adiciona ao histórico
  const item = document.createElement("li");
  item.textContent = `${nome} - ${media.toFixed(1)} - ${resultado.texto}`;
  lista.appendChild(item);

  formulario.reset();
});
