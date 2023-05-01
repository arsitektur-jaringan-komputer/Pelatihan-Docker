# **Prasyarat**
- [**Prasyarat**](#prasyarat)
  - [Pelatihan Linux](#pelatihan-linux)
  - [Install Docker](#install-docker)
    - [Windows](#Windows)
    - [Linux](#linux)
      - [Ubuntu](#ubuntu)
      - [CentOS](#centos)
      - [Fedora](#fedora)
      - [openSUSE](#opensuse)
      - [Debian (termasuk Kali Linux, MX Linux, dkk)](#debian)
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
``` 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
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
```
sudo docker run hello-world
```
6. Install docker compose
```
sudo apt-get install docker-compose-plugin
```


###### CentOS

###### Fedora
Di sini kami berasumsi kalian menggunakan Fedora workstation dan bukan server (jika anda sudah mahir dengan CLI seharusnya anda tidak butuh tutorial). Maka kami akan menyarankan anda menginstall Docker Desktop, yang sudah include Docker Engine dan Docker Compose.

1. Prasyarat
   1. Gunakan versi 64-bit dari Docker 36 atau 37 (bukan 38)
   2. Jika anda menggunakan desktop environment Gnome, anda harus menginstall ekstensi AppIndicator and KStatusNotifierItem
   3. Untuk DE non-Gnome, anda harus menginstall gnome-terminal
2. Siapkan Docker Package Repository
```bash
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo
```
3. Download package RPM Docker Desktop di link berikut https://docs.docker.com/desktop/install/fedora/
4. Install sesuai dengan versi yang didownload (gunakan autocomplete/tab agar lebih mudah)
```
sudo dnf install ./docker-desktop-<version>-<arch>.rpm
```
5. pastikan docker sudah terinstall dengan benar
```
sudo docker run hello-world
```

###### openSUSE
1. Install Docker sesuai dengan tipe OS yang kalian gunakan
   1. Tumbleweed ```zypper install docker docker-compose docker-compose-switch```
   2. Leap
      1. Tambahkan repo python devel ```zypper addrepo https://download.opensuse.org/repositories/devel:languages:python/15.4/devel:languages:python.repo zypper refresh```
      2. Install ```zypper install docker python3-docker-compose```
3. Mulai docker daemon saat boot ```sudo systemctl enable docker```
4. Bergabung ke docker group yang dapat menggunakan docker daemon

###### Debian
Termasuk Kali Linux, MX Linux, dkk
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
``` 
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
3. gunakan command berikut untuk memilih repo stabil
``` echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 ```
4. install docker engine
``` sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io 
```
5. pastikan docker sudah terinstall dengan benar
```
sudo docker run hello-world
```
6. Install docker compose
```
sudo apt-get install docker-compose-plugin
```


#### MacOS
##### GUI
1. Download installer melalui link berikut:
https://www.docker.com/products/docker-desktop
2. Jalankan installernya, kemudian drag ikon Docker menuju ikon folder _Application_ 
3. Jalankan aplikasinya dari Launchpad atau folder _Application_
4. Jika muncul peringatan "Are you sure you want to open it?", tekan open
5. Baca terms and condition dan tekan accept
6. Pilih recomended setting dan tekan ok
7. Masukkan password mac anda dan tunggu hingga proses selesai

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
8. Masukkan password mac anda dan tunggu hingga proses selesai
