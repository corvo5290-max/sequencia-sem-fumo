/* Questionário de autoconhecimento. Não salva respostas nem produz diagnósticos. */
(() => {
  const $ = id => document.getElementById(id);
  const content = $('quizConteudo');
  if (!content) return;
  const answers = {};
  let step = 0;
  const questions = [
    { id:'motivo', title:'O que fez você procurar apoio hoje?', options:[
      ['mudar','Quero mudar ou controlar melhor um hábito'],
      ['consequencias','Estou preocupado(a) com consequências na minha vida'],
      ['entender','Quero entender por que isso acontece'],
      ['apoio','Estou procurando informações para apoiar outra pessoa'],
      ['explorar','Ainda não sei bem; quero explorar isso'] ] },
    { id:'situacao', title:'Em quais situações a vontade costuma aparecer?', options:[
      ['estresse','Quando estou estressado(a) ou preocupado(a)'],
      ['emocao','Quando estou triste, sozinho(a) ou irritado(a)'],
      ['pessoas','Quando estou com certas pessoas'],
      ['ambiente','Em um lugar ou momento associado ao hábito'],
      ['tedio','Quando estou entediado(a) ou sem o que fazer'],
      ['variado','Varia muito ou ainda não sei'] ] },
    { id:'substancia', title:'No meio do caminho, vamos identificar o foco. O que você quer abordar?', options:[
      ['tabaco','Cigarro, tabaco ou nicotina'],
      ['alcool','Álcool'],
      ['medicamentos','Medicamentos usados de forma diferente da orientação médica'],
      ['outras','Outra substância'],
      ['naosei','Não sei identificar ou prefiro não dizer'] ] },
    { id:'sentimento', title:'O que você costuma sentir antes ou durante essa vontade?', options:[
      ['ansiedade','Ansiedade ou preocupação'],
      ['tristeza','Tristeza ou solidão'],
      ['irritacao','Irritação ou frustração'],
      ['tedio','Tédio ou inquietação'],
      ['alivio','Quero relaxar ou aliviar algo difícil'],
      ['naosei','Não consigo identificar ainda'] ] },
    { id:'impacto', title:'Como isso tem afetado sua vida?', options:[
      ['rotina','Tem atrapalhado minha rotina, estudos ou trabalho'],
      ['relacoes','Tem afetado relações ou confiança de outras pessoas'],
      ['saude','Tenho preocupação com minha saúde ou segurança'],
      ['preocupacao','Ainda não percebo grande impacto, mas estou preocupado(a)'],
      ['naosei','Não sei avaliar'] ] },
    { id:'apoio', title:'Que tipo de próximo passo parece mais útil para você agora?', options:[
      ['estrategias','Ideias para lidar com a vontade e os gatilhos'],
      ['meta','Definir uma meta pequena e acompanhar meu progresso'],
      ['profissional','Encontrar apoio profissional'],
      ['pessoa','Conversar com alguém de confiança'],
      ['explorar','Quero ver um resumo antes de decidir'] ] }
  ];
  const labels = Object.fromEntries(questions.map(q => [q.id, Object.fromEntries(q.options)]));
  function followupQuestion() {
    const type = answers.substancia;
    if (type === 'tabaco') return { id:'detalhe', title:'Quando a vontade de usar tabaco ou nicotina aparece mais?', options:[['inicio','No começo do dia'],['pausa','Em pausas ou intervalos'],['estresse','Quando estou sob pressão'],['social','Quando outras pessoas usam'],['variado','Varia ou não sei ainda']] };
    if (type === 'alcool') return { id:'detalhe', title:'Qual situação mais se aproxima da sua experiência com álcool?', options:[['social','Em encontros ou situações sociais'],['emocao','Quando quero aliviar emoções difíceis'],['rotina','Virou parte da minha rotina'],['impacto','Estou preocupado(a) com consequências ou controle'],['naosei','Não sei ou prefiro não dizer']] };
    if (type === 'medicamentos') return { id:'detalhe', title:'Qual opção descreve melhor sua preocupação com medicamentos?', options:[['prescricao','Tenho dificuldade para seguir a orientação recebida'],['diferente','Uso de uma forma diferente da orientação'],['efeitos','Tenho dúvidas ou preocupações sobre efeitos'],['naosei','Não sei ou prefiro não dizer']] };
    if (type === 'outras') return { id:'detalhe', title:'O que você mais gostaria de mudar em relação ao uso?', options:[['vontade','A vontade que aparece'],['impacto','O impacto na minha rotina ou relações'],['seguranca','Minha segurança e saúde'],['frequencia','A frequência com que acontece'],['naosei','Ainda não sei']] };
    return { id:'detalhe', title:'O que você percebe com mais frequência?', options:[['vontade','Uma vontade difícil de ignorar'],['emocao','Uma emoção que parece desencadear isso'],['rotina','Um hábito ligado a certos momentos'],['impacto','Uma preocupação com consequências'],['naosei','Ainda não consigo identificar']] };
  }
  function activeQuestions() { return [questions[0], questions[1], questions[2], followupQuestion(), questions[3], questions[4], questions[5]]; }

  function renderQuestion() {
    const currentQuestions = activeQuestions();
    const q = currentQuestions[step];
    $('quizResultado').classList.add('escondido');
    content.classList.remove('escondido');
    $('quizEtapa').textContent = `Pergunta ${step + 1} de ${activeQuestions().length}`;
    $('quizBarra').style.width = `${((step + 1) / activeQuestions().length) * 100}%`;
    content.replaceChildren();
    const title = document.createElement('h3'); title.className = 'quiz-pergunta'; title.textContent = q.title; content.appendChild(title);
    const options = document.createElement('div'); options.className = 'quiz-opcoes';
    q.options.forEach(([value, label]) => {
      const lab = document.createElement('label'); lab.className = 'quiz-opcao';
      const input = document.createElement('input'); input.type = 'radio'; input.name = q.id; input.value = value; input.checked = answers[q.id] === value;
      input.addEventListener('change', () => { answers[q.id] = value; });
      const text = document.createElement('span'); text.textContent = label;
      lab.append(input, text); options.appendChild(lab);
    });
    content.appendChild(options);
    $('quizVoltar').disabled = step === 0;
    $('quizProximo').textContent = step === activeQuestions().length - 1 ? 'Ver meu resumo' : 'Continuar';
  }

  function addParagraph(parent, text, className) {
    const p = document.createElement('p'); if (className) p.className = className; p.textContent = text; parent.appendChild(p); return p;
  }
  function addSection(parent, heading, body) {
    const section = document.createElement('div'); section.className = 'quiz-resultado-item';
    const h = document.createElement('h3'); h.textContent = heading; section.appendChild(h);
    if (Array.isArray(body)) { const ul = document.createElement('ul'); body.forEach(item => { const li = document.createElement('li'); li.textContent = item; ul.appendChild(li); }); section.appendChild(ul); }
    else addParagraph(section, body);
    parent.appendChild(section);
  }
  function showResult() {
    content.classList.add('escondido'); $('quizEtapa').textContent = 'Seu resumo'; $('quizBarra').style.width = '100%';
    $('quizVoltar').classList.add('escondido'); $('quizProximo').classList.add('escondido');
    const result = $('quizResultado'); result.classList.remove('escondido'); result.replaceChildren(); result.className = 'card quiz-resultado';
    const eyebrow = document.createElement('p'); eyebrow.className='pequeno'; eyebrow.textContent='UM PRÓXIMO PASSO POSSÍVEL'; result.appendChild(eyebrow);
    const title = document.createElement('h2'); title.textContent='Obrigado por responder'; result.appendChild(title);
    addParagraph(result, 'Isto não é um diagnóstico. É um ponto de partida para pensar no que pode ajudar você, sem culpa nem julgamento.');
    const substance = labels.substancia[answers.substancia] || 'Não especificado';
    const situation = labels.situacao[answers.situacao] || 'Situação ainda não identificada';
    const feeling = labels.sentimento[answers.sentimento] || 'Sentimento ainda não identificado';
    const impact = labels.impacto[answers.impacto] || 'Impacto ainda não identificado';
    addSection(result, 'O foco que você escolheu', `${substance}. Você também indicou: ${situation.toLowerCase()} e ${feeling.toLowerCase()}. Na pergunta específica sobre seu foco, sua resposta foi: ${followupQuestion().options.find(option => option[0] === answers.detalhe)?.[1] || 'não especificado'}. Isso pode ajudar a observar padrões, mas não confirma uma causa.`);
    const strategies = [];
    if (answers.situacao === 'estresse' || answers.sentimento === 'ansiedade') strategies.push('Quando perceber tensão ou ansiedade, experimente fazer uma pausa em um lugar seguro e conversar com alguém de confiança.');
    if (answers.situacao === 'emocao' || answers.sentimento === 'tristeza' || answers.sentimento === 'alivio') strategies.push('Prepare uma alternativa para momentos emocionalmente difíceis: mandar mensagem para alguém, caminhar em local seguro ou fazer uma atividade curta que costuma ajudar.');
    if (answers.situacao === 'pessoas' || answers.situacao === 'ambiente') strategies.push('Observe quais pessoas, lugares ou horários aparecem com frequência e planeje com antecedência como buscar apoio ou mudar de ambiente com segurança.');
    if (answers.situacao === 'tedio' || answers.sentimento === 'tedio') strategies.push('Deixe preparada uma pequena lista de atividades para preencher esses momentos, como música, jogo, leitura ou sair para conversar com alguém.');
    if (!strategies.length) strategies.push('Durante alguns dias, anote quando a vontade aparece, o que estava acontecendo e o que ajudou. Você não precisa descobrir tudo de uma vez.');
    strategies.push('Se a vontade parecer muito forte, tente adiar decisões, procurar companhia segura e pedir apoio em vez de enfrentar isso sozinho(a).');
    addSection(result, 'Ideias para experimentar', strategies);
    const goals = answers.apoio === 'meta' ? ['Escolha uma meta pequena para esta semana e registre como foi, sem se punir por dificuldades.'] : ['Escolha um próximo passo pequeno e possível para hoje, como registrar um gatilho ou falar com alguém de confiança.'];
    if (answers.motivo === 'entender' || answers.apoio === 'estrategias') goals.push('Use a página “Meus gatilhos” para observar situações e emoções que se repetem.');
    if (answers.impacto === 'saude' || answers.impacto === 'rotina' || answers.impacto === 'relacoes' || answers.apoio === 'profissional') goals.push('Considere procurar um profissional de saúde ou um CAPS AD; os serviços do SUS podem orientar sobre opções na sua região.');
    else goals.push('Se isso continuar preocupando você, procurar um profissional de saúde é uma opção válida mesmo que você ainda não tenha certeza do que está acontecendo.');
    addSection(result, 'Seu próximo passo', goals);
    if (answers.substancia === 'medicamentos') addSection(result, 'Cuidado com medicamentos', 'Não altere nem interrompa um medicamento por conta própria. Converse com o profissional que o prescreveu ou com um farmacêutico para receber orientação segura.');
    if (answers.substancia === 'alcool' || answers.substancia === 'outras') addSection(result, 'Segurança em primeiro lugar', 'Se você usa uma substância com frequência ou sente sintomas quando tenta parar, procure orientação profissional antes de fazer mudanças bruscas: a interrupção pode trazer riscos dependendo da substância e da situação.');
    if (answers.impacto === 'saude') addParagraph(result, 'Como você mencionou preocupação com saúde ou segurança, vale buscar orientação de saúde. Se houver perigo imediato ou uma emergência, procure um pronto-socorro ou ligue para o SAMU (192).', 'aviso-privacidade');
    const nav = document.createElement('div'); nav.style.marginTop='16px';
    const help = document.createElement('button'); help.type='button'; help.className='botao-principal'; help.textContent='Ver opções de ajuda'; help.addEventListener('click', () => { document.querySelector('[data-pagina="ajuda"]')?.click(); resetQuiz(false); }); nav.appendChild(help);
    const triggers = document.createElement('button'); triggers.type='button'; triggers.className='botao-secundario'; triggers.textContent='Registrar um gatilho'; triggers.addEventListener('click', () => { document.querySelector('[data-pagina="gatilhos"]')?.click(); resetQuiz(false); }); nav.appendChild(triggers);
    const again = document.createElement('button'); again.type='button'; again.className='botao-secundario'; again.textContent='Refazer questionário'; again.addEventListener('click', () => resetQuiz(true)); nav.appendChild(again);
    result.appendChild(nav);
  }
  function resetQuiz(goFirst) {
    Object.keys(answers).forEach(key => delete answers[key]); step = 0;
    $('quizVoltar').classList.remove('escondido'); $('quizProximo').classList.remove('escondido');
    renderQuestion();
    if (goFirst) { document.querySelector('[data-pagina="questionario"]')?.click(); }
  }
  $('quizVoltar').addEventListener('click', () => { if (step > 0) { step--; renderQuestion(); } });
  $('quizProximo').addEventListener('click', () => {
    const q = activeQuestions()[step];
    if (!answers[q.id]) { const old = content.querySelector('.quiz-aviso'); if (old) old.remove(); const msg = document.createElement('p'); msg.className='quiz-aviso aviso-privacidade'; msg.textContent='Escolha uma opção para continuar. Se não souber, pode selecionar “Ainda não sei” ou “prefiro não dizer”.'; content.appendChild(msg); return; }
    if (step < activeQuestions().length - 1) { step++; renderQuestion(); } else showResult();
  });
  document.querySelectorAll('[data-pagina="questionario"]').forEach(btn => btn.addEventListener('click', () => resetQuiz(false)));
  renderQuestion();
})();
