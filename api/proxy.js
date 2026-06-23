// api/proxy.js
export default async function handler(req, res) {
    const LEAGUE = "Runes Of Aldur";
    const GGG_URL = `https://api.pathofexile.com/trade/exchange/${encodeURIComponent(LEAGUE)}`;

    try {
        const response = await fetch(GGG_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'PoE2FlipTool/1.0 (Contact: your-email@example.com)'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from GGG API" });
    }
}
//111