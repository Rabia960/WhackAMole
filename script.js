const $=id=>document.getElementById(id);
const GAME=30, GOLD_P=.15, GOLD_PTS=5;
const LV={easy:[1400,800],medium:[1100,550],hard:[850,380]};
const LNAME={easy:"Easy",medium:"Medium",hard:"Hard"};
const LN={easy:"🌼 Easy",medium:"🌷 Medium",hard:"🔥 Hard"};

/* Stories: every character has their own (use {hero} for the name, {full} for the full name) */
const STORY={
  tuli:{
    icon:"🌷",
    title:"Tuli and the Missing Tulips",
    intro:["{full} is the gardener of Petal Park and takes tulips VERY seriously. {hero} even talks to them every morning. They have never replied, but {hero} stays hopeful. 🌷", "Then one night, a gang of mischievous moles shows up with tiny shovels and starts digging up the bulbs. Nobody knows why. One of them is wearing a fake moustache. 🥸", "{hero} can’t whack them all alone (the tulips promised to help, but they’re being quiet again). Will you step in? 💕"],
    chap:{"easy": {"t": "Chapter 1 · The Garden Gate 🌼", "x": "The moles are new at this, and it shows. One just tripped over their own shovel. Tap them before they dig up the bulbs!"}, "medium": {"t": "Chapter 2 · The Tulip Fields 🌷", "x": "Word got out that this garden has snacks (the bulbs, not actual snacks). Now the moles are faster and VERY keen. Don’t let them through!"}, "hard": {"t": "Chapter 3 · The Midnight Burrow 🔥", "x": "The Mole King has arrived with a tiny crown and a lot of confidence. His gang is fast and fierce. Save the last tulips before sunrise!"}},
    gold:"✨ Watch out for golden moles. Each one carries a rare golden tulip bulb and looks extremely pleased with itself. Worth +5 points!",
    res:["Almost there…", "The garden is saved! 🎉", "Hero of Petal Park! 🏆"],
    end:{"easy": ["The moles got a few bulbs, but {hero} replanted them (upside down, but they’ll sort it out). Try again! 🌱", "You guarded the Garden Gate! The tulips are blooming again, and one is definitely showing off. Chapter 2 awaits on Medium. 🌷", "Perfect! Zero bulbs lost, and {hero} gives you a golden tulip badge. It’s a bit big, but it’s the thought that counts. 🏅"], "medium": ["The moles trampled a few tulips and left muddy footprints in a very rude pattern. {hero} believes in you, so try again! 🌱", "The Tulip Fields are safe, and the colours are coming back! The Midnight Burrow awaits on Hard. 🔥", "Amazing! The fields are bursting with flowers, and the moles are running away, still holding their tiny shovels. 🌈"], "hard": ["The Mole King escaped with some bulbs and his crown. {hero} says the garden still needs you, so try again! 🌱", "You beat the Mole King’s gang, and the sun rises over Petal Park! The King was last seen filing a complaint with the Mole Council. 🌅", "LEGENDARY! The Mole King runs off yelling “I’ll be back!”, the whole garden blooms, and {hero} crowns you Hero of Petal Park! 👑🌸"]}
  },
  rocky:{
    icon:"⛏️",
    title:"Rocky and the Sparkle Mine",
    intro:["{full} runs the Sparkle Mine, where the shiniest gems in the valley are dug up. {hero} calls them “my babies” and gets a bit emotional about it. ⛏️", "But one night, {hero}’s cheeky cousins sneak in and hide the gems all over the mine, just to be annoying. They are very proud of themselves. 💎", "{hero} can’t find them all alone (and keeps getting distracted by shiny things). Will you help win the treasure back? 🗺️"],
    chap:{"easy": {"t": "Chapter 1 · The Mine Entrance ⛏️", "x": "The cousins are just warming up, and one is hiding a gem behind their back like nobody can see it. Catch them as they pop out of the tunnels!"}, "medium": {"t": "Chapter 2 · The Crystal Caves 💎", "x": "The caves are glittering, and the cousins think they’re invisible in the dark. (They’re not. They’re sparkly.) Don’t let them hide the crystals!"}, "hard": {"t": "Chapter 3 · The Deep Dark Tunnel 🔦", "x": "This is the final dig! The Cousin King and his gang are zooming through the tunnel on tiny mine carts. Grab the last gems before the lights go out!"}},
    gold:"✨ Watch out for golden moles. Each one is hugging the legendary Golden Gem and refusing to share. Worth +5 points!",
    res:["Almost there…", "The mine is saved! 🎉", "Master Miner! 🏆"],
    end:{"easy": ["The cousins got away with a few gems, but {hero} is already digging, very loudly. Try again and clear the entrance! ⛏️", "You cleared the Mine Entrance, and the gems are back where they belong! {hero} hugged one. The Crystal Caves are next on Medium. 💎", "Flawless! Not one gem lost, and {hero} gives you a gold pickaxe. It’s slightly too heavy, but very shiny. 🏅"], "medium": ["The cousins stashed some crystals in the dark and then forgot where. {hero} believes in you, so try again! 🔦", "The Crystal Caves are sparkling again! The Deep Dark Tunnel awaits on Hard. 🕳️", "Amazing! Every crystal is back, and the cousins are running away shouting “It was Kevin’s idea!” 🌈"], "hard": ["The Cousin King escaped with some gems and his mine cart. {hero} says the mine still needs you, so try again! ⛏️", "You beat the Cousin King’s gang, and the whole mine is shining again! The King was last seen pushing his cart home. 🌟", "LEGENDARY! The Cousin King runs off, every gem is found, and {hero} crowns you Master Miner and gives you a tiny helmet that doesn’t fit! 👑💎"]}
  },
  zap:{
    icon:"⚡",
    title:"Zap and the Glitch Invasion",
    intro:["{full} is the engineer of Circuit City and keeps every light, lift and gadget running. {hero} says “have you tried turning it off and on again?” about 40 times a day. 🤖", "But one night, a glitch spreads through the city, and cheeky glitch-bots start popping out of the control panels. Somebody’s toaster has also become sentient. ⚡", "{hero} can’t reboot them all alone (the toaster is a lot to deal with). Will you help fix the city? 🔧"],
    chap:{"easy": {"t": "Chapter 1 · The Power Room ⚡", "x": "Only a few glitch-bots so far, and one is just beeping rudely. Tap them to reboot them before they drain the power!"}, "medium": {"t": "Chapter 2 · The Control Centre 🖥️", "x": "The glitch is spreading fast! The bots are zipping around the control panels, and the lifts keep playing the wrong music. Reboot them all!"}, "hard": {"t": "Chapter 3 · The Mainframe 💾", "x": "This is the final fix! The Glitch Boss is running wild inside the Mainframe and has changed everyone’s password to “password”. Save the city before the battery runs out!"}},
    gold:"✨ Watch out for golden moles. Each one holds a super power core and looks very smug about it. Worth +5 points!",
    res:["Almost there…", "Circuit City is saved! 🎉", "Chief Engineer! 🏆"],
    end:{"easy": ["A few bots are still glitchy (one keeps saying “error” in a sad voice), but {hero} is already patching the code. Try again! 🔋", "The Power Room is restored, and the lights are back on! The toaster says thanks. The Control Centre is waiting on Medium. 🖥️", "Perfect run! Zero glitches, and {hero} upgrades you with a golden microchip. Please don’t swallow it. 🏅"], "medium": ["Some panels are still glitching, and a lift is stuck on the Spooky Music setting. {hero} says you’ve got this, so try again! 🔧", "The Control Centre is back online! The Mainframe awaits on Hard. 💾", "Amazing! Every screen is shining, and all the glitch-bots are rebooted. A few of them are very embarrassed. 🌈"], "hard": ["The Glitch Boss slipped away with some data (mostly cat videos). {hero} says the city still needs you, so try again! 🔧", "You beat the Glitch Boss, and Circuit City is running smoothly again! The Boss is now in “time out” mode. 🌆", "LEGENDARY! The Glitch Boss shuts down, every light is back on, and {hero} names you Chief Engineer of Circuit City! You also get a very comfy chair. 👑🤖"]}
  },
  rex:{
    icon:"🦖",
    title:"Rex and the Great Egg Rescue",
    intro:["{full} is the guardian of Volcano Valley and watches over the dino eggs. {hero} takes this job very seriously, and also sits on them sometimes, just in case. 🦖", "But one night, a gang of cheeky dino-moles starts popping out of the burrows and rolling the eggs away like tiny bowling balls! 🥚", "{hero} can’t stop them all alone (those little arms don’t reach very far). Will you help bring the eggs home? 🌋"],
    chap:{"easy": {"t": "Chapter 1 · The Nest 🥚", "x": "The dino-moles are only just starting to roll the eggs away, and they’re not good at it. One just chased its own egg downhill. Catch them before the eggs go missing!"}, "medium": {"t": "Chapter 2 · The Jungle Trail 🌴", "x": "The trail is packed with them now, and they’re quicker among the ferns. One is wearing a leaf as a disguise. It’s not working. Don’t let them through!"}, "hard": {"t": "Chapter 3 · Volcano Peak 🌋", "x": "This is the final showdown! The Egg Thief King and his gang are racing for the top of the volcano, and the King is wearing a bucket as a helmet. Save the last eggs before it erupts!"}},
    gold:"✨ Watch out for golden moles. Each one is rolling a rare golden egg and humming a little victory song. Worth +5 points!",
    res:["Almost there…", "The eggs are saved! 🎉", "Valley Guardian! 🏆"],
    end:{"easy": ["A few eggs rolled away, but {hero} is already fetching them. Try again and guard the Nest! 🥚", "You guarded the Nest, and every egg is safe and warm! {hero} is sitting on them again, just in case. The Jungle Trail is waiting on Medium. 🌴", "Perfect! Not one egg lost, and {hero} gives you a dino-tooth medal. It’s very pointy, so be careful. 🏅"], "medium": ["Some eggs got lost in the ferns. One was found in a bush, looking embarrassed. {hero} believes in you, so try again! 🌿", "The Jungle Trail is clear, and the eggs are heading home! Volcano Peak awaits on Hard. 🌋", "Amazing! The whole trail is safe, and the dino-moles are running for cover, still wearing their leaf disguises. 🌈"], "hard": ["The Egg Thief King rolled off with some eggs, bucket helmet and all. {hero} says the valley still needs you, so try again! 🦖", "You beat the Egg Thief King’s gang, and the volcano calms down! The King lost his bucket on the way out. 🌅", "LEGENDARY! The Egg Thief King stomps off, every egg hatches safely, and the baby dinos immediately start chasing {hero}. {hero} crowns you Guardian of Volcano Valley! 👑🦖"]}
  },
  kuro:{
    icon:"🥷",
    title:"Kuro and the Secret Scroll",
    intro:["{full} is the top student at the Moonlight Dojo, home of the Secret Scroll. {hero} is a very serious ninja, but still trips over the doormat. 🥷", "But one night, mischievous shadow clones start popping out of the dojo walls and sneaking off with the scroll pieces. Nobody knows why the clones keep giggling. 🌙", "{hero} can’t catch every clone alone (they all use the same hiding spot, and it’s a terrible one). Will you help get the scroll back? 📜"],
    chap:{"easy": {"t": "Chapter 1 · The Dojo Courtyard 🏯", "x": "The shadow clones are slow and clumsy, and their footsteps are very loud for ninjas. Tap them before they vanish with a scroll piece!"}, "medium": {"t": "Chapter 2 · The Bamboo Forest 🎋", "x": "The clones are faster among the bamboo, and they think a single leaf makes them invisible. Stay sharp!"}, "hard": {"t": "Chapter 3 · The Shadow Temple 🌑", "x": "This is the final battle! The Shadow Master and his clones guard the last scroll piece, and the Master insists on a dramatic entrance every time. Win it back before dawn!"}},
    gold:"✨ Watch out for golden moles. Each one holds a glowing scroll piece and does a tiny victory dance. Worth +5 points!",
    res:["Almost there…", "The dojo is saved! 🎉", "Grand Master! 🏆"],
    end:{"easy": ["A few clones slipped away with scroll pieces, giggling the whole way. {hero} is on their trail. Try again and hold the Courtyard! 🥷", "You held the Courtyard, and the first scroll pieces are back! {hero} pretends this was easy. The Bamboo Forest is next on Medium. 🎋", "Perfect! Not a single piece lost, and {hero} gives you a golden shuriken. Please don’t throw it at anyone. 🏅"], "medium": ["The clones vanished into the bamboo with some pieces, and one is still hiding behind a single leaf. {hero} believes in you, so try again! 🎋", "The Bamboo Forest is clear! The Shadow Temple awaits on Hard. 🌑", "Amazing! The forest is quiet, and every clone has been caught. A few are still giggling in the corner. 🌈"], "hard": ["The Shadow Master escaped with a piece of the scroll and a very dramatic cape swish. {hero} says the dojo still needs you, so try again! 🥷", "You defeated the Shadow Master, and the Secret Scroll is whole again! He left saying “This isn’t over,” which it is. 🌅", "LEGENDARY! The Shadow Master bows out, the scroll glows, and {hero} names you Grand Master of the Moonlight Dojo! The clones clap politely. 👑🥷"]}
  },
  cheddar:{
    icon:"🦸",
    title:"Captain Cheddar and the Cheese Caper",
    intro:["{full} is the hero of Cheddar City, with the powers of flying, super speed and losing the cape in doors. 🦸", "But one night, the Prank Squad pops out of the manholes with a terrible plan: swap every traffic light for a disco light and steal all the city’s cheese. 🧀", "{hero} can fly, but can’t aim. Will you be the sidekick and do the whacking? 💥"],
    chap:{"easy": {"t": "Chapter 1 · The Rooftops 🏙️", "x": "The Prank Squad is just warming up and keeps shouting their plans out loud. Tap them as they pop out of the manholes!"}, "medium": {"t": "Chapter 2 · Downtown 🚦", "x": "The pranksters are faster now, and the traffic lights are doing the disco again. Don’t let them reach the Cheese Vault!"}, "hard": {"t": "Chapter 3 · The Cheese Vault 🧀", "x": "This is the final showdown! Doctor Mouldy and his Prank Squad are about to take the Great Cheese Wheel. Save it before lunchtime!"}},
    gold:"✨ Watch out for golden moles. Each one is carrying a golden cheese wheel and is very proud of it. Worth +5 points!",
    res:["Almost there…", "Cheddar City is saved! 🎉", "Super Sidekick! 🏆"],
    end:{"easy": ["The Squad grabbed some cheese, but {hero} is already on it (right after rescuing the cape from a door). Try again! 🧀", "You cleared the Rooftops, and the city cheers (and one pigeon claps). Chapter 2 awaits on Medium. 🏙️", "Perfect! No cheese lost, and {hero} gives you a gold star badge. It’s sticky, so be careful. 🏅"], "medium": ["The Squad swapped a few street signs, so now the library is called “Pizza Palace”. {hero} believes in you, so try again! 🚦", "Downtown is safe, and the traffic lights are boring again! The Cheese Vault awaits on Hard. 🧀", "Amazing! Downtown is back to normal, and the pranksters ran off shouting “Worth it!” 🌈"], "hard": ["Doctor Mouldy got away with a slice of the Great Cheese Wheel. {hero} says the city still needs you, so try again! 🧀", "You beat Doctor Mouldy’s Prank Squad, and the cheese is saved! The Doctor was last seen sulking in a cheese cave. 🌆", "LEGENDARY! Doctor Mouldy flies off screaming “Curse you, sidekick!”, the cheese is safe, and {hero} names you Super Sidekick of Cheddar City! 👑🦸"]}
  },
  owl:{
    icon:"🦉",
    title:"Hoot and the Great Sock Heist",
    intro:["{full} watches over the sleepy town of Hushwood after dark. {hero} has a cape, a mysterious voice and one big problem: staying awake past breakfast. 🦉", "But one night, a gang of sneaky moles pops out of the bins and starts stealing everyone’s socks. Only the left ones. Nobody knows why. 🧦", "{hero} can’t catch them all alone (it’s way past bedtime). Will you be the sidekick? 🌙"],
    chap:{"easy": {"t": "Chapter 1 · The Back Gardens 🌙", "x": "The sock thieves are new at this and keep leaving a trail of socks behind them. Tap them as they pop out of the bins!"}, "medium": {"t": "Chapter 2 · The Clock Tower 🕰️", "x": "The thieves are faster now, and they’ve started stealing sock puppets too. Don’t let them reach the tower!"}, "hard": {"t": "Chapter 3 · The Sock Mountain 🧦", "x": "This is the final showdown! The Sock Baron and his gang have built a mountain of left socks. Save the town’s socks before the sun comes up!"}},
    gold:"✨ Watch out for golden moles. Each one is wearing a golden sock on its head like a crown. Worth +5 points!",
    res:["Almost there…", "Hushwood is saved! 🎉", "Guardian of the Night! 🏆"],
    end:{"easy": ["The thieves got away with a few left socks, but {hero} is already on it (and slightly asleep). Try again! 🧦", "You cleared the Back Gardens, and the socks are home! {hero} said “hoo” very dramatically. The Clock Tower is next on Medium. 🕰️", "Perfect! Not one sock lost, and {hero} gives you a golden sock badge. It smells faintly of victory. 🏅"], "medium": ["The thieves hid some socks inside the clock, and now it’s always sock o’clock. {hero} believes in you, so try again! 🕰️", "The Clock Tower is safe, and the time is correct again! The Sock Mountain awaits on Hard. 🧦", "Amazing! Every sock is back, and the thieves ran off tripping over each other. 🌈"], "hard": ["The Sock Baron escaped with a mountain’s worth of left socks. {hero} says the town still needs you, so try again! 🧦", "You beat the Sock Baron’s gang, and the sun rises over Hushwood! The Baron was last seen hopping home with one shoe. 🌅", "LEGENDARY! The Sock Baron runs off crying “My collection!”, every sock is back, and {hero} names you Guardian of the Night! 👑🦉"]}
  }
};
/* [score needed to win, score needed for the best ending] */
const GOAL={easy:[15,25],medium:[20,32],hard:[25,40]};
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
/* More characters, all drawn in code. They share the same face helpers. */
const INK="#4a3358";
function eyes(hit,y,c){c=c||INK;return hit?`<path d="M30 ${y-5}l10 10M40 ${y-5}L30 ${y+5}M60 ${y-5}l10 10M70 ${y-5}L60 ${y+5}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`
  :`<circle cx="35" cy="${y}" r="4.5" fill="${c}"/><circle cx="65" cy="${y}" r="4.5" fill="${c}"/><circle cx="36.6" cy="${y-1.6}" r="1.6" fill="#fff"/><circle cx="66.6" cy="${y-1.6}" r="1.6" fill="#fff"/>`}
