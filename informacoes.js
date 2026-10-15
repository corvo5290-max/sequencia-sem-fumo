/* Biblioteca educativa: conteúdo geral, sem diagnóstico. */
(() => {
    'use strict';

    const root = document.getElementById('bibliotecaVicios');
    const detail = document.getElementById('detalheVicio');
    if (!root || !detail) return;

    const topics = {
        tabaco: {
            title: 'Tabaco e nicotina',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Histopathology_of_emphysema.jpg?width=900',
            imageAlt: 'Fotografia microscópica de tecido pulmonar com alterações associadas ao enfisema.',
            imageCredit: 'Fotografia médica: Mikael Häggström / Wikimedia Commons — CC0 1.0',
            imagePage: 'https://commons.wikimedia.org/wiki/File:Histopathology_of_emphysema.jpg',
            medicalImage: true,
            imageWarning: 'Esta é uma fotografia médica real de tecido pulmonar. Pode ser desconfortável; a imagem só aparece se você escolher mostrá-la.',
            imageCaption: 'Imagem microscópica de enfisema. Ela mostra uma amostra médica, não prevê o que acontecerá com cada pessoa.',
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
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cirrhosis_liver.jpg?width=900',
            imageAlt: 'Fotografia médica real de uma amostra de fígado com cirrose.',
            imageCredit: 'Fotografia médica: Narraburra / Wikimedia Commons — CC0 1.0',
            imagePage: 'https://commons.wikimedia.org/wiki/File:Cirrhosis_liver.jpg',
            medicalImage: true,
            imageWarning: 'Esta é uma fotografia médica real de tecido do fígado com cirrose. Pode ser desconfortável; a imagem só aparece se você escolher mostrá-la.',
            imageCaption: 'A cirrose pode ter diferentes causas, inclusive relacionadas ao álcool. Esta fotografia não permite concluir a causa de um caso específico.',
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
            imageCaption: 'Imagem anatômica do cérebro para contextualizar o tema; não representa um dano específico causado por uma substância.',
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
            imageCaption: 'Fotografia de uma pessoa usando o celular em uma situação social; não é uma imagem clínica de dano.',
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
        },
        celular: {
            title: 'Celular de madrugada: quando o sono fica para depois',
            image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Radu_Mihai_2017-06-04_%28Unsplash%29.jpg?width=900',
            imageAlt: 'Fotografia de uma pessoa deitada usando um smartphone em um quarto escuro.',
            imageCredit: 'Fotografia: Radu Mihai / Unsplash via Wikimedia Commons',
            imagePage: 'https://commons.wikimedia.org/wiki/File:Radu_Mihai_2017-06-04_(Unsplash).jpg',
            imageCaption: 'Fotografia ilustrativa de uso do celular em um ambiente escuro; não comprova que a pessoa esteja sem dormir.',
            summary: 'Às vezes a pessoa pretende olhar o celular por alguns minutos, mas continua rolando vídeos, conversando ou jogando e adia o sono. O problema é quando isso se repete e começa a prejudicar o descanso e a rotina.',
            effects: [
                'Dormir menos do que o necessário pode aumentar o cansaço e dificultar a atenção, a memória e a aprendizagem no dia seguinte.',
                'O uso noturno pode atrasar o horário de dormir e tornar mais difícil manter uma rotina de sono.',
                'A pessoa pode deixar tarefas, estudos, movimento e convivência para depois para continuar conectada.',
                'Sinais de alerta incluem dificuldade frequente para acordar, sonolência durante o dia e tentativas repetidas de parar que não funcionam.'
            ],
            scenarioTitle: 'Situação extrema ilustrativa',
            scenario: 'Imagine alguém que promete parar às 22h, mas continua no celular até de madrugada quase todos os dias. Começa a chegar exausto à escola, perde a concentração e abandona atividades de que gostava. Este é um exemplo fictício de como o hábito pode afetar a vida — não é um caso clínico real.',
            note: 'Uma ideia prática é deixar o celular carregando longe da cama e combinar um horário para encerrar o uso. Se a falta de sono for frequente ou estiver afetando muito o dia a dia, vale conversar com um adulto de confiança e um profissional de saúde.',
            sources: [
                { label: 'Governo Federal — sinais de uso problemático ou excessivo', url: 'https://www.gov.br/secom/pt-br/assuntos/uso-de-telas-por-criancas-e-adolescentes/guia/destaques-do-guia/sinais-de-alerta-que-podem-indicar-uso-problematico-ou-excessivo/' },
                { label: 'Governo Federal — bem-estar digital', url: 'https://www.gov.br/secom/pt-br/assuntos/uso-de-telas-por-criancas-e-adolescentes/guia/capitulos/bem-estar-digital' },
                { label: 'Crédito e origem da fotografia', url: 'https://commons.wikimedia.org/wiki/File:Radu_Mihai_2017-06-04_(Unsplash).jpg' }
            ]
        },
        orgaos: {
            title: 'Órgãos: anatomia e consequências graves',
            summary: 'Veja ilustrações anatômicas para conhecer órgãos importantes e fotografias médicas de condições reais. As imagens clínicas mostram amostras ou casos específicos e não significam que todas as pessoas terão os mesmos efeitos.',
            gallery: [
                {
                    title: 'Pulmões — anatomia',
                    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lungs_anatomy.png?width=900',
                    alt: 'Ilustração anatômica dos pulmões humanos.',
                    caption: 'Ilustração anatômica educativa dos pulmões.',
                    credit: 'Edelhart Kempeneers / Wikimedia Commons — consulte a licença CC BY-SA',
                    page: 'https://commons.wikimedia.org/wiki/File:Lungs_anatomy.png'
                },
                {
                    title: 'Fígado — anatomia',
                    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Human_Liver_%28NIH_BioArt_230%29.png?width=900',
                    alt: 'Ilustração anatômica do fígado humano.',
                    caption: 'Ilustração anatômica do fígado, não de um fígado doente.',
                    credit: 'NIAID / Ryan Kissinger / Wikimedia Commons — domínio público nos Estados Unidos',
                    page: 'https://commons.wikimedia.org/wiki/File:Human_Liver_(NIH_BioArt_230).png'
                },
                {
                    title: 'Cérebro — anatomia',
                    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Brain_Lateral_%28NIH_BioArt_60%29.png?width=900',
                    alt: 'Ilustração anatômica do cérebro humano visto de lado.',
                    caption: 'Ilustração anatômica educativa do cérebro.',
                    credit: 'NIAID / Ryan Kissinger / Wikimedia Commons — domínio público nos Estados Unidos',
                    page: 'https://commons.wikimedia.org/wiki/File:Brain_Lateral_(NIH_BioArt_60).png'
                },
                {
                    title: 'Coração — anatomia',
                    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Human_Heart_%28NIH_BioArt_228_-_630872%29.png?width=900',
                    alt: 'Ilustração anatômica do coração humano.',
                    caption: 'Ilustração anatômica do coração; não representa uma lesão.',
                    credit: 'NIAID / Ryan Kissinger / Wikimedia Commons — domínio público nos Estados Unidos',
                    page: 'https://commons.wikimedia.org/wiki/File:Human_Heart_(NIH_BioArt_228_-_630872).png'
                },
                {
                    title: 'Caso médico: tecido pulmonar com enfisema',
                    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Histopathology_of_emphysema.jpg?width=900',
                    alt: 'Fotografia microscópica real de tecido pulmonar com alterações associadas ao enfisema.',
                    caption: 'Fotografia microscópica de uma amostra com enfisema. Não é uma imagem de um pulmão inteiro nem prevê o resultado de cada pessoa.',
                    credit: 'Mikael Häggström / Wikimedia Commons — CC0 1.0',
                    page: 'https://commons.wikimedia.org/wiki/File:Histopathology_of_emphysema.jpg',
                    medical: true,
                    warning: 'Fotografia médica real em nível microscópico. Pode ser desconfortável; escolha se deseja revelá-la.'
                },
                {
                    title: 'Caso médico: fígado com cirrose',
                    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Cirrhosis_liver.jpg?width=900',
                    alt: 'Fotografia médica real de uma amostra de fígado com cirrose.',
                    caption: 'A cirrose pode ter diferentes causas. A fotografia mostra um caso específico e não determina a causa da doença.',
                    credit: 'Narraburra / Wikimedia Commons — CC0 1.0',
                    page: 'https://commons.wikimedia.org/wiki/File:Cirrhosis_liver.jpg',
                    medical: true,
                    warning: 'Fotografia médica real de um fígado com cirrose. Pode ser desconfortável; escolha se deseja revelá-la.'
                }
            ],
            effects: [
                'O tabaco está associado a doenças pulmonares, cardiovasculares e a vários tipos de câncer.',
                'O álcool pode causar doenças do fígado e afetar o cérebro e outros sistemas do corpo.',
                'Danos e riscos variam de acordo com a substância, a exposição, a saúde e outros fatores.',
                'As imagens graves são exemplos médicos específicos, não uma previsão do que acontecerá com uma pessoa.'
            ],
            note: 'Se uma imagem causar desconforto, você pode simplesmente não abri-la. O objetivo é aprender, não chocar nem diagnosticar alguém por uma fotografia.',
            sources: [
                { label: 'Ministério da Saúde — Tabagismo', url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/t/tabagismo/view' },
                { label: 'OMS — Tabaco', url: 'https://www.who.int/en/news-room/fact-sheets/detail/tobacco' },
                { label: 'OMS — Álcool', url: 'https://www.who.int/news-room/fact-sheets/detail/alcohol' }
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

        function makeFigure(item, fallbackTopic) {
            const figure = document.createElement('figure');
            figure.className = item.medical ? 'vicio-figura-medica' : 'vicio-figura-ilustrativa';
            if (item.title && item.title !== fallbackTopic.title) figure.appendChild(addText('h4', item.title, 'vicio-galeria-titulo'));

            function showImage() {
                if (figure.querySelector('img')) return;
                const image = document.createElement('img');
                image.className = 'vicio-imagem';
                image.src = item.image || fallbackTopic.image;
                image.alt = item.alt || item.imageAlt || fallbackTopic.imageAlt || 'Imagem educativa';
                image.loading = 'lazy';
                image.referrerPolicy = 'no-referrer';
                image.addEventListener('error', () => {
                    image.alt = 'A imagem não pôde ser carregada. Use o link da fonte para consultá-la.';
                    image.removeAttribute('src');
                    image.classList.add('vicio-imagem-indisponivel');
                }, { once: true });
                figure.appendChild(image);
                figure.appendChild(addText('p', item.caption || item.imageCaption || fallbackTopic.imageCaption || 'Imagem educativa; ela não representa todos os casos.', 'vicio-legenda-imagem'));
                const credit = document.createElement('figcaption');
                credit.className = 'vicio-credito';
                const creditLink = document.createElement('a');
                creditLink.href = item.page || item.imagePage || fallbackTopic.imagePage || '#';
                creditLink.target = '_blank';
                creditLink.rel = 'noopener noreferrer';
                creditLink.textContent = item.credit || item.imageCredit || fallbackTopic.imageCredit || 'Fonte da imagem';
                credit.appendChild(creditLink);
                figure.appendChild(credit);
            }

            if (item.medical || fallbackTopic.medicalImage) {
                figure.appendChild(addText('p', item.warning || fallbackTopic.imageWarning || 'Fotografia médica real; pode ser desconfortável. Escolha se deseja vê-la.', 'vicio-aviso-imagem'));
                const revealButton = addText('button', 'Mostrar fotografia médica', 'botao-secundario vicio-mostrar-imagem');
                revealButton.type = 'button';
                revealButton.setAttribute('aria-expanded', 'false');
                revealButton.addEventListener('click', () => {
                    showImage();
                    revealButton.setAttribute('aria-expanded', 'true');
                    revealButton.hidden = true;
                }, { once: true });
                figure.appendChild(revealButton);
            } else {
                showImage();
            }
            return figure;
        }

        if (Array.isArray(topic.gallery)) {
            const gallery = document.createElement('div');
            gallery.className = 'vicio-galeria';
            topic.gallery.forEach(item => gallery.appendChild(makeFigure(item, topic)));
            detail.appendChild(gallery);
        } else {
            detail.appendChild(makeFigure(topic, topic));
        }

        detail.appendChild(addText('h4', 'Possíveis malefícios'));
        const list = document.createElement('ul');
        topic.effects.forEach(effect => list.appendChild(addText('li', effect)));
        detail.appendChild(list);

        if (topic.scenario) {
            detail.appendChild(addText('h4', topic.scenarioTitle || 'Exemplo de situação'));
            detail.appendChild(addText('p', topic.scenario, 'vicio-cenario'));
        }

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
