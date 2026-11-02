/* ==========================================================================
   OPERAÇÃO NATAL MÁGICO · app.js
   Tudo roda no navegador: sem servidor, sem banco de dados, sem login.
   Arquivos do site: index.html (estrutura), estilo.css (visual), app.js (este).
   ========================================================================== */
(function(){
  'use strict';
  var $ = function(s){ return document.querySelector(s); };

  /* ======================================================================
     CÓDIGOS DE ACESSO
     Cada código válido entra aqui como um número (hash), nunca em texto.
     Para trocar ou acrescentar um código, gere o hash e atualize a lista;
     para bloquear um código vazado, remova o hash dele e publique de novo.
     ====================================================================== */
  var SAL = 2026;
  var CODIGOS = [
    5315615256024762   /* código oficial da temporada 2026: MAGIA2026 */
  ];
  var CHAVE_ACESSO = 'onm-acesso';

  function hashCodigo(str, seed){
    var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(var i = 0, ch; i < str.length; i++){
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  function normalizarCodigo(c){ return String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  var acessoSessao = false;
  function liberado(){
    if(acessoSessao) return true;
    try{
      var h = Number(localStorage.getItem(CHAVE_ACESSO));
      if(h && CODIGOS.indexOf(h) >= 0){ acessoSessao = true; return true; }
    } catch(e){}
    return false;
  }

  /* ---------- peças gráficas (sem dados do usuário) ---------- */
  var ESTRELA = 'M12 2.2l2.95 6.3 6.9.75-5.15 4.7 1.45 6.8L12 17.3l-6.15 3.45 1.45-6.8L2.15 9.25l6.9-.75z';
  function svgEstrela(){ return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ESTRELA + '" fill="currentColor"/></svg>'; }
  var contadorId = 0;
  function emblema(){
    var id = 'circ' + (++contadorId);
    return '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<defs><path id="' + id + '" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>' +
      '<circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width=".8"/>' +
      '<circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" stroke-width="1.2"/>' +
      '<text font-family="Special Elite, Courier New, monospace" font-size="10.5" fill="currentColor">' +
      '<textPath href="#' + id + '" textLength="272" lengthAdjust="spacing">CORREIO OFICIAL · POLO NORTE · </textPath></text>' +
      '<g transform="translate(60 59) scale(1.9) translate(-12 -12)"><path d="' + ESTRELA + '" fill="currentColor"/></g>' +
      '</svg>';
  }
  function carimbo(dataCurta){
    return '<svg viewBox="0 0 150 100" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">' +
      '<path d="M2 32 q8 -6 16 0 t16 0 t16 0 t14 0"/><path d="M2 44 q8 -6 16 0 t16 0 t16 0 t14 0"/>' +
      '<path d="M2 56 q8 -6 16 0 t16 0 t16 0 t14 0"/><path d="M2 68 q8 -6 16 0 t16 0 t16 0 t14 0"/></g>' +
      '<circle cx="106" cy="50" r="42" fill="none" stroke="currentColor" stroke-width="2.4"/>' +
      '<circle cx="106" cy="50" r="34" fill="none" stroke="currentColor" stroke-width="1.2"/>' +
      '<text x="106" y="33" text-anchor="middle" font-family="Special Elite, Courier New, monospace" font-size="9" letter-spacing="1.4" fill="currentColor">POLO NORTE</text>' +
      '<text x="106" y="54" text-anchor="middle" font-family="Special Elite, Courier New, monospace" font-size="10" fill="currentColor">' + dataCurta + '</text>' +
      '<text x="106" y="73" text-anchor="middle" font-family="Special Elite, Courier New, monospace" font-size="9" letter-spacing="3" fill="currentColor">★ ★ ★</text>' +
      '</svg>';
  }
  document.querySelectorAll('[data-emblema]').forEach(function(el){ el.innerHTML = emblema(); });
  document.querySelectorAll('[data-estrela]').forEach(function(el){ el.innerHTML = svgEstrela(); });

  /* ---------- personagens (desenhos originais) ---------- */
  var DESENHOS = {
    faisca:
      '<svg class="svg-faisca" viewBox="0 0 200 250" aria-hidden="true">' +
      '<rect x="80" y="220" width="14" height="18" rx="4" class="c-lacre"/><rect x="106" y="220" width="14" height="18" rx="4" class="c-lacre"/>' +
      '<ellipse cx="84" cy="241" rx="14" ry="6" class="c-duende-escuro"/><ellipse cx="116" cy="241" rx="14" ry="6" class="c-duende-escuro"/>' +
      '<circle cx="70" cy="237" r="4" class="c-ouro"/><circle cx="130" cy="237" r="4" class="c-ouro"/>' +
      '<path d="M70 175 Q52 192 56 210" class="c-braco"/><circle cx="56" cy="214" r="8" class="c-pele"/>' +
      '<path d="M68 168 Q100 158 132 168 L146 226 Q100 236 54 226 Z" class="c-duende"/>' +
      '<path d="M60 198 Q100 206 140 198 L142 210 Q100 218 58 210 Z" class="c-cinto"/>' +
      '<rect x="91" y="199" width="18" height="14" rx="2" class="c-ouro"/><rect x="96" y="203" width="8" height="6" rx="1" class="c-cinto"/>' +
      '<path d="M70 166 L80 179 L90 166 L100 179 L110 166 L120 179 L130 166 Q100 155 70 166 Z" class="c-lacre"/>' +
      '<g class="braco-aceno"><path d="M130 176 Q152 160 160 138" class="c-braco"/><circle cx="161" cy="133" r="9" class="c-pele"/></g>' +
      '<path d="M63 118 L28 95 L61 141 Z" class="c-pele"/><path d="M137 118 L172 95 L139 141 Z" class="c-pele"/>' +
      '<path d="M60 121 L40 106 L59 133 Z" class="c-pele-sombra"/><path d="M140 121 L160 106 L141 133 Z" class="c-pele-sombra"/>' +
      '<circle cx="100" cy="126" r="40" class="c-pele"/>' +
      '<path d="M64 112 Q78 98 90 108 Q100 96 110 108 Q122 98 136 112 L136 100 L64 100 Z" class="c-cabelo"/>' +
      '<ellipse cx="86" cy="124" rx="4.6" ry="5.6" class="c-olho"/><ellipse cx="114" cy="124" rx="4.6" ry="5.6" class="c-olho"/>' +
      '<circle cx="87.6" cy="122" r="1.6" class="c-brilho"/><circle cx="115.6" cy="122" r="1.6" class="c-brilho"/>' +
      '<circle cx="77" cy="138" r="6.5" class="c-bochecha"/><circle cx="123" cy="138" r="6.5" class="c-bochecha"/>' +
      '<ellipse cx="100" cy="133" rx="4.5" ry="3.4" class="c-pele-sombra"/>' +
      '<path d="M88 142 Q100 154 112 142" class="c-boca"/>' +
      '<path d="M60 102 Q68 42 118 22 Q150 10 170 30 Q142 30 137 60 Q134 82 140 102 Z" class="c-duende"/>' +
      '<path d="M57 94 Q100 83 143 94 L143 108 Q100 97 57 108 Z" class="c-lacre"/>' +
      '<circle cx="170" cy="30" r="11" class="c-ouro-claro"/>' +
      '<g transform="translate(170 30) scale(.55) translate(-12 -12)"><path d="' + ESTRELA + '" class="c-ouro"/></g>' +
      '</svg>',
    lumi:
      '<svg class="svg-lumi" viewBox="0 0 230 230" aria-hidden="true">' +
      '<rect x="92" y="176" width="12" height="40" rx="5" class="c-rena-escuro"/><rect x="152" y="176" width="12" height="40" rx="5" class="c-rena-escuro"/>' +
      '<rect x="110" y="178" width="12" height="40" rx="5" class="c-rena"/><rect x="170" y="176" width="12" height="40" rx="5" class="c-rena"/>' +
      '<rect x="90" y="210" width="16" height="9" rx="3" class="c-casco"/><rect x="108" y="212" width="16" height="9" rx="3" class="c-casco"/>' +
      '<rect x="150" y="210" width="16" height="9" rx="3" class="c-casco"/><rect x="168" y="210" width="16" height="9" rx="3" class="c-casco"/>' +
      '<ellipse cx="194" cy="146" rx="10" ry="8" class="c-rena-claro"/>' +
      '<ellipse cx="136" cy="160" rx="58" ry="36" class="c-rena"/>' +
      '<ellipse cx="130" cy="174" rx="38" ry="16" class="c-rena-claro"/>' +
      '<path d="M78 152 Q78 122 70 104 L98 100 Q104 128 112 152 Z" class="c-rena"/>' +
      '<path d="M64 68 Q57 50 64 32 M62 52 Q51 48 47 37 M84 68 Q93 50 89 32 M89 52 Q99 46 104 36" class="c-galho"/>' +
      '<path d="M50 84 Q29 72 24 85 Q35 96 52 93 Z" class="c-rena-escuro"/><path d="M96 82 Q115 67 121 80 Q111 92 94 92 Z" class="c-rena-escuro"/>' +
      '<ellipse cx="72" cy="94" rx="30" ry="28" class="c-rena"/>' +
      '<path d="M71 124 Q89 134 106 124 L108 136 Q89 146 69 136 Z" class="c-lacre"/><path d="M98 134 L110 160 L97 162 L90 137 Z" class="c-lacre"/>' +
      '<ellipse cx="60" cy="112" rx="20" ry="14" class="c-rena-claro"/>' +
      '<ellipse cx="49" cy="107" rx="7" ry="5.5" class="c-nariz-rena"/><circle cx="47" cy="105" r="1.6" class="c-brilho"/>' +
      '<ellipse cx="64" cy="88" rx="7" ry="8" class="c-brilho"/><circle cx="62.5" cy="89" r="4.6" class="c-olho"/><circle cx="61" cy="87" r="1.5" class="c-brilho"/>' +
      '<ellipse cx="86" cy="88" rx="6" ry="7.5" class="c-brilho"/><circle cx="84.5" cy="89" r="4.2" class="c-olho"/><circle cx="83" cy="87" r="1.4" class="c-brilho"/>' +
      '<circle cx="90" cy="103" r="5" class="c-bochecha"/>' +
      '<path d="M53 120 Q59 125 66 120" class="c-boca"/>' +
      '<g transform="translate(76 72) scale(.62) translate(-12 -12)"><path d="' + ESTRELA + '" class="c-estrela-lumi"/></g>' +
      '</svg>'
  };
  document.querySelectorAll('[data-personagem]').forEach(function(el){ el.innerHTML = DESENHOS[el.dataset.personagem] || ''; });

  /* ---------- textos ---------- */
  var MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  var MESC = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
  function hojeISO(){ var t = new Date(); return t.getFullYear() + '-' + String(t.getMonth()+1).padStart(2,'0') + '-' + String(t.getDate()).padStart(2,'0'); }
  function partes(iso){ var p = iso.split('-').map(Number); return {a:p[0], m:p[1], d:p[2]}; }
  function dataExtenso(iso){ var p = partes(iso); return (p.d === 1 ? '1º' : p.d) + ' de ' + MESES[p.m-1] + ' de ' + p.a; }
  function dataCurta(iso){ var p = partes(iso); return String(p.d).padStart(2,'0') + ' ' + MESC[p.m-1] + ' ' + p.a; }
  function limpa(s){ return String(s || '').replace(/\s+/g,' ').trim(); }
  function semPonto(s){ return limpa(s).replace(/[\s.!;,]+$/,''); }
  function minuscula(s){ if(!s) return s; if(s.length > 1 && s[1] === s[1].toLowerCase()) return s[0].toLowerCase() + s.slice(1); return s; }
  function maiuscula(s){ return s ? s[0].toUpperCase() + s.slice(1) : s; }
  function nomeProprio(s){
    return limpa(s).split(' ').map(function(p, i){
      if(i > 0 && /^(de|da|do|das|dos|e)$/i.test(p)) return p.toLowerCase();
      return p ? p[0].toUpperCase() + p.slice(1) : p;
    }).join(' ');
  }
  function semAspas(s){ return limpa(s).replace(/^["“”']+|["“”']+$/g,''); }
  function semAcento(s){ return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function novoNumero(){ return 'PN-' + new Date().getFullYear() + '-' + (1000 + Math.floor(Math.random() * 9000)); }

  var EXEMPLO = {
    nome:'Maria', genero:'menina', idade:'7', cidade:'Brasília',
    gosta:'desenhar e brincar com o Thor', conquista:'aprendeu a ler sozinha',
    pessoa:'a vovó Lúcia', pet:'o Thor', pedido:'uma bicicleta azul',
    recado:'Temos muito orgulho de você. Te amamos daqui até o Polo Norte!', assina:'Mamãe e papai',
    num:'PN-2026-1225', dt:hojeISO()
  };

  /* ---------- a carta ---------- */
  function para(cls){
    var p = document.createElement('p');
    if(cls) p.className = cls;
    for(var i = 1; i < arguments.length; i++){
      var x = arguments[i];
      if(typeof x === 'string'){ p.append(x); }
      else { var s = document.createElement('span'); s.className = 'nome-destaque'; s.textContent = x.b; p.append(s); }
    }
    return p;
  }

  function renderCarta(alvo, d){
    var ela = d.genero === 'menina';
    var art = document.createElement('article');
    art.className = 'carta';
    art.setAttribute('aria-label', 'Carta do Papai Noel para ' + d.nome);

    var topo = document.createElement('header');
    topo.className = 'carta-topo';
    topo.innerHTML = '<div class="emblema">' + emblema() + '</div>' +
      '<div class="timbre"><p class="timbre-1">Correio Oficial do Polo Norte</p><p class="timbre-2">Gabinete do Papai Noel · Central das Missões</p></div>' +
      '<div class="carimbo">' + carimbo(dataCurta(d.dt)) + '</div>';
    art.append(topo);
    art.append(para('carta-local', 'Polo Norte, ' + dataExtenso(d.dt)));

    var c = document.createElement('div');
    c.className = 'carta-corpo';
    c.append(para('saudacao', (ela ? 'Querida ' : 'Querido '), {b:d.nome}, ','));
    c.append(para('', 'Aqui é o Papai Noel, escrevendo da minha mesa no Polo Norte. Se a letra sair um pouco torta, a culpa é do frio: hoje fez 30 graus abaixo de zero!'));
    var anos = d.idade === '1' ? 'ano' : 'anos';
    c.append(para('', 'Os duendes da Central das Missões acompanham as crianças do mundo inteiro, e eles me falaram muito de você. Sei que você tem ' + d.idade + ' ' + anos + ' e mora em ' + d.cidade + '.' + (d.gosta ? ' Sei também que você adora ' + d.gosta + '.' : '')));
    if(d.conquista){
      c.append(para('', 'Fiquei sabendo de uma notícia que me deixou muito orgulhoso: este ano você ' + d.conquista + '. Contei para todos os duendes!'));
    }
    if(d.pessoa && d.pet){
      c.append(para('', 'Mande um abraço meu para ' + d.pessoa + ' e um carinho para ' + d.pet + '. Os duendes dizem que vocês formam um time e tanto!'));
    } else if(d.pessoa){
      c.append(para('', 'Mande um abraço meu para ' + d.pessoa + '. Os duendes dizem que vocês formam uma dupla e tanto!'));
    } else if(d.pet){
      c.append(para('', 'E mande um carinho meu para ' + d.pet + '. As renas adoram saber de bichinhos tão queridos!'));
    }
    c.append(para('', 'Agora preciso te contar um segredo, e ele não pode sair desta casa. Este ano, o Medidor de Magia do Polo Norte começou a baixar. Sem magia, o meu trenó não consegue voar. E a pequena rena Lumi, que vai fazer o primeiro voo dela neste Natal, ainda não tem força suficiente.'));
    c.append(para('', 'Só existe um jeito de recarregar a magia: com gestos de bondade, coragem e alegria feitos por crianças especiais. Por isso escolhi algumas crianças pelo mundo para uma missão muito importante. E você, ', {b:d.nome}, ', foi ' + (ela ? 'escolhida' : 'escolhido') + '.'));
    c.append(para('', 'A partir de hoje, você é Agente Especial do Polo Norte. O duende Faísca, chefe da Central das Missões, vai deixar uma missão para você a cada dia. Cada missão cumprida acende uma estrela no Medidor de Magia. Guarde bem o seu número de agente:'));

    var caixa = document.createElement('div');
    caixa.className = 'carta-agente';
    caixa.append(para('ca-rotulo', 'Número de Agente Especial'), para('ca-num', d.num), para('ca-nota', 'Este número vai no seu Passaporte do Polo Norte.'));
    c.append(caixa);

    if(d.pedido){
      c.append(para('', 'Ah, e eu li com carinho o seu desejo de Natal: ' + d.pedido + '. Ele está guardado num lugar especial da minha mesa.'));
    }
    c.append(para('pergunta', 'Você aceita a missão?'));
    art.append(c);

    var fim = document.createElement('div');
    fim.className = 'carta-fim';
    var assin = document.createElement('div');
    assin.append(para('', 'Com todo o carinho do Polo Norte,'));
    assin.append(para('assinatura', 'Papai Noel'));
    var lacre = document.createElement('div');
    lacre.className = 'lacre';
    lacre.innerHTML = svgEstrela();
    fim.append(assin, lacre);
    art.append(fim);

    if(d.recado){
      var quem = d.assina ? maiuscula(d.assina) : 'Alguém que te ama muito';
      var plural = /\s(e|&)\s/i.test(quem);
      art.append(para('carta-ps', 'P.S.: ' + quem + ' me ' + (plural ? 'pediram' : 'pediu') + ' para te dar um recado: “' + semAspas(d.recado) + '”'));
    }
    art.append(para('carta-rodape', 'Agente nº ' + d.num + ' · Documento oficial para Agentes Especiais'));

    alvo.replaceChildren(art);
  }

  /* ---------- o passaporte ---------- */
  function linhaMRZ(t){ t = t.slice(0, 44); while(t.length < 44) t += '<'; return t; }
  function renderPassaporte(alvo, d){
    var art = document.createElement('article');
    art.className = 'passaporte';
    art.setAttribute('aria-label', 'Passaporte do Polo Norte de ' + d.nome);

    var topo = document.createElement('header');
    topo.className = 'pp-topo';
    topo.innerHTML = '<div class="pp-emblema">' + emblema() + '</div>' +
      '<div><p class="pp-titulo">Passaporte do Polo Norte</p><p class="pp-sub">Agente Especial · Operação Natal Mágico</p></div>';
    art.append(topo);

    var corpo = document.createElement('div');
    corpo.className = 'pp-corpo';
    var foto = document.createElement('div');
    foto.className = 'pp-foto';
    foto.textContent = 'Cole aqui a sua foto';
    var dl = document.createElement('dl');
    dl.className = 'pp-dados';
    function campo(rotulo, valor, cls, inteiro){
      var w = document.createElement('div');
      if(inteiro) w.className = 'inteiro';
      var dt = document.createElement('dt'); dt.textContent = rotulo;
      var dd = document.createElement('dd'); if(cls) dd.className = cls; dd.textContent = valor || '';
      w.append(dt, dd); dl.append(w);
    }
    campo('Nome', d.nome, '', true);
    campo('Idade', d.idade + (d.idade === '1' ? ' ano' : ' anos'));
    campo('Cidade', d.cidade);
    campo('Nº de agente', d.num, 'pp-num');
    campo('Emitido em', dataCurta(d.dt));
    campo('Validade', 'Enquanto você acreditar', '', true);
    campo('Codinome secreto', '', 'pp-branco', true);
    campo('Assinatura do agente', '', 'pp-branco', true);
    corpo.append(foto, dl);
    art.append(corpo);

    var nomeMRZ = semAcento(d.nome).toUpperCase().replace(/[^A-Z ]/g, '').trim().replace(/\s+/g, '<');
    var dt = partes(d.dt);
    var l1 = linhaMRZ('P<PNT<<AGENTE<ESPECIAL<<' + nomeMRZ);
    var l2 = linhaMRZ(d.num.replace(/-/g, '') + '<' + String(d.idade).padStart(2, '0') + '<<' + String(dt.a).slice(2) + String(dt.m).padStart(2,'0') + String(dt.d).padStart(2,'0') + '<<NATAL<MAGICO');
    var mrz = document.createElement('p');
    mrz.className = 'pp-mrz';
    mrz.setAttribute('aria-hidden', 'true');
    mrz.textContent = l1 + '\n' + l2;
    art.append(mrz);

    alvo.replaceChildren(art);
  }

  /* ---------- telas ---------- */
  var TELAS = ['acesso','inicio','form','preparando','pronta','guia'];
  var telaAtual = 'inicio', telaAntesDoGuia = 'inicio';
  function mostrar(id){
    if(id !== 'acesso' && id !== 'preparando' && !liberado()) id = 'acesso';
    TELAS.forEach(function(t){ $('#tela-' + t).hidden = (t !== id); });
    telaAtual = id;
    window.scrollTo(0, 0);
  }

  var dados = null;
  var origemDemo = false;

  var CAMPOS = ['nome','idade','cidade','gosta','conquista','pessoa','pet','pedido','recado','assina'];
  function preencherForm(d){
    CAMPOS.forEach(function(k){ $('#f-' + k).value = d[k] || ''; });
    var r = $('#g-' + d.genero);
    if(r) r.checked = true;
  }

  function lerForm(){
    var v = function(k){ return $('#f-' + k).value; };
    var g = document.querySelector('input[name="genero"]:checked');
    var d = {
      nome: nomeProprio(v('nome')),
      genero: g ? g.value : '',
      idade: limpa(v('idade')),
      cidade: nomeProprio(v('cidade')),
      gosta: minuscula(semPonto(v('gosta'))),
      conquista: minuscula(semPonto(v('conquista'))),
      pessoa: semPonto(v('pessoa')),
      pet: semPonto(v('pet')),
      pedido: minuscula(semPonto(v('pedido'))),
      recado: limpa(v('recado')),
      assina: semPonto(v('assina'))
    };
    var erros = {};
    if(!d.nome) erros.nome = 'Escreva o nome da criança.';
    if(!d.genero) erros.genero = 'Escolha menino ou menina.';
    var idade = parseInt(d.idade, 10);
    if(!idade || idade < 1 || idade > 14) erros.idade = 'Digite uma idade entre 1 e 14 anos.';
    else d.idade = String(idade);
    if(!d.cidade) erros.cidade = 'Escreva a cidade onde a criança mora.';

    ['nome','genero','idade','cidade'].forEach(function(k){
      var el = $('#erro-' + k), msg = erros[k] || '';
      el.textContent = msg; el.hidden = !msg;
      var campo = k === 'genero' ? null : $('#f-' + k);
      if(campo) campo.setAttribute('aria-invalid', msg ? 'true' : 'false');
    });
    var primeiro = ['nome','genero','idade','cidade'].filter(function(k){ return erros[k]; })[0];
    if(primeiro){
      var alvo = primeiro === 'genero' ? $('#g-menino') : $('#f-' + primeiro);
      alvo.focus();
      alvo.scrollIntoView({block:'center', behavior:'smooth'});
      return null;
    }
    return d;
  }

  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function preparar(){
    mostrar('preparando');
    var itens = Array.prototype.slice.call(document.querySelectorAll('#passos li'));
    itens.forEach(function(li){ li.classList.remove('feito'); });
    var passo = reduzMovimento ? 120 : 850;
    itens.forEach(function(li, i){ setTimeout(function(){ li.classList.add('feito'); }, passo * (i + 1)); });
    setTimeout(function(){ montarPronta(); escolherAba('carta'); mostrar('pronta'); }, passo * (itens.length + 1));
  }

  function montarPronta(){
    $('#pronta-titulo').textContent = 'A carta ' + (dados.genero === 'menina' ? 'da ' : 'do ') + dados.nome + ' está pronta';
    $('#num-missao').textContent = dados.num;
    renderCarta($('#carta-final'), dados);
    renderPassaporte($('#passaporte-final'), dados);
    $('#link-campo').hidden = true;
    preencherForm(dados);
  }

  /* ---------- abas ---------- */
  var ABAS = ['carta', 'passaporte'];
  function escolherAba(nome, focar){
    ABAS.forEach(function(a){
      var ativa = a === nome;
      var b = $('#aba-' + a);
      b.setAttribute('aria-selected', String(ativa));
      b.tabIndex = ativa ? 0 : -1;
      $('#painel-' + a).hidden = !ativa;
      if(ativa && focar) b.focus();
    });
  }
  ABAS.forEach(function(a, i){
    var b = $('#aba-' + a);
    b.addEventListener('click', function(){ escolherAba(a); });
    b.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
        var j = (i + (e.key === 'ArrowRight' ? 1 : ABAS.length - 1)) % ABAS.length;
        escolherAba(ABAS[j], true); e.preventDefault();
      }
    });
  });

  /* ---------- impressão ---------- */
  function imprimir(tipo){
    var alvo = $('#impressao');
    if(tipo === 'carta') renderCarta(alvo, dados);
    else if(tipo === 'passaporte') renderPassaporte(alvo, dados);
    else {
      var guia = $('#guia-conteudo').cloneNode(true);
      guia.removeAttribute('id');
      guia.querySelectorAll('[id]').forEach(function(el){ el.removeAttribute('id'); });
      var titulo = document.createElement('p');
      titulo.className = 'guia-titulo';
      titulo.textContent = 'Guia secreto dos pais · Operação Natal Mágico';
      guia.prepend(titulo);
      alvo.replaceChildren(guia);
    }
    window.print();
  }

  /* ---------- link mágico (abre só a apresentação desta carta) ---------- */
  function codifica(d){
    var b = btoa(unescape(encodeURIComponent(JSON.stringify(d))));
    return b.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
  }
  function decodifica(c){
    try{
      var b = c.replace(/-/g,'+').replace(/_/g,'/');
      while(b.length % 4) b += '=';
      var d = JSON.parse(decodeURIComponent(escape(atob(b))));
      if(!d || typeof d !== 'object' || !d.nome || !d.cidade || !d.idade) return null;
      var limpo = {};
      CAMPOS.forEach(function(k){ limpo[k] = limpa(d[k]).slice(0, 300); });
      limpo.genero = d.genero === 'menina' ? 'menina' : 'menino';
      limpo.idade = String(parseInt(limpo.idade, 10) || 7);
      limpo.num = /^PN-\d{4}-\d{4}$/.test(d.num) ? d.num : novoNumero();
      limpo.dt = /^\d{4}-\d{2}-\d{2}$/.test(d.dt) ? d.dt : hojeISO();
      return limpo;
    } catch(e){ return null; }
  }
  function linkMagico(){ return location.href.split('#')[0] + '#carta=' + codifica(dados); }

  function copiar(texto, botao, ok){
    var original = botao.textContent;
    function fim(msg){ botao.textContent = msg; setTimeout(function(){ botao.textContent = original; }, 2200); }
    function alternativa(){
      var t = document.createElement('textarea');
      t.value = texto; t.setAttribute('readonly',''); t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      var deu = false;
      try{ deu = document.execCommand('copy'); } catch(e){}
      t.remove();
      fim(deu ? ok : 'Selecione e copie');
    }
    if(navigator.clipboard && window.isSecureContext){
      navigator.clipboard.writeText(texto).then(function(){ fim(ok); }).catch(alternativa);
    } else { alternativa(); }
  }

  /* ---------- som (sino sintetizado, só depois de um toque) ---------- */
  var audio = null, somLigado = true;
  function sino(base, atraso){
    if(!somLigado) return;
    try{
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      var t = audio.currentTime + (atraso || 0);
      [[1, .5], [2.76, .18], [5.4, .07]].forEach(function(p){
        var o = audio.createOscillator(), g = audio.createGain();
        o.type = 'sine'; o.frequency.value = base * p[0];
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(p[1] * .45, t + .012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.7);
        o.connect(g); g.connect(audio.destination);
        o.start(t); o.stop(t + 1.8);
      });
    } catch(e){}
  }
  function acorde(){ sino(784, 0); sino(988, .13); sino(1175, .26); sino(1568, .42); }

  /* ---------- apresentação ---------- */
  var ap = $('#apresentacao');
  var trava = null;
  function etapa(id){
    ap.querySelectorAll('.ap-etapa').forEach(function(e){ e.hidden = (e.id !== id); });
    ap.scrollTop = 0;
  }
  function abrirApresentacao(){
    renderCarta($('#ap-folha'), dados);
    $('#ap-nome').textContent = dados.nome;
    $('#ap-agente').textContent = 'Agente ' + dados.nome + ' · ' + dados.num;
    $('#envelope').classList.remove('aberto');
    montarMedidor();
    ap.hidden = false;
    document.body.classList.add('em-apresentacao');
    etapa('ap-alerta');
    var raiz = document.documentElement;
    if(raiz.requestFullscreen){ raiz.requestFullscreen().catch(function(){}); }
    if(navigator.wakeLock){ navigator.wakeLock.request('screen').then(function(l){ trava = l; }).catch(function(){}); }
    $('#bt-receber').focus();
  }
  function fecharApresentacao(){
    ap.hidden = true;
    document.body.classList.remove('em-apresentacao');
    if(document.fullscreenElement && document.exitFullscreen){ document.exitFullscreen().catch(function(){}); }
    if(trava){ trava.release().catch(function(){}); trava = null; }
    if(origemDemo){ dados = null; origemDemo = false; mostrar('inicio'); }
    else { mostrar('pronta'); }
  }
  function montarMedidor(){
    var m = $('#medidor');
    m.replaceChildren();
    for(var i = 0; i < 24; i++){
      var s = document.createElement('span');
      s.className = 'm-estrela' + (i === 0 ? ' acesa' : '');
      s.innerHTML = svgEstrela();
      m.append(s);
    }
  }

  /* ---------- checklist do guia (lembrado só neste aparelho) ---------- */
  document.querySelectorAll('[data-check]').forEach(function(cb){
    var chave = 'onm-guia-' + cb.dataset.check;
    try{ cb.checked = localStorage.getItem(chave) === '1'; } catch(e){}
    cb.addEventListener('change', function(){ try{ localStorage.setItem(chave, cb.checked ? '1' : '0'); } catch(e){} });
  });

  /* ---------- boas-vindas com o Faísca e a Lumi (só ao digitar o código) ---------- */
  var timersIntro = [], depoisIntro = null;
  function mostrarIntro(depois){
    var el = $('#intro');
    depoisIntro = depois;
    el.className = 'intro animando';
    el.hidden = false;
    document.body.classList.add('em-intro');
    var tempos = reduzMovimento ? [0, 0, 0, 0] : [80, 900, 2900, 4700];
    var sinos = [1046, 880, 988];
    ['f1', 'f2', 'f3', 'f4'].forEach(function(f, i){
      timersIntro.push(setTimeout(function(){
        el.classList.add(f);
        if(i < 3) sino(sinos[i]);
        if(f === 'f4') $('#bt-intro-entrar').focus();
      }, tempos[i]));
    });
    $('#bt-intro-pular').focus();
  }
  function fecharIntro(){
    timersIntro.forEach(clearTimeout); timersIntro = [];
    $('#intro').hidden = true;
    document.body.classList.remove('em-intro');
    if(depoisIntro){ var f = depoisIntro; depoisIntro = null; f(); }
  }
  $('#bt-intro-entrar').addEventListener('click', fecharIntro);
  $('#bt-intro-pular').addEventListener('click', fecharIntro);

  /* ---------- eventos ---------- */
  $('#form-acesso').addEventListener('submit', function(e){
    e.preventDefault();
    var cod = normalizarCodigo($('#f-codigo').value);
    var h = hashCodigo(cod, SAL);
    var erro = $('#erro-codigo');
    if(cod && CODIGOS.indexOf(h) >= 0){
      acessoSessao = true;
      try{ localStorage.setItem(CHAVE_ACESSO, String(h)); } catch(err){}
      erro.hidden = true; $('#f-codigo').setAttribute('aria-invalid', 'false');
      var destino = dados ? 'pronta' : 'inicio';
      mostrar(destino);
      mostrarIntro(function(){ var f = destino === 'inicio' ? $('#bt-comecar') : $('#bt-apresentar'); if(f) f.focus(); });
    } else {
      erro.textContent = 'Código não reconhecido. Confira o e-mail da compra e digite de novo.';
      erro.hidden = false; $('#f-codigo').setAttribute('aria-invalid', 'true'); $('#f-codigo').focus();
    }
  });
  $('#bt-comecar').addEventListener('click', function(){ origemDemo = false; mostrar('form'); $('#f-nome').focus(); });
  $('#bt-demo').addEventListener('click', function(){
    dados = Object.assign({}, EXEMPLO, {dt: hojeISO()});
    origemDemo = true;
    abrirApresentacao();
  });
  function abrirGuia(){ telaAntesDoGuia = telaAtual; mostrar('guia'); }
  $('#bt-guia-inicio').addEventListener('click', abrirGuia);
  $('#bt-guia-pronta').addEventListener('click', abrirGuia);
  $('#bt-guia-voltar').addEventListener('click', function(){ mostrar(telaAntesDoGuia); });
  $('#bt-imprimir-guia').addEventListener('click', function(){ imprimir('guia'); });
  $('#bt-exemplo').addEventListener('click', function(){ preencherForm(EXEMPLO); });
  $('#bt-voltar-inicio').addEventListener('click', function(){ mostrar(dados && !origemDemo ? 'pronta' : 'inicio'); });
  $('#form-carta').addEventListener('submit', function(e){
    e.preventDefault();
    var d = lerForm();
    if(!d) return;
    d.num = (dados && dados.num && !origemDemo) ? dados.num : novoNumero();
    d.dt = hojeISO();
    dados = d; origemDemo = false;
    preparar();
  });
  $('#bt-apresentar').addEventListener('click', function(){ origemDemo = false; abrirApresentacao(); });
  $('#bt-imprimir-carta').addEventListener('click', function(){ imprimir('carta'); });
  $('#bt-imprimir-passaporte').addEventListener('click', function(){ imprimir('passaporte'); });
  $('#bt-editar').addEventListener('click', function(){ mostrar('form'); });
  $('#bt-copiar-num').addEventListener('click', function(e){ copiar(dados.num, e.currentTarget, 'Número copiado'); });
  $('#bt-copiar-link').addEventListener('click', function(e){
    var l = linkMagico(), campo = $('#link-campo');
    campo.value = l; campo.hidden = false;
    copiar(l, e.currentTarget, 'Link copiado');
  });
  $('#link-campo').addEventListener('focus', function(e){ e.target.select(); });

  $('#bt-receber').addEventListener('click', function(){ sino(880); etapa('ap-envelope'); $('#bt-lacre').focus(); });
  $('#bt-lacre').addEventListener('click', function(){
    sino(1046);
    $('#envelope').classList.add('aberto');
    setTimeout(function(){ etapa('ap-carta'); }, reduzMovimento ? 50 : 950);
  });
  $('#bt-aceito').addEventListener('click', function(){ acorde(); montarMedidor(); etapa('ap-aceita'); });
  $('#bt-reler').addEventListener('click', function(){ etapa('ap-carta'); });
  $('#bt-sair').addEventListener('click', fecharApresentacao);
  $('#bt-som').addEventListener('click', function(e){
    somLigado = !somLigado;
    e.currentTarget.textContent = somLigado ? 'Som ligado' : 'Som desligado';
    e.currentTarget.setAttribute('aria-pressed', String(somLigado));
  });
  document.addEventListener('keydown', function(e){
    if(e.key !== 'Escape') return;
    if(!$('#intro').hidden) fecharIntro();
    else if(!ap.hidden) fecharApresentacao();
  });

  /* ---------- início ---------- */
  renderCarta($('#amostra'), EXEMPLO);
  var veioPorLink = false;
  if(location.hash.indexOf('#carta=') === 0){
    var d = decodifica(location.hash.slice(7));
    if(d){ dados = d; veioPorLink = true; montarPronta(); escolherAba('carta'); mostrar('pronta'); abrirApresentacao(); }
  }
  if(!veioPorLink) mostrar('inicio');

  /* ---------- neve ---------- */
  (function(){
    var c = $('#neve');
    if(!c.getContext) return;
    var g = c.getContext('2d'), W = 0, H = 0, flocos = [];
    var cor = getComputedStyle(document.documentElement).getPropertyValue('--neve').trim() || '#eef4f6';
    function novo(qualquer){ return {x:Math.random()*W, y:qualquer ? Math.random()*H : -8, r:.8 + Math.random()*2.2, v:.25 + Math.random()*.7, d:Math.random()*6.28, a:.3 + Math.random()*.5}; }
    function medir(){
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, W * H / 14000));
      flocos = []; for(var i = 0; i < n; i++) flocos.push(novo(true));
    }
    function quadro(){
      g.clearRect(0, 0, W, H); g.fillStyle = cor;
      for(var i = 0; i < flocos.length; i++){
        var f = flocos[i];
        f.y += f.v; f.d += .01; f.x += Math.sin(f.d) * .3;
        if(f.y > H + 8){ var n = novo(false); f.x = n.x; f.y = n.y; f.r = n.r; f.v = n.v; f.a = n.a; }
        g.globalAlpha = f.a; g.beginPath(); g.arc(f.x, f.y, f.r, 0, 6.283); g.fill();
      }
      g.globalAlpha = 1;
      if(!reduzMovimento) requestAnimationFrame(quadro);
    }
    medir(); window.addEventListener('resize', medir); quadro();
  })();
})();
