🌷 Whack-a-Mole: Tuli and the Missing Tulips

A cute, story-driven whack-a-mole game for the browser. Help Tuli the Tulip Mole save Petal Park from a gang of mischievous moles digging up the tulip bulbs!

I built the first version in my first year of uni and finally deployed it.

🎮 Play it here: 
https://whack-a-tuli.vercel.app/

✨ Features
📖 A story: an intro, three chapters and a different ending depending on your score
🎚️ Three levels: Easy, Medium and Hard, each with its own speed
🌟 Golden moles: rare, quick to vanish, worth 5 points
🎵 Combo sounds: the pitch climbs as you catch moles in a row (made with the Web Audio API, no audio files)
🏆 Personal bests: your name and best score for each level are saved in your browser
🌙 Dark mode: follows your device setting
📱 Works on any device: phone, tablet or laptop, no install needed
🐹 Tuli is drawn in code: the mole art is built from SVG, so there are no image files to load
🕹️ How to play?
Enter your name and read Tuli's story.
Pick a level and press Start Game.
Tap the mole when it pops out of a hole: +1 point each.
Golden moles give +5 points but disappear fast.
Catch moles in a row for a combo. A wrong tap resets it.
You have 30 seconds, and the moles get faster as time runs out.
📖 The story

Tuli is the gardener of Petal Park. One night, mischievous moles sneak in and start digging up the tulip bulbs, and Tuli can't catch them alone.

Level	Chapter	Score for "garden saved"	Score for the best ending
Easy	The Garden Gate	15	25
Medium	The Tulip Fields	20	32
Hard	The Midnight Burrow	25	40
🛠️ Built with
HTML, CSS and vanilla JavaScript (no frameworks, no build step)
Web Audio API for the sounds
Inline SVG for the characters
localStorage for saved names and scores
Hosted on Vercel
📁 Project structure
File	What it does
index.html	The page structure
style.css	Colours, layout, animations and dark mode
script.js	Game logic, sounds, mole art, story and leaderboard
firebase-config.js	Optional online leaderboard settings (empty by default)
firestore.rules	Optional security rules for the online leaderboard

Story text: INTRO, CHAP and END
Score thresholds for the endings: GOAL
Game length: GAME (seconds)
Mole speed per level: LV (milliseconds the mole stays up, at the start and at the end)
Golden mole chance and points: GOLD_P and GOLD_PTS

Tuli the Tulip Mole is an original character.

