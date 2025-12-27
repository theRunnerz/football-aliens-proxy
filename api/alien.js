import fetch from "node-fetch";

export default async function handler(req, res) {
  // ✅ CORS HEADERS (this is the whole point)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const backendURL =
      "https://football-aliens-ai-backend-e3gj-crgidy6bs-runnerzs-projects.vercel.app/api/alien";

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({
      error: "Proxy failed",
      details: err.message
    });
  }
}
