import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const DISCORD_TOKEN = process.env["TOKEN"];
export const STEAM_KEY = process.env["STEAM_KEY"];
export const JOB_CHANNEL = process.env["JOB_CHANNEL_ID"];
export const JOB_FREQUENCY = process.env["JOB_FREQUENCY"] || "0 12 * * *";

if (!DISCORD_TOKEN) {
  console.error("No discord token provided");
}

if (!STEAM_KEY) {
  console.error("No steam key provided");
}

if (!JOB_CHANNEL) {
  console.error(
    "No channel id provided, will not send automated wishlist updates"
  );
}
