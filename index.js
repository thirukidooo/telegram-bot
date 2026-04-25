const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(express.json());

// 🚀 START MESSAGE
bot.start((ctx) => {
  ctx.reply(`🔓 ZENZE ROX PREMIUM ACCESS

🎬 Zenze Rox Premium Library

━━━━━━━━━━━━━━━
✔ 4,000+ Premium Videos & Files  
✔ Daily Fresh Updates  
✔ Instant Access After Payment  
✔ Secure Payment (UPI / Card)  
━━━━━━━━━━━━━━━

💰 Price: ₹299 (One-time access)

🔒 Trusted • Fast • Secure

👇 Tap below to continue`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Buy Now", callback_data: "buy" }]
      ]
    }
  });
});

// 💳 BUY BUTTON
bot.action('buy', (ctx) => {
  ctx.reply(`💳 ZENZE ROX SECURE CHECKOUT

Choose your preferred payment method:
• Google Pay / PhonePe / Paytm  
• UPI Apps  
• Debit / Credit Card  

━━━━━━━━━━━━━━━
💰 Amount: ₹299  
🔐 Secured via Razorpay  
━━━━━━━━━━━━━━━

⚡ Instant access after successful payment

👇 Tap below to proceed`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Pay Now", url: "https://rzp.io/l/yourlink" }],
        [{ text: "✅ I Paid", callback_data: "paid" }]
      ]
    }
  });
});

// ✅ PAID BUTTON → SCREENSHOT CHANNEL
bot.action('paid', (ctx) => {
  ctx.reply(`📩 PAYMENT VERIFICATION

To complete your access:

👉 Click the button below  
👉 Send your payment screenshot in the channel  

⏳ After verification, you will receive access 🔓`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📤 Submit Screenshot", url: "https://t.me/+CYfUHYeI87M0YWM1" }]
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
