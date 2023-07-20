import { SlashCommandBuilder } from "discord.js";

export interface Command {
    data: SlashCommandBuilder,
    execute: Function
}

export interface Event {
    name: String,
    execute: Function
}