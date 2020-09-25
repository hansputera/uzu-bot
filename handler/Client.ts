import { Client, ClientOptions, Collection } from "discord.js";
import type { ICommand, IModule } from "../@typings";
import { config } from "dotenv";
import Module from "./Module";

export default class Uzumaki extends Client {

    readonly prefix = "u!";
    public commands: Collection<string, ICommand> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public helps: Collection<string, IModule> = new Collection();

    constructor(ops: ClientOptions) {
        super(ops);
        config();
        console.warn("[dotenv] running");
            
    }

    init(): void {
        this.login(process.env.TOKEN).catch((e) => {
            console.error(e);
        }).then(() => {
            console.log("Logging client");
            Module(this);
        });
    }
}