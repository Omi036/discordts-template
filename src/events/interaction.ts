import { Client, Collection, Events } from "discord.js";

export default {
    name:"interactionCreate",
    execute: (client: Client, commands:Collection<String, any>): void => {

        client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = commands.get(interaction.commandName);

    
        if (!command) {
                console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
                return;
        }

    
        try {
                await command.execute(interaction);
        } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
        }
})
    }
}

