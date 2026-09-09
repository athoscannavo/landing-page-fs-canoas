const header = document.getElementById("header");

function handleScroll() {
  if (!header) return;
  if (window.scrollY > 24) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}
handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });

function abrirCard() {
  alert("Teste Botão");
}

/* ======= MURAL : alterna as frases da turma ======= */

document.addEventListener("DOMContentLoaded", () => {
  const muralCard = document.getElementById("mural-card");
  if (!muralCard) return;

  // TODO: trocar pelas frases reais coletadas com a turma.
  // tipo pode ser "nome", "apelido" ou "anonimo", conforme a escolha da pessoa.
  const frasesDaTurma = [
    {
      texto:
        "Aprendi que documentar o processo é tão importante quanto o código em si.",
      autor: "Ana Souza",
      tipo: "nome",
    },
    {
      texto:
        "Chegar sem saber nada de front-end e sair montando um site inteiro com a turma foi surreal.",
      autor: "Duda",
      tipo: "apelido",
    },
    {
      texto:
        "Prefiro não me identificar, mas fica registrado: essa residência mudou como eu penso em resolver problemas.",
      autor: null,
      tipo: "anonimo",
    },
  ];

  const fraseEl = document.getElementById("mural-frase");
  const autorEl = document.getElementById("mural-autor");
  const avatarInicialEl = document.getElementById("mural-avatar-inicial");

  const DURACAO_EXIBICAO_MS = 6000;
  const prefereMenosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let indiceAtual = 0;
  let temporizador = null;

  function atualizarCard(item) {
    fraseEl.textContent = item.texto;

    if (item.tipo === "anonimo") {
      autorEl.textContent = "— Anônimo";
      avatarInicialEl.textContent = "?";
    } else {
      autorEl.textContent = `— ${item.autor}`;
      avatarInicialEl.textContent = item.autor.charAt(0).toUpperCase();
    }
  }

  function irParaProximaFrase() {
    if (prefereMenosMovimento) {
      indiceAtual = (indiceAtual + 1) % frasesDaTurma.length;
      atualizarCard(frasesDaTurma[indiceAtual]);
      return;
    }
    muralCard.classList.add("mural-oculto");
  }

  muralCard.addEventListener("transitionend", (evento) => {
    if (evento.propertyName !== "opacity") return;
    if (!muralCard.classList.contains("mural-oculto")) return;

    indiceAtual = (indiceAtual + 1) % frasesDaTurma.length;
    atualizarCard(frasesDaTurma[indiceAtual]);

    requestAnimationFrame(() => {
      muralCard.classList.remove("mural-oculto");
    });
  });

  function iniciarCiclo() {
    temporizador = setInterval(irParaProximaFrase, DURACAO_EXIBICAO_MS);
  }

  function pausarCiclo() {
    clearInterval(temporizador);
  }

  muralCard.addEventListener("mouseenter", pausarCiclo);
  muralCard.addEventListener("mouseleave", iniciarCiclo);

  atualizarCard(frasesDaTurma[indiceAtual]);
  iniciarCiclo();
});
