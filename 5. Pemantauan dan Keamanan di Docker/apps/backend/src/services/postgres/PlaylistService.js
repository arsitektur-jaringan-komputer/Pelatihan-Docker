const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistService {
  constructor(songService) {
    this._pool = new Pool();
    this._songService = songService;
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist failed to add');
    }

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text:
      `SELECT p.id, p.name, u.username
      FROM playlists AS p
      JOIN users AS u
      ON p.owner = u.id
      WHERE u.id = $1`,
      values: [owner],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async addPlaylistSong(playlistId, { songId }) {
    await this._songService.verifySongId(songId, 'Song', 'add');

    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song failed to add into playlist');
    }
  }

  async getPlaylistSongsByPlaylistId(id) {
    const playlistQuery = {
      text:
      `SELECT p.id, p.name, u.username
      FROM playlists AS p
      JOIN users AS u
      ON p.owner = u.id
      WHERE p.id = $1`,
      values: [id],
    };
    const songQuery = {
      text: `
      SELECT s.id, s.title, s.performer
      FROM songs AS s
      JOIN playlist_songs AS ps
      ON ps.song_id = s.id
      WHERE ps.playlist_id = $1`,
      values: [id],
    };

    const playlist = await this._pool.query(playlistQuery);
    const songResult = await this._pool.query(songQuery);

    return {
      ...playlist.rows[0],
      songs: songResult.rows,
    };
  }

  async deletePlaylistSongBySongId({ songId }) {
    await this._songService.verifySongId(songId, 'Song', 'delete');

    const query = {
      text: 'DELETE FROM playlist_songs WHERE song_id = $1',
      values: [songId],
    };

    await this._pool.query(query);
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist not found');
    }

    const note = result.rows[0];

    if (note.owner !== owner) {
      throw new AuthorizationError('You are not authorized to access this resource');
    }
  }
}

module.exports = PlaylistService;
