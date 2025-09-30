const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());


// Evita el tema del cors
app.use(cors());


const publicKey = fs.readFileSync("../server/keys/public.pem", "utf8");
const privateKey = fs.readFileSync("../server/keys/private.pem", "utf8");

// Servicio para encriptar texto
app.post("/api/encrypt", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const buffer = Buffer.from(text, "utf8");
    const encrypted = crypto.publicEncrypt(
      { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      buffer
    );
    res.json({ encrypted: encrypted.toString("base64") });
  } catch (err) {
    res.status(500).json({ error: "Encryption failed" });
  }
});

// Servicio para desencriptar (para pruebas)
app.post("/api/decrypt", (req, res) => {
  const { encrypted } = req.body;
  if (!encrypted) return res.status(400).json({ error: "Encrypted text required" });

  try {
    const buffer = Buffer.from(encrypted, "base64");
    const decrypted = crypto.privateDecrypt(
      { key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      buffer
    );
    res.json({ text: decrypted.toString("utf8") });
  } catch (err) {
    res.status(500).json({ error: "Decryption failed" });
  }
});

app.listen(3000, () => console.log("corriendo en el puerto 3000"));
