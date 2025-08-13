Koora Foot Maghreb - Full package (Netlify-ready)
====================================================
Contenu:
- index.html, live.html, calendar.html, standings.html, transfers.html, teams.html, forum.html, admin.html
- style.css, script.js
- images/banner.svg, images/flags/*.svg
- netlify/functions/getMatches.js

Instructions:
1) Dézippe le package et ouvre pour tests en local (pages statiques).
2) Pour récupérer les matchs via API-Football, inscris-toi sur RapidAPI -> API-Football.
3) Déploie sur Netlify (recommandé) : New site from Git -> connect GitHub or drag & drop.
4) Dans Netlify site settings -> Build & deploy -> Environment -> Add variable:
   - Name: RAPIDAPI_KEY
   - Value: ta clé RapidAPI (x-rapidapi-key)
5) Netlify Function is in netlify/functions/getMatches.js (no build required). The function reads RAPIDAPI_KEY env var.
6) Utterances (forum): replace TONCOMPTE in forum.html script with your GitHub username and ensure repo is public.

Notes:
- Admin page stores news in localStorage (client-side). For production, connect to a DB (Supabase/Firebase).
- Flags are placeholders SVGs; replace with real flag images if desired.
