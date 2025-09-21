# Telegram Molko Bot

A customized GPT bot for Telegram that imitates Brian Molko from the band Placebo.

## Description

**Telegram Molko Bot** is a TypeScript Telegram bot that:
- Acts like Brian Molko from Placebo
- Responds with phrases from the musician's interviews
- Uses OpenAI API (gpt-4o-mini model)
- Works through the Grammy library for Telegram

## Technologies

- **TypeScript** - main development language
- **Node.js** - runtime environment
- **Grammy** - library for Telegram Bot API
- **OpenAI API** - for generating responses
- **dotenv** - environment variables management

## Installation and Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables setup
Create a `.env` file in the project root:
```env
BOT_TOKEN=your_telegram_bot_token_here
OPENAI_API_KEY=your_openai_api_key_here
AUTHORIZED_USER_ID=your_telegram_user_id_here
```

**Where to get:**
- `BOT_TOKEN` - from @BotFather in Telegram
- `OPENAI_API_KEY` - from OpenAI account (platform.openai.com)
- `AUTHORIZED_USER_ID` - your Telegram user ID (ask @userinfobot)

### 3. Run the bot
```bash
npx tsx bot.ts
```

## Usage

### In private chats
- Bot responds to any messages
- Authorized user can change the prompt with command:
  ```
  /prompt new_prompt_for_bot
  ```

### In group chats
Bot responds in two cases:
1. **Name mention**: when message contains "bri" or "бри"
2. **Reply to bot message**: when replying to bot's message

### Prompt customization
- Prompt can be changed with `/prompt` command in private chat
- New prompt is saved to `.prompt` file
- Bot loads saved prompt on restart

## Features

- **Security**: Only authorized user can change prompt
- **Error handling**: On API errors bot responds with Brian Molko-style phrase
- **Persistence**: Custom prompt persists between restarts
- **Flexibility**: Works in both private and group chats

## Project Structure

```
├── bot.ts              # Main bot file
├── bot.js              # Compiled version
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── README.md           # Documentation
├── .env               # Environment variables (not in git)
└── .prompt            # Custom prompt (created automatically)
```

## Development

For development use:
```bash
npx tsx bot.ts  # Run with automatic recompilation
```

Project uses ES modules (`"type": "module"` in package.json).

## Production Deployment with PM2

### Prerequisites on Debian Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (version 18+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 and tsx globally
sudo npm install -g pm2 tsx
```

### Deployment Steps

1. **Deploy code to server:**
```bash
# Create directory
mkdir -p /home/telegram-molko-bot
cd /home/telegram-molko-bot

# Clone repository or upload files
git clone https://github.com/pravbeseda/telegram-molko-bot.git .

# Install dependencies
npm install

# Create logs directory
mkdir -p logs
```

2. **Configure environment:**
```bash
# Create .env file
nano .env

# Set secure permissions
chmod 600 .env
```

Example `.env` content:
```env
BOT_TOKEN=your_production_bot_token_here
OPENAI_API_KEY=your_production_openai_api_key_here
AUTHORIZED_USER_ID=your_telegram_user_id_here
NODE_ENV=production
```

3. **Start with PM2:**
```bash
# Start bot using ecosystem config
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup auto-restart on server reboot
pm2 startup
```

### PM2 Management Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs telegram-molko-bot

# Restart bot
pm2 restart telegram-molko-bot

# Stop bot
pm2 stop telegram-molko-bot

# Real-time monitoring
pm2 monit

# View detailed process info
pm2 describe telegram-molko-bot
```

### Log Files

- **Combined logs:** `/home/telegram-molko-bot/logs/combined.log`
- **Error logs:** `/home/telegram-molko-bot/logs/err.log`
- **Output logs:** `/home/telegram-molko-bot/logs/out.log`

### Updates

To update the bot on server:
```bash
cd /home/telegram-molko-bot
git pull origin main
npm install
pm2 restart telegram-molko-bot
```
