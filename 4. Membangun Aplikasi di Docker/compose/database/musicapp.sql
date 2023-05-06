--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: albums; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.albums (
    id character varying(50) NOT NULL,
    name text NOT NULL,
    year smallint NOT NULL
);


ALTER TABLE public.albums OWNER TO docker;

--
-- Name: authentications; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.authentications (
    token text NOT NULL
);


ALTER TABLE public.authentications OWNER TO docker;

--
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO docker;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pgmigrations_id_seq OWNER TO docker;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- Name: playlist_songs; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.playlist_songs (
    id character varying(50) NOT NULL,
    playlist_id character varying(50) NOT NULL,
    song_id character varying(50) NOT NULL
);


ALTER TABLE public.playlist_songs OWNER TO docker;

--
-- Name: playlists; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.playlists (
    id character varying(50) NOT NULL,
    name text NOT NULL,
    owner character varying(50) NOT NULL
);


ALTER TABLE public.playlists OWNER TO docker;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.songs (
    id character varying(50) NOT NULL,
    title text NOT NULL,
    year smallint NOT NULL,
    genre text NOT NULL,
    performer text NOT NULL,
    duration smallint,
    album_id character varying(50)
);


ALTER TABLE public.songs OWNER TO docker;

--
-- Name: users; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.users (
    id character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    password text NOT NULL,
    fullname text NOT NULL
);


ALTER TABLE public.users OWNER TO docker;

--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.albums (id, name, year) FROM stdin;
\.


--
-- Data for Name: authentications; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.authentications (token) FROM stdin;
\.


--
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.pgmigrations (id, name, run_on) FROM stdin;
173	1678812782171_create-table-album	2023-04-17 12:06:02.624609
174	1678812787768_create-table-song	2023-04-17 12:06:02.624609
175	1681392024374_create-table-user	2023-04-17 12:06:02.624609
176	1681392110141_create-table-authentication	2023-04-17 12:06:02.624609
177	1681392153355_create-table-playlist	2023-04-17 12:06:02.624609
178	1681392177500_create-table-playlist-song	2023-04-17 12:06:02.624609
\.


--
-- Data for Name: playlist_songs; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.playlist_songs (id, playlist_id, song_id) FROM stdin;
\.


--
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.playlists (id, name, owner) FROM stdin;
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.songs (id, title, year, genre, performer, duration, album_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.users (id, username, password, fullname) FROM stdin;
\.


--
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.pgmigrations_id_seq', 178, true);


--
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: playlist_songs playlist_songs_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT playlist_songs_pkey PRIMARY KEY (id);


--
-- Name: playlists playlists_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlists_pkey PRIMARY KEY (id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: playlist_songs unique_playlist_id_and_song_id; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT unique_playlist_id_and_song_id UNIQUE (playlist_id, song_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: playlist_songs fk_playlist_songs.playlist_id_playlists.id; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT "fk_playlist_songs.playlist_id_playlists.id" FOREIGN KEY (playlist_id) REFERENCES public.playlists(id) ON DELETE CASCADE;


--
-- Name: playlist_songs fk_playlist_songs.song_id_songs.id; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT "fk_playlist_songs.song_id_songs.id" FOREIGN KEY (song_id) REFERENCES public.songs(id) ON DELETE CASCADE;


--
-- Name: playlists fk_playlists.owner_users.id; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT "fk_playlists.owner_users.id" FOREIGN KEY (owner) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: songs fk_songs.album_id_albums.id; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT "fk_songs.album_id_albums.id" FOREIGN KEY (album_id) REFERENCES public.albums(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

