# Guess the Accent

A browser-based listening game by Timur Akishev, KIMEP University (2026).

15 recordings, shuffled rounds, four-choice or typed answers, running score, a final review, and the shared reading passage. No build tools, accounts, analytics, or server required. All game state stays in the browser and resets on reload.

## Publish on GitHub Pages

1. Create a **public** repository named `guess-the-accent`.
2. Upload this folder's contents to the repository root, preserving the `audio` folder. Upload the extracted files, not the ZIP.
3. Open **Settings → Pages**. Select **Deploy from a branch**, then **main** and **/(root)**. Save.
4. Wait for the Pages deployment to finish. The expected URL for the account `timurakishev` is `https://timurakishev.github.io/guess-the-accent/`.

Further commits to the publishing branch update the site automatically.

## Run locally

Open `index.html` in a browser, or serve this folder with `python -m http.server 8000` and visit `http://localhost:8000`.

## Educational notes

The task asks for the speaker's reported first language, not nationality. One speaker does not represent all speakers of a language. Typed answers accept broader labels (Chinese, Spanish, Portuguese) as well as the specific labels shown in feedback.

Answer keys are visible in the JavaScript source; this is a practice game, not a secure assessment.

## Credits and permissions

See CREDITS.md. Recordings retain their own license; no blanket software license is assigned to this repository.
