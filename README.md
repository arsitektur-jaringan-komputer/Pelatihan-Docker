# Pelatihan-Docker
Modul Pelatihan Docker

 - Docker
	 * <a href="#"></a>
 - Dockerfile
	 * <a href="#dockerfile-command">Command</a>
	 * <a href="#dockerfile-example">Contoh</a>

## Docker
Modul Pelatihan Docker

## Dockerfile
<justify></justify>
<p></p>
<a id="dockerfile-command"></a>
<p>Berikut merupakan sintaks yang terdapat pada Dockerfile :</p>

| Sintaks                                     | Deskripsi                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| FROM <base image>                           | Mendefinisikan image yang menjadi dasar kontainer.                                                                                   |
| COPY \[--chown=<user>:<group>\] <src> <dst> | Melakukan copy file atau folder ke dalam image.                                                                                      |
| ADD \[--chown=<user>:<group>\] <src> <dst>  | Menambahkan file atau folder ke dalam image.                                                                                         |
| RUN <command>                               | Menjalankan perintah shell pada saat proses build.                                                                                   |
| ENV <key>=<value>                           | Mendefinisikan variabel di dalam image.                                                                                              |
| WORKDIR <path to folder>                    | Melakukan pindah folder dan menetapkannya sebagai direktori saat ini.                                                                |
| USER <nama user>                            | Melakukan ganti user untuk mengeksekusi perintah-perintah setelahnya.                                                                |
| ENTRYPOINT <command>                        | Menjalankan perintah shell pada saat kontainer dijalankan.                                                                           |
| CMD <command>                               | Menjalankan perintah shell pada saat kontainer dijalankan, tetapi dapat digantikan dengan paramater lain saat menjalankan kontainer. |
| ARGS <key>=<value>                          | Mengirimkan variabel dari perintah docker untuk dijalankan pada saat proses build                                                    |
| EXPOSE <portNumber>/\[tcp/udp\]             | Membuka port image yang berada di dalam kontainer.                                                                                   |

<p></p>
<a id="dockerfile-example"></a>
<p>Berikut merupakan contoh Dockerfile :</p>

    FROM alpine:3.13.2

    ENV nginx_version 1.18.0-r15

    RUN apk update \
        && apk add --no-cache nginx=${nginx_version} \
        && adduser -D -g 'www' www \
        && chown -R www:www /var/lib/nginx 

    EXPOSE 80
    ENTRYPOINT ["nginx", "-g", "daemon off;"]
