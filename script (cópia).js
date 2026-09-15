/* ==================================================
   MENU
================================================== */

const abrirMenu =
    document.getElementById("abrirMenu");

const fecharMenu =
    document.getElementById("fecharMenu");

const menuLateral =
    document.getElementById("menuLateral");

const fundoMenu =
    document.getElementById("fundoMenu");


function abrir() {

    menuLateral.classList.add("aberto");

    fundoMenu.classList.add("aberto");

}


function fechar() {

    menuLateral.classList.remove("aberto");

    fundoMenu.classList.remove("aberto");

}


abrirMenu.addEventListener("click", abrir);

fecharMenu.addEventListener("click", fechar);

fundoMenu.addEventListener("click", fechar);



/* ==================================================
   PÁGINAS
================================================== */

const itensMenu =
    document.querySelectorAll(".item-menu");

const botoesPagina =
    document.querySelectorAll("[data-pagina]");


function mostrarPagina(nome) {

    const paginas =
        document.querySelectorAll(".pagina");


    paginas.forEach(pagina => {

        pagina.classList.add("escondido");

    });


    const paginaEscolhida =
        document.getElementById(
            "pagina-" + nome
        );


    if (paginaEscolhida) {

        paginaEscolhida.classList.remove(
            "escondido"
        );

    }


    itensMenu.forEach(item => {

        item.classList.remove("ativo");


        if (
            item.dataset.pagina === nome
        ) {

            item.classList.add("ativo");

        }

    });


    fechar();

    atualizar();

    criarCalendario();

}



/* ==================================================
   CLIQUES DO MENU
================================================== */

itensMenu.forEach(item => {

    item.addEventListener("click", () => {

        mostrarPagina(
            item.dataset.pagina
        );

    });

});


botoesPagina.forEach(botao => {

    botao.addEventListener("click", () => {

        mostrarPagina(
            botao.dataset.pagina
        );

    });

});



/* ==================================================
   ELEMENTOS DA SEQUÊNCIA
================================================== */

const comecar =
    document.getElementById("comecar");

const manterSequencia =
    document.getElementById(
        "manterSequencia"
    );

const reiniciar =
    document.getElementById("reiniciar");


const inicio =
    document.getElementById("inicio");

const progressoInicio =
    document.getElementById(
        "progressoInicio"
    );


const numeroDias =
    document.getElementById("numeroDias");

const numeroDiasProgresso =
    document.getElementById(
        "numeroDiasProgresso"
    );


const mensagem =
    document.getElementById("mensagem");

const mensagemProgresso =
    document.getElementById("mensagemProgresso");


const dataInicio =
    document.getElementById("dataInicio");

const maiorSequencia =
    document.getElementById(
        "maiorSequencia"
    );



/* ==================================================
   DATA DE HOJE
================================================== */

function dataHoje() {

    const hoje =
        new Date();


    hoje.setHours(
        0,
        0,
        0,
        0
    );


    return hoje;

}



/* ==================================================
   DATA EM TEXTO
================================================== */

function dataTexto(data) {

    const ano =
        data.getFullYear();

    const mes =
        String(
            data.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            data.getDate()
        ).padStart(2, "0");


    return `${ano}-${mes}-${dia}`;

}



/* ==================================================
   PEGAR DIAS CONFIRMADOS
================================================== */

function pegarDiasConfirmados() {

    const dados =
        localStorage.getItem(
            "diasConfirmados"
        );


    if (!dados) {

        return [];

    }


    try {

        return JSON.parse(dados);

    }

    catch {

        return [];

    }

}



/* ==================================================
   SALVAR DIAS CONFIRMADOS
================================================== */

function salvarDiasConfirmados(dias) {

    localStorage.setItem(
        "diasConfirmados",
        JSON.stringify(dias)
    );

}



/* ==================================================
   VERIFICAR SE HOJE FOI CONFIRMADO
================================================== */

