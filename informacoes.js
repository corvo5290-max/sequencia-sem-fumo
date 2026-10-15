/* Biblioteca educativa: conteúdo geral, sem diagnóstico. */
(() => {
    'use strict';

    const root = document.getElementById('bibliotecaVicios');
    const detail = document.getElementById('detalheVicio');
    if (!root || !detail) return;

    const topics = {
        tabaco: {
            title: 'Tabaco e nicotina',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/The_Human_Lungs.jpg?width=900',
            imageAlt: 'Modelo educativo mostrando a anatomia interna dos pulmões humanos.',
            imageCredit: 'Imagem: Edeh Sophia / Wikimedia Commons — CC0 1.0',
            imagePage: 'https://commons.wikimedia.org/wiki/File:The_Human_Lungs.jpg',
            summary: 'O tabaco e a nicotina podem causar dependência. A fumaça do tabaco contém substâncias tóxicas e afeta não apenas os pulmões, mas também outras partes do corpo.',
            effects: [
                'Aumento do risco de doenças respiratórias, incluindo doença pulmonar obstrutiva crônica.',
                'Maior risco de doenças cardiovasculares, como infarto e AVC.',
                'Maior risco de diversos tipos de câncer.',
                'A dependência de nicotina pode tornar difícil parar mesmo quando a pessoa deseja mudar.'
            ],
            note: 'Parar de fumar traz benefícios em qualquer idade. Um serviço de saúde pode orientar sobre apoio e tratamento para deixar o tabaco.',
            sources: [
                { label: 'Ministério da Saúde — Tabagismo', url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/t/tabagismo/view' },
                { label: 'OMS — Tabaco e nicotina', url: 'https://www.who.int/en/news-room/fact-sheets/detail/tobacco' }
            ]
        },
        alcool: {
            title: 'Álcool',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Human_Liver_%28NIH_BioArt_230%29.png?width=900',
            imageAlt: 'Ilustração anatômica educativa de um fígado humano.',
            imageCredit: 'Imagem: NIAID / Ryan Kissinger — domínio público nos Estados Unidos',
            imagePage: 'https://commons.wikimedia.org/wiki/File:Human_Liver_(NIH_BioArt_230).png',
            summary: 'O álcool pode afetar o cérebro, o fígado e outros órgãos. Os riscos variam conforme a quantidade, a frequência, a idade, a saúde e outros fatores; não existe uma garantia de risco zero.',
            effects: [
                'Pode prejudicar coordenação, reflexos, julgamento e memória, aumentando o risco de acidentes.',
                'Está associado a doenças do fígado, doenças cardiovasculares e alguns tipos de câncer.',
                'Pode piorar o sono e contribuir para dificuldades emocionais ou de relacionamento.',
                'O uso repetido pode levar à dependência e tornar a mudança mais difícil.'
            ],
            note: 'Importante: quem bebe muito ou diariamente não deve interromper abruptamente sem orientação médica, pois a abstinência pode ser perigosa. Procure uma UBS ou serviço de saúde.',
            sources: [
                { label: 'OMS — Álcool: efeitos e riscos à saúde', url: 'https://www.who.int/news-room/fact-sheets/detail/alcohol' },
                { label: 'Ministério da Saúde — Rede de Atenção Psicossocial', url: 'https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps' }
            ]
        },
        substancias: {
            title: 'Outras substâncias e medicamentos',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brain_Lateral_%28NIH_BioArt_60%29.png?width=900',
            imageAlt: 'Ilustração anatômica educativa de um cérebro humano visto de lado.',
            imageCredit: 'Imagem: NIAID / Ryan Kissinger — domínio público nos Estados Unidos',
            imagePage: 'https://commons.wikimedia.org/wiki/File:Brain_Lateral_(NIH_BioArt_60).png',
            summary: 'Os efeitos dependem muito da substância, da dose, da frequência, da saúde da pessoa e de possíveis combinações. Medicamentos prescritos também podem causar problemas se usados de modo diferente da orientação profissional.',
            effects: [
                'Podem ocorrer alterações na atenção, memória, humor, coordenação e sono.',
                'Algumas substâncias podem causar dependência, intoxicação ou danos a órgãos.',
                'Misturar substâncias ou medicamentos pode provocar interações perigosas.',
                'O uso problemático pode afetar estudos, trabalho, relações e atividades cotidianas.'
            ],
            note: 'Não altere nem interrompa um medicamento prescrito por conta própria. Converse com um profissional de saúde sobre efeitos, dúvidas ou dificuldade para controlar o uso.',
            sources: [
                { label: 'Ministério da Saúde — Rede de Atenção Psicossocial', url: 'https://www.gov.br/saude/pt-br/composicao/saes/desmad/raps' },
                { label: 'MedlinePlus — Informações de saúde', url: 'https://medlineplus.gov/' }
            ]
        },
        telas: {
            title: 'Telas, jogos e hábitos compulsivos',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Man_looks_at_his_smartphone_during_a_gathering.jpg?width=900',
            imageAlt: 'Pessoa olhando para o smartphone enquanto está em uma reunião social.',
            imageCredit: 'Imagem: Melissa BARRA / Wikimedia Commons — CC BY-SA 2.0',
            imagePage: 'https://commons.wikimedia.org/wiki/File:Man_looks_at_his_smartphone_during_a_gathering.jpg',
            summary: 'Usar telas ou jogar não significa, por si só, ter um vício. Vale observar quando a pessoa sente perda de controle e o hábito começa a atrapalhar outras partes importantes da vida.',
            effects: [
                'Pode reduzir ou atrasar o tempo de sono, especialmente quando o uso invade a hora de dormir.',
                'Pode dificultar a concentração ou interromper estudos e tarefas quando o uso fica excessivo.',
                'Pode tomar o espaço de movimento, descanso, convivência ou outros interesses.',
                'Conflitos e frustração podem surgir quando fica muito difícil fazer pausas, mesmo diante de consequências negativas.'
            ],
            note: 'O objetivo não é culpar nem proibir toda tecnologia: é perceber se o uso está equilibrado e se a pessoa ainda consegue escolher quando parar.',
            sources: [
                { label: 'OMS — Saúde mental e bem-estar', url: 'https://www.who.int/health-topics/mental-health' },
                { label: 'Imagem original e licença', url: 'https://commons.wikimedia.org/wiki/File:Man_looks_at_his_smartphone_during_a_gathering.jpg' }
            ]
        }
    };

    function addText(tag, text, className) {
        const node = document.createElement(tag);
        node.textContent = text;
        if (className) node.className = className;
        return node;
    }

    function renderTopic(key) {
        const topic = topics[key];
        if (!topic) return;

        root.querySelectorAll('[data-tema]').forEach(button => {
            const selected = button.dataset.tema === key;
            button.setAttribute('aria-pressed', String(selected));
        });

        detail.replaceChildren();
        detail.classList.remove('escondido');
        detail.setAttribute('aria-busy', 'true');

        detail.appendChild(addText('h3', topic.title));
        detail.appendChild(addText('p', topic.summary));

        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.className = 'vicio-imagem';
        image.src = topic.image;
        image.alt = topic.imageAlt;
        image.loading = 'lazy';
        image.referrerPolicy = 'no-referrer';
        image.addEventListener('error', () => {
            figure.hidden = true;
        }, { once: true });
        figure.appendChild(image);

        const credit = document.createElement('figcaption');
        credit.className = 'vicio-credito';
        const creditLink = document.createElement('a');
        creditLink.href = topic.imagePage;
        creditLink.target = '_blank';
        creditLink.rel = 'noopener noreferrer';
        creditLink.textContent = topic.imageCredit;
        credit.appendChild(creditLink);
        figure.appendChild(credit);
        detail.appendChild(figure);

        detail.appendChild(addText('h4', 'Possíveis malefícios'));
        const list = document.createElement('ul');
        topic.effects.forEach(effect => list.appendChild(addText('li', effect)));
        detail.appendChild(list);

        const note = addText('p', topic.note, key === 'alcool' ? 'vicio-alerta' : '');
        detail.appendChild(note);

        const sourcesBox = document.createElement('div');
        sourcesBox.className = 'vicio-fontes';
        sourcesBox.appendChild(addText('h4', 'Fontes para saber mais'));
        const sourcesList = document.createElement('ul');
        topic.sources.forEach(source => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = source.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = source.label;
            li.appendChild(link);
            sourcesList.appendChild(li);
        });
        sourcesBox.appendChild(sourcesList);
        detail.appendChild(sourcesBox);
        detail.setAttribute('aria-busy', 'false');
    }

    root.querySelectorAll('[data-tema]').forEach(button => {
        button.addEventListener('click', () => renderTopic(button.dataset.tema));
    });
})();