function smile(hit,y,c){c=c||INK;return hit?`<ellipse cx="50" cy="${y}" rx="4" ry="3" fill="${c}"/>`
  :`<path d="M42 ${y}q8 7 16 0" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}
function sparks(gold,hit){return hit?`<path transform="translate(17 20)" d="${STAR}" fill="#ffd966"/><path transform="translate(85 26) scale(.8)" d="${STAR}" fill="#ffd966"/>`
  :gold?`<path transform="translate(15 22)" d="${STAR}" fill="#fff"/><path transform="translate(86 30) scale(.7)" d="${STAR}" fill="#fff"/>`:""}
function wrap(inner,gold,hit){return `<svg viewBox="0 0 100 100" aria-hidden="true">${inner}${sparks(gold,hit)}</svg>`}

/* Rocky the Digger Mole: red baseball cap */
function rocky(gold,hit){
  const b=gold?"#ffd966":"#b07d5b",d=gold?"#f2b84b":"#8f6244",s=gold?"#fff6dc":"#f3dfc8";
  return wrap(`<circle cx="22" cy="50" r="6" fill="${d}"/><circle cx="78" cy="50" r="6" fill="${d}"/><ellipse cx="50" cy="64" rx="35" ry="31" fill="${b}"/><ellipse cx="50" cy="76" rx="21" ry="14" fill="${s}"/><path d="M28 45Q28 17 50 17Q72 17 72 45Z" fill="#e5484d"/><path d="M50 18V41" stroke="#c93a3f" stroke-width="1.6"/><circle cx="50" cy="16.5" r="3.5" fill="#b9242b"/><path transform="translate(50 32) scale(1.15)" d="${STAR}" fill="#fff"/><path d="M23 45Q50 37 77 45Q82 54 50 55Q18 54 23 45Z" fill="#b9242b"/>${eyes(hit,61)}<ellipse cx="50" cy="69" rx="5" ry="3.5" fill="#f48fb1"/>${smile(hit,76)}`,gold,hit);
}
/* Zap the Robo-Mole: antenna and a screen face */
function zap(gold,hit){
  const b=gold?"#ffd966":"#7db2ff",d=gold?"#f2b84b":"#4f86e0",scr=gold?"#4a3a12":"#1c2745",c=gold?"#fff2b8":"#7ff3ff";
  return wrap(`<path d="M50 25V12" stroke="${d}" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="9" r="5" fill="${gold?"#fff":"#ff5d73"}"/><rect x="9" y="48" width="9" height="20" rx="4" fill="${d}"/><rect x="82" y="48" width="9" height="20" rx="4" fill="${d}"/><rect x="15" y="24" width="70" height="70" rx="22" fill="${b}"/><rect x="24" y="36" width="52" height="38" rx="14" fill="${scr}"/>${eyes(hit,51,c)}${smile(hit,64,c)}<rect x="36" y="81" width="28" height="8" rx="4" fill="${d}"/><circle cx="44" cy="85" r="2" fill="#fff"/><circle cx="50" cy="85" r="2" fill="${c}"/><circle cx="56" cy="85" r="2" fill="#fff"/>`,gold,hit);
}
/* Rex the Dino Mole: back spikes */
function rex(gold,hit){
  const b=gold?"#ffd966":"#6fcf7f",d=gold?"#f2b84b":"#4db35f",s=gold?"#fff6dc":"#dcf6c8",sp=gold?"#e8a42e":"#ff9f43";
  return wrap(`<path d="M29 40l6-22 8 16ZM43 34l7-24 7 24ZM57 34l8-16 6 22Z" fill="${sp}"/><ellipse cx="50" cy="64" rx="35" ry="31" fill="${b}"/><ellipse cx="50" cy="76" rx="21" ry="14" fill="${s}"/><circle cx="25" cy="64" r="5" fill="${d}" opacity=".55"/><circle cx="75" cy="64" r="5" fill="${d}" opacity=".55"/>${eyes(hit,50)}<circle cx="44" cy="62" r="2" fill="${d}"/><circle cx="56" cy="62" r="2" fill="${d}"/>${smile(hit,70)}`,gold,hit);
}
/* Kuro the Ninja Mole: headband and mask */
function kuro(gold,hit){
  const b=gold?"#ffd966":"#34415f",s=gold?"#fff6dc":"#ffe6cf";
  return wrap(`<ellipse cx="50" cy="64" rx="35" ry="31" fill="${b}"/><path d="M23.5 44H76.5L82 52H18Z" fill="#e63946"/><path d="M78 46L96 38L93 50ZM78 50L95 60L88 49Z" fill="#e63946"/><rect x="19" y="54" width="62" height="17" rx="8.5" fill="${s}"/>${eyes(hit,62.5)}${smile(hit,79,"#fff")}`,gold,hit);
}
/* Captain Cheddar the Hero Mole: mask, cape and a star on the chest */
function cheddar(gold,hit){
  const b=gold?"#ffd966":"#4f7dff",s=gold?"#fff6dc":"#dbe6ff",red="#e5484d";
  return wrap(`<path d="M20 56L4 92L38 84Z" fill="${red}"/><path d="M80 56L96 92L62 84Z" fill="${red}"/><ellipse cx="50" cy="64" rx="35" ry="31" fill="${b}"/><ellipse cx="50" cy="77" rx="21" ry="14" fill="${s}"/><path transform="translate(50 82) scale(1.4)" d="${STAR}" fill="${gold?"#e8a42e":"#ffc83d"}"/><path d="M19 52Q50 40 81 52L79 63Q50 55 21 63Z" fill="${red}"/><ellipse cx="36" cy="55" rx="8" ry="5.5" fill="#fff"/><ellipse cx="64" cy="55" rx="8" ry="5.5" fill="#fff"/>${eyes(hit,55)}${smile(hit,70)}`,gold,hit);
}
/* Hoot the Midnight Owl Mole: ear tufts, big eye rings and wing-cape */
function owl(gold,hit){
  const b=gold?"#ffd966":"#4b469a",d=gold?"#f2b84b":"#2f2b6b",s=gold?"#fff6dc":"#8f89dd",ring=gold?"#fff6dc":"#ffe27a";
  return wrap(`<path d="M16 54Q0 76 10 95L38 84Z" fill="${d}"/><path d="M84 54Q100 76 90 95L62 84Z" fill="${d}"/><path d="M24 42L20 15L44 33ZM76 42L80 15L56 33Z" fill="${d}"/><ellipse cx="50" cy="64" rx="35" ry="31" fill="${b}"/><ellipse cx="50" cy="79" rx="20" ry="13" fill="${s}"/><path d="M42 74l3 4 3-4M52 74l3 4 3-4M47 82l3 4 3-4" stroke="${b}" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="35" cy="52" r="12" fill="${ring}"/><circle cx="65" cy="52" r="12" fill="${ring}"/>${eyes(hit,52,"#2a2650")}<path d="M45 60L55 60L50 70Z" fill="#ff9f1c"/>`,gold,hit);
}
const ART={};

