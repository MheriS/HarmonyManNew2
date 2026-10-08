import os from "os";
import 'dotenv/config';
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints FIRST
  app.get("/api/config", (req, res) => {
    const hasWeb3Key = !!(process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY);
    res.json({
      hasWeb3Key
    });
  });

  app.post("/api/submit-contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      const accessKey = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        return res.status(500).json({ success: false, message: "Server belum terkonfigurasi dengan Web3Forms Access Key." });
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          subject: subject || `Pesan Portfolio dari ${name}`,
          message: message,
          from_name: 'Portfolio Moh. Heri Susanto'
        })
      });

      const result = await response.json();
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Gagal menghubungi Web3Forms API dari server." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    const interfaces = os.networkInterfaces();

    console.log(`Local:   http://localhost:${PORT}`);

    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === "IPv4" && !net.internal) {
          console.log(`Network: http://${net.address}:${PORT}`);
        }
      }
    }
  });
}

startServer();
