import { Message } from "discord.js";
import type BotClient from "../handler/Client";

export interface IModule {
    name: string,
    hide: boolean,
    cmds: string[]
}

export interface ICommand {
    name: string,
    aliases: string[],
    execute: (bot: BotClient, message: Message, args: string[]) => void | Promise<void>;
}