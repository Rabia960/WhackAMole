# Whack-a-Mole 🌷

Whack-a-mole with Tuli the Tulip Mole: three levels, golden moles, sounds, player names,
saved personal bests and a leaderboard.

## Files

| File | What it does |
|---|---|
| `index.html` | The page structure. |
| `style.css` | Colours, layout, animations, dark mode. |
| `script.js` | Game logic, sounds, mole art, leaderboard. |
| `firebase-config.js` | Your Firebase settings. Empty = leaderboard is per-device only. |
| `firestore.rules` | Security rules to paste into Firestore. |

## Run locally
Open `index.html` in a browser (or use VS Code's Live Server).

## Turn on the shared leaderboard (Firebase, free tier)
1. Go to https://console.firebase.google.com and create a project (Analytics not needed).
2. Build > **Firestore Database** > Create database > pick a region > start in production mode.
3. Firestore > **Rules** tab > replace the contents with `firestore.rules` > Publish.
4. Project settings (gear icon) > Your apps > **Web** (`</>`) > register an app > copy the `firebaseConfig` values.
5. Paste them into `firebase-config.js` (uncomment the lines, keep the quotes).
6. Redeploy. The leaderboard footer should now say "Live leaderboard".

## Deploy on Vercel
Drag this folder onto https://vercel.com/new, or run `npx vercel` inside it.
No build settings are needed (it is a static site).

## Note on cheating
There are no player accounts, so anyone technically able to call Firestore could submit a
fake score. The rules cap scores and stop them from going down, which is fine for a fun game
among friends, but not for anything with prizes.
