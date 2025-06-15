const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
const baseURL = 'https://samehadaku.cloud';

app.get('/api/anime', async (req, res) => {
  try {
    const homepage = await axios.get(baseURL);
    const $ = cheerio.load(homepage.data);

    const posts = $('.post-show').slice(0, 12); // Ambil 12 anime terbaru

    const animeList = await Promise.all(posts.map(async (i, el) => {
      const link = $(el).find('a').attr('href');
      const title = $(el).find('.title').text().trim();
      const thumbnail = $(el).find('img').attr('src');

      try {
        const detailPage = await axios.get(link);
        const $$ = cheerio.load(detailPage.data);

        const genres = [];
        $$('.genre a').each((i, g) => genres.push($$(g).text().trim()));

        const synopsis = $$('.sinopsis p').first().text().trim();
        const jadwal = $$('.infox .spe span:contains("Tanggal Rilis")').next().text().trim();

        return { title, link, thumbnail, genre: genres, synopsis, jadwal };
      } catch (err) {
        return { title, link, thumbnail, genre: [], synopsis: '', jadwal: '' };
      }
    }).get());

    res.json({ success: true, data: animeList });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal ambil data dari Samehadaku.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API aktif di http://localhost:${PORT}`);
});

