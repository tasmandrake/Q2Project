'use strict';

exports.seed = (knex, Promise) => {
  return knex('videos').del()
    .then(() => {
      return knex('videos').insert([
        { id: 1, video_url: 'Tllw4EPhLiQ&t=5s', img:'https://cdn-images-1.medium.com/max/800/1*jAG7WcT_5ORS6BmpI1LJGg.jpeg', title: 'arrow funcitons', description: 'this video is everything that you need to know about lorem ipsume sti dolorum anum.'},
        { id: 2, video_url: 'wfMtDGfHWpA', img:'https://cdn-images-1.medium.com/max/800/1*jAG7WcT_5ORS6BmpI1LJGg.jpeg', title:'video title', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit'}
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('videos_id_seq', (SELECT MAX(id) FROM videos))");
    });
};
