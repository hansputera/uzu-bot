import { Message } from "discord.js";
import type BotClient from "./Client";

export = async (bot: BotClient, message: Message) => {
    const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    const command = args.shift()!.toLowerCase();

    const cmd = bot.commands.get(command) || bot.commands.get((bot.aliases.get(command) as string));
    cmd!.execute(bot, message, args);
}