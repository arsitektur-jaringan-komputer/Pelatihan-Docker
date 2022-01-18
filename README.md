# Pelatihan-Docker
Modul Pelatihan Docker

 - Docker
	 * <a href="#"></a>
 - Dockerfile
	 * <a href="#dockerfile-command">Command</a>
	 * <a href="#dockerfile-example">Contoh</a>
 - Docker Hub
	 * <a href="#dockerhub-push-image">Push Image</a>

## Docker
Modul Pelatihan Docker

## Dockerfile
<justify></justify>
<p></p>
<a id="dockerfile-command"></a>
<p>Berikut merupakan sintaks yang terdapat pada Dockerfile :</p>

| Sintaks                                     | Deskripsi                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| FROM \<base image>                           | Mendefinisikan image yang menjadi dasar kontainer.                                                                                   |
| COPY \[--chown=\<user>:\<group>\] \<src> \<dst> | Melakukan copy file atau folder ke dalam image.                                                                                      |
| ADD \[--chown=\<user><group>\] \<src> \<dst>  | Menambahkan file atau folder ke dalam image.                                                                                         |
| RUN \<command>                               | Menjalankan perintah shell pada saat proses build.                                                                                   |
| ENV \<key>=\<value>                           | Mendefinisikan variabel di dalam image.                                                                                              |
| WORKDIR \<path to folder>                    | Melakukan pindah folder dan menetapkannya sebagai direktori saat ini.                                                                |
| USER \<nama user>                            | Melakukan ganti user untuk mengeksekusi perintah-perintah setelahnya.                                                                |
| ENTRYPOINT \<command>                        | Menjalankan perintah shell pada saat kontainer dijalankan.                                                                           |
| CMD \<command>                               | Menjalankan perintah shell pada saat kontainer dijalankan, tetapi dapat digantikan dengan paramater lain saat menjalankan kontainer. |
| ARGS \<key>=\<value>                          | Mengirimkan variabel dari perintah docker untuk dijalankan pada saat proses build                                                    |
| EXPOSE \<portNumber>/\[tcp/udp\]             | Membuka port image yang berada di dalam kontainer.                                                                                   |

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

## Docker Hub
<justify></justify>
<p></p>
<a id="dockerhub-push-image"></a>
<p>Docker Hub merupakan registry yang berisi kumpulan image docker, kita juga dapat melakukan custom image docker menggunakan Dockerfile dan meletakkannya pada Docker Hub.</p>
<p>Berikut merupakan langkah-langkah untuk meletakkan image docker pada Docker Hub :</p>

<p>1. Melakukan login docker</p>

    docker login

![docker-login](images/dockerhub-1.png)

<p>2. Melakukan build image (jika sudah terdapat docker image, maka langkah ini dapat dilewati)</p>

    docker built -t <nama image>:<version image> .

![docker-build-image](images/dockerhub-2.png)

<p>3. Melihat image docker yang nantinya akan diletakan pada Docker Hub</p>

    docker images

![docker-image](images/dockerhub-3.png)

<p>4. Membuat tag pada docker image</p>

    docker tag <nama image>:<version image> <nama repository>/<nama image>:<version image>

![docker-tag](images/dockerhub-4.png)

<p>5. Melakukan 'docker push' agar image tersimpan dalam docker hub</p>

     docker push <nama repository>/<nama image>:<version image>   

![docker-push](images/dockerhub-5.png)

<p>6. Melihat image yang telah di push pada Docker Hub</p>

![docker-hub](images/dockerhub-6.png)

## Docker Compose

## Monitoring

## Docker Swarm
