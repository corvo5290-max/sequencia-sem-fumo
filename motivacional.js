/* ==================================================
   CAIXA MOTIVACIONAL
================================================== */

const caixaMotivacional =
    document.getElementById("caixaMotivacional");

const textoMotivacional =
    document.getElementById("textoMotivacional");

const fecharMotivacional =
    document.getElementById("fecharMotivacional");

const botaoFecharMotivacional =
    document.getElementById("botaoFecharMotivacional");


/* ==================================================
   MENSAGENS
================================================== */

const mensagensMotivacionais = [

    "Mais um dia conquistado!",

    "Um dia de cada vez.",

    "Cada dia conta.",

    "Você está construindo sua sequência.",

    "Continue no seu ritmo.",

    "Mais uma estrela para sua sequência!",

    "Você chegou até aqui. Continue.",

    "Sua sequência está crescendo."

];


/* ==================================================
   ABRIR
================================================== */

function abrirCaixaMotivacional() {

    if (!caixaMotivacional) {

        console.log(
            "ERRO: caixaMotivacional não encontrada."
        );

        return;

    }


    const indice =
        Math.floor(
            Math.random() *
            mensagensMotivacionais.length
        );


    textoMotivacional.textContent =
        mensagensMotivacionais[indice];


    caixaMotivacional.classList.remove(
        "escondido"
    );

}


/* ==================================================
   FECHAR
================================================== */

function fecharCaixaMotivacional() {

    if (!caixaMotivacional) {
        return;
    }


    caixaMotivacional.classList.add(
        "escondido"
    );

}


/* ==================================================
   BOTÃO X
================================================== */

if (fecharMotivacional) {

    fecharMotivacional.addEventListener(
        "click",
        fecharCaixaMotivacional
    );

}


/* ==================================================
   BOTÃO FECHAR
================================================== */

if (botaoFecharMotivacional) {

    botaoFecharMotivacional.addEventListener(
        "click",
        fecharCaixaMotivacional
    );

}


/* ==================================================
   CLICAR FORA
================================================== */

if (caixaMotivacional) {

    caixaMotivacional.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target ===
                caixaMotivacional
            ) {

                fecharCaixaMotivacional();

            }

        }
    );

}