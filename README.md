# discordCGPT
> A simple Discord bot that integrates OpenAI's ChatGPT. Developed using [discord.js](https://discord.js.org/), [discordx](https://discordx.js.org/), and [chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api). This is also my first project written in TypeScript!

## Prerequisites
- Node.js w/ npm
- Discord Bot Token (token can be found in your [Discord Developer Portal](https://discord.com/developers))
- ChatGPT Token (tutorial below)

## How to aquire a ChatGPT Token (Credit [Travis Fischer/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api))

**This package requires a valid session token from ChatGPT to access it's unofficial REST API.**

To get a session token:

1. Go to https://chat.openai.com/chat and log in or sign up.
2. Open dev tools.
3. Open `Application` > `Cookies`.
   ![ChatGPT cookies](https://github.com/transitive-bullshit/chatgpt-api/raw/main/media/session-token.png)
4. Copy the value for `__Secure-next-auth.session-token` and save it to your ``.env`` file (which will be covered next).


## Setup

First, clone the repo using git:
```
git clone https://github.com/imedra/Maple
```
Second, install the required dependencies.
```
npm install
```
Third, create a ``.env`` file in the root directory and fill out the required fields
```
discord_token = Insert Discord Token Here
openai_token = Insert OpenAI Token Here
```
Finally, run ``npm run start` and enjoy!

## Credits
- Created by [**Marc Bernardino**](https://github.com/imEdra)
- ChatGPT API sourced from [**transitive-bullshit/chatgpt-api**](https://github.com/transitive-bullshit/chatgpt-api)
- Documentation sourced from [**discord.js**]((https://discord.js.org/) and [**discordx**](https://discordx.js.org/)


## License
This project is licenced via MIT.
