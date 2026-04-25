const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(express.json());

// 🚀 START MESSAGE
bot.start((ctx) => {
  ctx.reply(`🔓 PREMIUM CHANNEL ACCESS

🔥 Tamil + Bingeme Premium Library

━━━━━━━━━━━━━━━
✅ 4,000+ Videos & Files
✅ Daily Updates
✅ Instant Access
━━━━━━━━━━━━━━━

💰 Price: ₹299

👇 Click below to continue`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Buy Now", callback_data: "buy" }]
      ]
    }
  });
});

// 💳 BUY BUTTON
bot.action('buy', (ctx) => {
  ctx.reply(`💳 PAYMENT LINK

💰 Amount: ₹299

👇 Click below to pay`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Pay Now", url: "https://rzp.io/l/yourlink" }]
      ]
    }
  });
});

// 🌐 WEBHOOK ROUTE
app.use(bot.webhookCallback('/webhook'));

// 🔥 PORT
const PORT = process.env.PORT || 3000;

// 🚀 START SERVER
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  const url = process.env.RENDER_EXTERNAL_URL;
  await bot.telegram.setWebhook(`${url}/webhook`);
});
