# **Prasyarat**
- [**Prasyarat**](#prasyarat)
  - [Pelatihan Linux](#pelatihan-linux)
  - [Install Docker](#install-docker)
    - [Windows](#Windows)
    - [Linux](#linux)
      - [Ubuntu (termasuk Mint, Elementary, dkk)](#ubuntu)
      - [CentOS](#centos)
      - [Fedora](#fedora)
      - [openSUSE](#opensuse)
      - [Debian (termasuk Kali Linux, MX Linux, dkk)](#debian)
      - [Arch (termasuk Endeavour)](#arch)
    - [MacOS](#macos)

## Pelatihan Linux
Sebelum masuk ke materi Docker Mastery Bootcamp: From Zero to Hero, pastikan sudah memahami Linux yang bisa dibaca di Repository [Pelatihan Linux](https://github.com/arsitektur-jaringan-komputer/Pelatihan-Linux).

## Install Docker
#### Windows
1. Pastikan bahwa WSL2 sudah terinstall, jika belum, ikuti langkah-langkah di https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/ (cek versi win 10 anda terlebih dahulu, jika versi 2004 ke atas (termasuk win11), langkah-langkahnya di atas, jika versi 1909 ke bawah, scroll ke bawah)
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
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
    ```

6. pastikan docker sudah terinstall dengan benar
    ```
    sudo docker run hello-world
    ```

###### CentOS
0. Prasyarat
    - CentOS 7, 8, atau 9
    - Repo **`centos-extras`** harus sudah diaktifkan
1. Siapkan repo
    ```
    sudo yum install -y yum-utils
    sudo yum-config-manager \
        --add-repo \
        https://download.docker.com/linux/centos/docker-ce.repo
    ```

2. Install docker engine, containerd, dan docker compose
    ```
    sudo yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

3. Mulai docker
    ```
    sudo systemctl start docker
    ```

4. Pastikan docker berjalan sempurna
    ```
    sudo docker run hello-world
    ```

###### Fedora
Disini diasumsikan menggunakan Fedora workstation dan bukan server (jika anda sudah mahir dengan CLI seharusnya anda tidak butuh tutorial). Maka kami akan menyarankan anda menginstall Docker Desktop, yang sudah include Docker Engine dan Docker Compose.

1. Prasyarat
   - Gunakan versi 64-bit dari Docker 36 atau 37 (bukan 38)
   - Jika anda menggunakan desktop environment Gnome, anda harus menginstall ekstensi AppIndicator and KStatusNotifierItem
   - Untuk DE non-Gnome, anda harus menginstall gnome-terminal
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
   1. Tumbleweed 
    ```
    zypper install docker docker-compose docker-compose-switch
    ```
   2. Leap
      1. Tambahkan repo python devel 
      ```
      zypper addrepo https://download.opensuse.org/repositories/devel:languages:python/15.4/devel:languages:python.repo zypper refresh
      ```
      2. Install **`zypper install docker python3-docker-compose`**
3. Mulai docker daemon saat boot
    ```
    sudo systemctl enable docker
    ```
4. Bergabung ke docker group yang dapat menggunakan docker daemon
    ```
    sudo usermod -G docker -a $USER
    ```
5. Cek jika docker berjalan
    ```
    docker version
    ```
6. Menambahkan buildx support sebagai plugin
    ```
    mkdir -p .docker/cli-plugins

    wget https://github.com/docker/buildx/releases/download/v0.6.1/buildx-v0.6.1.linux-s390x

    cp buildx-v0.6.1.linux-s390x .docker/cli-plugins/docker-buildx

    chmod +x .docker/cli-plugins/docker-buildx

    docker buildx version
    ```

###### Debian
Termasuk Kali Linux, MX Linux, dkk
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

###### Arch
1. Install docker dan docker-compose
    ```
    pacman -Syu docker docker-compose
    ```
2. Jalankan docker service
    ```
    systemctl start docker.service
    ```
3. Cek apakah docker sudah berjalan
    ```
    docker info
    ```
4. Pastikan anda bisa menjalankan container
    ```
    docker run -it --rm archlinux bash -c "echo hello world"
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
6. Pilih recommended setting dan tekan ok
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
7. Pilih recommended setting dan tekan ok
8. Masukkan password mac dan tunggu hingga proses selesai
