const { Client, GatewayIntentBits } = require('discord.js');
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const prefix = "!";
var anger = 0;
var afterMessages = 0;

var messages = [
    "Я не Кристина, знаешь ли",
    "Хватит меня так называть!",
    "Перестань добавлять -тина!",
    "Это уже не смешно...",
    "ДА НЕ КРИСТИНА Я!!",
    "Ладно, я прощу тебя, если ты перестанешь меня так называть"
]

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) {
        //console.log(message.content);
        const command = message.content.split(' ')
        for (let i = 0; i < command.length; i++) {
            //console.log(command[i]);
            command[i] = command[i].toLowerCase();
            if (command[i].endsWith("!") || command[i].endsWith("?") || command[i].endsWith(".") || command[i].endsWith(",")) {
                command[i] = command[i].slice(0, -1)
            }
            if (command[i] === "kristina" || command[i] === "кристина" || command[i] === "кристины" || command[i] === "кристине" || command[i] === "кристину" || command[i] === "кристиной") {
                anger++;
                if ((messages.length - 1) > anger) {
                    message.reply(messages[anger]);
                    return;
                };
                if (anger >= (messages.length - 1)) {
                    afterMessages = 10;
                    return;
                }
            }
        }
        
        if (afterMessages > 0) {
            afterMessages--;
            console.log(afterMessages);
            if (afterMessages == 0) {
                anger = 0;
                message.channel.send(messages[5])
            }
            return;
        }
        return;
    }

    //console.log(message.author, message.channel, message.content);

    // const commandBody = message.content.slice(prefix.length);
    // const args = commandBody.split(' ');
    // const command = args.shift().toLowerCase();

    // if (command === "гуль") {

    // }
});

client.login(config.BOT_TOKEN);