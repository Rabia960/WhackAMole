const $=id=>document.getElementById(id);
const GAME=30, GOLD_P=.15, GOLD_PTS=5;
const LV={easy:[1400,800],medium:[1100,550],hard:[850,380]};
const LN={easy:"🌼 Easy",medium:"🌷 Medium",hard:"🔥 Hard"};
const STAR="M0-6L1.8-1.9 6-1.9 2.6.8 3.8 5 0 2.5-3.8 5-2.6.8-6-1.9-1.8-1.9Z";

/* Tuli the Tulip Mole (drawn in code so it stays tiny) */
function mole(gold,hit){
  const b=gold?"#ffd966":"#b9a3e3",d=gold?"#f2b84b":"#a38ad6",s=gold?"#fff6dc":"#fff1e6",k="#4a3358";
  const eyes=hit?`<path d="M30 42l10 10M40 42L30 52M60 42l10 10M70 42L60 52" stroke="${k}" stroke-width="3" stroke-linecap="round"/>`
    :`<circle cx="35" cy="47" r="4.5" fill="${k}"/><circle cx="65" cy="47" r="4.5" fill="${k}"/><circle cx="36.6" cy="45.4" r="1.6" fill="#fff"/><circle cx="66.6" cy="45.4" r="1.6" fill="#fff"/>`;
  const mouth=hit?`<ellipse cx="50" cy="76" rx="4" ry="3" fill="${k}"/>`
    :`<rect x="47" y="73.5" width="6" height="6" rx="1.5" fill="#fff"/><path d="M44 73q6 5 12 0" stroke="${k}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const x=hit?`<path transform="translate(17 20)" d="${STAR}" fill="#ffd966"/><path transform="translate(85 26) scale(.8)" d="${STAR}" fill="#ffd966"/>`
    :gold?`<path transform="translate(15 22)" d="${STAR}" fill="#fff"/><path transform="translate(86 30) scale(.7)" d="${STAR}" fill="#fff"/>`:"";
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 32Q49 22 54 14" stroke="#7bbf6a" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="45" cy="25" rx="7" ry="3.5" transform="rotate(-35 45 25)" fill="#8fd07a"/><path d="M47 13V5l4 4 3-5 3 5 4-4v8Q54 19 47 13Z" fill="#ff7fb0"/><circle cx="22" cy="42" r="6" fill="${d}"/><circle cx="78" cy="42" r="6" fill="${d}"/><circle cx="22" cy="42" r="3" fill="#ffc2d9"/><circle cx="78" cy="42" r="3" fill="#ffc2d9"/><ellipse cx="50" cy="63" rx="35" ry="32" fill="${b}"/><path d="M50 54C64 58 68 76 50 83C32 76 36 58 50 54Z" fill="${s}"/><ellipse cx="50" cy="62" rx="7.5" ry="5.5" fill="#ff8fb8"/><ellipse cx="47.8" cy="60.2" rx="2.2" ry="1.2" fill="#fff" opacity=".8"/><ellipse cx="26" cy="58" rx="5" ry="3" fill="#ff9cc2" opacity=".6"/><ellipse cx="74" cy="58" rx="5" ry="3" fill="#ff9cc2" opacity=".6"/>${eyes}${mouth}<ellipse cx="26" cy="87" rx="9" ry="6" fill="${d}"/><ellipse cx="74" cy="87" rx="9" ry="6" fill="${d}"/><path d="M21 91v-3M26 92v-4M31 91v-3M69 91v-3M74 92v-4M79 91v-3" stroke="#ffc2d9" stroke-width="2" stroke-linecap="round"/>${x}</svg>`;
}
const ART={n:mole(0,0),g:mole(1,0),h:mole(0,1),gh:mole(1,1)};

