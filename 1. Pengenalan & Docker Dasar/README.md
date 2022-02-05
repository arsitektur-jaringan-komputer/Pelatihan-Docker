# **Pengenalan & Docker Dasar**
- [**Pengenalan & Docker Dasar**](#pengenalan--docker-dasar)
  - [🔰 Introduction](#-introduction)
    - [❇️ Apa itu docker?](#️-apa-itu-docker)
    - [❓ Kenapa kita harus menggunakan docker?](#-kenapa-kita-harus-menggunakan-docker)
    - [🏗️ Instalasi](#️-instalasi)
      - [🚪 Windows](#-windows)
      - [🗿 Linux (berbasis Ubuntu)](#-linux-berbasis-ubuntu)
  - [🎦 Dockerfile](#-dockerfile)
  - [📶 Docker Hub](#-docker-hub)
  - [🔚 Sumber](#-sumber)

## 🔰 Introduction
### ❇️ Apa itu docker?
Mari kita ambil contoh dunia nyata, misalkan anda memiliki sebuah tempat reparasi mobil. Untuk mengubah ban mobil, mekanik anda membutuhkan alat-alat tertentu, dan alat-alat itu tentu saja berbeda dengan alat yang digunakan untuk mengganti jendela yang pecah. Selain itu, alat-alat yang dibutuhkan antar mobil juga bisa berbeda-beda. Maka, anda memutuskan untuk memiliki garasi untuk tiap-tiap tugas dan mobil yang dibutuhkan, hal ini akan membuat mekanik anda lebih mudah dan cepat menemukan alat-alat yang dibutuhkan untuk suatu tugas. Mekanik anda juga tidak akan memiliki akses ke alat yang tidak diperlukan (mengurangi risiko cedera). Selain itu, jika ada seseorang yang berhasil memaksa masuk ke salah satu garasi, mereka hanya bisa mengambil alat-alat yang ada di garasi itu. Lalu, jika saat sedang digunakan, terjadi kebakaran di salah satau garasi, garasi lain dan alat-alatnya akan tetap aman. Terakhir, jika anda memutuskan untuk membuka cabang di kota lain, atau bahkan luar negeri, pelanggan anda akan mendapatkan kepastian bahwa hasilnya akan sama dimanapun tempat garasi itu berada.

Salah satu tantangan bagi tim DevOps adalah mengatur dependensi dan stack teknologi sebuah aplikasi pada bermacam-macam environment cloud dan development. Sebagai bagian dari tugas mereka, mereka harus menjaga aplikasi tetap stabil dan operasional, terlepas dari platform tempatnya dijalankan.

Tim development, di sisi lain, harus berfokus pada mengeluarkan update dan fitur baru. Sayangnya, hal ini dapat mengacaukan stabilitas aplikasi dengan mengenalkan bug yang tergantung pada environment. Untuk menghindari inefisiensi ini, perusahaan-perusahaan mulai mengadopsi container framework, contohnya yaitu Docker.

Docker adalah sebuah produk PaaS (platform as a service) yang menggunakan virtualisasi level OS untuk mengirimkan software dalam paket-paket bernama container. Container terisolasi antara satu sama lain dan membundel software, library, dan file konfigurasi mereka sendiri, namun, mereka bisa berkomunikasi antara satu sama lain menggunakan saluran-saluran tertentu. Karena semua container berbagi service yang sama pada satu kernel OS, mereka menggunakan lebih sedikit sumber daya (misal RAM dan penyimpanan) daripada VM (virtual machine)

### ❓ Kenapa kita harus menggunakan docker?
Dengan docker kita mendapatkan:
- Abstraksi OS level dengan penggunakan sumber daya optimal
- Interoperabilitas antara berbagai macam sistem operasi
- Proses build dan test yang lebih efisien
- Eksekusi program lebih cepat

meme docker:

![dockermeme](https://user-images.githubusercontent.com/11045113/151545292-42eb0377-297e-4cfc-a02b-00a44bee3316.jpg)

### 🏗️ Instalasi
#### 🚪 Windows
1. Pastika bahwa WSL2 sudah terinstall, jika belum, ikuti langkah-langkah di https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/ (cek versi win10 anda terlebih dahulu, jika versi 2004 ke atas (termasuk win11), langkah-langkahnya di atas, jika versi 1909 ke bawah, scroll ke bawah)
2. Download installer docker desktop di https://www.docker.com/products/docker-desktop (ukuran 490 MB) (docker desktop sudah include docker engine dan docker compose)
3. Jalankan installernya, lalu pencet  ok/ install, lalu tunggu selama sekitar 2 menit
4. Docker sudah terinstall

#### 🗿 Linux (berbasis Ubuntu)
1. update package apt lalu install package berikut agar apt bisa menggunakan repository https
```
sudo apt-get update

 sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
2. tambahkan kunci GPG docker
``` curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg```
3. gunakan command berikut untuk memilih repo stabil
``` echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 ```
4. install docker engine
``` sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io 
```
5. pastikan docker sudah terinstall dengan benar
```sudo docker run hello-world```

#### 🗿 Linux (berbasis Ubuntu) - Docker Compose
1. Download package docker compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
2. Ubah permission file agar command docker-compose executable
```
sudo chmod +x /usr/local/bin/docker-compose
```
5. Memastikan docker compose telah terinstal dengan melakukan pengecekan versi docker compose
```
docker-compose --version
```


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

## 🎦 Dockerfile
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

## 📶 Docker Hub
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
  
##  🔚 Sumber
- https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
- https://www.bmc.com/blogs/docker-101-introduction/
- https://en.wikipedia.org/wiki/Docker_(software)
- https://docs.docker.com/engine/reference/builder/