function hojeFoiConfirmado() {

    const dias =
        pegarDiasConfirmados();


    const hoje =
        dataTexto(
            dataHoje()
        );


    return dias.includes(hoje);

}



/* ==================================================
   CALCULAR SEQUÊNCIA ATUAL
================================================== */

function calcularSequencia() {

    const dias =
        pegarDiasConfirmados();


    if (
        dias.length === 0
    ) {

        return 0;

    }


    const datas =
        dias
            .map(
                data =>
                    new Date(
                        data + "T00:00:00"
                    )
            )
            .sort(
                (a, b) => b - a
            );


    let sequencia = 1;


    for (
        let i = 0;
        i < datas.length - 1;
        i++
    ) {

        const diferenca =
            datas[i] -
            datas[i + 1];


        const diasEntre =
            Math.round(
                diferenca /
                (1000 * 60 * 60 * 24)
            );


        if (
            diasEntre === 1
        ) {

            sequencia++;

        }

        else {

            break;

        }

    }


    return sequencia;

}



/* ==================================================
   CALCULAR MAIOR SEQUÊNCIA
================================================== */

function calcularMaiorSequencia() {

    const dias =
        pegarDiasConfirmados();


    if (
        dias.length === 0
    ) {

        return 0;

    }


    const datas =
        dias
            .map(
                data =>
                    new Date(
                        data + "T00:00:00"
                    )
            )
            .sort(
                (a, b) => a - b
            );


    let maior = 1;

    let atual = 1;


    for (
        let i = 1;
        i < datas.length;
        i++
    ) {

        const diferenca =
            datas[i] -
            datas[i - 1];


        const diasEntre =
            Math.round(
                diferenca /
                (1000 * 60 * 60 * 24)
            );


        if (
            diasEntre === 1
        ) {

            atual++;

        }

        else {

            atual = 1;

        }


        if (
            atual > maior
        ) {

            maior = atual;

        }

    }


    return maior;

}



/* ==================================================
   FORMATAR DATA
================================================== */

function formatarData(data) {

    return new Date(data)
        .toLocaleDateString(
            "pt-BR"
        );

}



/* ==================================================
   MENSAGEM MOTIVACIONAL
================================================== */

function mensagemMotivacional(dias) {

    const mensagens = [

        "Um dia de cada vez.",

        "Mais um dia conquistado.",

        "Você está construindo sua sequência.",

        "Cada dia conta.",

        "Continue no seu ritmo.",

        "Sua sequência está crescendo.",

        "Você chegou até aqui. Continue."

    ];


    return mensagens[
        dias % mensagens.length
    ];

}



/* ==================================================
   ATUALIZAR SEQUÊNCIA
================================================== */

function atualizar() {

    const diasConfirmados =
        pegarDiasConfirmados();


    /* ==============================================
       NÃO COMEÇOU
    ============================================== */

    if (
        diasConfirmados.length === 0
    ) {

        inicio.classList.remove(
            "escondido"
        );

        progressoInicio.classList.add(
            "escondido"
        );

        numeroDias.textContent =
            "0";

        numeroDiasProgresso.textContent =
            "0";

        if (dataInicio) {

            dataInicio.textContent =
                "--";

        }

        if (maiorSequencia) {

            maiorSequencia.textContent =
                "0 dias";

        }

        if (mensagem) {

            mensagem.textContent =
                "";

        }

        if (mensagemProgresso) {

            mensagemProgresso.textContent =
                "";

        }

        if (manterSequencia) {

            manterSequencia.classList.add(
                "escondido"
            );

        }

        return;

    }


    /* ==============================================
       JÁ COMEÇOU
    ============================================== */

    inicio.classList.add(
        "escondido"
    );

    progressoInicio.classList.remove(
        "escondido"
    );


    const dias =
        calcularSequencia();



    /* ==============================================
       CONTADORES
    ============================================== */

    numeroDias.textContent =
        dias;

    numeroDiasProgresso.textContent =
        dias;



    /* ==============================================
       MENSAGEM
    ============================================== */

    let texto;


    if (
        hojeFoiConfirmado()
    ) {

        texto =
            mensagemMotivacional(
                dias
            );

    }

    else {

        texto =
            "Seu próximo dia está esperando por você.";

    }


    mensagem.textContent =
        texto;

    mensagemProgresso.textContent =
        texto;



    /* ==============================================
       BOTÃO MANTER SEQUÊNCIA
    ============================================== */

    if (
        manterSequencia
    ) {

        if (
            hojeFoiConfirmado()
        ) {

            manterSequencia.classList.add(
                "escondido"
            );

        }

        else {

            manterSequencia.classList.remove(
                "escondido"
            );

        }

    }



    /* ==============================================
       DATA DE INÍCIO
    ============================================== */

    const primeiraData =
        diasConfirmados
            .slice()
            .sort()[0];


    if (dataInicio) {

        dataInicio.textContent =
            formatarData(
                primeiraData
            );

    }



    /* ==============================================
       MAIOR SEQUÊNCIA
    ============================================== */

    const maior =
        calcularMaiorSequencia();


    localStorage.setItem(
        "maiorSequencia",
        maior
    );


    if (maiorSequencia) {

        maiorSequencia.textContent =
            `${maior} dias`;

    }



    /* ==============================================
       MARCOS
    ============================================== */

    atualizarMarcos(
        dias
    );

}