/* Safe storage (can be blocked in private mode) */
const ls={get(k,f){try{const v=localStorage.getItem(k);return v===null?f:v}catch(e){return f}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const pid=ls.get("wm_pid","")||("p"+Math.random().toString(36).slice(2,10)+Date.now().toString(36));
ls.set("wm_pid",pid);
let name=ls.get("wm_name",""),level=ls.get("wm_level","easy"),soundOn=ls.get("wm_sound","on")!=="off";
if(!LV[level])level="easy";
let mine={};try{mine=JSON.parse(ls.get("wm_best","{}"))||{}}catch(e){}

/* Sounds (Web Audio, cute edition) */
let ac=null,out=null;
const SC=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.51,1567.98];
function audio(){
  if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;ac=new C();out=ac.createGain();out.gain.value=.9;
    const e=ac.createDelay(),f=ac.createGain(),w=ac.createGain();e.delayTime.value=.14;f.gain.value=.25;w.gain.value=.25;
    out.connect(ac.destination);out.connect(e);e.connect(f);f.connect(e);e.connect(w);w.connect(ac.destination);}
  if(ac.state==="suspended")ac.resume();return ac;
}
function tone(fr,du,ty,vo,de,gl){
  if(!soundOn)return;const c=audio();if(!c)return;const t=c.currentTime+(de||0),o=c.createOscillator(),g=c.createGain();
  o.type=ty||"sine";o.frequency.setValueAtTime(fr,t);if(gl)o.frequency.exponentialRampToValueAtTime(gl,t+du*.8);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vo||.15,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+du);
  o.connect(g);g.connect(out);o.start(t);o.stop(t+du+.02);
}
function bell(f,d,v,de){tone(f,d,"sine",v,de);tone(f*2,d*.6,"sine",v*.35,de);tone(f*3,d*.3,"sine",v*.15,de)}
const S={
  pop(){tone(380,.09,"sine",.06,.1,760)},
  hit(n){const f=SC[Math.min((n||1)-1,8)];tone(f*.75,.1,"triangle",.16,0,f*1.1);bell(f,.28,.13,.05)},
  miss(){tone(330,.2,"sine",.14,0,180);tone(250,.15,"triangle",.05,.05,140)},
  gold(){[1318.5,1568,1760,2093].forEach((f,i)=>bell(f,.3,.07,i*.06))},
  goldHit(){tone(500,.12,"triangle",.16,0,1100);[0,2,3,5,7].forEach((x,i)=>bell(SC[x],.35,.12,.06+i*.07))},
  start(){[0,2,3,5].forEach((x,i)=>bell(SC[x],.3,.12,i*.12))},
  tick(){tone(1200,.05,"sine",.05,0,900)},
  end(){[3,2,1,0].forEach((x,i)=>bell(SC[x],.45,.12,i*.18))},
  record(){[0,2,3,5,7,8].forEach((x,i)=>bell(SC[x],.4,.12,.8+i*.1))}
};

/* Shared online leaderboard.
   Order of preference: Firebase (when firebase-config.js is filled in),
   then the claude.ai page database, then this device only. */
let db=null,rows=[],liveOnline=false;
function onRows(snap){rows=snap.docs.map(d=>({id:d.id,...d.data()}));liveOnline=true;if(!$("ov").hidden&&view==="lb")drawBoard()}
function listen(q){q.onSnapshot(onRows,()=>{liveOnline=false})}
const FB=window.FIREBASE_CONFIG;
if(window.firebase&&FB&&FB.projectId){
  try{
    firebase.initializeApp(FB);db=firebase.firestore();
    listen(db.collection("scores").orderBy("best","desc").limit(500));
  }catch(e){db=null}
}else if(window.claude&&claude.use){
  claude.use("db").then(d=>{if(!d)return;db=d;listen(db.collection("scores").limit(500))}).catch(()=>{});
}
function saveScore(l,v){
  if(!db)return;
  db.collection("scores").doc(pid+"_"+l).set({name,level:l,best:v,t:Date.now()}).catch(()=>{});
}
function boardFor(l){
  let list=rows.filter(r=>r.level===l&&r.name&&typeof r.best==="number");
  if(!liveOnline){list=mine[l]?[{id:pid+"_"+l,name,level:l,best:mine[l]}]:[]}
  return list.sort((a,b)=>b.best-a.best||(a.t||0)-(b.t||0));
}

