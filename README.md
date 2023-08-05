# Language-Bot
A discord bot to help learn languages.

Four commands: $, :, CC, and elab.

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q0cHVueGtwbXM0MXF0ZnU0eTA3bTZ5Ym82emZrN3M2dTdoNXo1aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8G3rCHBiCEv9W3wsnA/giphy.gifhttps://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

- Question:  Bonjour, ça-va? Est-tu contente ce après-midi?
- Bot: Bonjour, ça va bien, merci ! En français, nous écrivons "es-tu" au lieu de "est-tu". Donc, tu pourrais dire "Es-tu content(e) cet après-midi ?"

1. Est-tu ==> Es-tu
2. ce après-midi ==> cet après-midi


## Usage
Download and run:
1. npm install
2. Create a discord app at https://discord.com/developers
3. Create an OpenAI API key (free)
4. Enter your environment variables variables into .env (OpenAI API Key, Discord Token, and Discord Channel ID)
5. node ./index.js
6. Now the bot is online in the discord channel.
7. Ctrl-C to stop the bot and "node ./indexjs" to run.

## $ command
Gives conjugation of french verbs. If a verb is given in English it will translate.

### Usage: 
\$ VERB TENSE

### Examples:
- \$penser futur
- \$ameloirer passe compose
- \$run futur proche

## : command
Conversational partner in French. Bot recalls previous 15 message between you and itself and will point out mistakes, give corrections, and be an all around cool dude to chat with.

### Example dialogue

## CC command
Traditional Chinese character generation based on the prompt given.

### Usage:
- CC -c PROMPT 
gives three characters based on the prompt
- CC -p 
should be run after CC -c and gives a Chinese proverb containing the characters.
- CC 
summarizes your last 15 messages with the bot in Traditional Mandarin.

## elab (Elaborate) command
Elaborates on the previous response from the bot in the specified language. If no language is specified it will elaborate on what it said.

### Usage:
elab -LANGUAGE_CODE

elab gives support for English (-e), French (-f), Arabic (-Ar), Spanish (-Sp), Portuguese (-Po), German (-Ge), Russian (-Ru), Swahili (-Sw), Serbo-Croatian (-Se), Italian (-It), Malay (-Ma), Dutch (-Du), Persian (-Pe), Sotho (-So), Tswana (-Ts), Albanian (-Al), Romanian (-Ro), Somali (-S), Turkish (-Tu), Aymara (-Ay), Berber (-Be), Chichewa (-Ch), Greek (-Gr), Guarani (-Gu), Hindustani (-Hi), Korean (-Ko), Quechua (-Qu), Rwanda-Rundi (-Rw), Swati (-Sw), Swedish (-Swe), Tamil (-Ta), Tigrinya (-Ti), Venda (-Ve), Xhosa (-Xh), Armenian (-A)

## Demos
![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZua2NuY3pjbGt4YzFrZjJlOG1zeGN1cThvbm9oazFtMmgxZnFkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TIqV5KwGxoP3ZZTRvx/giphy.gif)

![](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWhhM3AwNDAwZWpkNjI1eml6ODM3cnJzOTBlMmFnaGt2eG9jOWY1MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tJ3szf0hQOqsoDHn25/giphy.gif)

