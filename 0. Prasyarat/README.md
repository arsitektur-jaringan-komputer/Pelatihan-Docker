# **Prasyarat**
- [**Prasyarat**](#prasyarat)
  - [Pelatihan Linux](#pelatihan-linux)
  - [Install Docker](#install-docker)
    - [Windows](#Windows)
    - [Linux](#linux)
      - [Ubuntu](#ubuntu)
      - [Centos](#centos)
      - [Fedora](#fedora)
    - [MacOS](#macos)

## Pelatihan Linux

## Install Docker
#### Windows
1. Pastikan bahwa WSL2 sudah terinstall, jika belum, ikuti langkah-langkah di https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/ (cek versi win10 anda terlebih dahulu, jika versi 2004 ke atas (termasuk win11), langkah-langkahnya di atas, jika versi 1909 ke bawah, scroll ke bawah)
2. Download installer docker desktop di https://www.docker.com/products/docker-desktop (ukuran 490 MB) (docker desktop sudah include docker engine dan docker compose)
3. Jalankan installernya, lalu pencet  ok/ install, lalu tunggu selama sekitar 2 menit
4. Docker sudah terinstall


#### Linux
###### Ubuntu
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

###### Centos

###### Fedora

#### MacOS