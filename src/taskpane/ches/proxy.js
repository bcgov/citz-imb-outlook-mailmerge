import express, { json } from "express";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";

/* global process */

const app = express();
const port = 3001;

app.use(json({ limit: "50mb" }));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(
  rateLimit({
    windowMs: 2 * 1000, // 2 seconds
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.post("/send-email", async (req, res) => {
  try {
    const tokenResponse = await fetch(
      "https://dev.loginproxy.gov.bc.ca/auth/realms/comsvcauth/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          grant_type: "client_credentials",
        }),
      }
    );

    const { access_token } = await tokenResponse.json();

    const response = await fetch("https://ches-dev.api.gov.bc.ca/api/v1/email", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