/* ==================================================
   ATUALIZAR MARCOS
================================================== */

function atualizarMarcos(dias) {

    const marcos = {

        7:
            document.getElementById(
                "marco7"
            ),

        30:
            document.getElementById(
                "marco30"
            ),

        90:
            document.getElementById(
                "marco90"
            ),

        365:
            document.getElementById(
                "marco365"
            )

    };


    for (
        const marco in marcos
    ) {

        if (
            marcos[marco] &&
            dias >= Number(marco)
        ) {

            marcos[marco].textContent =
                "✓";

        }

        else if (
            marcos[marco]
        ) {

            marcos[marco].textContent =
                "○";

        }

    }

}



/* ==================================================
   REINICIAR SEQUÊNCIA
================================================== */

if (reiniciar) {

    reiniciar.addEventListener(
        "click",
        () => {

            const confirmar =
                confirm(
                    "Tem certeza que deseja reiniciar sua sequência?"
                );


            if (!confirmar) {

                return;

            }


            /* ==========================================
               APAGAR DIAS CONFIRMADOS
            ========================================== */

            localStorage.removeItem(
                "diasConfirmados"
            );


            /* ==========================================
               APAGAR MAIOR SEQUÊNCIA SALVA
            ========================================== */

            localStorage.removeItem(
                "maiorSequencia"
            );


            /* ==========================================
               ATUALIZAR TELA
            ========================================== */

            atualizar();

            criarCalendario();

        }
    );

}



/* ==================================================
   COMEÇAR SEQUÊNCIA
================================================== */

if (comecar) {

    comecar.addEventListener(
        "click",
        () => {

            const hoje =
                dataTexto(
                    dataHoje()
                );


            salvarDiasConfirmados([
                hoje
            ]);


            atualizar();

            criarCalendario();

        }
    );

}



/* ==================================================
   MANTER SEQUÊNCIA
================================================== */

if (manterSequencia) {

    manterSequencia.addEventListener(
        "click",
        () => {

            const dias =
                pegarDiasConfirmados();


            const hoje =
                dataTexto(
                    dataHoje()
                );


            /* ==========================================
               EVITAR DUPLICAÇÃO
            ========================================== */

            if (
                dias.includes(hoje)
            ) {

                return;

            }


            /* ==========================================
               ADICIONAR HOJE
            ========================================== */

            dias.push(hoje);


            salvarDiasConfirmados(
                dias
            );

            abrirCaixaMotivacional();

            /* ==========================================
               ATUALIZAR
            ========================================== */

            atualizar();

            criarCalendario();

        }
    );

}



/* ==================================================
   INICIAR
================================================== */

atualizar();

criarCalendario();