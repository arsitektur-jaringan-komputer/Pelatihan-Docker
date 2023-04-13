<justify></justify>
<p></p>
<a id="docker-command"></a>
<p>Berikut merupakan sintaks yang terdapat pada Docker :</p>

| Sintaks                                     | Deskripsi                                                                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| docker run                           | Menjalankan command di container baru                                                                                       |
| docker start | Menjalankan satu atau beberapa container                                                                                      |
| docker stop  | Memberhentikan satu atau beberapa container                                                                                         |
| docker build                               | Buat sebuah image dari dockerfile                                                                                   |
| docker pull                          | Mengambil image atau repo dari registry                                                                                      |
| docker push                   | Mengirim image atau repo ke registry                                                               |
| docker export                           | Mengekspor filesystem container sebagai arsip tar                                                               |
| docker exec                  | Menjalankan command di sebuah runtime container (container yang sedang berjalan)                                                                         |
| docker search                              | Mencari image di docker hub |
| docker attach                          | Menempelkan input output terminal pada suatu container, ini memungkinkan kita melihat output atau mengontrol container secara interaktif                                                    |
| docker commit             | Membuat image baru setelah dilakukan perubahan pada container  

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
        && mkdir -p /run/nginx \
        && mkdir -p /www \
        && chown -R www:www /var/lib/nginx \
        && chown -R www:www /run/nginx

    ADD nginx.conf /etc/nginx/nginx.conf 
    ADD index.html /www/index.html

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

![docker-login](img/dockerhub-1.png)

<p>2. Melakukan build image (jika sudah terdapat docker image, maka langkah ini dapat dilewati)</p>

    docker build -t <nama image>:<version image> .

![docker-build-image](img/dockerhub-2.png)

<p>3. Melihat image docker yang nantinya akan diletakan pada Docker Hub</p>

    docker images

![docker-image](img/dockerhub-3.png)

<p>4. Membuat tag pada docker image</p>

    docker tag <nama image>:<version image> <nama repository>/<nama image>:<version image>

![docker-tag](img/dockerhub-4.png)

<p>5. Melakukan 'docker push' agar image tersimpan dalam docker hub</p>

     docker push <nama repository>/<nama image>:<version image>   

![docker-push](img/dockerhub-5.png)

<p>6. Melihat image yang telah di push pada Docker Hub</p>

![docker-hub](img/dockerhub-6.png)