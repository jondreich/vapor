import express, { Request, Response } from "express";
import Discord, { Message } from "discord.js";
import { DISCORD_TOKEN, JOB_CHANNEL, STEAM_KEY } from "./config/secrets";
import CommandHandler from "./commandHandler";
import config from "./config/botConfig";
import { ScheduleSalesJob } from "./helpers/jobHelper";

const PORT = process.env.PORT || 5000;

const app = express();
const client = new Discord.Client();

//////////////////////////////////////////////////////////////////
//             EXPRESS SERVER SETUP FOR UPTIME ROBOT            //
//////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ extended: true }));

app.use("/", (request: Request, response: Response) => {
  response.sendStatus(200);
});

const commandHandler = new CommandHandler(config.prefix);

//////////////////////////////////////////////////////////////////
//                    DISCORD CLIENT LISTENERS                  //
//////////////////////////////////////////////////////////////////
// Discord Events: https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate

client.on("ready", async () => {
  console.log("Vapor has started");
  ScheduleSalesJob(await client.channels.fetch(JOB_CHANNEL || ""));
});
client.on("message", (message: Message) => {
  commandHandler.handleMessage(message);
});
client.on("error", (e) => {
  console.error("Discord client error!", e);
});

client.login(DISCORD_TOKEN);
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
