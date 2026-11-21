import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("9273088304:AAFt1xL-N3lZCJvDw-NmXBJ3P2T2nY2i_aE topilmadi");
  process.exit(1);
}

const bot = new Bot(token);

bot.command("start", (ctx) =>
  ctx.reply("Salom! Anigeto botiga xush kelibsiz 🎌\nAnime nomini yozing, men qidiraman.")
);

bot.on("message:text", async (ctx) => {
  const q = ctx.message.text.trim();
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=5`
    );
    const data = await res.json();
    if (!data.data?.length) return ctx.reply("Hech narsa topilmadi 😕");
    const text = data.data
      .map((a, i) => `${i + 1}. ${a.title} (${a.year ?? "?"}) ⭐ ${a.score ?? "-"}`)
      .join("\n");
    await ctx.reply(text);
  } catch (e) {
    await ctx.reply("Xatolik, keyinroq urinib ko'ring.");
  }
});

bot.catch((err) => console.error(err));
bot.start();
