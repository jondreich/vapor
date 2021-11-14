import Command from "./commandInterface";
import { Message, MessageEmbed } from "discord.js";
import { CheckForAllSales, GetGameById } from ".././steamClient";
import {
  AddToWishlistDb,
  DeleteFromWishlistDb,
  GetGameFromWishlist,
  GetWishlist,
} from ".././sqliteWrapper";
import {
  FormatErrorMessage,
  FormatMessage,
  FormatOnSaleMessage,
  FormatWarningMessage,
  FormatWishlistAddMessage,
  FormatWishlistShowMessage,
} from "../helpers/embedMessageHelper";

export class WishlistCommand implements Command {
  commandNames = ["wishlist"];

  help(): MessageEmbed {
    return new MessageEmbed()
      .setTitle("Wishlist Help")
      .setColor(15844367)
      .setDescription("Usage: `!wishlist [options]`\nOptions are listed below")
      .addFields([
        {
          name: "`add <steam game id>`",
          value: "Adds a new game to the wishlist",
          inline: false,
        },
        {
          name: "`remove <steam game id>`",
          value: "Removes a game from the wishlist",
          inline: false,
        },
        {
          name: "`show`",
          value: "Shows the current wishlist, game names and ids",
          inline: false,
        },
        {
          name: "`checksales`",
          value:
            "Returns the current list of on-sale games, does not check if the sale has already been mentioned",
          inline: false,
        },
        { name: "`help`", value: "Shows this message", inline: false },
      ]);
  }

  async run(message: Message): Promise<void> {
    let args = message.content.substring(1).split(" ");

    switch (args[1]) {
      case "show":
        let list = await GetWishlist();
        message.channel.send(FormatWishlistShowMessage(list));
        break;
      case "add":
        try {
          let gameDetails = await GetGameById(args[2]);
          let dbResponse: any = await AddToWishlistDb(
            gameDetails["steam_appid"],
            gameDetails["name"],
            message.author.id
          );
          if (!dbResponse) {
            await message.channel.send(
              FormatWishlistAddMessage(gameDetails, message.author)
            );
          } else {
            await message.channel.send(
              FormatErrorMessage(
                "Game could not be added to wishlist",
                dbResponse.message
              )
            );
          }
        } catch (error: any) {
          await message.channel.send(
            FormatErrorMessage("Game could not be added to wishlist", error)
          );
        }
        break;
      case "remove":
        try {
          let game: any = await GetGameFromWishlist(args[2]);
          if (!game) {
            await message.channel.send(
              FormatWarningMessage("Game not on wishlist, cannot be removed")
            );
          } else {
            await DeleteFromWishlistDb(args[2]);
            await message.channel.send(
              FormatMessage(0, `Removed ${game.name} from wishlist`)
            );
          }
        } catch (error: any) {
          await message.channel.send(
            FormatErrorMessage("Game could not be removed from wishlist", error)
          );
        }
        break;
      case "checksales":
        let games = await GetWishlist();
        let result = await CheckForAllSales(games);
        await message.channel.send(FormatOnSaleMessage(result));
        break;
      case "help":
        await message.channel.send(this.help());
        break;
      default:
        await message.channel.send(this.help());
    }
  }
}
