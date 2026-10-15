/* =====================================================
   SELETOR DE VERSÃO — SIMULAÇÃO LOCAL, SEM PAGAMENTO
   A versão paga é apenas uma demonstração visual.
===================================================== */
(() => {
    const CHAVE_VERSAO = "antiVicioVersaoSelecionada";
    const modal = document.getElementById("modalVersao");
    const botaoGratis = document.getElementById("usarGratis");
    const botaoPaga = document.getElementById("usarPaga");
    const botaoTrocar = document.getElementById("trocarVersao");
    const biblioteca = document.getElementById("bibliotecaVicios");
    const RECURSOS_PAGOS = new Set(["questionario", "gatilhos", "analise"]);

    if (!modal || !botaoGratis || !botaoPaga || !biblioteca) return;

    const bloqueio = document.createElement("section");
    bloqueio.id = "bibliotecaBloqueada";
    bloqueio.className = "card versao-bloqueada";
    bloqueio.hidden = true;
    bloqueio.innerHTML = `
        <p class="pequeno">RECURSO DA VERSÃO PAGA</p>
        <div class="versao-bloqueio-icone" aria-hidden="true">💎</div>
        <h2>Biblioteca completa de informações</h2>
        <p>Explore conteúdos sobre órgãos, efeitos do tabaco e do álcool, uso compulsivo de telas e celular durante a madrugada, incluindo imagens educativas e fontes.</p>
        <button id="desbloquearBiblioteca" class="botao-principal" type="button">Experimentar versão paga</button>
        <p class="versao-nota">É uma simulação do projeto. Não há pagamento real.</p>
    `;
    biblioteca.insertAdjacentElement("beforebegin", bloqueio);

    const abrirModal = () => {
        modal.hidden = false;
        document.body.classList.add("versao-modal-aberto");
        botaoGratis.focus();
    };

    // Aviso específico para quando alguém tenta abrir um recurso premium.
    const bloqueioRecursos = document.createElement("div");
    bloqueioRecursos.id = "modalRecursoPago";
    bloqueioRecursos.className = "versao-fundo";
    bloqueioRecursos.hidden = true;
    bloqueioRecursos.setAttribute("role", "dialog");
    bloqueioRecursos.setAttribute("aria-modal", "true");
    bloqueioRecursos.setAttribute("aria-labelledby", "tituloRecursoPago");
    bloqueioRecursos.innerHTML = `
        <div class="versao-modal">
            <p class="pequeno">RECURSO DA VERSÃO PAGA</p>
            <div class="versao-bloqueio-icone" aria-hidden="true">💎</div>
            <h2 id="tituloRecursoPago">Este recurso faz parte da versão paga</h2>
            <p id="descricaoRecursoPago">Meus gatilhos, Encontrar meu caminho e Análise dos registros estão disponíveis na versão paga de demonstração.</p>
            <div class="versao-opcoes">
                <button id="ativarRecursoPago" class="versao-escolha versao-paga" type="button">
                    <span class="versao-icone" aria-hidden="true">💎</span>
                    <span><strong>Experimentar versão paga</strong><small>Desbloquear os três recursos. Sem cobrança real.</small></span>
                </button>
                <button id="fecharRecursoPago" class="versao-escolha" type="button">
                    <span class="versao-icone" aria-hidden="true">🌱</span>
                    <span><strong>Continuar na versão grátis</strong><small>Voltar ao início e continuar usando os recursos gratuitos.</small></span>
                </button>
            </div>
            <p class="versao-nota">Demonstração fictícia: não há pagamento nem coleta de dados bancários.</p>
        </div>`;
    document.body.appendChild(bloqueioRecursos);

    const abrirBloqueioRecursos = () => {
        bloqueioRecursos.hidden = false;
        document.body.classList.add("versao-modal-aberto");
        document.getElementById("ativarRecursoPago")?.focus();
    };

    const fecharBloqueioRecursos = () => {
        bloqueioRecursos.hidden = true;
        document.body.classList.remove("versao-modal-aberto");
    };

    // Intercepta cliques antes do script de navegação para bloquear páginas premium na versão grátis.
    document.addEventListener("click", (event) => {
        const controle = event.target.closest("[data-pagina]");
        if (!controle) return;
        const pagina = controle.dataset.pagina;
        const versaoAtual = localStorage.getItem(CHAVE_VERSAO);
        if (RECURSOS_PAGOS.has(pagina) && versaoAtual !== "paga") {
            event.preventDefault();
            event.stopImmediatePropagation();
            abrirBloqueioRecursos();
        }
    }, true);

    document.getElementById("ativarRecursoPago")?.addEventListener("click", () => {
        aplicarVersao("paga");
        fecharBloqueioRecursos();
    });

    document.getElementById("fecharRecursoPago")?.addEventListener("click", () => {
        fecharBloqueioRecursos();
        document.querySelector('[data-pagina="inicio"]')?.click();
    });

    bloqueioRecursos.addEventListener("click", (event) => {
        if (event.target === bloqueioRecursos) fecharBloqueioRecursos();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !bloqueioRecursos.hidden) fecharBloqueioRecursos();
    });

    // Marca visualmente no menu quais páginas pertencem à versão paga.
    document.querySelectorAll('.item-menu[data-pagina="questionario"], .item-menu[data-pagina="gatilhos"], .item-menu[data-pagina="analise"]').forEach((item) => {
        if (!item.querySelector(".versao-tag-paga")) {
            const etiqueta = document.createElement("span");
            etiqueta.className = "versao-tag-paga";
            etiqueta.textContent = "PAGA";
            item.appendChild(etiqueta);
        }
    });

    const fecharModal = () => {
        modal.hidden = true;
        document.body.classList.remove("versao-modal-aberto");
    };

    const aplicarVersao = (versao) => {
        localStorage.setItem(CHAVE_VERSAO, versao);
        const paga = versao === "paga";
        biblioteca.hidden = !paga;
        bloqueio.hidden = paga;
        document.querySelectorAll(".versao-tag-paga").forEach((tag) => {
            tag.hidden = paga;
        });
        if (botaoTrocar) {
            botaoTrocar.textContent = paga ? "💎 Versão paga · trocar" : "🌱 Versão grátis · trocar";
            botaoTrocar.setAttribute("aria-label", `Versão atual: ${paga ? "paga de demonstração" : "grátis"}. Trocar versão`);
        }
        fecharModal();
    };

    botaoGratis.addEventListener("click", () => aplicarVersao("gratis"));
    botaoPaga.addEventListener("click", () => aplicarVersao("paga"));
    if (botaoTrocar) botaoTrocar.addEventListener("click", abrirModal);

    const desbloquear = document.getElementById("desbloquearBiblioteca");
    if (desbloquear) desbloquear.addEventListener("click", abrirModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal && localStorage.getItem(CHAVE_VERSAO)) fecharModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden && localStorage.getItem(CHAVE_VERSAO)) fecharModal();
    });

    const versaoSalva = localStorage.getItem(CHAVE_VERSAO);
    if (versaoSalva === "paga" || versaoSalva === "gratis") {
        aplicarVersao(versaoSalva);
    } else {
        biblioteca.hidden = true;
        bloqueio.hidden = true;
        abrirModal();
    }
})();
