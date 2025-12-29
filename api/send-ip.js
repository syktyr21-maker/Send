export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // توکن و chat_id مستقیم جاسازی شده
  const token = "7961668268:AAEGMLMj5TojYl3giXl_C8S0O2zH3Q8IeEU";
  const chatId = "7198165253";

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Visitor IP: ${ip}`
      })
    });
    res.status(200).send("IP sent to Telegram!");
  } catch (err) {
    console.error("Telegram error:", err);
    res.status(500).send("Error sending IP");
  }
}

