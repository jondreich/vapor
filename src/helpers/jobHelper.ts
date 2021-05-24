import { Channel, Client, TextChannel } from "discord.js";
import { schedule } from "node-cron";
import { JOB_FREQUENCY } from "../config/secrets";
import { GetWishlist } from "../sqliteWrapper";
import { CheckForNewSales } from "../steamClient";
import { FormatOnSaleMessage } from "./embedMessageHelper";

export function ScheduleSalesJob(channel: Channel) {
  schedule(JOB_FREQUENCY, async () => {
    let wishlist = await GetWishlist();
    let onSale = await CheckForNewSales(wishlist);
    (channel as TextChannel).send(FormatOnSaleMessage(onSale));
  });
}
