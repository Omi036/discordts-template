// Imports the necessary thingos
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { token } from "./config.json"
import path from "node:path"
import fs from "node:fs"
import { Command, Event } from "./common/types";

// Creates the discord client
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Events && commands will be storaged here
const events = new Collection()
const commands = new Collection()

// Gets the folder where the events files are
const eventsPath = path.join(__dirname, 'events');

// Gets the scripts inside the folder
const eventsFolder = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts'));

// Gets every event and register it
(async () => {
    for(const file of eventsFolder){
        const filePath = path.join(eventsPath, file);
    
        // Imports the events
        const event: Event = await import(filePath)

        // If it has a correct structure, execute it
        if('name' in event && 'execute' in event){
            events.set(event.name, event.execute);
            event.execute(client, commands);

        }else{
            console.warn(`[WARN] File ${file} couldn't be loaded.`)
        }
    }
})()


// Gets the folder where the commands's categories are located
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
(async () => {
    // Gets every folder/category inside the 
    for(const category of commandFolders){
        const categoryPath = path.join(foldersPath, category);
        const categoryScripts = fs.readdirSync(categoryPath).filter(file => file.endsWith(".ts"))

        // Registers every commmand
        for(const script of categoryScripts){
            const scriptPath = path.join(categoryPath, script)
            const scriptContent: Command = await import(scriptPath)

            if('data' in scriptContent && 'execute' in scriptContent){
                commands.set(scriptContent.data.name, scriptContent)
            }else{
                console.warn(`[WARN] File ${scriptContent} couldn't be loaded.`)
            }
        }
    }
})()


client.login(token);