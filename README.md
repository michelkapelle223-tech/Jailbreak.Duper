# Jailbreak Duper — Discord inzendingen

## Wat doet dit?
De website toont de zwarte achtergrond met vallende sneeuw. Als iemand tekst indient, stuurt de server die tekst naar jouw Discord-kanaal via een webhook.

## 1. Maak een Discord-webhook
1. Open Discord en ga naar het kanaal waar je inzendingen wilt ontvangen.
2. Open **Kanaal bewerken → Integraties → Webhooks** (de namen kunnen iets verschillen).
3. Kies **Nieuwe webhook**, geef hem een naam en kies **Webhook-URL kopiëren**.

**Deel de webhook-URL nooit openbaar en zet hem nooit in `index.html`.** Iedereen met die URL kan berichten naar je kanaal sturen.

## 2. Stel de webhook in op de server
Maak in deze projectmap een bestand met de naam `.env` en zet erin:

DISCORD_WEBHOOK_URL=PLAK_HIER_JOUW_DISCORD_WEBHOOK_URL

Vervang de voorbeeldtekst door je echte URL. Upload of commit `.env` niet naar GitHub.

## 3. Start lokaal
Installeer Node.js (versie 18 of nieuwer). Open een terminal in deze map en voer uit:

```bash
npm install
npm start
```

Open daarna http://localhost:3000

## 4. Online zetten
Zet deze hele projectmap op een Node-host (bijvoorbeeld Render). Stel daar `DISCORD_WEBHOOK_URL` in als **Environment Variable** en start met `npm start`. De map `public` bevat de websitebestanden.

## Privacy
Vertel bezoekers duidelijk dat hun tekst naar jouw Discord-kanaal wordt gestuurd. Verzamel geen wachtwoorden, cookies, tokens of andere geheime gegevens. Verwijder inzendingen die je niet nodig hebt.
