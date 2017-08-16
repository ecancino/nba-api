'use strict';

const rootOperator = (req, res) => {
  const title = 'NBA Shots';
  const links = [
    { url: '/games', title: 'Games' },
    { url: '/players', title: 'Players' }
  ];
  res.render('index', { title, links });
};

module.exports = rootOperator;
