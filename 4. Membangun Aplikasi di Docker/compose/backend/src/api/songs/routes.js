const songRoute = (songHandler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: songHandler.postSongHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: songHandler.getSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: songHandler.getSongByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: songHandler.putSongByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: songHandler.deleteSongByIdHandler,
  },
];

module.exports = songRoute;
