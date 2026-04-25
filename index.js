const { Telegraf } = require('telegraf');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// 🚀 BOT LOGIC

bot.start((ctx) => {
  ctx.reply("🔥 Bot is live! Click below 👇", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Buy Now", callback_data: "buy" }]
      ]
    }
  });
});

bot.action('buy', (ctx) => {
  ctx.reply("Click to pay 👇", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "💳 Pay Now", url: "https://rzp.io/l/yourlink" }],
        [{ text: "✅ I Paid", callback_data: "paid" }]
      ]
    }
  });
});

bot.action('paid', (ctx) => {
  ctx.reply("Send payment screenshot or ID");
});

// 🌐 WEBHOOK ROUTE
app.use(express.json());
app.use(bot.webhookCallback('/webhook'));

// 🔥 PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  const url = process.env.RENDER_EXTERNAL_URL;

  await bot.telegram.deleteWebhook(); // remove old
  await bot.telegram.setWebhook(`${url}/webhook`);
});