/* Game */
const board=$("board"),msg=$("msg"),go=$("go");
for(let i=0;i<9;i++){const b=document.createElement("button");b.className="hole";b.textContent="🌱";b.setAttribute("aria-label","Hole "+(i+1));board.appendChild(b)}
const holes=[...board.children];
let score=0,left=GAME,cur=-1,curG=false,playing=false,t0=0,mt,cd,streak=0;

function reset(){holes.forEach(h=>{h.className="hole";h.textContent="🌱"})}
function speed(){const[a,z]=LV[level],p=Math.min((Date.now()-t0)/(GAME*1000),1);return a-(a-z)*p}
function show(){
  reset();let n;do{n=Math.floor(Math.random()*9)}while(n===cur);cur=n;
  curG=playing&&!curG&&Math.random()<GOLD_P;
  const h=holes[n];h.innerHTML=curG?ART.g:ART.n;h.classList.add("mole");
  if(curG){h.classList.add("golden");S.gold()}else S.pop();
}
function next(){clearTimeout(mt);mt=setTimeout(()=>{if(!playing)return;streak=0;show();next()},speed()*(curG?.7:1))}
function lock(x){go.disabled=x;document.querySelectorAll(".lv").forEach(b=>b.disabled=x);$("help").disabled=x;$("top").disabled=x}
function refreshStats(){$("sc").textContent=score;$("tm").textContent=left;$("bs").textContent=mine[level]||0}
function start(){
  if(playing)return;if(!name){welcome();return}
  closeOv();score=0;left=GAME;cur=-1;curG=false;streak=0;playing=true;t0=Date.now();
  msg.textContent="Quick! Catch the mole! 💕";go.textContent="Playing... 🌸";lock(true);refreshStats();S.start();show();next();
  cd=setInterval(()=>{left--;$("tm").textContent=left;if(left>0&&left<=3)S.tick();if(left<=0)end()},1000);
}
function end(){
  playing=false;clearTimeout(mt);clearInterval(cd);reset();cur=-1;S.end();
  const rec=score>0&&score>(mine[level]||0);
  if(rec){mine[level]=score;ls.set("wm_best",JSON.stringify(mine));saveScore(level,score);S.record()}
  msg.textContent=`Time’s up! ${score} points 🎉`;go.textContent="Play Again 🔄";lock(false);refreshStats();
  results(rec);
}
holes.forEach((h,i)=>h.addEventListener("click",()=>{
  if(!playing)return;
  if(i===cur){
    const g=curG;score+=g?GOLD_PTS:1;streak++;$("sc").textContent=score;
    msg.textContent=g?`Golden mole! +${GOLD_PTS} ⭐✨`:"Yay! You caught one! 💖";
    g?S.goldHit():S.hit(streak);show();next();
    h.innerHTML=g?ART.gh:ART.h;h.classList.add("hit");
    setTimeout(()=>{if(h.classList.contains("hit")){h.className="hole";h.textContent="🌱"}},300);
  }else{
    streak=0;msg.textContent="Oops, missed! Try again 🌼";S.miss();h.classList.remove("miss");void h.offsetWidth;h.classList.add("miss");
  }
}));
document.querySelectorAll(".lv").forEach(b=>b.addEventListener("click",()=>{
  if(playing)return;level=b.dataset.l;ls.set("wm_level",level);paintLv();refreshStats();
}));
function paintLv(){document.querySelectorAll("#lvls .lv").forEach(b=>b.classList.toggle("on",b.dataset.l===level))}
go.addEventListener("click",()=>{audio();start()});
$("snd").addEventListener("click",()=>{soundOn=!soundOn;$("snd").textContent=soundOn?"🔊 Sound on":"🔇 Sound off";ls.set("wm_sound",soundOn?"on":"off");if(soundOn)S.hit(1)});

