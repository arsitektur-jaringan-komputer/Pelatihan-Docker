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

> Jika muncul peringatan `WSL 2 requires an update to its kernel component.` ketika aplikasi dijalankan, download link berikut: https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi, jalankan setup wizard yang sudah didownload, kemudian buka kembali aplikasi docker

#### Linux
###### Ubuntu
1. Kebutuhan sistem minimal: Ubuntu 18.04 (LTS) _64-bit_
2. update package apt lalu install package berikut agar apt bisa menggunakan repository https
```
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```
3. tambahkan kunci GPG docker
``` 
sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg
```
4. gunakan command berikut untuk memilih repo stabil
``` 
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 ```
5. install docker engine dan docker compose
``` 
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
```
6. pastikan docker sudah terinstall dengan benar
```
sudo docker run hello-world
```

###### Centos

###### Fedora

###### Debian
1. Kebutuhan sistem minimal: Debian Buster 10 _64-bit_
2. update package apt lalu install package berikut agar apt bisa menggunakan repository https
```
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```
3. tambahkan kunci GPG docker
``` 
sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg
```
4. gunakan command berikut untuk memilih repo stabil
``` 
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 ```
5. install docker engine dan docker compose
``` 
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
6. pastikan docker sudah terinstall dengan benar
```
sudo docker run hello-world
```


#### MacOS
_kebutuhan sistem minimal: macOS versi 11 dengan ram 4 GB_
##### GUI
1. Download installer melalui link berikut:
https://www.docker.com/products/docker-desktop
2. Jalankan installernya, kemudian drag ikon Docker menuju ikon folder _Application_ 
3. Jalankan aplikasinya dari Launchpad atau folder _Application_
4. Jika muncul peringatan "Are you sure you want to open it?", tekan open
5. Baca terms and condition dan tekan accept
6. Pilih recomended setting dan tekan ok
7. Masukkan password mac dan tunggu hingga proses selesai

##### Terminal
1. Cek apakah Homebrew sudah terinstall
```
brew --version
```
2. Jika belum, install homebrew terlebih dahulu
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
3. Install docker
```
brew install --cask docker
```
4. Jalankan docker
```
open /Applications/Docker.app
```
5. Jika muncul peringatan "Are you sure you want to open it?", tekan open
6. Baca terms and condition dan tekan accept
7. Pilih recomended setting dan tekan ok
8. Masukkan password mac dan tunggu hingga proses selesai
