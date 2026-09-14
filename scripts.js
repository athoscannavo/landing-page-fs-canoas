const header = document.querySelector(".cabecalho");

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

/* ======= DADOS DOS ALUNOS (edite/complete com os dados reais da turma) ======= */

const alunos = [
  {
    nome: "Residêncio Jr.",
    cargo: "Front-End",
    categoria: "frontend",
    foto: "imagens/alunos/avatar1.png",
    cidade: "Canoas/RS",
    experiencia: "1 ano",
    curiosidade: "Adora café",
    descricao:
      "Dev em formação na Residência FullStack 5.0 pelo Instituto Eldorado com experiência em banco de dados, java e front-end.",
  },
  {
    nome: "Java Girl",
    cargo: "Java",
    categoria: "backend",
    foto: "imagens/alunos/avatar2.png",
    cidade: "Porto Alegre/RS",
    experiencia: "2 anos",
    curiosidade: "Toca violão",
    descricao:
      "Dev em formação na Residência FullStack 5.0 pelo Instituto Eldorado com experiência em banco de dados, java e front-end.",
  },
  {
    nome: "HTMélio",
    cargo: "Front-End HTML",
    categoria: "frontend",
    foto: "imagens/alunos/avatar3.png",
    cidade: "Novo Hamburgo/RS",
    experiencia: "6 meses",
    curiosidade: "Fã de anime",
    descricao:
      "Dev em formação na Residência FullStack 5.0 pelo Instituto Eldorado com experiência em banco de dados, java e front-end.",
  },
  {
    nome: "Consultina SQL",
    cargo: "Dados",
    categoria: "dados",
    foto: "imagens/alunos/avatar4.png",
    cidade: "Canoas/RS",
    experiencia: "1 ano",
    curiosidade: "Coleciona plantas",
    descricao:
      "Dev em formação na Residência FullStack 5.0 pelo Instituto Eldorado com experiência em banco de dados, java e front-end.",
  },
  {
    nome: "Backendinho",
    cargo: "Back-end",
    categoria: "backend",
    foto: "imagens/alunos/avatar5.png",
    cidade: "Esteio/RS",
    experiencia: "3 anos",
    curiosidade: "Joga xadrez",
    descricao:
      "Dev em formação na Residência FullStack 5.0 pelo Instituto Eldorado com experiência em banco de dados, java e front-end.",
  },
  {
    nome: "CSSandra",
    cargo: "Front-End",
    categoria: "frontend",
    foto: "imagens/alunos/avatar6.png",
    cidade: "Sapucaia do Sul/RS",
    experiencia: "1 ano e meio",
    curiosidade: "Maratonista de séries",
    descricao:
      "Dev em formação na Residência FullStack 5.0 pelo Instituto Eldorado com experiência em banco de dados, java e front-end.",
  },
];

/* ======= CARROSSEL INFINITO DE ALUNOS ======= */

const track = document.getElementById("carrosselTrack");
const setaEsquerda = document.getElementById("setaEsquerda");
const setaDireita = document.getElementById("setaDireita");
const filtrosEquipe = document.getElementById("filtrosEquipe");

const overlayPerfil = document.getElementById("overlayPerfil");
const fecharPopup = document.getElementById("fecharPopup");

