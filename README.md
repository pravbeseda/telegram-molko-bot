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
