## Vapor - Steam Wishlist Bot
Be my guest to clone this and do whatever you want with it

---
## Quickstart
Required environment vars:
- TOKEN= \<Discord Token>
- STEAM_KEY= \<Steam API Key>
- JOB_CHANNEL_ID= \<ID of Discord channel to post sales in>

Optional (but recommended):
- JOB_FREQUENCY=0 14 * * *
- SQLITE_DIR=./

---
## Usage:

`!wishlist [options]`

Options are listed below

`add <steam game id>`
- Adds a new game to the wishlist

`remove <steam game id>`
- Removes a game from the wishlist

`show`
- Shows the current wishlist, game names and ids

`checksales`
- Returns the current list of on-sale games, does not check if the sale has already been mentioned

`help`
- Shows the help message

uses [Hive Greeter by Aman Shaikh (mxiv)](https://github.com/MidasXIV/hive-greeter) as a base
