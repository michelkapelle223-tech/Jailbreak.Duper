require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

app.use(express.json({ limit: "10kb" }));
app.use("/api/", rateLimit({ windowMs: 60 * 1000, limit: 5, standardHeaders: "draft-7", legacyHeaders: false }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/submit", async (req, res) => {
  const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";
  if (!content) return res.status(400).json({ error: "Vul eerst tekst in." });
  if (content.length > 5000) return res.status(400).json({ error: "De tekst is te lang (maximaal 5000 tekens)." });
  if (!WEBHOOK) return res.status(503).json({ error: "Discord is nog niet ingesteld door de websitebeheerder." });

  try {
    const discordResponse = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        allowed_mentions: { parse: [] },
        embeds: [{
          title: "Nieuwe Jailbreak Duper-inzending",
          description: content.slice(0, 4000),
          color: 5793266,
          footer: { text: "Ingezonden via de website" },
          timestamp: new Date().toISOString()
        }]
      })
    });
    if (!discordResponse.ok) {
      console.error("Discord webhook returned status", discordResponse.status);
      return res.status(502).json({ error: "Discord kon de inzending niet ontvangen." });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Discord send failed:", err.message);
    return res.status(502).json({ error: "Verzenden naar Discord is mislukt." });
  }
});

app.listen(PORT, () => console.log(`Jailbreak Duper draait op poort ${PORT}`));
