export default async function handler(req, res) {
  // گرفتن آی‌پی بازدیدکننده
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // گرفتن توکن و chat_id از Environment Variables
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.CHAT_ID;

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
    console.error(err);
    res.status(500).send("Error sending IP");
  }
}
