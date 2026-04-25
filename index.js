const { Telegraf } = require('telegraf');

// 👉 PASTE YOUR BOT TOKEN BELOW (from BotFather)
const bot = new Telegraf('8769096566:AAH5dKblavQA9tWpl1vg24dJRMwdHxJKDk0');

// 🚀 START COMMAND
bot.start((ctx) => {
  ctx.reply(`🔓 PREMIUM CHANNEL ACCESS

━━━━━━━━━━━━━━━
✅ 45+ Exclusive Videos
✅ Regular Updates
✅ Instant Access
━━━━━━━━━━━━━━━

💰 Price: ₹199

👇 Click below to continue`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔥 Buy Now", callback_data: "buy" }]
      ]
    }
  });
});

// 💳 BUY BUTTON
bot.action('buy', (ctx) => {
  ctx.reply(`💳 PAYMENT PAGE

Secure payment via Razorpay 🔐

Click below to pay 👇`, {
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
  ctx.reply(`📩 PAYMENT VERIFICATION

Send your:
✅ Payment ID or Screenshot

⏳ After verification, you’ll get access 🔓`);
});

// ❌ ERROR HANDLING
bot.catch((err) => {
  console.log('Error:', err);
});

// ▶️ START BOT
bot.launch();

console.log("Bot running...");