## **CONTENTS**
* [**📜 Mengelola Data Di Docker**](#-mengelola-data-di-docker)
* [**Docker Network**](#docker-network)

## 📜 Mengelola Data Di Docker
![docker-data-management](https://user-images.githubusercontent.com/49280352/151213721-fc5711ca-112a-4205-86b0-7a009533d690.png)

### 📌 Bagaimana Cara Mengelola Data Pada Docker
![docker-vol-2](https://user-images.githubusercontent.com/49280352/150386780-6b6c7c5a-e2a9-424f-b05b-84a4c9cecb6a.png)

**Container** Docker digunakan untuk menjalankan aplikasi di isolated environment (environment khusus).  Secara default, semua perubahan di dalam **container** akan hilang saat **container** berhenti.  Jika kalian ingin menyimpan data yang sudah diproses, kalian dapat menggunakan **docker volume**, **bind mount**, **tmpfs mount** sebagai alat bantunya.

### 📌 Docker Volume

#### 🧷 Apa Itu Docker Volume?

![image](https://user-images.githubusercontent.com/49280352/151207293-15e5c5f6-4f6c-4581-9a6f-35edda8cbcfc.png)

Docker Volume akan disimpan menjadi bagian dari sistem file host yang akan dibuat dan dikelola oleh Docker. Misalkan kalau kalian menggunakan Linux ada pada path ```/var/lib/docker/volume```. Ketika kalian membuat volume, volume akan disimpan di directory docker host. Volumes dapat di mount ke beberapa container secara bersamaan. Ketika volumes tidak ada yang menggunakan tetap tidak akan terhapus.

#### 🧷 Command-Command Pada Docker Volume

Command | Fungsi 
--- | --- 
```docker volume create [nama-volume]``` | Membuat Volume Baru
```docker volume ls``` | List Volume Yang Telah Dibuat
```docker volume inspect [nama-volume]``` | Lihat Detil Volume Yang Telah Dibuat
```docker volume rm [nama-volume]``` | Menghapus Volume Yang Telah Dibuat

**Note: [nama-volume] pada command berarti diganti sesuai kondisi tanpa menggunakan '[' dan ']'** 

### 📌 Docker Bind Mount

#### 🧷 Apa Itu Docker Bind Mount?

![image](https://user-images.githubusercontent.com/49280352/151213902-db381db7-daad-446c-9f85-10d866e48151.png)

Docker Bind Mount adalah teknik untuk menyimpan data dimana saja pada sistem host. Host sistem dan Container satu sama lain dapat menulis, membaca dan mengubah file yang akan dimount kapanpun. Jika dibandingkan dengan volumes, bind mount tidak bisa menggunakan CLI docker, akan tetapi bind mount biasa digunakan pada development environment.

#### 🧷 Contoh Ilustrasi Penggunaan Docker Bind Mount

![image](https://user-images.githubusercontent.com/49280352/150382407-d2ba28e7-36f7-4308-b5fc-b60359caedaa.png)

- Host / Filesystem memiliki folder mysql yang berisi sebuah database aplikasi dalam format MySQL.
- Di Container Docker ada sebuah aplikasi MySQL.
- Untuk Penyimpanan Database dan Tabel serta Isi dari Aplikasi MySQL di Container berada pada folder /var/lib/mysql yang dicopy dari folder mysql di Host / Filesystem.

#### 🧷 Contoh Real Repo Penggunaan Docker Bind Mount

Untuk Penggunaan Docker Bind Mount dapat dilihat di repo github [disini](https://github.com/ishaqadhel/docker-laravel-mysql-nginx-starter).

### 📌 Perbedaan Antara Docker Volume dan Bind Mount

Pada contoh kasus nyata di pengembangan aplikasi, seringkali masih sulit untuk membedakan apakah sebuah script dari docker-compose.yml menggunakan management data berbasis volume atau bind mount. Pada bagian ini akan dijelaskan lebih detil bagaimana cara mengetahui apakah script dari docker-compose.yml menggunakan volume atau bind mount.

Syntax umum pada docker-compose.yml untuk management data adalah ```[SOURCE:]TARGET[:MODE]```.

Untuk lebih jelas pembahasannya langsung ke contoh kasus penggunaan database postgresql menggunakan docker-compose.yml. Untuk syntax penggunaannya ada 3 cara, yaitu:

1. Source tidak diketahui

![image](https://user-images.githubusercontent.com/49280352/151219030-25d6399f-a495-4cc5-93fc-f62f406248ab.png)

Untuk contoh diatas, ketika penyimpanan data pada script docker compose tidak disertai dengan path source, maka docker compose otomatis akan membuat direktori dan mount sebagai volume pada folder docker area. Script diatas termasuk menggunakan metode **volume**.

2. Source ada tetapi tidak path

![image](https://user-images.githubusercontent.com/49280352/151219344-37d2e541-c0cf-4501-bd55-e788c6afd771.png)

Untuk contoh diatas, ketika penyimpanan data pada script docker compose menggunakan source tetapi bukan sebagai path melainkan nama volume, maka docker compose otomatis akan membuat direktori atas nama source yang ditulis pada script dan mount sebagai volume pada folder docker area. Script diatas termasuk menggunakan metode **volume**.

3. Source menggunakan path

![image](https://user-images.githubusercontent.com/49280352/151219692-7789de70-ddb8-46c2-a9b0-625887b8c287.png)

Untuk contoh diatas, ketika penyimpanan data pada script docker compose disertai dengan full path source, maka docker compose otomatis akan membuat bind mount folder source ke target. Script diatas termasuk menggunakan metode **bind mount**.

## Docker Network
