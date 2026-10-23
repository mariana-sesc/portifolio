/* =========================================
   PORTFÓLIO PESSOAL — INTERAÇÕES
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  // Elementos principais da página
  const corpoPagina = document.body;
  const botaoTema = document.getElementById("botao-tema");
  const botaoMenu = document.getElementById("botao-menu");
  const listaMenu = document.getElementById("lista-menu");
  const botaoTopo = document.getElementById("botao-topo");
  const textoDigitando = document.getElementById("texto-digitando");
  const anoAtual = document.getElementById("ano-atual");

  // Atualiza automaticamente o ano do rodapé
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // Tema: tenta recuperar a escolha anterior do navegador
  let temaSalvo = null;
  try {
    temaSalvo = localStorage.getItem("tema-portfolio");
  } catch (erro) {
    // Se o navegador bloquear armazenamento, o site continua funcionando.
  }

  if (temaSalvo === "claro") {
    corpoPagina.classList.add("tema-claro");
  }

  function atualizarBotaoTema() {
    const temaClaroAtivo = corpoPagina.classList.contains("tema-claro");

    if (temaClaroAtivo) {
      botaoTema.innerHTML = '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';
      botaoTema.setAttribute("aria-label", "Ativar tema escuro");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f7f8fc");
    } else {
      botaoTema.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
      botaoTema.setAttribute("aria-label", "Ativar tema claro");
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#0b1020");
    }
  }

  atualizarBotaoTema();

  botaoTema.addEventListener("click", function () {
    corpoPagina.classList.toggle("tema-claro");

    const novoTema = corpoPagina.classList.contains("tema-claro") ? "claro" : "escuro";

    try {
      localStorage.setItem("tema-portfolio", novoTema);
    } catch (erro) {
      // A troca de tema continua funcionando mesmo sem armazenamento.
    }

    atualizarBotaoTema();
  });

  // Abre e fecha o menu hambúrguer no celular
  function fecharMenu() {
    listaMenu.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
  }

  botaoMenu.addEventListener("click", function () {
    const menuEstaAberto = listaMenu.classList.toggle("menu-aberto");

    botaoMenu.setAttribute("aria-expanded", String(menuEstaAberto));
    botaoMenu.setAttribute("aria-label", menuEstaAberto ? "Fechar menu" : "Abrir menu");
    botaoMenu.innerHTML = menuEstaAberto
      ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
      : '<i class="bi bi-list" aria-hidden="true"></i>';
  });

  // Fecha o menu ao selecionar uma seção
  listaMenu.querySelectorAll("a").forEach(function (linkMenu) {
    linkMenu.addEventListener("click", fecharMenu);
  });

  // Fecha o menu se a tela voltar ao tamanho de computador
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) {
      fecharMenu();
    }
  });

  // Efeito máquina de escrever
  if (textoDigitando) {
    const frases = [
      "Estudante de Desenvolvimento Full Stack",
      "Aprendendo Front-end",
      "Transformando ideias em código"
    ];

    let indiceFrase = 0;
    let indiceLetra = 0;
    let apagando = false;

    function escreverFrase() {
      const fraseAtual = frases[indiceFrase];

      if (apagando) {
        indiceLetra--;
      } else {
        indiceLetra++;
      }

      textoDigitando.textContent = fraseAtual.substring(0, indiceLetra);

      let tempoEspera = apagando ? 35 : 65;

      if (!apagando && indiceLetra === fraseAtual.length) {
        apagando = true;
        tempoEspera = 1500;
      } else if (apagando && indiceLetra === 0) {
        apagando = false;
        indiceFrase = (indiceFrase + 1) % frases.length;
        tempoEspera = 350;
      }

      window.setTimeout(escreverFrase, tempoEspera);
    }

    // Evita animação de digitação para quem prefere movimento reduzido
    const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefereMovimentoReduzido) {
      textoDigitando.textContent = "";
      escreverFrase();
    }
  }

  // Mostra os elementos com animação quando entram na tela
  const elementosAnimados = document.querySelectorAll(".animar-entrada");
  const prefereMovimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefereMovimentoReduzido) {
    const observador = new IntersectionObserver(function (entradas, observadorAtual) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observadorAtual.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosAnimados.forEach(function (elemento) {
      observador.observe(elemento);
    });
  } else {
    elementosAnimados.forEach(function (elemento) {
      elemento.classList.add("visivel");
    });
  }

  // Exibe o botão "voltar ao topo" depois de rolar a página
  function verificarRolagem() {
    if (window.scrollY > 350) {
      botaoTopo.classList.add("visivel");
    } else {
      botaoTopo.classList.remove("visivel");
    }
  }

  window.addEventListener("scroll", verificarRolagem, { passive: true });
  verificarRolagem();

  botaoTopo.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: prefereMovimentoReduzido ? "auto" : "smooth"
    });
  });
});
