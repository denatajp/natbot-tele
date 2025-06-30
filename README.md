# NatBot
Sebuah bot Telegram yang punya berbagai fitur seperti informasi gempa, cuaca, dan kutipan inspiratif. Dibuat menggunakan Node.js

## Perintah
* `/start` : Menampilkan pesan sambutan dan daftar perintah.
* `.hi`    : Menyapa pengguna.
* `.gempa` : Menampilkan informasi gempa terkini dari BMKG beserta peta.
* `.cuaca` : Menampilkan informasi cuaca saat ini menggunakan OpenWeatherMap.
* `.quote` : Menampilkan kutipan inspiratif acak dari ZenQuotes.

## Persiapan

1. Clone repository:

   ```bash
   git clone https://github.com/denatajp/natbot-tele.git
   cd natbot
   ```
2. Install dependensi (package.json sudah mencantumkan `node-telegram-bot-api`):

   ```bash
   npm install
   ```
3. Buka file `main.js` dan ganti `[API-KEY]` menjadi token asli yang didapat dari @BotFather.
   
    Cara mendapatkan token:
      - Buka chat dengan [@BotFather](https://telegram.me/BotFather) di Telegram.
      - Kirim perintah `/newbot` dan ikuti instruksi (beri nama dan username bot).
      - BotFather akan mengirimkan token API seperti 123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ.

## Running Bot

```bash
npm run bot
```

## Struktur Proyek

```
natbot/
│
├─ main.js       # File utama bot
├─ package.json  # Informasi dependensi dan script
├─ token.txt     # Token bot (ignored)
└─ .gitignore    # File yang diabaikan Git
```

## Menambahkan Fitur Baru

1. Buat handler baru di `main.js`:

   ```js
   natbot.onText(new RegExp(`^${prefix}perintahbaru$`), async (msg) => {
     // implementasi fitur
   });
   ```
2. Commit dan push perubahan.
