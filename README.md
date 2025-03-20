# SkyTrackr  

SkyTrackr is a Discord bot built with discord.js v14 that tracks flights in real-time using free APIs.

## Features  
- Real-time flight tracking
- Airport information
- Plane information (WIP) <br />

and more coming soon!


## Setup  

### 1. Clone the repo:
   
   ```bash
   git clone https://github.com/Sky-Trackr/SkyTrackr-source.git
   
   cd SkyTrackr-source
```
   
### 3. Install dependencies:
   
```bash
npm install
```
    
### 5. Creating and setting up the bot

- Head over to the [Discord Developer Portal](https://discord.com/developers/applications) and log in.  
- Click **New Application**, give it a name, and create it.  
- Navigate to the **Bot** tab and select **Add Bot** to create your bot.  
  - Customize it.  
  - Copy the **bot token** — you’ll need this later.  
  - Enable **Presence Intent**, **Server Members Intent** and **Message Content Intent** under Privileged Gateway Intents.
- Open your bot’s repository and find `.env-example`.  
  - Replace `token` with your bot token.  
  - Fill in `guild` and `API_KEY` with the appropriate values.  
- Save the file and rename it to `.env`.  

### 5. Start the bot:

   ```bash
    cd src
   
    node index.js
```

## How to use


- Go to the [Discord Developer Portal](https://discord.com/developers) and open your bot’s application.  
- Under **OAuth2 URL Generator**, select **Bot** and **Application Commands**.  
- In **Bot Permissions**, choose what your bot needs.  
- Copy the generated invite link and paste it into your browser.  
- Select your server and authorize the bot.  

Now when you run your bot you should be able to use all the current commands.
For help, contact me on discord: @
## License
GNU GPL v3. See [LICENSE](LICENSE).
