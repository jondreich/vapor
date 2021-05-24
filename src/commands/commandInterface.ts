import { Message, MessageEmbed } from "discord.js";

export default interface Command {
  readonly commandNames: string[];

  help(): MessageEmbed;

  run(parsedUserCommand: Message): Promise<void>;
}
