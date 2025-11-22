// pasivas.js — Todas las pasivas de Palworld (ES) organizadas por categoría

const pasivas = {
  buenas: [
    { name: "Artesano", value: "Artisan" },
    { name: "Valiente", value: "Brave" },
    { name: "Cuerpo robusto", value: "Burly Body" },
    { name: "Condensador", value: "Capacitor" },
    { name: "Alegre", value: "Cheery" },
    { name: "Amante de la dieta", value: "Diet Lover" },
    { name: "Destructivo", value: "Destructive" },
    { name: "Ferocidad", value: "Ferocious" },
    { name: "Trabajador forestal", value: "Logging Foreman" },
    { name: "Capataz de mina", value: "Mine Foreman" },
    { name: "Líder motivador", value: "Motivational Leader" },
    { name: "Cabeza musculosa", value: "Musclehead" },
    { name: "Pensador positivo", value: "Positive Thinker" },
    { name: "Corredor", value: "Runner" },
    { name: "Serenidad", value: "Serenity" },
    { name: "Rápido", value: "Swift" },
    { name: "Vampírico", value: "Vampiric" },
    { name: "Adicto al trabajo", value: "Workaholic" },
    { name: "Mente Zen", value: "Zen Mind" }
  ],

  malas: [
    { name: "Anormal", value: "Abnormal" },
    { name: "Agresivo", value: "Aggressive" },
    { name: "Torpe", value: "Clumsy" },
    { name: "Cobarde", value: "Coward" },
    { name: "Quebradizo", value: "Brittle" },
    { name: "Estómago sin fondo", value: "Bottomless Stomach" },
    { name: "Nocturno", value: "Nocturnal" },
    { name: "Holgazán", value: "Slacker" },
    { name: "Enfermizo", value: "Sickly" },
    { name: "Pacifista", value: "Pacifist" },
    { name: "Inestable", value: "Unstable" },
    { name: "Esclavo del trabajo", value: "Work Slave" }
  ],

  especiales: [
    { name: "Sangre de dragón", value: "Blood of the Dragon" },
    { name: "Barrera botánica", value: "Botanical Barrier" },
    { name: "Cazador de dragones", value: "Dragonkiller" },
    { name: "Resistente a terremotos", value: "Earthquake Resistant" },
    { name: "Señor del rayo", value: "Lord of Lightning" },
    { name: "Señor del mar", value: "Lord of the Sea" },
    { name: "Señor del inframundo", value: "Lord of the Underworld" },
    { name: "Maestro del ayuno", value: "Mastery of Fasting" },
    { name: "Golpe misericordioso", value: "Mercy Hit" },
    { name: "Sirena del vacío", value: "Siren of the Void" },
    { name: "Motor eterno", value: "Eternal Engine" },
    { name: "Llama eterna", value: "Eternal Flame" },
    { name: "Invasor", value: "Invader" }
  ],

  legendarias: [
    { name: "Furia legendaria", value: "Legend" },
    { name: "Corazón del rey inmóvil", value: "Heart of the Immovable King" },
    { name: "Demonio divino", value: "Demon God" },
    { name: "Cuerpo adamantino", value: "Diamond Body" }
  ]
};

// Exportar también una lista plana combinada (para addChoices)
module.exports = [
  ...pasivas.buenas,
  ...pasivas.malas,
  ...pasivas.especiales,
  ...pasivas.legendarias
];

// Export extra por si quieres categorizar en el futuro
module.exports.categorias = pasivas;