/* Popups: instructions + name, results + leaderboard */
let view="";
function closeOv(){$("ov").hidden=true;view=""}
function openOv(h){$("md").innerHTML=h;$("ov").hidden=false}
function how(){return `<ul><li>🐹 Tap the mole when it pops up. +1 point each.</li><li>✨ A <b>golden</b> mole is worth +${GOLD_PTS} but vanishes fast.</li><li>🎵 Catch moles in a row for a combo. A wrong tap resets it.</li><li>⏰ You have ${GAME} seconds. The mole speeds up as time runs out.</li><li>🏆 Beat your best and climb the leaderboard!</li></ul>`}
function welcome(){
  view="wel";
  openOv(`<h2>Welcome! 🌷</h2><p class="note">Meet Tuli the Tulip Mole</p>${how()}<label for="nm">Your name</label><input id="nm" maxlength="14" placeholder="Enter your name" autocomplete="nickname" value="">
    <button class="btn" id="ok">Let’s play 🎀</button>`);
  const i=$("nm");i.value=name;i.focus();
  const ok=()=>{const v=i.value.trim().replace(/\s+/g," ").slice(0,14);if(!v){i.focus();return}
    name=v;ls.set("wm_name",name);$("who").textContent=`Playing as ${name} ♡`;closeOv();msg.textContent=`Hi ${name}! Press Start 🌼`};
  $("ok").onclick=()=>{audio();ok()};i.onkeydown=e=>{if(e.key==="Enter")ok()};
}
function drawBoard(l){
  l=l||drawBoard.l||level;drawBoard.l=l;const el=$("lbl");if(!el)return;
  const list=boardFor(l);el.replaceChildren();
  if(!list.length){const li=document.createElement("li");li.textContent="No scores yet. Be the first! 🌸";el.appendChild(li)}
  const add=(r,i)=>{const li=document.createElement("li");if(r.id===pid+"_"+l)li.className="me";
    [["rk",i<3?["🥇","🥈","🥉"][i]:"#"+(i+1)],["nm",r.name],["sc",r.best]].forEach(([c,t])=>{const s=document.createElement("span");s.className=c;s.textContent=t;li.appendChild(s)});el.appendChild(li)};
  list.slice(0,10).forEach(add);
  const mi=list.findIndex(r=>r.id===pid+"_"+l);if(mi>=10)add(list[mi],mi);
  document.querySelectorAll(".ltab").forEach(b=>b.classList.toggle("on",b.dataset.l===l));
  const n=$("lnote");if(n)n.textContent=liveOnline?`Live leaderboard · ${list.length} player${list.length===1?"":"s"}`:"Offline: showing scores from this device only";
}
function lbHtml(){return `<div class="row" style="margin-top:10px">${Object.keys(LV).map(l=>`<button class="lv ltab" data-l="${l}">${LN[l]}</button>`).join("")}</div><ol class="lb" id="lbl"></ol><p class="note" id="lnote"></p>`}
function wireTabs(){document.querySelectorAll(".ltab").forEach(b=>b.onclick=()=>drawBoard(b.dataset.l))}
function results(rec){
  view="lb";drawBoard.l=level;
  openOv(`<h2>Time’s up! 🎉</h2><p class="big">${score}</p><p class="note">${LN[level]} · ${rec?"New personal best! 🏆":"Best: "+(mine[level]||0)}</p>${lbHtml()}
    <button class="btn" id="again">Play Again 🔄</button><div class="foot"><button class="ghost" id="chg">Change player</button></div>`);
  wireTabs();drawBoard(level);$("again").onclick=start;$("chg").onclick=welcome;
}
$("top").onclick=()=>{view="lb";drawBoard.l=level;openOv(`<h2>🏆 Leaderboard</h2>${lbHtml()}<button class="btn" id="cl">Close</button>`);wireTabs();drawBoard(level);$("cl").onclick=closeOv};
$("help").onclick=()=>{view="";openOv(`<h2>How to play 🌷</h2>${how()}<button class="btn" id="cl">Got it</button>`);$("cl").onclick=closeOv};

paintLv();refreshStats();$("snd").textContent=soundOn?"🔊 Sound on":"🔇 Sound off";
if(name)$("who").textContent=`Playing as ${name} ♡`;
welcome();