if (track && setaEsquerda && setaDireita) {
  let listaAtual = alunos;
  let posicaoAtual = 0;

  function criarCardHTML(aluno, indexReal) {
    return `
      <div class="card-aluno" data-index="${indexReal}">
        <div class="foto-container">
          <img src="${aluno.foto}" alt="Foto de ${aluno.nome}">
        </div>
        <h3>${aluno.nome}</h3>
        <p>${aluno.cargo}</p>
      </div>
    `;
  }

  function montarTrack() {
    const total = listaAtual.length;
    // Triplica a lista (clone-esquerda + original + clone-direita) para o loop infinito
    const tripla = [...listaAtual, ...listaAtual, ...listaAtual];
    track.innerHTML = tripla
      .map((aluno, i) => criarCardHTML(aluno, i % total))
      .join("");
    posicaoAtual = total; // começa no início do bloco "original" (do meio)
    track.classList.remove("com-transicao");
    track.classList.add("sem-transicao");
    aplicarPosicao();
    // reativa a transição no próximo frame
    requestAnimationFrame(() => {
      track.classList.remove("sem-transicao");
      track.classList.add("com-transicao");
    });
  }

  function larguraCard() {
    const card = track.querySelector(".card-aluno");
    const gap = parseInt(getComputedStyle(track).gap) || 0;
    return card ? card.offsetWidth + gap : 250;
  }

  function cardsVisiveis() {
    return Math.max(
      Math.floor(track.parentElement.offsetWidth / larguraCard()),
      1,
    );
  }

  function aplicarPosicao() {
    track.style.transform = `translateX(-${posicaoAtual * larguraCard()}px)`;
  }

  function mover(direcao) {
    const total = listaAtual.length;
    const passo = cardsVisiveis();

    posicaoAtual += direcao * passo;
    aplicarPosicao();

    // Ao sair da faixa "segura" do meio, espera a transição e realinha sem transição (efeito infinito)
    if (posicaoAtual >= total * 2 || posicaoAtual < 0) {
      track.addEventListener(
        "transitionend",
        function realinhar() {
          track.removeEventListener("transitionend", realinhar);
          if (posicaoAtual >= total * 2) posicaoAtual -= total;
          if (posicaoAtual < 0) posicaoAtual += total;
          track.classList.remove("com-transicao");
          track.classList.add("sem-transicao");
          aplicarPosicao();
          requestAnimationFrame(() => {
            track.classList.remove("sem-transicao");
            track.classList.add("com-transicao");
          });
        },
        { once: true },
      );
    }
  }

  setaDireita.addEventListener("click", () => mover(1));
  setaEsquerda.addEventListener("click", () => mover(-1));

  window.addEventListener("resize", aplicarPosicao);

  // Abre o pop-up ao clicar em qualquer card do carrossel
  track.addEventListener("click", (evento) => {
    const card = evento.target.closest(".card-aluno");
    if (!card) return;
    abrirPerfil(listaAtual[Number(card.dataset.index)]);
  });

  // Filtros (Todos / Dados / Back-end / Front-end)
  if (filtrosEquipe) {
    filtrosEquipe.addEventListener("click", (evento) => {
      const botao = evento.target.closest(".filtro");
      if (!botao) return;

      filtrosEquipe
        .querySelectorAll(".filtro")
        .forEach((b) => b.classList.remove("ativo"));
      botao.classList.add("ativo");

      const categoria = botao.dataset.categoria;
      listaAtual =
        categoria === "todos"
          ? alunos
          : alunos.filter((aluno) => aluno.categoria === categoria);

      montarTrack();
    });
  }

  montarTrack();
}

function abrirPerfil(aluno) {
  document.getElementById("popupImg").src = aluno.foto;
  document.getElementById("popupImg").alt = "Foto de " + aluno.nome;
  document.getElementById("popupCidade").textContent = aluno.cidade;
  document.getElementById("popupExperiencia").textContent = aluno.experiencia;
  document.getElementById("popupCuriosidade").textContent = aluno.curiosidade;
  document.getElementById("popupNome").textContent = aluno.nome;
  document.getElementById("popupCargo").textContent = aluno.cargo;
  document.getElementById("popupDescricao").textContent = aluno.descricao;
  overlayPerfil.classList.add("aberto");
}

function fecharPerfil() {
  overlayPerfil.classList.remove("aberto");
}

if (fecharPopup) fecharPopup.addEventListener("click", fecharPerfil);
if (overlayPerfil) {
  overlayPerfil.addEventListener("click", (evento) => {
    if (evento.target === overlayPerfil) fecharPerfil();
  });
}
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") fecharPerfil();
});
