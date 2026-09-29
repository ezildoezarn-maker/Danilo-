const BOT_URL = "http://node.modz.ink:25505";

module.exports = async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ erro: "método não permitido" });
  }
  try {
    const opts = { method: req.method };
    if (req.method === "POST") {
      opts.headers = { "Content-Type": "application/json" };
      opts.body = JSON.stringify(req.body);
    }
    const r = await fetch(`${BOT_URL}/api/lucro`, opts);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ erro: "bot indisponível", detalhe: String(e) });
  }
}