/* Safe storage (can be blocked in private mode) */
const ls={get(k,f){try{const v=localStorage.getItem(k);return v===null?f:v}catch(e){return f}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const pid=ls.get("wm_pid","")||("p"+Math.random().toString(36).slice(2,10)+Date.now().toString(36));
ls.set("wm_pid",pid);
let name=ls.get("wm_name",""),level=ls.get("wm_level","easy"),soundOn=ls.get("wm_sound","on")!=="off";
if(!LV[level])level="easy";
let mine={};try{mine=JSON.parse(ls.get("wm_best","{}"))||{}}catch(e){}

/* Characters you can pick (each also gets its own colour theme in style.css) */
const CH={
  tuli:{name:"Tuli",full:"Tuli the Tulip Mole",draw:mole,deco:"🌸 🌷 🌸",hole:"🌱",tag:"Catch the little moles! 🌷"},
  rocky:{name:"Rocky",full:"Rocky the Digger Mole",draw:rocky,deco:"⛏️ 💎 ⛏️",hole:"💎",tag:"Catch the sneaky cousins! ⛏️"},
  zap:{name:"Zap",full:"Zap the Robo-Mole",draw:zap,deco:"⚡ 🤖 ⚡",hole:"🔌",tag:"Reboot the glitch-bots! ⚡"},
  rex:{name:"Rex",full:"Rex the Dino Mole",draw:rex,deco:"🌴 🦖 🌴",hole:"🥚",tag:"Save the eggs! 🥚"},
  kuro:{name:"Kuro",full:"Kuro the Ninja Mole",draw:kuro,deco:"🎋 🥷 🎋",hole:"🎋",tag:"Catch the shadow clones! 🥷"},
  cheddar:{name:"Cheddar",full:"Captain Cheddar the Hero Mole",draw:cheddar,deco:"⭐ 🦸 ⭐",hole:"🧀",tag:"Stop the Prank Squad! 🦸"},
  owl:{name:"Hoot",full:"Hoot the Midnight Owl Mole",draw:owl,deco:"🌙 🦉 🌙",hole:"🧦",tag:"Catch the sock thieves! 🧦"}
};
let themeReady=false;
let ch=ls.get("wm_char","tuli");if(!CH[ch])ch="tuli";
function setChar(id){ch=id;ls.set("wm_char",id);const c=CH[id];ART.n=c.draw(0,0);ART.g=c.draw(1,0);ART.h=c.draw(0,1);ART.gh=c.draw(1,1);document.documentElement.dataset.char=id;if(themeReady)paintTheme()}
const T=x=>x.replace(/\{hero\}/g,CH[ch].name).replace(/\{full\}/g,CH[ch].full);
setChar(ch);

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
let db=null,rows=[],liveOnline=false,dbErr="";
function onRows(snap){rows=snap.docs.map(d=>({id:d.id,...d.data()}));liveOnline=true;if(!$("ov").hidden&&view==="lb")drawBoard()}
function listen(q){q.onSnapshot(onRows,e=>{liveOnline=false;dbErr=(e&&e.code)||"error";console.error("Firestore read failed:",e)})}
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
  db.collection("scores").doc(pid+"_"+l).set({name,level:l,best:v,t:Date.now()})
    .catch(e=>{dbErr=(e&&e.code)||"error";console.error("Firestore save failed:",e)});
}
// Upload every best score saved on this device (covers scores made before Firebase was set up).
function syncMine(){if(!db||!name)return;Object.keys(mine).forEach(l=>{if(mine[l]>0)saveScore(l,mine[l])})}
function boardFor(l){
  let list=rows.filter(r=>r.level===l&&r.name&&typeof r.best==="number");
  if(!liveOnline){list=mine[l]?[{id:pid+"_"+l,name,level:l,best:mine[l]}]:[]}
  return list.sort((a,b)=>b.best-a.best||(a.t||0)-(b.t||0));
}

/* Game */
const board=$("board"),msg=$("msg"),go=$("go");
let HOLE="🌱";
for(let i=0;i<9;i++){const b=document.createElement("button");b.className="hole";b.textContent=HOLE;b.setAttribute("aria-label","Hole "+(i+1));board.appendChild(b)}
const holes=[...board.children];
let score=0,left=GAME,cur=-1,curG=false,playing=false,t0=0,mt,cd,streak=0;

function reset(){holes.forEach(h=>{h.className="hole";h.textContent=HOLE})}
function speed(){const[a,z]=LV[level],p=Math.min((Date.now()-t0)/(GAME*1000),1);return a-(a-z)*p}
function show(){
  reset();let n;do{n=Math.floor(Math.random()*9)}while(n===cur);cur=n;
  curG=playing&&!curG&&Math.random()<GOLD_P;
  const h=holes[n];h.innerHTML=curG?ART.g:ART.n;h.classList.add("mole");
  if(curG){h.classList.add("golden");S.gold()}else S.pop();
}
function next(){clearTimeout(mt);mt=setTimeout(()=>{if(!playing)return;streak=0;show();next()},speed()*(curG?.7:1))}
function lock(x){go.disabled=x;document.querySelectorAll(".lv").forEach(b=>b.disabled=x);$("help").disabled=x;$("top").disabled=x;$("story").disabled=x}
function refreshStats(){$("sc").textContent=score;$("tm").textContent=left;$("bs").textContent=mine[level]||0}
const seen={};
function start(){
  if(playing)return;if(!name){welcome();return}
  if(!seen[level]){seen[level]=1;chapter();return}
  begin();
}
function begin(){
  if(playing)return;closeOv();score=0;left=GAME;cur=-1;curG=false;streak=0;playing=true;t0=Date.now();
  msg.textContent="Quick! Catch the mole! 💕";go.textContent="Playing... 🌸";lock(true);refreshStats();S.start();show();next();
  cd=setInterval(()=>{left--;$("tm").textContent=left;if(left>0&&left<=3)S.tick();if(left<=0)end()},1000);
}
function end(){
  playing=false;clearTimeout(mt);clearInterval(cd);reset();cur=-1;S.end();
  const rec=score>0&&score>(mine[level]||0);
  if(rec){mine[level]=score;ls.set("wm_best",JSON.stringify(mine));S.record()}
  if(mine[level])saveScore(level,mine[level]);
  msg.textContent=`Time’s up! ${score} points 🎉`;go.textContent="Play Again 🔄";lock(false);refreshStats();
  results(rec);
}
holes.forEach((h,i)=>h.addEventListener("click",()=>{
  if(!playing)return;
  if(i===cur){
    const g=curG;score+=g?GOLD_PTS:1;streak++;$("sc").textContent=score;
    msg.textContent=g?`Golden mole! +${GOLD_PTS} ⭐✨`:`Yay! You caught one! ${STORY[ch].icon}`;
    g?S.goldHit():S.hit(streak);show();next();
    h.innerHTML=g?ART.gh:ART.h;h.classList.add("hit");
    setTimeout(()=>{if(h.classList.contains("hit")){h.className="hole";h.textContent=HOLE}},300);
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
function chapter(){
  view="";const c=STORY[ch].chap[level];
  openOv(`<h2>${c.t}</h2><p class="story">${c.x}</p><p class="note">${T(STORY[ch].gold)}</p><button class="btn" id="bg">Begin 🌷</button><div class="foot"><button class="ghost" id="cl">Not now</button></div>`);
  $("bg").onclick=()=>{audio();begin()};$("cl").onclick=()=>{seen[level]=0;closeOv()};
}
function intro(i,after){
  view="";const IN=STORY[ch].intro,last=i>=IN.length-1;
  openOv(`<h2>${STORY[ch].title} ${STORY[ch].icon}</h2><p class="story">${T(IN[i])}</p><p class="note">${i+1} of ${IN.length}</p><button class="btn" id="nx">${last?"Let’s help! 🎀":"Next ➜"}</button>`);
  $("nx").onclick=()=>{audio();if(!last)intro(i+1,after);else{ls.set("wm_story","1");after?after():closeOv()}};
}
function ending(){
  const[w,b]=GOAL[level],k=score>=b?2:score>=w?1:0;
  return `<p class="story"><b>${STORY[ch].res[k]}</b><br>${T(STORY[ch].end[level][k])}</p>`;
}
function how(){return `<ul><li>🐹 Tap the mole when it pops up. +1 point each.</li><li>✨ A <b>golden</b> mole is worth +${GOLD_PTS} but vanishes fast.</li><li>🎵 Catch moles in a row for a combo. A wrong tap resets it.</li><li>⏰ You have ${GAME} seconds. The mole speeds up as time runs out.</li><li>🏆 Beat your best and climb the leaderboard!</li></ul>`}
function welcome(){
  view="wel";
  openOv(`<h2>Welcome! 🌷</h2><p class="note" id="meet">Meet ${CH[ch].full}</p><div class="chars">${Object.keys(CH).map(k=>`<button class="chr${k===ch?" on":""}" data-c="${k}" aria-label="${CH[k].full}"><span class="cv">${CH[k].draw(0,0)}</span>${CH[k].name}</button>`).join("")}</div>${how()}<label for="nm">Your name</label><input id="nm" maxlength="14" placeholder="Enter your name" autocomplete="nickname" value="">
    <button class="btn" id="ok">Let’s play 🎀</button>`);
  const i=$("nm");i.value=name;i.focus();
  document.querySelectorAll(".chr").forEach(b=>b.onclick=()=>{audio();setChar(b.dataset.c);document.querySelectorAll(".chr").forEach(x=>x.classList.toggle("on",x===b));$("meet").textContent="Meet "+CH[ch].full;S.pop()});
  const ok=()=>{const v=i.value.trim().replace(/\s+/g," ").slice(0,14);if(!v){i.focus();return}
    name=v;ls.set("wm_name",name);syncMine();paintWho();closeOv();if(!ls.get("wm_story",""))intro(0,null);
    msg.textContent=`Hi ${name}! Press Start 🌼`};
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
  const n=$("lnote");if(n)n.textContent=liveOnline?`Live leaderboard · ${list.length} player${list.length===1?"":"s"}`:"Offline"+(dbErr?" ("+dbErr+")":"")+": showing scores from this device only";
}
function lbHtml(){return `<div class="row" style="margin-top:10px">${Object.keys(LV).map(l=>`<button class="lv ltab" data-l="${l}">${LN[l]}</button>`).join("")}</div><ol class="lb" id="lbl"></ol><p class="note" id="lnote"></p>`}
function wireTabs(){document.querySelectorAll(".ltab").forEach(b=>b.onclick=()=>drawBoard(b.dataset.l))}
function results(rec){
  view="lb";drawBoard.l=level;
  openOv(`<h2>Time’s up! 🎉</h2><p class="big">${score}</p><p class="note">${LN[level]} · ${rec?"New personal best! 🏆":"Best: "+(mine[level]||0)}</p>${ending()}${lbHtml()}
    <button class="btn" id="again">Play Again 🔄</button><div class="foot"><button class="ghost" id="chg">Change player</button></div>`);
  wireTabs();drawBoard(level);$("again").onclick=start;$("chg").onclick=welcome;
}
$("top").onclick=()=>{view="lb";drawBoard.l=level;openOv(`<h2>🏆 Leaderboard</h2>${lbHtml()}<button class="btn" id="cl">Close</button>`);wireTabs();drawBoard(level);$("cl").onclick=closeOv};
$("help").onclick=()=>{view="";openOv(`<h2>How to play 🌷</h2>${how()}<button class="btn" id="cl">Got it</button>`);$("cl").onclick=closeOv};

$("story").onclick=()=>intro(0,null);
paintLv();refreshStats();$("snd").textContent=soundOn?"🔊 Sound on":"🔇 Sound off";
function paintWho(){$("who").textContent=name?`Playing as ${name} ${STORY[ch].icon}`:CH[ch].tag}
/* The whole look changes with the character: colours (CSS), emojis, subtitle, level icons */
function paintTheme(){
  const c=CH[ch];HOLE=c.hole;$("deco").textContent=c.deco;
  Object.keys(LNAME).forEach(l=>{const t=STORY[ch].chap[l].t;LN[l]=`${t.slice(t.lastIndexOf(" ")+1)} ${LNAME[l]}`});
  document.querySelectorAll("#lvls .lv").forEach(b=>b.textContent=LN[b.dataset.l]);
  if(!playing)reset();
  paintWho();
}
themeReady=true;paintTheme();
syncMine();
welcome();
