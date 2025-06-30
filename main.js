const TelegramBot = require('node-telegram-bot-api');

// Gunakan BOT_TOKEN dari env saat deploy, atau pakai placeholder saat lokal
const token = process.env.BOT_TOKEN || "[YOUR-API-KEY]";
const prefix = ".";
const options = {
    polling: true
}

// Buat bot dulu
const natbot = new TelegramBot(token, options);
console.log("🚀 NatBot is running...");

// Awalan saat bot dibuka
natbot.onText(/^\/start$/, (msg) => {
    const welcomeText = `
Halo, ${msg.from.first_name}! 👋
Gue *NatBot*, siap membantu lo!

Ketik \`.hi\` untuk menyapa  
Ketik \`.gempa\` untuk info gempa terkini  
Ketik \`.cuaca\` untuk info cuaca terkini  
Ketik \`.quote\` untuk mendapatkan kutipan inspiratif

Good Luck!
    `;
    natbot.sendMessage(msg.chat.id, welcomeText, { parse_mode: "Markdown" });
});

// .hi Command
natbot.onText(new RegExp(`^${prefix}hi$`), (msg) => {
    natbot.sendMessage(msg.chat.id, "Hello, welcome to NatBot! How can I assist you today?");
});

// .gempa Command
natbot.onText(new RegExp(`^${prefix}gempa$`), async (msg) => {
    try {
        const res = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
        const { Infogempa: { gempa } } = await res.json();

        const resultText = `
<b>Waktu</b>    : ${gempa.Tanggal} ${gempa.Jam}
<b>Besaran</b>  : ${gempa.Magnitude} SR
<b>Wilayah</b>  : ${gempa.Wilayah}
<b>Potensi</b>  : ${gempa.Potensi}
<b>Kedalaman</b>: ${gempa.Kedalaman}
        `;

        const imageUrl = `https://static.bmkg.go.id/${gempa.Shakemap}`;
        natbot.sendPhoto(msg.chat.id, imageUrl, {
            caption: resultText.trim(),
            parse_mode: "HTML"
        });
    } catch (error) {
        natbot.sendMessage(msg.chat.id, "❌ Gagal mengambil data gempa.");
        console.error("Error (gempa):", error);
    }
});

// .cuaca Command
natbot.onText(new RegExp(`^${prefix}cuaca$`), async (msg) => {
    try {
        const res = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=-7.8011945&lon=110.364917&appid=ab48de2043f1b963a86e54b2efdb1769");
        const data = await res.json();

        const toCelsius = (k) => (k - 273.15).toFixed(1);
        const {
            name: kota,
            weather: [{ main, description }],
            main: { temp, feels_like, humidity },
            wind: { speed }
        } = data;

        const result = `
<b>Cuaca di ${kota}</b> ☁️
<b>Cuaca:</b> ${main} (${description})
<b>Suhu:</b> ${toCelsius(temp)}°C
<b>Terasa seperti:</b> ${toCelsius(feels_like)}°C
<b>Kelembaban:</b> ${humidity}%
<b>Kecepatan Angin:</b> ${speed} m/s
        `;

        natbot.sendMessage(msg.chat.id, result.trim(), { parse_mode: "HTML" });
    } catch (error) {
        natbot.sendMessage(msg.chat.id, "❌ Gagal mengambil data cuaca.");
        console.error("Error (cuaca):", error);
    }
});

// .quote Command
natbot.onText(new RegExp(`^${prefix}quote$`), async (msg) => {
    try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();

        const quote = data[0].q;
        const author = data[0].a;

        const result = `
<b>📜 Quote of the Moment</b>

"${quote}"
— <i>${author}</i>
        `;

        natbot.sendMessage(msg.chat.id, result.trim(), { parse_mode: "HTML" });
    } catch (error) {
        natbot.sendMessage(msg.chat.id, "❌ Gagal mengambil quote.");
        console.error("Error (quote):", error);
    }
});
