import Uzumaki from "./handler/Client";
const bot = new Uzumaki({
    disableMentions: "everyone"
});

bot.init();

// Listener's

bot.on("ready", () => {
    const status = [
        "Uzu Clan",
        `${bot.users.cache.size} users.`,
        `${bot.guilds.cache.size} servers.`,
        `${bot.channels.cache.size} channels.`
    ];
    const random = Math.floor(Math.random() * status.length);
    setInterval(() => bot.user!.setActivity(status[random], {
        type: "WATCHING"
    }), 10000);
    console.log(`Logged in as: ${bot.user!.tag}`);
});


bot.on("message", (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const msg = message.content.toLowerCase();
    if (msg === `<@!${bot.user!.id}>` || msg === `<@${bot.user!.id}>`) {
        message.reply(`Hello ${message.author.toString()}, iam ${bot.user!.username}!`);
    }
    if (msg.startsWith(bot.prefix)) {
    try {
        require("./handler/Command")(bot, message);
    } catch (e) {
        console.error(e);
    }
}
});