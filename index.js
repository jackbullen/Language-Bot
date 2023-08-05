require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

// Define the bot: client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});
client.on('ready', () => {
    console.log("Bot active.");
});

// Setup OpenAi API
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Handle responses
client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    // Only listen in the channel CHANNEL_ID
    if(message.channel.id !== process.env.CHANNEL_ID) return;

    // Clear messages command:  !clear
    if (message.content.toLowerCase().startsWith("!clear")) {
        async function clear() {
            message.delete();
            const fetched = await message.channel.messages.fetch({limit: 99});
            message.channel.bulkDelete(fetched);
        }
        clear();
    }

    // Ignore non preset commands
    if (!(message.content.startsWith('$') || message.content.startsWith(':') || message.content.startsWith('CC') || message.content.startsWith('elab'))) return;

    console.log("Creating response to", message.content);
    await message.channel.sendTyping();

    // Define conversationLog depending on command
    conversationLog = [];

        // French conjugation command: eg:  GG penser futur-simple
    if (message.content.startsWith('$') && message.content.length>1){

        conversationLog.push({
            role: 'system',  
            content: 'Conjugate the french verb with given tense, nicely format in markdown list',
        })

        conversationLog.push({
            role: 'user',
            content: message.content,
        });

        // Call OpenAI API with specified model and conversationLog
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
        });

        // Reply
        message.reply(result.data.choices[0].message);
    }

        // French conversational partner command: eg:  Bonjour, ça-va? Est-tu contente ce après-midi?
    if (message.content.startsWith(':') && message.content.length>1){

        // POSSIBLE MODIFICATION: Rather than just telling GPT to not keep correcting same mistakes we could be more precise with what prevMessage we give.
        conversationLog.push({ role: 'system',  content: 'Act as a French learning conversational partner. Briefly respond to what I say and then point out mistakes and give corrections. Dont keep correcting the same mistakes'});

        let prevMessages = await message.channel.messages.fetch({ limit: 15 });
        prevMessages.reverse();

        prevMessages.forEach((msg) => {
            // Ignore messages starting with !
            // Ignore other bots, but not itself
            if (msg.author.id !== client.user.id && message.author.bot) return;
            // Only use prevMessages sent from the user that is currently interacting with client.
            if (msg.author.id !== message.author.id) return;
            if (!msg.content.startsWith(':') && !message.author.bot) return;

            conversationLog.push({
                role: 'user',
                content: msg.content,
            })
        });

        // Call OpenAI API with specified model and conversationLog
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
        });

        // Reply
        message.reply(result.data.choices[0].message);
    }

        // Chinese character/phrase/proverb command: eg:  CC -c learn // CC -p non-chalant // CC portfolio
    if (message.content.startsWith('CC ') && message.content.length>3){
        if (message.content.startsWith('CC -c')){
            conversationLog.push({
                role: 'system',  
                content: 'Give 3 traditional Chinese characters related to the prompt. Do not give english translation.',
            });
            let prevMessages = await message.channel.messages.fetch({ limit: 2 });
            prevMessages.reverse();
            conversationLog.push({
                role: 'user',
                content: message.content,
            });
        }else if(message.content.startsWith('CC -p')){
            conversationLog.push({
                role: 'system',  
                content: 'Give a common Chinese proverb using these characters. Give a very short 1 sentence description in English',
            });
            let prevMessages = await message.channel.messages.fetch({ limit: 2 });
            prevMessages.reverse();
            conversationLog.push({
                role: 'user',
                content: Array.from(prevMessages.values()).slice(-2)[0].content,
            });
        }else {
            conversationLog.push({
                role: 'system',  
                content: 'Summarize our discussion in Traditional Mandarin Chinese',
            });
            let prevMessages = await message.channel.messages.fetch({ limit: 15 });
            prevMessages.reverse();
    
            prevMessages.forEach((msg) => {
                // Ignore messages starting with !
                // Ignore other bots, but not itself
                if (msg.author.id !== client.user.id && message.author.bot) return;
                // Only use prevMessages sent from the user that is currently interacting with client.
                if (msg.author.id !== message.author.id) return;
                if (!msg.content.startsWith(':') && !message.author.bot) return;
    
                conversationLog.push({
                    role: 'user',
                    content: msg.content,
                })
            });

        }

        // Call OpenAI API with specified model and conversationLog
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
        });

        // Reply
        message.reply(result.data.choices[0].message);
    }

        // Elaborate on GPT's previous response command: elab <opts: -e -f -c>.
        // eg:  elab -e // elab -f // elab -m // elab -Ar // elab -Tu
    if (message.content.startsWith('elab')){
        if (message.content.startsWith('elab -e')){
            conversationLog.push({ role: 'system',  content: 'Further elaborate on the message and translate your response in English'});
        }else if(message.content.startsWith('elab -f')){
            conversationLog.push({ role: 'system',  content: 'Further elaborate on the message and translate your response in French'});
        }else if(message.content.startsWith('elab -m')){
            conversationLog.push({ role: 'system',  content: 'Further elaborate on the message and translate your response in Mandarin'});
        }else if(message.content.startsWith('elab -Ar')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Arabic'});
        }else if(message.content.startsWith('elab -Sp')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Spanish'});
        }else if(message.content.startsWith('elab -Po')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Portuguese'});
        }else if(message.content.startsWith('elab -Ge')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in German'});
        }else if(message.content.startsWith('elab -Ru')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Russian'});
        }else if(message.content.startsWith('elab -Sw')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Swahili'});
        }else if(message.content.startsWith('elab -Se')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Serbo-Croatian'});
        }else if(message.content.startsWith('elab -It')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Italian'});
        }else if(message.content.startsWith('elab -Ma')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Malay'});
        }else if(message.content.startsWith('elab -Du')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Dutch'});
        }else if(message.content.startsWith('elab -Pe')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Persian'});
        }else if(message.content.startsWith('elab -So')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Sotho'});
        }else if(message.content.startsWith('elab -Ts')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Tswana'});
        }else if(message.content.startsWith('elab -Al')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Albanian'});
        }else if(message.content.startsWith('elab -Ro')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Romanian'});
        }else if(message.content.startsWith('elab -S')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Somali'});
        }else if(message.content.startsWith('elab -Tu')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Turkish'});
        }else if(message.content.startsWith('elab -Ay')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Aymara'});
        }else if(message.content.startsWith('elab -Be')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Berber'});
        }else if(message.content.startsWith('elab -Ch')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Chichewa'});
        }else if(message.content.startsWith('elab -Gr')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Greek'});
        }else if(message.content.startsWith('elab -Gu')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Guarani'});
        }else if(message.content.startsWith('elab -Hi')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Hindustani'});
        }else if(message.content.startsWith('elab -Ko')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Korean'});
        }else if(message.content.startsWith('elab -Qu')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Quechua'});
        }else if(message.content.startsWith('elab -Rw')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Rwanda-Rundi'});
        }else if(message.content.startsWith('elab -Sw')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Swati'});
        }else if(message.content.startsWith('elab -Swe')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Swedish'});
        }else if(message.content.startsWith('elab -Ta')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Tamil'});
        }else if(message.content.startsWith('elab -Ti')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Tigrinya'});
        }else if(message.content.startsWith('elab -Ve')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Venda'});
        }else if(message.content.startsWith('elab -Xh')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Xhosa'});
        }else if(message.content.startsWith('elab -A')){
            conversationLog.push({ role: 'system',
            content: 'Further elaborate on the message and translate your response in Armenian'});
        }else{
            conversationLog.push({ role: 'system',  content: 'Further elaborate on the message'});
        }
        
        let prevMessages = await message.channel.messages.fetch({ limit: 2 });
        prevMessages.reverse();
        console.log(message.content, Array.from(prevMessages.values()).slice(-2)[0].content);
        conversationLog.push({
            role: 'user',
            content: Array.from(prevMessages.values()).slice(-2)[0].content,
        })

        // Call OpenAI API with specified model and conversationLog
        const result = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
        });

        // Reply
        message.reply(result.data.choices[0].message);

    }
});

client.login(process.env.TOKEN)