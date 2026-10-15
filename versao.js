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

    const fecharModal = () => {
        modal.hidden = true;
        document.body.classList.remove("versao-modal-aberto");
    };

    const aplicarVersao = (versao) => {
        localStorage.setItem(CHAVE_VERSAO, versao);
        const paga = versao === "paga";
        biblioteca.hidden = !paga;
        bloqueio.hidden = paga;
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
