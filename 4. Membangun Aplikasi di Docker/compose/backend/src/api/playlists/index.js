const PlaylistHandler = require('./handler');
const playlistRoute = require('./routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistHandler = new PlaylistHandler(service, validator);
    server.route(playlistRoute(playlistHandler));
  },
};
