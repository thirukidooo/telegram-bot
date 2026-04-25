const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(express.json());

// 🚀 START MESSAGE
bot.start((ctx) => {
  ctx.reply(`🔓 PREMIUM CHANNEL ACCESS

Unlock exclusive access to our
🔥 Tamil + Bingeme Premium Library

━━━━━━━━━━━━━━━
✅ 4,000+ Premium Videos & Files
✅ Daily New Content Updates
✅ Instant Access After Payment
✅ Secure Payment via Razorpay
━━━━━━━━━━━━━━━

💰 Offer Price: ₹299 ONLY!

👇 Choose an option below`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "💳 Buy Now", callback_data: "buy" },
          { text: "📺 Demo", url: "https://your-demo-link.com" }
        ]
      ]
    }
  });
});

// 💳 BUY BUTTON
bot.action('buy', (ctx) => {
  ctx.reply(`💳 PAYMENT LINK READY

💰 Amount: ₹299

👇 Click below to pay`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Pay Now", url: "https://rzp.io/l/yourlink" }],
        [{ text: "✅ I Paid", callback_data: "paid" }]
      ]
    }
  });
});

// ✅ PAID BUTTON
bot.action('paid', (ctx) => {
  ctx.reply(`📩 Send payment screenshot or ID for verification.`);
});

// 🌐 WEBHOOK ROUTE
app.use(bot.webhookCallback('/webhook'));

// 🔥 PORT (IMPORTANT)
const PORT = process.env.PORT || 3000;

// 🚀 START SERVER
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  const url = process.env.RENDER_EXTERNAL_URL;

  await bot.telegram.deleteWebhook();
  await bot.telegram.setWebhook(`${url}/webhook`);
});
