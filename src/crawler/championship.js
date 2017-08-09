/**
 * This script serve to scrape all URLs from each game of one specific championship.
 */
const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });

const championship = 'campeonato-carioca';
const year = 2016;

nightmare
  .goto(`http://futpedia.globo.com/campeonato/${championship}/${year}`)
  .evaluate(() => document.querySelectorAll('#tabela-jogos tbody tr'))
  .end()
  .then((rows) => {
    const games = rows.map((row) => {
      const game = {
        url: row.querySelector('a[itemprop="url"]').href,
      };
      return game;
    });
    console.log(rows);
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.error('Search failed:', error);
  });
