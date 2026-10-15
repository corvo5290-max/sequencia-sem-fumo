/* Objetivo e diário de gatilhos: armazenamento local neste navegador. */
(() => {
  const KEY_TRIGGERS = 'apoioGatilhos_v1';
  const KEY_GOAL = 'apoioObjetivo_v1';
  const $ = id => document.getElementById(id);
  const labels = {tabaco:'Tabaco / cigarro', alcool:'Álcool', medicamentos:'Uso de medicamentos', outras:'Outras substâncias', 'prefiro-nao-dizer':'Objetivo não especificado'};
  function readGoal(){ try{return JSON.parse(localStorage.getItem(KEY_GOAL)||'null')}catch{return null} }
  function saveGoal(){
    const type=$('tipoObjetivo'); if(!type)return;
    const goal={tipo:type.value,meta:$('nomeMeta')?$('nomeMeta').value.trim().slice(0,100):''};
    try{localStorage.setItem(KEY_GOAL,JSON.stringify(goal));}catch{}
    renderGoal();
  }
  function renderGoal(){
    const goal=readGoal();
    if($('resumoObjetivo')) $('resumoObjetivo').textContent=goal?`Objetivo: ${labels[goal.tipo]||'Personalizado'}${goal.meta?' • Meta: '+goal.meta:''}`:'Seu objetivo aparecerá aqui quando você iniciar o acompanhamento.';
    if(goal&&$('tipoObjetivo')) $('tipoObjetivo').value=goal.tipo;
    if(goal&&$('nomeMeta')) $('nomeMeta').value=goal.meta||'';
  }
  // O script principal também ouve o botão; este listener só guarda as preferências.
  if($('comecar')) $('comecar').addEventListener('click',saveGoal);
  function readTriggers(){try{const d=JSON.parse(localStorage.getItem(KEY_TRIGGERS)||'[]');return Array.isArray(d)?d:[]}catch{return []}}
  function addText(parent,tag,text,cls){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=text;parent.appendChild(el);return el}
  function renderTriggers(){
    const list=$('listaGatilhos'),status=$('estadoGatilhos');if(!list||!status)return;
    const items=readTriggers();list.replaceChildren();status.textContent=items.length?`${items.length} registro(s) salvo(s) neste dispositivo.`:'Ainda não há registros.';
    items.slice().reverse().forEach(item=>{const card=document.createElement('article');card.className='registro-gatilho';addText(card,'h3',item.situacao);addText(card,'p',`Como me sentia: ${item.emocao}`);if(item.intensidade)addText(card,'p',`Intensidade registrada: ${item.intensidade}/5`);if(item.estrategia)addText(card,'p',`O que ajudou/poderia ajudar: ${item.estrategia}`);addText(card,'small',new Date(item.data).toLocaleString('pt-BR'));list.appendChild(card)});
  }
  if($('formGatilho')) $('formGatilho').addEventListener('submit',event=>{
    event.preventDefault();const situacao=$('gatilhoSituacao').value,emocao=$('gatilhoEmocao').value;if(!situacao||!emocao)return;
    const item={situacao,emocao,intensidade:$('gatilhoIntensidade').value,estrategia:$('gatilhoEstrategia').value.trim().slice(0,500),data:new Date().toISOString()};
    const items=readTriggers();items.push(item);
    try{localStorage.setItem(KEY_TRIGGERS,JSON.stringify(items));}catch{alert('Não foi possível salvar. O armazenamento do navegador pode estar indisponível.');return}
    $('formGatilho').reset();renderTriggers();window.dispatchEvent(new Event('apoioGatilhosAtualizados'));
  });
  if($('apagarGatilhos')) $('apagarGatilhos').addEventListener('click',()=>{if(readTriggers().length&&confirm('Apagar todos os registros de gatilhos deste navegador?')){localStorage.removeItem(KEY_TRIGGERS);renderTriggers();window.dispatchEvent(new Event('apoioGatilhosAtualizados'))}});
  renderGoal();renderTriggers();
})();
