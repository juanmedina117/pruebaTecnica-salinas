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
  try {
    const { text } = req.body;
    const encryptedBuffer = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      Buffer.from(text, 'utf-8')
    );

    res.json({ encrypted: encryptedBuffer.toString('base64') });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servicio para desencriptar (para pruebas)
app.post("/api/decrypt", (req, res) => {
   try {
    const { encrypted } = req.body;
    const buffer = Buffer.from(encrypted, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      buffer
    );

    res.json({ decrypted: decrypted.toString('utf-8') });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("corriendo en el puerto 3000"));
