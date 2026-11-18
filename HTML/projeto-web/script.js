(function(){
  var KEY="peladaFacil.jogos", jogos=[];
  var $=function(id){return document.getElementById(id)};
  function load(){try{var r=localStorage.getItem(KEY);if(r)return JSON.parse(r)}catch(e){}return null}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(jogos))}catch(e){}}
  function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML}
  function brl(v){return Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
  function fdata(d){var p=d.split("-");return p[2]+"/"+p[1]+"/"+p[0]}
  function iso(add){var d=new Date();d.setDate(d.getDate()+add);return d.toISOString().slice(0,10)}

  jogos=load();
  if(!jogos){jogos=[{id:1,nome:"Pelada de sexta (exemplo)",data:iso(3),hora:"20:00",local:"Quadra do bairro",vagas:10,valor:120,jogadores:["Carlos","Marcos","Rafa","Diego"],times:null}];save()}
  $("data").min=iso(0);$("data").value=iso(3);

  function render(){
    var l=$("lista"),conf=0,abertas=0;l.innerHTML="";
    if(!jogos.length){l.innerHTML='<div class="card vazio">Nenhuma partida ainda. Crie a primeira acima! ⚽</div>'}
    jogos.forEach(function(j){
      var n=Math.min(j.jogadores.length,j.vagas);conf+=n;abertas+=Math.max(0,j.vagas-j.jogadores.length);
      var pct=Math.round(n/j.vagas*100),custo=n?brl(j.valor/n):brl(j.valor);
      var pl=j.jogadores.map(function(p,i){return '<li class="'+(i>=j.vagas?"esp":"")+'">'+esc(p)+(i>=j.vagas?" (espera)":"")+'<button data-act="rem" data-id="'+j.id+'" data-i="'+i+'" title="Remover">×</button></li>'}).join("");
      var t=j.times?'<div class="times"><div class="time a"><h4>🔴 Time A</h4><ul>'+j.times.a.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div><div class="time b"><h4>🔵 Time B</h4><ul>'+j.times.b.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+'</ul></div></div>':"";
      var c=document.createElement("article");c.className="card jogo";
      c.innerHTML='<h3>'+esc(j.nome)+'</h3><div class="meta"><span>📅 '+fdata(j.data)+'</span><span>🕗 '+esc(j.hora)+'</span><span>📍 '+esc(j.local)+'</span></div>'+
        '<div class="bar"><i style="width:'+pct+'%"></i></div>'+
        '<div class="info"><span><b>'+n+'/'+j.vagas+'</b> confirmados</span><span>💰 '+custo+' por pessoa</span></div>'+
        '<div class="add"><input placeholder="Nome do jogador" maxlength="30" data-in="'+j.id+'"><button class="btn sm" data-act="add" data-id="'+j.id+'">Confirmar</button></div>'+
        '<ul class="jog">'+pl+'</ul>'+t+
        '<div class="acoes"><button class="btn sec sm" data-act="sort" data-id="'+j.id+'">🎲 Sortear times</button><button class="btn sec sm" data-act="copy" data-id="'+j.id+'">📋 Copiar convite</button><button class="btn red" data-act="del" data-id="'+j.id+'">Excluir</button></div>';
      l.appendChild(c);
    });
    $("sJogos").textContent=jogos.length;$("sJog").textContent=conf;$("sVagas").textContent=abertas;
  }
  function find(id){return jogos.filter(function(j){return j.id==id})[0]}
  function addPlayer(id){
    var inp=document.querySelector('[data-in="'+id+'"]'),v=inp.value.trim();if(!v)return inp.focus();
    var j=find(id);j.jogadores.push(v);j.times=null;save();render();
    var again=document.querySelector('[data-in="'+id+'"]');if(again)again.focus();
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-act]");if(!b)return;
    var j=find(b.dataset.id),a=b.dataset.act;
    if(a==="add")addPlayer(b.dataset.id);
    if(a==="rem"){j.jogadores.splice(+b.dataset.i,1);j.times=null;save();render()}
    if(a==="del"){if(confirm("Excluir esta partida?")){jogos=jogos.filter(function(x){return x.id!=j.id});save();render()}}
    if(a==="sort"){
      var p=j.jogadores.slice(0,j.vagas);
      if(p.length<2){alert("Confirme pelo menos 2 jogadores para sortear.");return}
      for(var i=p.length-1;i>0;i--){var k=Math.floor(Math.random()*(i+1)),t=p[i];p[i]=p[k];p[k]=t}
      var h=Math.ceil(p.length/2);j.times={a:p.slice(0,h),b:p.slice(h)};save();render();
    }
    if(a==="copy"){
      var txt="⚽ "+j.nome+"\n📅 "+fdata(j.data)+" às "+j.hora+"\n📍 "+j.local+"\n💰 "+brl(j.valor)+" de quadra\nVagas: "+j.vagas+". Bora confirmar!";
      var ok=function(){b.textContent="✔ Copiado!";setTimeout(render,1200)};
      try{navigator.clipboard.writeText(txt).then(ok,function(){window.prompt("Copie o convite:",txt)})}catch(err){window.prompt("Copie o convite:",txt)}
    }
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Enter"&&e.target.dataset&&e.target.dataset.in){e.preventDefault();addPlayer(e.target.dataset.in)}
  });
  $("form").addEventListener("submit",function(e){
    e.preventDefault();
    jogos.unshift({id:Date.now(),nome:$("nome").value.trim(),data:$("data").value,hora:$("hora").value,local:$("local").value.trim(),vagas:Math.max(2,+$("vagas").value||2),valor:Math.max(0,+$("valor").value||0),jogadores:[],times:null});
    save();render();e.target.reset();$("data").value=iso(3);$("vagas").value=14;$("valor").value=140;
    $("jogos").scrollIntoView();
  });
  render();
})();
