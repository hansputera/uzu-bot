import { Message, MessageEmbed } from "discord.js";
import type BotClient from "../../handler/Client";

export = {
    name: "ping",
    aliases: ["pong"],
    execute: async (bot: BotClient, message: Message) => {
        const m = await message.channel.send("Pinging...");
        setTimeout(() => {
            const embed = new MessageEmbed()
            .setColor(bot.ws.ping > 1000 ? "RED" : "GREEN")
            .setTitle("Pong!")
            .addField(":ping_pong: Latency", `${bot.ws.ping}ms`)
            .addField(":hearts: API", `${message.createdTimestamp - m.createdTimestamp}ms`)
            .setTimestamp();
            if (m.deletable) {
                m.delete();
                message.channel.send(embed);
            } else {
                m.edit("Deletable do not allowed", { embed: { hexColor: "#ffffff", title: "Permission denied"}});
                message.channel.send(embed);
            }
        }, 5000);
    }
}