const autoBind = require('auto-bind');

class AlbumHandler {
  constructor(albumService, albumValidator) {
    this._albumService = albumService;
    this._albumValidator = albumValidator;

    autoBind(this);
  }

  async postAlbumHandler(request, h) {
    this._albumValidator.validateAlbumPayload(request.payload);
    const albumId = await this._albumService.addAlbum(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);

    return response;
  }

  async getAllAlbumsHandler() {
    const albums = await this._albumService.getAllAlbums();

    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;

    const album = await this._albumService.getAlbumById(id);

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request) {
    this._albumValidator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this._albumService.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album successfully updated',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;

    await this._albumService.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album successfully deleted',
    };
  }
}

module.exports = AlbumHandler;
