// pages/api/create-coin.js
import { generateKeyPairSync, createSign, createHash } from "crypto";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    // 1. Bitcoin curve keypair (secp256k1)
    const { publicKey, privateKey } = generateKeyPairSync("ec", {
      namedCurve: "secp256k1",
      publicKeyEncoding: { type: "spki", format: "der" },
      privateKeyEncoding: { type: "pkcs8", format: "der" },
    });

    const pubHex = publicKey.toString("hex");

    // 2. Payload
    const timestamp = Date.now();
    const nonce = Math.floor(Math.random() * 1e9);
    const payload = { owner: pubHex, timestamp, nonce };

    // 3. Hash payload (SHA-256)
    const canonical = JSON.stringify(payload);
    const hash = createHash("sha256").update(canonical).digest("hex");

    // 4. Sign the hash
    const signer = createSign("SHA256");
    signer.update(canonical);
    signer.end();
    const signature = signer.sign({ key: privateKey, format: "der", type: "pkcs8" }).toString("hex");

    // 5. Response
    res.status(200).json({
      success: true,
      id: hash,
      payload,
      signature,
      pubKey: pubHex,
      createdAt: new Date(timestamp).toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}


