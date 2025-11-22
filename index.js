require("dotenv").config({ override: true });
const pasivasList = require("./pasivas.js");
const tiposList = require("./tipos.js");
const rolesList = require("./roles.js");
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, Events } = require("discord.js");

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const THREAD_ID = process.env.THREAD_ID; // Canal de texto donde se crearán los hilos

/******************************************************************************************************************/

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("clientReady", () => {
  console.log(`Bot online as ${client.user.tag}`);
});

client.login(TOKEN);

/******************************************************************************************************************/

// Comando /crear_pal
const commands = [
  new SlashCommandBuilder()
    .setName("crear_pal")
    .setDescription("Crea un Pal en un hilo con descripción")

    // Parámetros obligatorios
    .addStringOption(option =>
      option.setName("nombre")
        .setDescription("Nombre del Pal")
        .setRequired(true))

    .addStringOption(option =>
      option.setName("genero")
        .setDescription("Género del Pal")
        .setRequired(true)
        .addChoices(
          { name: "Masculino", value: "Masculino" },
          { name: "Femenino", value: "Femenino" }
        ))

    .addStringOption(option =>
      option.setName("tipo1")
        .setDescription("Tipo principal")
        .setRequired(true)
        .addChoices(...tiposList))

    .addIntegerOption(option =>
      option.setName("iv_vida")
        .setDescription("IV Vida")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100))

    .addIntegerOption(option =>
      option.setName("iv_atk")
        .setDescription("IV Ataque")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100))

    .addIntegerOption(option =>
      option.setName("iv_def")
        .setDescription("IV Defensa")
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100))

    .addStringOption(option =>
      option.setName("rol")
        .setDescription("Rol del Pal")
        .setRequired(true)
        .addChoices(...rolesList))

    // Parámetros opcionales
    .addStringOption(option =>
      option.setName("tipo2")
        .setDescription("Tipo secundario (opcional)")
        .setRequired(false)
        .addChoices(...tiposList))

    .addStringOption(option =>
      option.setName("pasiva1")
        .setDescription("Pasiva 1 (opcional)")
        .setRequired(false)
        //.addChoices(...pasivasList)
        )
    .addStringOption(option =>
      option.setName("pasiva2")
        .setDescription("Pasiva 2 (opcional)")
        .setRequired(false)
        //.addChoices(...pasivasList)
        )
    .addStringOption(option =>
      option.setName("pasiva3")
        .setDescription("Pasiva 3 (opcional)")
        .setRequired(false)
        //.addChoices(...pasivasList)
        )
    .addStringOption(option =>
      option.setName("pasiva4")
        .setDescription("Pasiva 4 (opcional)")
        .setRequired(false)
        //.addChoices(...pasivasList)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Refreshing (/) commands...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('Commands registered!');
  } catch (error) {
    console.error(error);
  }
})();

/******************************************************************************************************************/

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "crear_pal") {
    await interaction.deferReply({ ephemeral: true }); // Avisa a Discord que estamos procesando

    const nombre = interaction.options.getString("nombre");
    const genero = interaction.options.getString("genero");
    const tipo1 = interaction.options.getString("tipo1");
    const tipo2 = interaction.options.getString("tipo2");
    const iv_vida = interaction.options.getInteger("iv_vida");
    const iv_atk = interaction.options.getInteger("iv_atk");
    const iv_def = interaction.options.getInteger("iv_def");
    const rol = interaction.options.getString("rol");
    const pasivas = [
      interaction.options.getString("pasiva1"),
      interaction.options.getString("pasiva2"),
      interaction.options.getString("pasiva3"),
      interaction.options.getString("pasiva4")
    ].filter(p => p);

    let descripcion = `**Nombre:** ${nombre}\n`;
    descripcion += `**Genero:** ${genero}\n`;
    descripcion += `**Tipo(s):** ${tipo1}` + (tipo2 ? ` / ${tipo2}` : "") + `\n`;
    descripcion += `**IVs:** ❤️ ${iv_vida} | 🗡 ${iv_atk} | 🛡 ${iv_def}\n`;
    descripcion += ` **Rol:** ${rol}\n`;
    if (pasivas.length > 0) {
      descripcion += `✨ **Pasivas:**\n`;
      pasivas.forEach(p => {
        descripcion += `> ${p}\n`;
      });
    }

    try {
      const hilo = await client.channels.fetch(process.env.THREAD_ID);
      await hilo.send(descripcion);

      //await interaction.editReply({ content: "✅ Pal agregado al hilo!" }); // Responde ya
    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: "❌ Error al enviar el Pal al hilo." });
    }
  }
});
