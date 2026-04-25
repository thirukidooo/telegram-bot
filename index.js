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
        ],
        [
          { text: "❓ Help", callback_data: "help" }
        ]
      ]
    }
  });
});

// 💳 BUY BUTTON
bot.action('buy', (ctx) => {
  ctx.reply(`💳 PAYMENT LINK READY

Pay securely using:
• UPI (GPay, PhonePe, Paytm)
• Debit / Credit Card
• Net Banking

━━━━━━━━━━━━━━━
💰 Amount: ₹299
🔐 Secure Payment via Razorpay
━━━━━━━━━━━━━━━

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
  ctx.reply(`📩 Send payment screenshot or payment ID for verification.`);
});

// ❓ HELP BUTTON
bot.action('help', (ctx) => {
  ctx.reply(`❓ Need Help?

Please contact admin. We will assist you.`);
});

// 🌐 WEBHOOK ROUTE
app.use(bot.webhookCallback('/webhook'));

// 🔥 PORT
const PORT = process.env.PORT || 3000;

// 🚀 START SERVER
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  const url = process.env.RENDER_EXTERNAL_URL;

  // SET WEBHOOK
  await bot.telegram.setWebhook(`${url}/webhook`);
});
