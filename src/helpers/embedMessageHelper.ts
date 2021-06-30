import { EmbedField, Message, MessageEmbed, User } from "discord.js";

export function FormatWishlistAddMessage(gameDetails: any, requestor: User) {
  console.log(gameDetails)
  let message = new MessageEmbed()
    .setColor(7419530)
    .setFooter(
      `Requested by ${requestor.username}`,
      requestor.displayAvatarURL()
    )
    .setTitle(`${gameDetails.name} added to wishlist!`)
    .setDescription(
      `\`Current Price: ${gameDetails.price_overview.final_formatted}\`\n` +
        gameDetails.short_description
    )
    .setURL("https://store.steampowered.com/app/" + gameDetails.steam_appid)
    .setImage(gameDetails.header_image || "")
    .setTimestamp();

  return message;
}

export function FormatOnSaleMessage(rows: any[]) {
  let fields = Array<EmbedField>();

  rows.forEach((row) => {
    fields.push({
      name: row[0],
      value: `${row[2]} (${row[1]}% off)\n` + `https://store.steampowered.com/app/${row[3]}`,
      inline: false,
    });
  });

  let message = new MessageEmbed()
    .setColor(15277667)
    .setTitle("Current Sales")
    .addFields(fields)
    .setTimestamp();

  return message;
}

export function FormatWishlistShowMessage(rows: any[]) {
  let fields = Array<EmbedField>();

  rows.forEach((row) => {
    fields.push({
      name: row.name,
      value: `https://store.steampowered.com/app/${row.id}\n` + `Steam Id: ${row.id}`,
      inline: false,
    });
  });

  let message = new MessageEmbed()
    .setColor(3447003)
    .setTitle("All Wishlisted Games")
    .addFields(fields);

  return message;
}

export function FormatErrorMessage(errorTitle: string, errorBody?: string) {
  return FormatMessage(15158332, errorTitle, errorBody);
}

export function FormatWarningMessage(errorTitle: string, errorBody?: string) {
  return FormatMessage(15105570, errorTitle, errorBody);
}

export function FormatMessage(color: number, title: string, body?: string) {
  let message = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(body || "");

  return message;
}

function gamePlatformsHelper(platforms: any) {
  let nativePlatforms: string[] = [];
  if (platforms.windows) {
    nativePlatforms.push("🪟");
  }
  if (platforms.mac) {
    nativePlatforms.push("🍎");
  }
  if (platforms.linux) {
    nativePlatforms.push("🐧");
  }

  return nativePlatforms.toString();
}
