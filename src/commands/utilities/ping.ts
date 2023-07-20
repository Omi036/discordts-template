import { Client, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

module.exports = {
    data: new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Replies the bot latency"),

    execute: async (interaction: ChatInputCommandInteraction, client: Client) => {
        const latency = Date.now() - interaction.createdTimestamp
        await interaction.reply({content:`🏓 Pong!: ${latency}ms`})
    }
}