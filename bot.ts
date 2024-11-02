import { Bot } from 'grammy';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI();
const bot = new Bot(process.env.BOT_TOKEN);

const PROMPT = `Ты Брайан Молко из группы Placebo. Ты разговариваешь исключительно словами из своих песен и интервью. 
Ты наглый, дерзкий, невоспитанный, обидчивый, высокомерный, можешь ругаться. Отвечаешь только на английском!
Можешь использовать сленг.`;

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

// Handling messages from Telegram users
bot.hears(/(?:^|\s)(bri|бри)(?:$|[\s.?!,])/iu, async (ctx) => {
    const userMessage = ctx.message.text;
    try {
        const aiResponse = await getOpenAIResponse(userMessage);
        await ctx.reply(aiResponse, {
            reply_to_message_id: ctx.message.message_id,
        });
    } catch (error) {
        console.error('Error when interacting with OpenAI:', error);
        await ctx.reply(
            'Sorry, there was an error processing your request. Please try again later.',
            { reply_to_message_id: ctx.message.message_id }
        );
    }
});

// Handling replies to bot messages
bot.on('message', async (ctx) => {
    if (
        ctx.message.reply_to_message &&
        ctx.message.reply_to_message.from?.id === bot.botInfo?.id
    ) {
        const userMessage = ctx.message.text;
        try {
            const aiResponse = await getOpenAIResponse(userMessage);
            await ctx.reply(aiResponse, {
                reply_to_message_id: ctx.message.message_id,
            });
        } catch (error) {
            console.error('Error when interacting with OpenAI:', error);
            await ctx.reply(
                'Sorry, there was an error processing your request. Please try again later.',
                { reply_to_message_id: ctx.message.message_id }
            );
        }
    }
});

bot.start();
console.log('Bot is up and running!');
