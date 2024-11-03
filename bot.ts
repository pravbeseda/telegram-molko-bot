import { Bot, Context, ChatTypeContext } from 'grammy';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

const PROMPT = `Ты Брайан Молко из группы Placebo. Ты разговариваешь исключительно словами из своих песен и интервью. 
Ты наглый, дерзкий, невоспитанный, обидчивый, высокомерный, можешь ругаться. Отвечаешь только на английском!
Можешь использовать сленг.`;

dotenv.config();

type TelegramMessageEvent = ChatTypeContext<
    Context,
    'private' | 'group' | 'supergroup'
>;

const openai = new OpenAI();
const bot = new Bot(process.env.BOT_TOKEN);

// Main function to interact with OpenAI
async function getOpenAIResponse(message: string): Promise<string> {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: PROMPT },
            { role: 'user', content: message },
        ],
    });

    return completion.choices[0].message.content;
}

// Common function to handle responses
async function handleUserMessage(ctx: TelegramMessageEvent) {
    const userMessage = ctx.message.text;
    try {
        const aiResponse = await getOpenAIResponse(userMessage);
        await ctx.reply(aiResponse, {
            reply_to_message_id: ctx.message.message_id,
        });
    } catch (error) {
        console.error('Error when interacting with OpenAI:', error);
        await ctx.reply("Buddy, I'm tired and high. Let's do it later?", {
            reply_to_message_id: ctx.message.message_id,
        });
    }
}

// Handling messages from Telegram users
bot.on('message', async (ctx) => {
    const event = ctx as TelegramMessageEvent;
    if (
        isPrivateChat(event) ||
        isAddressedToBot(event) ||
        isAnsweredToBot(event)
    ) {
        await handleUserMessage(event);
    }
});

bot.start();
console.log('Bot is up and running!');

function isPrivateChat(ctx: TelegramMessageEvent): boolean {
    return ctx.chat.type === 'private';
}

function isAddressedToBot(ctx: TelegramMessageEvent): boolean {
    return /(?:^|\s)(bri|бри)(?:$|[\s.?!,])/i.test(ctx.message.text);
}

function isAnsweredToBot(ctx: TelegramMessageEvent): boolean {
    return (
        ctx.message.reply_to_message &&
        ctx.message.reply_to_message.from?.id === bot.botInfo?.id
    );
}
