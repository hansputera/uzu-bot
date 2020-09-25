import { readdir } from "fs";
import type BotClient from "./Client";
import Errno from "../utils/UzumakiError";
import type { ICommand, IModule } from "../@typings";

export = async (bot: BotClient) => {

    readdir("./dist/commands", (err, categories) => {
        if (err) {
            throw new Errno(err.message);
        } else {
            console.log("Founded " + categories.length + " categories");
            categories.forEach(category => {
                let moduleConf: IModule = require(`../commands/${category}/module.json`);
                moduleConf.cmds = [];
                bot.helps.set(category, moduleConf);
                readdir(`./dist/commands/${category}/`, (error, files) => {
                    if (error) {
                        throw new Errno(error.message);
                    } else {
                        console.log(`Founded ${files.length - 1} files.`);
                        files.forEach(file => {
                            if (!file.endsWith(".js")) return;
                            const prop: ICommand = require(`../commands/${category}/${file}`);
                            bot.commands.set(prop.name, prop);
                            prop.aliases.forEach(alias => {
                                bot.aliases.set(alias, prop.name);
                            });
                            bot.helps.get(category)!.cmds.push(prop.name);
                        });
                    }
                });
            });
        }
    });
}