
// script.js - Koora Foot Maghreb (uses Netlify function proxy)
// Note: Deploy on Netlify and set environment variable RAPIDAPI_KEY in Site settings -> Build & deploy -> Environment

async function fetchMatches(date=null){
  const d = date || new Date().toISOString().slice(0,10);
  const res = await fetch(`/.netlify/functions/getMatches?date=${d}`);
  if(!res.ok) throw new Error('Erreur serveur');
  const j = await res.json();
  return j.response || [];
}

async function renderMatches(){
  const container = document.getElementById('matches');
  if(!container) return;
  container.innerHTML = 'Chargement...';
  try{
    const matches = await fetchMatches();
    if(matches.length===0){ container.innerHTML='<p>Aucun match aujourd\'hui</p>'; return; }
    container.innerHTML='';
    matches.forEach(m=>{
      const home = m.teams.home; const away = m.teams.away;
      const league = m.league.name;
      const time = new Date(m.fixture.date).toLocaleTimeString();
      const div = document.createElement('div'); div.className='match';
      div.innerHTML = `<div class="team"><img src="${home.logo||'images/flags/ma.svg'}" alt=""><div><strong>${home.name}</strong></div></div>
        <div class="meta"><div class="small">${league}</div><div>${time}</div><div class="small">${m.fixture.status.long||''}</div></div>
        <div class="team"><img src="${away.logo||'images/flags/tn.svg'}" alt=""><div><strong>${away.name}</strong></div></div>`;
      container.appendChild(div);
    });
  }catch(e){
    console.error(e);
    container.innerHTML = '<p>Impossible de charger les matchs (vérifie configuration Netlify).</p>';
  }
}

async function renderNews(){
  const el = document.getElementById('news');
  if(!el) return;
  const items = JSON.parse(localStorage.getItem('kfm_news') || '[]');
  if(items.length===0){ el.innerHTML='<p>Aucune actualité locale. Utilise /admin pour en ajouter.</p>'; return;}
  el.innerHTML='';
  items.forEach(it=>{
    const d = document.createElement('div'); d.style.padding='8px 0'; d.innerHTML = `<strong>${it.title}</strong><div style="color:#444">${it.content}</div>`;
    el.appendChild(d);
  });
}

async function renderLive(){
  const el = document.getElementById('live');
  if(!el) return;
  el.innerHTML = 'Chargement...';
  try{
    // reuse matches for live quick view
    const matches = await fetchMatches();
    el.innerHTML = '';
    matches.slice(0,5).forEach(m=>{
      const home = m.teams.home; const away = m.teams.away;
      const s = document.createElement('div'); s.className='match';
      s.innerHTML = `<div class="team"><img src="${home.logo||'images/flags/ma.svg'}"/><div><strong>${home.name}</strong></div></div>
        <div class="meta">${m.fixture.status.short || ''} <div class="small">${new Date(m.fixture.date).toLocaleTimeString()}</div></div>
        <div class="team"><img src="${away.logo||'images/flags/tn.svg'}"/><div><strong>${away.name}</strong></div></div>`;
      el.appendChild(s);
    });
  }catch(e){
    el.innerHTML = '<p>Impossible de charger (Netlify function non configurée).</p>';
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderMatches(); renderNews(); renderLive();
});
