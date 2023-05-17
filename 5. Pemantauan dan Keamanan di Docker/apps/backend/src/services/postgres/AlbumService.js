const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album failed to add');
    }

    return result.rows[0].id;
  }

  async getAllAlbums() {
    const query = {
      text: 'SELECT * FROM albums',
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getAlbumById(id) {
    const query = {
      text: `SELECT albums.id AS aid, albums.name, albums.year, songs.id, songs.title, songs.performer 
      FROM albums LEFT JOIN songs 
      ON albums.id = songs.album_id
      WHERE albums.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }

    const album = {
      id: result.rows[0].aid,
      name: result.rows[0].name,
      year: result.rows[0].year,
    };
    const songs = result.rows[0].id ? result.rows.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    })) : [];

    const newResult = {
      ...album,
      songs,
    };

    return newResult;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album failed to update. Id not found');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album failed to delete. Id not found');
    }
  }

  async verifyAlbumId(id, object, operation) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError(`${object} failed to ${operation}. Album id not found`);
    }
  }
}

module.exports = AlbumService;
