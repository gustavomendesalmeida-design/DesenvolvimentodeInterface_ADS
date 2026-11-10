const log = console.log;

const [nome, email, idade, ativo, anoNasc] = ["Lucas Ferreira", "lucas@email.com", 24, true, 2002];
log("Lab 1:", nome, email, idade, ativo, "| Idade em 2026:", 2026 - anoNasc);

const [aluno, mat, curso, per, sit] = ["João", "20261001", "ADS", 2, "Ativo"];
const [preco, qtd, desc] = [150.0, 3, 200.0 * 0.15];
log("Ex1 (Cadastro):", aluno, mat, curso, per, sit);
log("Ex2 (Total):", preco * qtd, "| Ex3 (Desconto e Final):", desc, 200.0 - desc);
log("Ex4 (Idade 20):", 20>18, 20<18, 20===18, 20>=18);
log("Ex5 (Lógicos):", 22>=18 && true, true || true, !true);
log("Ex6 (10 é par?):", 10 % 2 === 0);

document.getElementById("btnCalcular").addEventListener("click", () => {
    const v1 = document.getElementById("numero1").value;
    const v2 = document.getElementById("numero2").value;
    const res = document.getElementById("resultado");
    
    if (!v1 || !v2) return res.textContent = "Erro: Preencha os dois números.";
    
    const [n1, n2] = [Number(v1), Number(v2)];
    const div = n2 === 0 ? "Erro (div por zero)" : n1 / n2;
    
    res.innerHTML = `<p>Soma: ${n1+n2} | Sub: ${n1-n2} | Mult: ${n1*n2} | Div: ${div}</p>`;
});

document.getElementById("calcular").addEventListener("click", () => {
    const notas = [1, 2, 3].map(i => document.getElementById(`nota${i}`).value);
    const res = document.getElementById("resultadoMedia");
    
    if (notas.some(n => n === "")) return res.textContent = "Erro: Preencha todas as notas.";
    
    const numNotas = notas.map(Number);
    if (numNotas.some(n => n < 0 || n > 10)) return res.textContent = "Erro: Notas entre 0 e 10.";
    
    const media = numNotas.reduce((soma, nota) => soma + nota, 0) / 3;
    res.innerHTML = `<p><strong>Média:</strong> ${media.toFixed(2)}</p>`;
});
