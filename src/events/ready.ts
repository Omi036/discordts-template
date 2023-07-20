import { Client, Events } from "discord.js";

export default {
    name:"ready",
    execute: (client: Client): void => {
        client.on(Events.ClientReady, () => {
    
            console.log("[INFO] Bot is now ready");
    
        });
    }
}