import Command from "./commandInterface";
import { Message, MessageEmbed } from "discord.js";

export class PingCommand implements Command {
  commandNames = ["pingu"];

  help(): MessageEmbed {
    return new MessageEmbed().setDescription("Thats ping pong baby");
  }

  async run(message: Message): Promise<void> {
    await message.reply("🐧");
  }
}
