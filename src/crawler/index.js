var casper = require('casper').create();

// Opens casperjs homepage
casper.start('http://futpedia.globo.com/campeonato/campeonato-brasileiro/2016');

casper.then(function() {
  document.querySelector('.next_page').click();
  console.log(document.querySelector('#page_number').val());
});

casper.run();
