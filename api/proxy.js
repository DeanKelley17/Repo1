// api/proxy.js
export default async function handler(req, res) {
    // Note the '/trade2/' path, which is mandatory for PoE2
    const LEAGUE = "Runes of Aldur";
    const GGG_URL = `https://api.pathofexile.com/trade2/exchange/${encodeURIComponent(LEAGUE)}`;

    try {
        const response = await fetch(GGG_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'PoE2MobileFlipTool/1.0'
            },
            body: JSON.stringify(req.body) // Pass the request from your frontend
        });

        const data = await response.json();
        
        // If GGG returns a 404, we log it so you can see it in Vercel logs
        if (!response.ok) {
            console.error("GGG API Error:", response.status, data);
            return res.status(response.status).json({ error: "GGG API returned error", details: data });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Proxy Internal Error:", error);
        res.status(500).json({ error: "Failed to connect to GGG" });
    }
}
