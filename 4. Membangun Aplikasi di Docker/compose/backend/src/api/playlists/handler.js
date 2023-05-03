const autoBind = require('auto-bind');

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({ name, owner });

    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });
    response.code(201);

    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: owner } = request.auth.credentials;

    const playlists = await this._service.getPlaylists(owner);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Song successfully deleted',
    };
  }

  async postPlaylistSongHandler(request, h) {
    this._validator.validateSongIdPayload(request.payload);

    const { songId } = request.payload;
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    await this._service.addPlaylistSong(id, { songId });

    const response = h.response({
      status: 'success',
      message: 'Song successfully added to playlist',
    });

    response.code(201);
    return response;
  }

  async getPlaylistSongsByPlaylistIdHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);

    const playlist = await this._service.getPlaylistSongsByPlaylistId(id);

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongBySongIdHandler(request) {
    this._validator.validateSongIdPayload(request.payload);

    const { id } = request.params;
    const { songId } = request.payload;
    const { id: owner } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, owner);
    await this._service.deletePlaylistSongBySongId({ songId });

    return {
      status: 'success',
      message: 'Song successfully deleted from playlist',
    };
  }
}

module.exports = PlaylistHandler;
