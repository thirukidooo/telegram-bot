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

Pay easily using:
• Google Pay / PhonePe / Paytm  
• UPI Apps  
• Debit / Credit Card  

━━━━━━━━━━━━━━━
💰 Amount: ₹299  
🔐 Secured via Razorpay  
━━━━━━━━━━━━━━━

👇 Click below to proceed`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Pay Now", url: "https://rzp.io/l/yourlink" }],
        [{ text: "✅ I Paid", callback_data: "paid" }]
      ]
    }
  });
});

// ✅ PAID BUTTON (SCREENSHOT STEP)
bot.action('paid', (ctx) => {
  ctx.reply(`📩 PAYMENT VERIFICATION

Please send:
• Payment Screenshot  
OR  
• Payment ID  

⏳ After verification, you will receive access 🔓`);
});

// 🌐 WEBHOOK ROUTE
app.use(bot.webhookCallback('/webhook'));

// 🔥 PORT LINE (THIS IS WHAT YOU WANT)
const PORT = process.env.PORT || 3000;

// 🚀 START SERVER
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  const url = process.env.RENDER_EXTERNAL_URL;

  await bot.telegram.setWebhook(`${url}/webhook`);
});
