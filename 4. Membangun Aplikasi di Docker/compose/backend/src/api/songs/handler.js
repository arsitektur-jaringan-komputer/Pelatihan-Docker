const autoBind = require('auto-bind');

class MusicHandler {
  constructor(songService, songValidator) {
    this._songService = songService;
    this._songValidator = songValidator;

    autoBind(this);
  }

  async postSongHandler(request, h) {
    this._songValidator.validateSongPayload(request.payload);
    const songId = await this._songService.addSong(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);

    return response;
  }

  async getSongsHandler(request) {
    const songs = await this._songService.getSongs(request.query);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;

    const song = await this._songService.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this._songValidator.validateSongPayload(request.payload);
    const { id } = request.params;

    await this._songService.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Song successfully updated',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;

    await this._songService.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song successfully deleted',
    };
  }
}

module.exports = MusicHandler;
