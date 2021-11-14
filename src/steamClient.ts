import { STEAM_KEY } from "./config/secrets";
import { UpdateLastSaleAmount } from "./sqliteWrapper";

const SteamAPI = require("steamapi");

const steam = new SteamAPI(STEAM_KEY);

export async function GetGameById(id: string) {
  return await steam.getGameDetails(id);
}

export async function CheckForNewSales(games: any[]) {
  let onSale: any[] = [];
  await Promise.all(
    games.map(async (game) => {
      let gameDetails = await steam.getGameDetails(game.id);
      if (gameDetails.price_overview === undefined) {
      }
      else if (gameDetails.price_overview.discount_percent > game.lastSaleAmount) {
        UpdateLastSaleAmount(
          game.id,
          gameDetails.price_overview.discount_percent
        );
        onSale.push([
          game.name,
          gameDetails.price_overview.discount_percent,
          gameDetails.price_overview.final_formatted,
          game.id
        ]);
      } else if (
        gameDetails.price_overview.discount_percent != game.lastSaleAmount
      ) {
        UpdateLastSaleAmount(
          game.id,
          gameDetails.price_overview.discount_percent
        );
      }
    })
  );
  return onSale;
}

export async function CheckForAllSales(games: any[]) {
  let onSale: any[] = [];
  await Promise.all(
    games.map(async (game) => {
      let gameDetails = await steam.getGameDetails(game.id);
      if (gameDetails.price_overview === undefined) {
      }
      else if (gameDetails.price_overview.discount_percent > 0) {
        onSale.push([
          game.name,
          gameDetails.price_overview.discount_percent,
          gameDetails.price_overview.final_formatted,
          game.id
        ]);
      }
    })
  );
  return onSale;
}
