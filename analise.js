/* Análise estatística e baseada em regras. Executa inteiramente no navegador. */
(() => {
  'use strict';
  const STORAGE_KEY = 'apoioGatilhos_v1';
  const root = document.getElementById('analiseResumo');
  if (!root) return;

  function readRecords() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(raw)) return [];
      return raw.filter(item => item && typeof item === 'object' &&
        typeof item.situacao === 'string' && typeof item.emocao === 'string');
    } catch (_) { return []; }
  }
  function el(tag, text, cls) {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = String(text);
    if (cls) node.className = cls;
    return node;
  }
  function card(title, content) {
    const node = el('section', null, 'analise-cartao');
    node.appendChild(el('h3', title));
    if (typeof content === 'string' || typeof content === 'number') node.appendChild(el('p', content));
    else if (content) node.appendChild(content);
    return node;
  }
  function normalized(value) { return String(value || '').trim().toLocaleLowerCase('pt-BR'); }
  function tally(records, field) {
    const map = new Map();
    records.forEach(record => {
      const value = String(record[field] || '').trim();
      if (!value) return;
      const key = normalized(value);
      const old = map.get(key) || { label: value, count: 0 };
      old.count += 1;
      map.set(key, old);
    });
    return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'pt-BR'));
  }
  function percent(count, total) { return total ? Math.round(count / total * 100) : 0; }
  function listWithBars(items, total) {
    const ul = el('ul', null, 'analise-lista');
    items.forEach(item => {
      const li = el('li');
      li.appendChild(el('div', `${item.label}: ${item.count} de ${total} registros (${percent(item.count, total)}%)`));
      const track = el('div', null, 'analise-barra-fundo');
      const bar = el('div', null, 'analise-barra');
      bar.style.width = `${percent(item.count, total)}%`;
      track.appendChild(bar); li.appendChild(track); ul.appendChild(li);
    });
    return ul;
  }
  function render() {
    const records = readRecords();
    root.replaceChildren();
    if (!records.length) {
      const empty = el('div', null, 'analise-vazio');
      empty.appendChild(el('h3', 'Ainda não há dados suficientes'));
      empty.appendChild(el('p', 'Adicione registros em “Meus gatilhos”. A análise vai usar somente o que você decidir anotar neste dispositivo.'));
      const btn = el('button', 'Ir para meus gatilhos', 'botao-principal'); btn.type = 'button';
      btn.addEventListener('click', () => document.querySelector('[data-pagina="gatilhos"]')?.click());
      empty.appendChild(btn); root.appendChild(empty); return;
    }

    const intro = card('Registros analisados', null);
    intro.appendChild(el('div', records.length, 'analise-numero'));
    intro.appendChild(el('p', 'Cada registro conta como uma observação. Isso não é uma medida clínica.'));
    root.appendChild(intro);

    const situations = tally(records, 'situacao');
    const emotions = tally(records, 'emocao');
    if (situations.length) {
      const c = card('Situações mais anotadas', null);
      c.appendChild(listWithBars(situations.slice(0, 4), records.length));
      if (situations[0].count >= 2) c.appendChild(el('p', `Pista para observar: “${situations[0].label}” aparece em ${situations[0].count} registros. Isso é uma repetição nos dados, não prova de causa.`));
      else c.appendChild(el('p', 'Ainda não há uma situação repetida nos registros.'));
      root.appendChild(c);
    }
    if (emotions.length) {
      const c = card('Emoções mais anotadas', null);
      c.appendChild(listWithBars(emotions.slice(0, 4), records.length));
      if (emotions[0].count >= 2) c.appendChild(el('p', `“${emotions[0].label}” é a emoção mais anotada até agora. Observe se isso continua aparecendo nos próximos registros.`));
      else c.appendChild(el('p', 'As emoções estão variadas ou ainda há poucos registros para identificar repetição.'));
      root.appendChild(c);
    }

    const combos = new Map();
    records.forEach(record => {
      const situation = String(record.situacao || '').trim();
      const emotion = String(record.emocao || '').trim();
      if (!situation || !emotion) return;
      const key = normalized(situation) + '\u0000' + normalized(emotion);
      const old = combos.get(key) || { situation, emotion, count: 0 };
      old.count += 1; combos.set(key, old);
    });
    const repeated = [...combos.values()].filter(item => item.count >= 2).sort((a,b) => b.count-a.count);
    const comboCard = card('Situação + emoção', null);
    if (repeated.length) {
      const ul = el('ul', null, 'analise-lista');
      repeated.slice(0, 4).forEach(item => ul.appendChild(el('li', `“${item.situation}” + “${item.emotion}”: ${item.count} vezes. É uma combinação recorrente nos registros, não uma explicação definitiva.`)));
      comboCard.appendChild(ul);
    } else {
      comboCard.appendChild(el('p', records.length < 3 ? 'Com poucos registros, ainda é cedo para destacar combinações. Continue anotando se quiser.' : 'Ainda não aparece uma combinação de situação e emoção repetida pelo menos duas vezes.'));
    }
    root.appendChild(comboCard);

    const scored = records.map(r => Number(r.intensidade)).filter(n => Number.isFinite(n) && n >= 1 && n <= 5);
    const intensityCard = card('Intensidade anotada', null);
    if (scored.length) {
      const avg = scored.reduce((sum, n) => sum + n, 0) / scored.length;
      intensityCard.appendChild(el('div', avg.toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' / 5', 'analise-numero'));
      intensityCard.appendChild(el('p', `Média de ${scored.length} registro(s) com intensidade preenchida. É uma média descritiva das suas próprias avaliações.`));
      const high = scored.filter(n => n >= 4).length;
      intensityCard.appendChild(el('p', `${high} de ${scored.length} avaliações preenchidas foram 4 ou 5.`));
    } else {
      intensityCard.appendChild(el('p', 'Você ainda não preencheu a intensidade da vontade nos registros. Esse campo é opcional.'));
    }
    root.appendChild(intensityCard);

    const notes = records.map(r => String(r.estrategia || '').trim()).filter(Boolean);
    const strategyCard = card('Estratégias que você anotou', null);
    if (notes.length) {
      const ul = el('ul', null, 'analise-lista');
      notes.slice(-3).reverse().forEach(note => ul.appendChild(el('li', note)));
      strategyCard.appendChild(el('p', `Há ${notes.length} registro(s) com uma estratégia ou ideia escrita. As anotações podem dizer o que você tentou ou o que gostaria de tentar; o site não presume que funcionou.`));
      strategyCard.appendChild(ul);
    } else {
      strategyCard.appendChild(el('p', 'Você ainda não anotou estratégias. Se quiser, registre o que ajudou ou o que gostaria de experimentar em um próximo momento difícil.'));
    }
    root.appendChild(strategyCard);

    const next = card('Um próximo passo possível', null);
    if (records.length < 3) {
      next.appendChild(el('p', 'Por enquanto há poucos registros para comparar. Se for confortável, anote algumas situações ao longo do tempo e volte para observar se algo se repete. Não é necessário registrar tudo nem se pressionar.'));
    } else if (repeated.length || (situations[0] && situations[0].count >= 2) || (emotions[0] && emotions[0].count >= 2)) {
      next.appendChild(el('p', 'Escolha uma repetição que você queira observar e pense em um apoio pequeno para aquela situação — por exemplo, falar com alguém de confiança, fazer uma pausa em local seguro ou planejar uma atividade alternativa. Você pode discordar da interpretação: os registros não contam a história toda.'));
    } else {
      next.appendChild(el('p', 'Seus registros ainda mostram variedade. Continue apenas se isso for útil para você; não existe obrigação de encontrar um padrão. Um profissional pode ajudar a pensar no contexto se isso estiver preocupando você.'));
    }
    root.appendChild(next);
  }
  const updateButton = document.getElementById('atualizarAnalise');
  if (updateButton) updateButton.addEventListener('click', render);
  window.addEventListener('apoioGatilhosAtualizados', render);
  window.addEventListener('storage', event => { if (event.key === STORAGE_KEY) render(); });
  render();
})();
