# Language-Bot
A discord bot to help learn languages.

Four commands: $, :, CC, and elab.

## $ 
Gives conjugation of french verbs. If a verb is given in English it will translate.

### Usage: 
\$ VERB TENSE

### Examples:
- \$penser futur
- \$ameloirer passe compose
- \$run futur proche

## :
Conversational partner in French. Bot recalls previous 15 message between you and itself and will point out mistakes, give corrections, and be an all around cool dude to chat with.

### Example dialogue

## CC
Traditional Chinese character generation based on the prompt given.

### Usage:
- CC -c PROMPT 
gives three characters based on the prompt
- CC -p 
should be run after CC -c and gives a Chinese proverb containing the characters.
- CC 
summarizes your last 15 messages with the bot in Traditional Mandarin.
### Examples:
    CC -c

## elab (Elaborate)
Elaborates on the previous response from the bot in the specified language. If no language is specified it will elaborate on what it said.

### Usage:
elab -LANGUAGE_CODE

elab gives support for English (-e), French (-f), Arabic (-Ar), Spanish (-Sp), Portuguese (-Po), German (-Ge), Russian (-Ru), Swahili (-Sw), Serbo-Croatian (-Se), Italian (-It), Malay (-Ma), Dutch (-Du), Persian (-Pe), Sotho (-So), Tswana (-Ts), Albanian (-Al), Romanian (-Ro), Somali (-S), Turkish (-Tu), Aymara (-Ay), Berber (-Be), Chichewa (-Ch), Greek (-Gr), Guarani (-Gu), Hindustani (-Hi), Korean (-Ko), Quechua (-Qu), Rwanda-Rundi (-Rw), Swati (-Sw), Swedish (-Swe), Tamil (-Ta), Tigrinya (-Ti), Venda (-Ve), Xhosa (-Xh), Armenian (-A)