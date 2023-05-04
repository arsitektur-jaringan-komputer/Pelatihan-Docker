# **Docker Service Lanjutan**

<div style="text-align: justify"> 

Di materi sebelumnya, telah dipelajari beberapa *command* dari Docker yang penting untuk diketahui. Sebelum lanjut pada materi yang berfokus pada implementasi, terlebih dahulu kita masuk pada materi ketiga berikut ini.

Materi ketiga akan berfokus pada penggunaan Docker yang lebih *advance* terutama untuk pengembangan aplikasi lebih lanjut dengan arsitektur seperti *microservices* atau mungkin juga *service-oriented architecture* (SOA).

> Baca juga: [***Microservices vs SOA: Identifying the Differences***](https://www.crowdstrike.com/cybersecurity-101/cloud-security/soa-vs-microservices/#:~:text=The%20main%20difference%20between%20SOA,individual%20services%20that%20function%20independently.)

Sebelum memasuki materi, silahkan mempelajari alur pembahasan pada *section* [**apa yang akan kita pelajari?**](#apa-yang-akan-kita-pelajari) berikut ini.

</br>

## **Apa yang Akan Kita Pelajari?**

- [**Docker Service Lanjutan**](#docker-service-lanjutan)
  - [**Apa yang Akan Kita Pelajari?**](#apa-yang-akan-kita-pelajari)
  - [**Glosarium**](#glosarium)
  - [**Materi**](#materi)
    - [**Docker Compose**](#docker-compose)
      - [**Pengertian Docker Compose**](#pengertian-docker-compose)
      - [**Contoh Implementasi Docker Compose**](#contoh-implementasi-docker-compose)
      - [**Depend On Docker Compose**](#depend-on-docker-compose)
      - [**Inheritance di Docker Compose**](#inheritance-di-docker-compose)
      - [**Mengelola Docker Compose**](#mengelola-docker-compose)
    - [**Docker Data Management**](#docker-data-management)
      - [**Pengenalan Docker Data Management**](#pengenalan-docker-data-management)
      - [**Jenis-Jenis Docker Mount**](#jenis-jenis-docker-mount)
      - [**Mengelola Docker Volume**](#mengelola-docker-volume)
    - [**Docker Networking**](#docker-networking)
      - [**Pengertian Docker Networking**](#pengertian-docker-networking)
      - [**Konsep Dasar di Docker Networking**](#konsep-dasar-di-docker-networking)
      - [**Jenis-Jenis Docker Network Driver**](#jenis-jenis-docker-network-driver)
      - [**Mengelola Docker Networking di Docker Compose**](#mengelola-docker-networking-di-docker-compose)
  - [**Sumber Referensi**](#sumber-referensi)

</br>
</br>

## **Glosarium**

Seperti materi sebelumnya, selalulah untuk *keep in mind* beberapa istilah berikut ini.

<details>
  <summary>Daftar Istilah Glosarium</summary>

| Istilah           | Deskripsi |
|-------------------|-----------|
| Alamat MAC       | Alamat MAC merupakan sebuah alamat fisik pada jaringan komputer yang terdiri dari 6 *byte* atau 48 *bit*. Alamat MAC digunakan untuk mengidentifikasi setiap perangkat yang terhubung pada jaringan, sehingga memungkinkan komunikasi antar perangkat. |
| Alamat IP        | Alamat IP adalah alamat unik yang diberikan pada setiap perangkat yang terhubung ke jaringan komputer. Alamat IP terdiri dari serangkaian angka, yang dibagi menjadi beberapa segmen. Ada dua jenis alamat IP, yaitu IPv4 dan IPv6. |
| Bridge Network    | Bridge Network adalah sebuah jaringan virtual yang memungkinkan komunikasi antara beberapa *container* atau antara *container* dan *host*. Bridge Network dapat diatur menggunakan *driver* yang berbeda, dan setiap *container* akan memiliki alamat IP sendiri-sendiri pada jaringan tersebut. |
| Cluster           | *Cluster* adalah kumpulan beberapa host yang bekerja sama untuk menjalankan aplikasi. Dalam konteks Docker, *cluster* dapat digunakan untuk mengelola *container* pada beberapa *host* secara bersamaan. |
| Compose           | Docker Compose adalah sebuah *tool* yang digunakan untuk mendefinisikan, menjalankan, dan mengelola aplikasi multi-*container* dengan Docker. Compose memungkinkan kita untuk mendefinisikan semua konfigurasi aplikasi dalam sebuah *file* YAML, sehingga memudahkan pengguna untuk mengelola dan melakukan *deployment* aplikasi dengan Docker. |
| Container         | *Container* adalah sebuah unit perangkat lunak yang berisi semua yang diperlukan untuk menjalankan sebuah aplikasi. *Container* berjalan di atas Docker Engine, dan memiliki sistem file yang terisolasi serta sumber daya (seperti CPU, memori, dan jaringan) yang terisolasi. *Container* sangat ringan dan portabel, sehingga memungkinkan aplikasi dapat dijalankan di mana saja. |
| Data Management   | Data Management dalam konteks Docker merujuk pada cara pengelolaan data yang digunakan oleh *container*, seperti *persistent* *storage* dan *backup*. Data Management yang baik sangat penting untuk menghindari kehilangan data dan memastikan keandalan dan kesinambungan aplikasi. |
| Driver            | *Driver* dalam konteks Docker merujuk pada komponen yang digunakan untuk mengatur komunikasi antara Docker Engine dan sistem penyimpanan. *Driver* dapat diatur untuk berbagai jenis sistem penyimpanan, seperti *file* *system* lokal, Amazon S3, dan lain-lain. |                                             
| Environment       | *Environment* dalam konteks Docker merujuk pada variabel lingkungan yang didefinisikan untuk sebuah *container* atau aplikasi. Variabel lingkungan ini dapat digunakan untuk konfigurasi aplikasi, seperti konfigurasi *database* dan koneksi ke *server* lain. |
| Host Machine      | *Host* *Machine* adalah mesin fisik di mana Docker Engine di-*instal* dan berjalan. Host Machine dapat berupa laptop, desktop, atau *server*. |
| Interface Virtual | Virtual *Interface* adalah sebuah *interface* jaringan virtual yang digunakan oleh *container* untuk terhubung ke jaringan *host* atau ke jaringan lain. *Interface* virtual memungkinkan *container* untuk berkomunikasi dengan *host* atau *container* lain, dengan menggunakan alamat IP yang terpisah dari alamat IP host. |
| Image             | *Image* adalah sebuah *template* atau *blueprints* untuk membuat *container*. Image berisi semua yang diperlukan untuk menjalankan sebuah aplikasi, seperti kode aplikasi, dependensi, dan konfigurasi. *Image* dapat diunduh dari Docker Hub atau dibuat secara lokal menggunakan Dockerfile. |
| Mount             | *Mount* adalah cara untuk menghubungkan sebuah volume ke dalam sebuah *container*, sehingga memungkinkan *container* untuk mengakses dan memodifikasi data di volume tersebut. *Mount* dapat dilakukan secara *read*-*only* atau *read*-*write*. |
| Network Host      | Network Host adalah mode jaringan di mana *container* menggunakan jaringan *host* yang sama dengan *host* *machine*. Dalam mode ini, *container* tidak akan memiliki alamat IP sendiri, sehingga dapat mengakses aplikasi yang berjalan pada *host* *machine*. |
| Overlay Network   | Overlay Network adalah sebuah jaringan virtual yang memungkinkan komunikasi antara beberapa *host*. Overlay Network digunakan untuk menghubungkan beberapa *container* pada beberapa *host* yang berbeda. Setiap *container* pada *overlay* *network* akan memiliki alamat IP yang unik. |
| Port              | *Port* adalah alamat yang digunakan untuk mengirim dan menerima data melalui jaringan. Setiap aplikasi atau layanan pada sebuah *host* dapat diakses melalui *port* tertentu. |
| Port Mapping      | Port Mapping adalah proses untuk memetakan *port* pada *host* *machine* ke *port* pada *container*. Port Mapping digunakan untuk mengakses aplikasi yang berjalan di dalam container dari luar *host* *machine*. |
| Routing           | *Routing* adalah proses mengarahkan lalu lintas jaringan dari satu jaringan ke jaringan lain. Dalam konteks Docker, *routing* digunakan untuk mengarahkan lalu lintas jaringan antara *container* yang berbeda dalam sebuah *overlay* *network*. |
| Standalone        | *Standalone* adalah sebuah *container* yang berjalan sendiri, tanpa terhubung ke *container* lain atau ke jaringan. *Standalone* *container* dapat diakses melalui *port* yang di-*expose*. |
| Subnet            | *Subnet* adalah jaringan kecil yang terdiri dari sekelompok alamat IP yang sama. Dalam konteks Docker, *subnet* digunakan untuk mengatur jaringan antara *container* pada sebuah *overlay* *network*. Setiap *subnet* memiliki rentang alamat IP yang unik. |
| Topologi Jaringan | Topologi Jaringan adalah cara di mana komponen-komponen jaringan saling terhubung dan berinteraksi. Dalam konteks Docker, topologi jaringan digunakan untuk mengatur bagaimana *container* saling terhubung dalam sebuah *overlay* *network*. Topologi jaringan dapat berupa *tree*, *star*, *mesh*, atau jenis topologi jaringan lainnya. |
| Volume            | Volume adalah tempat untuk menyimpan dan mengelola data di dalam *container*. Volume digunakan untuk menyimpan data yang ingin dijaga persisten dan tidak ingin hilang saat container dihapus atau dimulai ulang. Volume dapat digunakan untuk menghubungkan data di *host* *machine* ke dalam *container* atau antara beberapa *container*. |

</details>

</br>
</br>

## **Materi**

Materi ketiga ini akan dibagi menjadi tiga topik bahasan. Pertama, tentang Docker Compose, Docker Data Management, dan juga Docker Networking. 

<br>

### **Docker Compose**

![Docker compose](img/docker-compose.jpg)

#### **Pengertian Docker Compose**

Docker Compose adalah sebuah alat atau *tool* untuk mengelola dan menjalankan aplikasi yang terdiri dari satu atau beberapa *container*. Docker Compose memungkinkan untuk mendefinisikan, mengonfigurasi, dan menjalankan beberapa *container* Docker sekaligus dengan menggunakan *file* konfigurasi YAML yang sederhana.

![Docker compose 2](img/docker-compose-file-yaml.gif)

Docker Compose juga dapat digunakan untuk menentukan image Docker untuk setiap *container*, mengatur pengaturan jaringan, menentukan volume yang dibutuhkan, dan melakukan konfigurasi lainnya dalam satu *file* konfigurasi. Selain itu, Docker Compose juga memudahkan proses pengaturan dan penyebaran aplikasi pada lingkungan produksi atau *development* yang berbeda dengan cara yang konsisten.

> Baca juga: [***A Docker Analogy***](https://davidtruxall.com/a-docker-analogy/)

Dalam pengembangan perangkat lunak modern, aplikasi terdiri dari banyak komponen yang dapat dijalankan secara terpisah dan berinteraksi satu sama lain melalui jaringan. Dalam hal ini, Docker Compose menjadi alat yang sangat berguna untuk mengatur aplikasi tersebut dengan menggunakan *container* Docker, sehingga memudahkan proses pengembangan, pengujian, dan penyebaran aplikasi yang kompleks. 

Selanjutnya, kita akan melihat contoh implementasi dari Docker Compose itu sendiri!

</br>

#### **Contoh Implementasi Docker Compose**

Sebagai contoh dalam bahasan implementasi ini, terdapat konfigurasi Docker Compose sebagai berikut. Agar mempermudah pembahasan, konfigurasi ini diberi nama dengan `docker-compose.yml`.


```YAML
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      DB_HOST: database
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_BACKEND_URL: http://backend:8080
  database:
    image: postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
```

Konfigurasi Docker Compose di atas mendefinisikan tiga layanan (*service*), yaitu *backend*, *frontend*, dan *database*. Berikut adalah penjelasan tentang konfigurasi di atas.

| Properti | Deskripsi |
| --- | --- |
| version: '3' | Versi dari Docker Compose yang digunakan dalam konfigurasi tersebut. |
| services | Komponen utama yang mendefinisikan *service* yang akan dijalankan. Dalam konfigurasi diatas, terdapat 3 *service*, yaitu *frontend*, *backend*, dan *database*. |
| backend | Nama *service* yang akan dijalankan. |
| build: ./backend | Menentukan direktori dimana Docker akan melakukan *build image* untuk *service backend.* |
| ports: - "8080:8080" | Mendefinisikan *port mapping*, dimana `port 8080` pada *container* akan di-*forward* ke `port 8080` pada *host*. |
| environment: DB_HOST: database | Mendefinisikan *environment variable* pada *service backend*, dimana `DB_HOST` akan di-*set* sebagai *database*. |
| frontend | Nama *service* yang akan dijalankan. |
| build: ./frontend | Menentukan direktori dimana Docker akan melakukan *build image* untuk *service frontend*. |
| ports: - "3000:3000" | Mendefinisikan *port mapping*, dimana `port 3000` pada *container* akan di-*forward* ke `port 3000` pada *host*. |
| environment: REACT_APP_BACKEND_URL: http://backend:8080 | Mendefinisikan *environment variable* pada *service frontend*, dimana `REACT_APP_BACKEND_URL` akan di-*set* sebagai `http://backend:8080`. |
| database | Nama *service* yang akan dijalankan. |
| image: postgres | Mendefinisikan *image* yang akan digunakan untuk *service database*. |
| environment: POSTGRES_USER: myuser POSTGRES_PASSWORD: mypassword POSTGRES_DB: mydb | Mendefinisikan *environment variable* pada *service database*, dimana `POSTGRES_USER` akan di-*set* sebagai `myuser`, `POSTGRES_PASSWORD` akan di-*set* sebagai `mypassword`, dan `POSTGRES_DB` akan di-*set* sebagai `mydb`. |


Untuk praktik lebih lanjut akan dicontohkan pada [**Modul 4**](https://github.com/arsitektur-jaringan-komputer/Pelatihan-Docker/tree/pd23/4.%20Membangun%20Aplikasi%20di%20Docker) sebagai materi selanjutnya. 

</br>

#### **Depend On Docker Compose**

Pada konfigurasi Docker Compose, terdapat fitur **`depends_on`** yang berguna untuk menentukan urutan dalam membangun dan menjalankan *container*. Hal ini dibutuhkan ketika terdapat *container* yang membutuhkan layanan dari *container* lain yang harus sudah terlebih dahulu dibangun dan dijalankan. Contohnya, pada konfigurasi Docker Compose sebelumnya, *container* *backend* membutuhkan layanan dari *database* untuk terkoneksi sehingga perlu menunggu *container* *database* terlebih dahulu dibangun dan dijalankan. 

Perhatikan konfigurasi Docker Compose hasil modifikasi `docker-compose.yml` sebelumnya berikut ini.

```YAML
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - database
    environment:
      DB_HOST: database
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_BACKEND_URL: http://backend:8080
  database:
    image: postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
```

Dari konfigurasi di atas, telah ditambahkan fitur **`depends_on`** pada *service* *backend* untuk memastikan *container* tersebut tidak akan dijalankan sebelum *container* *database* siap digunakan.

</br>

#### **Inheritance di Docker Compose**

*Inheritance* (pewarisan) adalah fitur penting di Docker Compose untuk mengelola *container* Docker yang terkait. *Inheritance* memungkinkan untuk mewarisi konfigurasi dari *file* konfigurasi lain. Dalam Docker Compose, hal ini dilakukan dengan menggunakan opsi **`extends`** di dalam *file* konfigurasi `YAML`. Dengan opsi ini, *developer* dapat membuat *file* konfigurasi yang lebih spesifik untuk setiap lingkungan, seperti *production*, *staging*, atau *development* yang juga masih mewarisi konfigurasi yang sama dari *file* konfigurasi yang lebih umum (global).

Sehingga, contoh kerangka implementasi *inheritance* adalah sebagai berikut dengan nama *file* `spesific.yml`

```YAML
version: '3.7'
services:
  backend:
    extends:
      file: docker-compose.yml
      service: backend
    ...

  frontend:
    extends:
      file: docker-compose.yml
      service: frontend
    ...

  database:
    extends:
      file: docker-compose.yml
      service: database
    ...
```

Dari konfigurasi di atas, *services* seperti *backend*, *frontend*, dan *database* dapat meng-inheritance dari apa yang telah dikonfigurasikan pada `docker-compose.yml` sekaligus dapat dispesifikan pada `spesific.yml` tersebut.

</br>

#### **Mengelola Docker Compose**

Berikut adalah beberapa perintah penting untuk mengelola Docker Compose beserta penjelasannya yang tersedia pada **`docker compose COMMAND`**. Perhatikan, apabila installasi Docker Compose melalui *standalone* maka format perintahnya adalah **`docker-compose COMMAND`**. 

| Perintah | Deskripsi |
| --- | --- |
|`up` | Membuat dan memulai *container* sesuai dengan konfigurasi di dalam *file* `docker-compose.yml`. Jika *file* tersebut tidak ada, perintah ini akan gagal. |
|`up -d` |	Sama seperti `docker-compose up`, tetapi menjalankan *container* di *background* (*detached* *mode*).
|`down`	| Menghentikan dan menghapus *container* yang dihasilkan oleh `docker-compose up`. |
|`build` |	Membuat *image* untuk *service* yang didefinisikan di dalam `docker-compose.yml`. |
|`start` | Menjalankan *container* yang sudah dibuat. |
|`stop` |	Menghentikan *container* yang sedang berjalan. |
|`restart` |	Menghentikan dan menjalankan kembali *container*. |
|`ps` |	Menampilkan status dari *container* yang dijalankan oleh Docker Compose. |
|`logs` |	Menampilkan *log* dari *service* yang dijalankan oleh Docker Compose. |
|`exec` |	Menjalankan perintah di dalam *container*. |
|`config` |	Memvalidasi dan menampilkan konfigurasi dari `docker-compose.yml`. |
|`kill` |	Memaksa menghentikan *container* yang sedang berjalan. |

</br>
</br>

### **Docker Data Management**

![Docker Data Management](img/docker-compose.jpg)

#### **Pengenalan Docker Data Management** 

Docker Data Management adalah sebuah konsep untuk mengelola data atau *file* yang ada di Docker. Ketika menjalankan sebuah aplikasi atau layanan di dalam Docker *container*, data yang dihasilkan oleh aplikasi tersebut dapat disimpan dalam *container* itu sendiri atau dalam sebuah volume yang terpisah dari *container*.

Dalam Docker, terdapat beberapa jenis *mount* atau penghubung yang digunakan untuk mengelola data, seperti `volume`, `bind mount`, dan `tmpfs mount`. Seorang *developer* dapat memilih jenis *mount* yang tepat sesuai dengan kebutuhan aplikasi yang dijalankan di dalam *container*.

Selain itu, Docker juga menyediakan beberapa perintah untuk mengelola data pada Docker volume, seperti menampilkan informasi volume, menghapus volume, dan mengatur volume *driver* *options*. Dengan menggunakan perintah-perintah ini, *developer* dapat mengelola data di Docker dengan mudah dan efisien. 

Pemahaman tentang Docker Data Management sangat penting untuk memastikan data yang dihasilkan oleh aplikasi yang dijalankan di dalam *container* tetap terjaga dan tidak hilang saat *container* dihapus atau dimatikan.

</br>

#### **Jenis-Jenis Docker Mount**

<img src="img/docker-mounts.png" alt="Docker Mount" style="width:100%;">

Terdapat beberapa jenis Docker Mount sebagai berikut.

- ##### **Volume**
  
    Docker Volume adalah fitur pada Docker yang memungkinkan *developer* untuk mengelola data yang dibutuhkan oleh *container* secara terpisah dari *container* itu sendiri. Volume Docker memungkinkan *container* untuk berbagi data dengan *host*, *container* lain, atau dengan layanan penyimpanan data yang disediakan oleh penyedia layanan *cloud*.

    Dalam Docker, setiap *container* memiliki *file system* sendiri yang terisolasi dari *host* dan *container* lainnya. Dalam beberapa kasus, data yang diperlukan oleh *container* perlu disimpan secara persisten, sehingga tidak hilang saat *container* dihapus atau dihentikan. Docker Volume memungkinkan untuk membuat penyimpanan data persisten untuk *container* tersebut, dan memungkinkan *container* lain atau *host* untuk mengakses data tersebut.

    Berikut adalah contoh menerapkan Docker Volume pada konfigurasi Docker Compose `docker-compose.yml` sebelumnya.

    ```YAML
    version: '3'
    services:
    backend:
        build: ./backend
        ports:
        - "8080:8080"
        environment:
        DB_HOST: database
    frontend:
        build: ./frontend
        ports:
        - "3000:3000"
        environment:
        REACT_APP_BACKEND_URL: http://backend:8080
    database:
        image: postgres
        volumes:
        - ./data:/var/lib/postgresql/data
        environment:
        POSTGRES_USER: myuser
        POSTGRES_PASSWORD: mypassword
        POSTGRES_DB: mydb
    ```

    Dengan menambahkan konfigurasi `volumes` pada Docker Compose, maka data dari *database* akan tersimpan dan tidak hilang meskipun *container* dimatikan.

- ##### **Bind Mount**

    Bind Mount adalah tipe *mount* di Docker yang memungkinkan suatu *file* atau direktori di *host* *machine* digunakan oleh *container* Docker. Dalam Bind Mount, *container* dan *host* *machine* menggunakan *file* *system* yang sama, sehingga jika suatu *file* diubah dalam *container*, perubahannya juga akan terlihat di *host* *machine*, dan sebaliknya.

    Dalam penggunaannya, Bind Mount dapat digunakan untuk mengakses *file*-*file* atau direktori dari *host* *machine* dan menggunakan data tersebut dalam *container*. Misalnya, jika ingin menjalankan sebuah aplikasi *web* di dalam *container*, tetapi ingin menggunakan *file* konfigurasi yang ada di *host* *machine*, maka dapat dilakukan Bind Mount dari direktori yang berisi *file* konfigurasi tersebut ke dalam direktori di dalam *container*.

    Berikut adalah contoh implementasi dari Bind Mount.

    ```sh
    docker run -d \
    -it \
    --name bind-container \
    --mount type=bind,source="$(pwd)"/target,target=/app \
    node:16-alpine
    ``` 
    ![Hasil implementasi bind mount](img/docker-bind-mount-cli.png)

    Kode di atas merupakan perintah untuk menjalankan sebuah *container* dari *image* `node:16-alpine`, dengan beberapa opsi seperti berikut.

    | Opsi          | Keterangan                                                  |
    | ------------- | ------------------------------------------------------------ |
    | `-d`          | menjalankan *container* di *background* (*detach* *mode*).          |
    | `-it`         | mengalihkan interaksi ke terminal *container* (*interactive* *mode* dan *attach* *to* *container*). |
    | `--name`      | memberikan nama `bind-container` *container*.                  |
    | `--mount`     | menentukan opsi *mount* pada *container*. Pada kasus ini, menggunakan `opsi type=bind` untuk membuat Bind Mount, di mana direktori lokal pada host `$(pwd)/target` di-*mount* pada direktori `/app` pada *container*. |
    | `node:16-alpine` | *image* yang akan digunakan untuk menjalankan *container*.        |

    Untuk memastikan proses Bind Mount berjalan dengan baik, maka dapat menggunakan perintah `docker inspect nama_container` dan lihat *output*-nya pada bagian `Mounts`.

    ```sh
    docker inspect bind-container
    ```

    ![Output dari bind mount di Docker container](img/hasil-bind-mount.png)

    Untuk melakukan verifikasi kesesuaian antara isi *file* di *directory* *host* dengan *directory* *target*, maka dapat dilakukan dengan masuk ke mode *shell* dari *container* itu sendiri.
    
    ![Verifikasi hasil bind mount](img/verifikasi-bind-mount.png)

    Keuntungan dari Bind Mount adalah fleksibilitasnya yang tinggi, karena memungkinkan akses langsung ke *file* di *host* *machine*. Namun, kekurangannya adalah tidak dapat digunakan di seluruh *platform*, dan konfigurasi harus dilakukan secara manual setiap kali *container* dijalankan atau dihapus.

- ##### **Tmpfs Mount**

    Tmpfs Mount adalah salah satu jenis *mount* pada Docker yang memungkinkan untuk menyimpan data secara sementara di dalam *memory* RAM pada *host*. Dengan menggunakan Tmpfs Mount, data akan cepat diakses karena langsung disimpan di dalam *memory* RAM. Namun, data tersebut tidak akan persisten karena hanya disimpan di dalam *memory* dan tidak disimpan ke dalam *disk* fisik.

    Cara penggunaannya, yaitu dengan menambahkan opsi `--mount` pada saat menjalankan *container*, lalu menentukan tipe *mount* tmpfs dan ukuran *memory* yang akan digunakan untuk menyimpan data. Berikut contoh perintah untuk menggunakan Tmpfs Mount dengan ukuran *memory* 100 MB pada *container*.

    ```sh
    docker run -d \
    -it \
    --name tmpfs-container \
    --mount type=tmpfs,destination=/app,tmpfs-size=100M \
    node:16-alpine
    ```

    ![Implementasi tmpfs mount](img/docker-tmpfs-mount.png)

    | Opsi | Deskripsi |
    | --- | --- |
    | `-d` | Menjalankan *container* di *background* (*detach* *mode*). |
    | `-it` | Mengalihkan interaksi ke terminal *container* (*interactive* *mode* dan *attach* *to* *container*). |
    | `--name` | Memberikan nama `bind-container` *container*. |
    | `--mount` | Digunakan untuk memasang sebuah volume pada *container*. `type=tmpfs` menentukan jenis volume yang akan digunakan, yaitu tmpfs volume. `destination=/app` menunjukkan direktori tujuan dari volume ini, yaitu `/app`. |
    | `tmpfs-size=100M` | Digunakan untuk menentukan ukuran maksimum volume tmpfs dalam container, dalam hal ini sebesar 100 *megabyte*. |
    | `node:16-alpine` | *Image* yang akan digunakan untuk menjalankan *container*. |

    Untuk memastikan proses Tmpfs Mount berjalan dengan baik, maka dapat menggunakan perintah sebagai berikut.

    ![Hasil implementasi dari tmpfs mount](img/hasil-tmpfs-mount.png)

</br>

#### **Mengelola Docker Volume**

Terdapat beberapa langkah dalam menggunakan Docker Volume sebagai berikut.
- ##### **Membuat Docker Volume**

  Untuk membuat Docker Volume, maka dapat menggunakan `perintah docker volume create`. Contoh sintaks perintahnya adalah `docker volume create <nama_volume>` sebagai berikut.

  ![Membuat docker volume](img/docker-create-volume.png)


- ##### **Melihat Daftar Docker Volume**

  Untuk melihat daftar Docker Volume yang sudah dibuat, gunakan perintah `docker volume ls`. Contoh sintaks perintahnya adalah `docker volume ls` sebagai berikut.

  ![Melihat daftar docker volume](img/docker-ls-volume.png)

- ##### **Menggunakan Docker Volume pada Container**

  Untuk menggunakan Docker Volume pada *container*, maka gunakan opsi `-v` pada perintah `docker run`. Contoh sintaks perintahnya adalah `docker run -v <nama_volume>:<lokasi_mount_container> <image_name>` sebagai berikut.

  ![Menggunakan docker volume pada container](img/docker-start-container-volume.png)

- ##### **Meng-Inspect Docker Volume**
  
  Untuk melihat detail dari Docker Volume yang sudah dibuat, maka dapat menggunakan perintah `docker volume inspect`. Contoh sintaks perintahnya adalah `docker volume inspect <nama_volume>` sebagai berikut.

  ![Inspect docker volume](img/docker-inspect-volume.png)

- ##### **Meng-Copy Data ke dalam Docker Volume**

  Untuk dapat meng-*copy* data ke dalam Docker Volume, maka dapat dengan menggunakan perintah `docker cp`. Contoh sintaks perintahnya adalah `docker cp <nama_file> <nama_container>:<lokasi_mount_container>` sebagai berikut.

  ![Copy data ke dalam docker volume](img/docker-copy-volume.png)

  Dimana `<nama_file>` adalah nama *file* yang akan di-copy, `<nama_container>` adalah nama dari *container* yang akan di-*copy* *file* tersebut, dan `<lokasi_mount_container>` adalah lokasi di dalam *container* dimana *file* tersebut akan di-*copy*.

- ##### **Menghapus Data dalam Docker Volume**

  Untuk menghapus data dalam Docker Volume, cukup hapus *file* yang berada di dalam volume tersebut dapat menggunakan perintah `docker exec` untuk menjalankan perintah di dalam *container*. Contoh sintaks perintahnya adalah `docker exec <nama_container> rm <lokasi_file_di_volume>` sebagai berikut.

  ![Menghapus data dalam docker volume](img/docker-remove-data-volume.png)
  
  Dimana `<nama_container>` adalah nama dari *container* yang akan dihapus *file* tersebut, dan `<lokasi_file_di_volume>` adalah lokasi *file* yang akan dihapus dalam volume tersebut.

- ##### **Menghapus Docker Volume**

  Untuk menghapus Docker Volume, gunakan perintah `docker volume rm`. Contoh sintaks perintahnya adalah `docker volume rm <nama_volume>` sebagai berikut.

  ![Menghapus volume](img/docker-remove-volume.png)

Itulah beberapa cara untuk mengelola Docker Volume seperti membuat, melihat daftar, menghapus, menggunakan, inspect, copy data ke dalam, dan menghapus data dalam Docker Volume. Dengan Docker Volume, pengelolaan data pada *container* dapat dilakukan dengan lebih mudah dan efisien.

</br>
</br>

### **Docker Networking**

![Docker Networking](img/docker-compose.jpg)

#### **Pengertian Docker Networking**

Dalam pengembangan dan implementasi aplikasi modern yang kompleks, penggunaan teknologi *container* seperti Docker telah menjadi semakin umum. Docker memungkinkan para *developer* untuk memisahkan aplikasi dari lingkungan *host* dan infrastruktur di mana mereka dijalankan, sehingga memungkinkan lebih banyak fleksibilitas dan portabilitas.

Namun, ketika menjalankan beberapa *container* pada satu *host*, perlu untuk memungkinkan *container* untuk berkomunikasi satu sama lain, dan juga terhubung ke sumber daya di luar *container* seperti jaringan *host* atau jaringan eksternal. Di sinilah, Docker Networking berperan.

Docker Networking adalah cara untuk menghubungkan antara *container* Docker yang berbeda sehingga mereka dapat berkomunikasi satu sama lain. Saat menjalankan beberapa *container* di Docker, setiap *container* memiliki alamat IP yang berbeda dan terisolasi satu sama lain. Oleh karena itu, Docker Networking memungkinkan *container* Docker untuk terhubung ke jaringan yang sama atau *subnet* dan berkomunikasi satu sama lain, serta dapat terhubung dengan *host* mesin fisik atau jaringan eksternal.

Tanpa Docker Networking, setiap *container* berjalan pada *subnet* yang terisolasi, yang berarti mereka tidak dapat berkomunikasi satu sama lain atau dengan sumber daya di luar *subnet* tersebut. Dengan menggunakan Docker Networking, *container* Docker dapat terhubung ke jaringan yang sama atau *subnet*, dan dapat berkomunikasi dengan *container* lain dan sumber daya di luar *container*, seperti *database* atau layanan *web* yang terpisah.

Selain itu, Docker Networking memungkinkan pengguna untuk membuat lingkungan jaringan yang aman dan terisolasi di mana setiap *container* dapat berinteraksi satu sama lain, tetapi tetap terpisah dari lingkungan jaringan *host*. Ini memungkinkan para *developer* untuk menciptakan aplikasi yang lebih aman dan lebih mudah untuk dikelola, serta memfasilitasi pengembangan dan implementasi skala besar.

Oleh karena itu, Docker Networking adalah komponen kunci dalam penggunaan Docker Container. Dengan memungkinkan *container* untuk berkomunikasi satu sama lain dan terhubung ke sumber daya di luar *container*, Docker Networking memungkinkan para pengembang untuk menciptakan aplikasi yang lebih fleksibel, portabel, aman, dan mudah dikelola.

</br>

#### **Konsep Dasar di Docker Networking**

- ##### **Docker Network Driver**

    Docker Network Driver adalah komponen utama yang memungkinkan *container* Docker terhubung ke jaringan. Network Driver adalah *plug-in* yang di-*instal* pada *host* Docker dan mengatur bagaimana *container* terhubung ke jaringan.

    Docker menyediakan beberapa jenis Network Driver yang berbeda, masing-masing dengan karakteristik yang unik, dan memungkinkan pengguna untuk memilih Network Driver yang tepat untuk kebutuhan aplikasi mereka. Berikut adalah beberapa jenis Network Driver yang tersedia di Docker.

    - `bridge network`, 
    - `host network`, 
    - `overlay network`,
    - `ipvlan`,
    - `macvlan network`, dan
    - `network plugins`. 

    Detail pembahasan akan dijelaskan pada sub materi [Jenis-Jenis Docker Network Driver](#https://github.com/arsitektur-jaringan-komputer/Pelatihan-Docker/tree/pd23/3.%20Docker%20Service%20Lanjutan#jenis-jenis-docker-network-driver).

    Dengan pemilihan Network Driver yang tepat, pengguna dapat memaksimalkan fleksibilitas, portabilitas, dan keamanan aplikasi di dalam *container*.

- ##### **IP Address Management**

    IP Address Management (IPAM) adalah proses manajemen alamat IP di dalam jaringan Docker. Docker memungkinkan pengguna untuk mengontrol pengaturan IP pada setiap jaringan yang dibuat, termasuk pemberian alamat IP secara otomatis atau manual. 
    
    Penjelasan detail mengenail IP Address dapat dilihat pada [Jarkom Modul 4](#https://github.com/arsitektur-jaringan-komputer/Modul-Jarkom/tree/master/Modul-4).

    Dalam Docker, setiap *container* dapat memiliki alamat IP unik pada jaringan tertentu. IPAM memastikan bahwa alamat IP yang diberikan pada *container* tidak bertabrakan dengan alamat IP yang sudah ada di jaringan, sehingga mencegah masalah komunikasi dan konflik alamat IP.

    Untuk melihat alamat IP yang digunakan oleh sebuah Docker *container*, maka dapat menggunakan perintah `docker container inspect <container_id>`. Informasi seputar IP Address biasanya terdapat di `NetworkSettings`.

    ![Network setting di docker container](img/docker-network-setting.png)

    Dalam Docker, IPAM menawarkan beberapa mode pengaturan alamat IP, antara lain sebagai berikut.

    - **`Default`**: Mode ini memungkinkan Docker secara otomatis memberikan alamat IP untuk setiap *container* dalam jaringan. Docker akan membuat subnet baru untuk setiap jaringan dan mengalokasikan alamat IP dari *subnet* tersebut.

    - **`User-defined`**: Mode ini memungkinkan pengguna untuk secara manual menentukan *subnet* dan rentang alamat IP yang akan digunakan pada jaringan tertentu. Pengguna dapat menentukan rentang IP yang tersedia dan menentukan alamat IP yang akan digunakan pada setiap *container*.

    - **`External`**: Mode ini memungkinkan Docker untuk terhubung ke IPAM pihak ketiga seperti DHCP *server* atau sistem manajemen alamat IP lainnya untuk mengelola alamat IP pada jaringan.

    Pengaturan IPAM pada Docker memungkinkan pengguna untuk lebih mudah mengelola alamat IP pada jaringan Docker dan mencegah masalah komunikasi dan konflik alamat IP. Dalam lingkungan yang lebih kompleks, IPAM dapat membantu meningkatkan efisiensi dan skalabilitas jaringan Docker.

- ##### **DNS Name Resolution**

    DNS Name Resolution adalah proses mengubah nama domain menjadi alamat IP yang terkait dengannya. Ketika seseorang mengakses sebuah *website*, misalnya, *browser* harus mengetahui alamat IP dari *server* tempat *website* tersebut di-*hosting*. Namun, manusia tentunya lebih mudah mengingat nama domain daripada alamat IP yang panjang dan sulit diingat.

    ![Cara DNS name resolution bekerja](img/dns-name-resolution.png)

    Dalam DNS Name Resolution, nama domain akan dicocokkan dengan alamat IP yang terkait dengannya dalam *database* DNS (Domain Name System). Database DNS adalah sistem terdistribusi yang memungkinkan pengguna untuk mencari informasi tentang nama domain dan mengembalikan alamat IP yang terkait dengan domain tersebut. Dalam praktiknya, *server* DNS biasanya memegang informasi tentang beberapa domain dan mungkin perlu meminta informasi dari *server* DNS lain jika informasi yang diminta tidak tersedia pada *server* tersebut. 
    
    Pembahasan lebih lanjut tentang DNS name resolution dapat dilihat di [Jarkom Modul DNS](#https://github.com/arsitektur-jaringan-komputer/Modul-Jarkom/tree/master/Modul-2/DNS).

    DNS Name Resolution sangat penting dalam internet, karena tanpa itu, pengguna akan kesulitan mengakses situs *web* dan layanan *online*. Dalam Docker, DNS Name Resolution memungkinkan *container* untuk berkomunikasi dengan menggunakan nama yang mudah diingat daripada alamat IP yang sulit diingat.

- ##### **Port Mapping**

    Port Mapping adalah proses untuk menghubungkan antara *port* yang digunakan oleh sebuah aplikasi atau layanan dalam *container* dengan *port* yang tersedia pada *host* atau mesin tempat *container* dijalankan. Dalam Docker, Port Mapping memungkinkan *container* untuk menerima permintaan dari luar melalui *port* yang terbuka pada *host* atau mesin tempat *container* berjalan.

    Misalnya, jika sebuah *container* menjalankan sebuah layanan *web* pada *port* 8080, namun *port* 8080 tidak terbuka pada *host*, maka layanan tersebut tidak dapat diakses dari luar. Namun, dengan melakukan Port Mapping dapat menghubungkan *port* 8080 pada *container* dengan *port* yang tersedia pada *host*, seperti *port* 8000. Dengan demikian, layanan *web* pada *container* dapat diakses melalui *port* 8000 pada *host*.

    Port Mapping dapat dilakukan pada saat menjalankan *container* dengan menggunakan perintah `docker run`. Untuk melakukan Port Mapping dapat menentukan *port* pada *host* dengan opsi `-p` dan *port* pada *container* dengan format `port_container`. Contohnya, jika ingin menghubungkan *port* 8080 pada *container* dengan *port* 8000 pada *host* dapat menjalankan perintah berikut ini.

    ```sh
    docker run -p <port_host>:<port_container> <nama_container>
    ```

    Atau, bisa dengan menambahkan konfigurasi Port Mapping di konfigurasi Docker Compose sebelumnya.

</br>

#### **Jenis-Jenis Docker Network Driver**

- ##### **Bridge Network**

    Bridge Network merupakan salah satu jenis *network* yang ada pada Docker. Bridge Network digunakan untuk menghubungkan *container* dengan *container* lainnya pada satu *host*. Dalam Bridge Network, setiap *container* memiliki alamat IP yang unik dan terisolasi dalam *network* yang sama. Dalam jaringan *bridge*, setiap *container* dapat berkomunikasi dengan *container* lainnya melalui alamat IP yang diberikan oleh Docker.

    Bridge Network pada Docker merupakan default *network* yang dibuat oleh Docker ketika Docker di-*install* pada sebuah *host*. Setiap *container* yang dibuat tanpa menyebutkan *network* yang digunakan, secara otomatis akan terhubung dengan jaringan *bridge* yang telah dibuat. Setiap jaringan *bridge* yang dibuat akan memiliki sebuah *gateway* yang bertindak sebagai titik masuk ke jaringan dari *host*.

    Dalam Bridge Network pada Docker, *container* dapat diakses menggunakan alamat IP dari jaringan yang sama, atau menggunakan nama *container* yang diberikan pada saat pembuatan *container*. *Container* juga dapat dihubungkan dengan *network* lainnya melalui fitur Bridge Network yang disediakan oleh Docker. Dalam hal ini, sebuah *container* dapat terhubung dengan beberapa *network* secara bersamaan untuk memungkinkan interaksi dengan *container* lain yang berada pada jaringan yang berbeda.

    Bridge Network pada Docker dapat diatur secara manual dengan cara membuat jaringan baru atau mengatur konfigurasi dari jaringan yang sudah ada. Untuk membuat Bridge Network di Docker dapat menggunakan perintah berikut. 
    
    `docker network create <nama_network>` 
    
    Atau dengan menulis *driver network* secara eksplisit seperti berikut.
    
    `docker network create --driver bridge <nama_network>`

    ![Membuat docker Bridge Network](img/docker-bridge-network.png)

    Untuk memasang Bridge Network ke Docker *container* baru dapat menggunakan perintah `docker run --name <nama_container> --network <nama_network>` atau ke *container* yang sudah ada dengan perintah `docker network connect <nama_network> <nama_container>`.

    ![Memasang docker Bridge Network ke Docker container](img/docker-bridge-network-setting.png)

    Setelah menambahkan *container* ke dalam Docker Bridge Network, *container* tersebut dapat diakses melalui alamat IP di dalam jaringan tersebut. Selain itu juga dapat menjalankan *container* baru dan menetapkannya ke dalam *network* yang sama untuk memungkinkan *container* tersebut berkomunikasi dengan *container* yang telah ada di dalam *network*.

- ##### **Host Network**

    Selain Bridge Network, Docker juga mendukung Host Network. Host Network memungkinkan *container* untuk menggunakan *network* *interface* yang sama dengan *host*. Dengan Host Network, *container* tidak dibatasi oleh isolasi *network* yang diberikan oleh Docker, sehingga *container* dapat langsung mengakses *network* *host*.

    Perbedaan utama antara Host Network dan Bridge Network adalah pada tingkat isolasi *network*. Dalam Host Network, *container* berbagi alamat IP dengan *host*, sehingga tidak ada isolasi *network* antara *container* dan *host*. Sementara itu, pada Bridge Network, Docker membuat *network* virtual yang terpisah dari *network* *host*. Dalam Bridge Network, *container* berada di dalam *network* virtual yang terisolasi, sehingga tidak dapat langsung mengakses *network* *host*.

    Keuntungan menggunakan Host Network adalah performa yang lebih baik karena *container* tidak melalui jaringan virtual yang terisolasi. Namun, kelemahan dari Host Network adalah kurangnya isolasi yang menyebabkan potensi masalah keamanan dan tidak fleksibel dalam hal Port Mapping.

    Untuk membuat Host Network di Docker dapat dilakukan dengan perintah `docker network create --driver=host <nama-network>` dengan memberikan jenis *driver* secara eksplisit. Akan tetapi perlu diperhatikan kalau Host Network hanya diperbolehkan satu karena Host Network memberikan akses langsung ke semua *port* dan *service* pada *host*, sehingga dapat menimbulkan masalah keamanan jika lebih dari satu *container* menggunakan Host Network pada saat yang bersamaan. 
    
    Selain itu, karena Host Network tidak memiliki isolasi seperti yang dimiliki oleh Bridge Network, maka ketika dua *container* menggunakan Host Network yang sama, mereka akan saling bersaing untuk menggunakan *port* yang sama, yang dapat menyebabkan konflik dan kegagalan dalam menjalankan *container*. Oleh karena itu, disarankan untuk menggunakan Host Network dengan hati-hati dan hanya jika memang benar-benar diperlukan.

    Host Network paling tepat digunakan ketika performa jaringan menjadi faktor kritis dan isolasi *network* tidak diperlukan. Contohnya adalah ketika menjalankan aplikasi yang memerlukan koneksi jaringan yang sangat cepat dan membutuhkan akses ke *port* *host* yang spesifik, seperti aplikasi *game* *online* atau *streaming* media. Selain itu, Host Network juga cocok digunakan untuk aplikasi yang sudah teroptimasi untuk dijalankan pada lingkungan *host* dan tidak memerlukan isolasi *network*. Misalnya, aplikasi yang hanya digunakan untuk pengujian atau aplikasi yang sifatnya sementara.

- ##### **Overlay Network**

    Overlay Network di Docker adalah jenis jaringan yang memungkinkan beberapa *host* Docker terhubung dan berkomunikasi satu sama lain melalui jaringan yang sama. Overlay Network menggunakan teknologi Virtual Extensible LAN (VXLAN) untuk memungkinkan *container* di mesin Docker yang berbeda untuk berkomunikasi satu sama lain seakan-akan mereka berada dalam satu jaringan lokal.

    Overlay Network sangat berguna dalam skenario di mana perlu menjalankan aplikasi yang terdiri dari banyak *container* pada beberapa mesin Docker yang berbeda, seperti pada *cluster* atau lingkungan produksi yang terdistribusi. Dalam kasus seperti itu, Overlay Network memungkinkan *container* pada mesin yang berbeda untuk berkomunikasi dengan mudah satu sama lain, tanpa perlu memperhatikan topologi jaringan fisik di belakangnya. Karena Overlay Network digunakan pada sebuah *cluster* maka implementasi dari Overlay Network akan dicontohkan pada modul **DOCKER SWARM**.

- ##### **IPvlan Network**

    IPvlan Network merupakan salah satu tipe *driver* *network* di Docker yang memungkinkan *container* Docker untuk memiliki satu atau beberapa *interface* virtual yang terhubung ke jaringan *host*. *Interface* virtual ini akan terhubung langsung ke *interface* fisik *host*, sehingga dapat digunakan untuk melakukan komunikasi langsung dengan jaringan eksternal.

    Salah satu kelebihan dari IPvlan Network adalah kemampuan untuk mengoptimalkan kinerja aplikasi dan mengurangi latensi dengan menghindari *overhead* dari proses *routing* yang terjadi pada *driver* *network* lain seperti Bridge Network. Selain itu, IPvlan Network juga mendukung kemampuan untuk melakukan isolasi jaringan dengan menggunakan VLAN ID.

    Namun, terdapat juga beberapa kekurangan dari penggunaan IPvlan Network, antara lain sebagai berikut.
    - Konfigurasi yang rumit dan memerlukan pengetahuan yang cukup untuk dapat menggunakannya dengan efektif
    - Tidak mendukung kemampuan Port Mapping secara langsung, sehingga diperlukan konfigurasi tambahan untuk dapat melakukan Port Mapping
    - Memerlukan kernel yang mendukung fitur IPvlan untuk dapat digunakan.

    Oleh karena itu, sebaiknya melakukan evaluasi terlebih dahulu sebelum memutuskan untuk menggunakan IPvlan Network di Docker.

- ##### **MACvlan Network**

    MACvlan Network adalah jenis jaringan Docker yang memungkinkan *container* Docker terhubung ke jaringan seperti virtual *interface* yang terpisah dan dapat memiliki alamat MAC yang berbeda. Dalam konfigurasi ini, setiap *container* memiliki alamat MAC yang unik, yang memungkinkan untuk terhubung ke jaringan fisik dengan alamat MAC yang sama.

    MACvlan Network sangat berguna ketika *container* Docker harus terhubung ke jaringan fisik yang sama dengan *host* Docker. Sebagai contoh, ketika *container* Docker harus terhubung ke jaringan yang memiliki protokol *broadcast* atau *multicast*, seperti protokol DHCP, NetBIOS, atau mDNS.

    Namun, sama seperti dengan IPvlan Network, konfigurasi MACvlan Network memerlukan beberapa pengetahuan dan pemahaman tentang jaringan. Selain itu, MACvlan Network memiliki beberapa batasan, seperti tidak dapat melakukan komunikasi antara *container* dalam jaringan yang sama, dan tidak dapat melakukan Port Mapping ke *host*.

    Oleh karena itu, sebaiknya melakukan evaluasi terlebih dahulu sebelum memutuskan untuk menggunakan MACvlan Network di Docker.

- ##### **Network Plugins**

    Docker Network Plugin adalah mekanisme yang memungkinkan pengguna untuk menggunakan fitur jaringan yang tidak disediakan oleh *driver* bawaan Docker. *Plugin* ini memungkinkan integrasi ke dalam sistem jaringan yang ada, seperti jaringan SDN atau jaringan virtual yang telah disiapkan oleh penyedia *cloud*. Contoh *plugin* jaringan yang tersedia untuk Docker, antara lain Flannel, Calico, Weave Net, Cilium, dan lain-lain.

    Kelebihan dari menggunakan Docker Network Plugin sendiri adalah sebagai berikut.

    - **Kompatibilitas**: *Plugin* memungkinkan pengguna untuk menggunakan jaringan yang telah disiapkan oleh penyedia *cloud*, sehingga memungkinkan pengguna untuk mengintegrasikan Docker ke dalam lingkungan *cloud* yang lebih besar.

    - **Skalabilitas**: *Plugin* memungkinkan pengguna untuk memperluas kapasitas jaringan Docker ke dalam sistem jaringan yang lebih besar, sehingga memungkinkan pengguna untuk mengelola jaringan Docker dengan lebih efisien.

    Namun, kekurangan dari menggunakan Docker Network Plugin sendiri adalah sebagai berikut.

    - **Kompleksitas**: Penggunaan *plugin* memerlukan pengetahuan yang lebih dalam tentang jaringan dan konfigurasi Docker, sehingga memerlukan waktu dan usaha yang lebih banyak untuk mengonfigurasi dan mengelola jaringan Docker.

    - **Ketergantungan**: Penggunaan *plugin* memerlukan ketergantungan pada *plugin* yang di-*instal*, sehingga jika *plugin* tidak tersedia atau mengalami masalah, maka jaringan Docker tidak dapat digunakan dengan efektif.

</br>

#### **Mengelola Docker Networking di Docker Compose**

Masih ingatkah dengan konfigurasi Docker Compose sebelumnya? Pada konfigurasi sebelumnya, masih belum mengimplementasikan Docker Networking. Pada sub materi ini, akan ditambahkan konfigurasi untuk mengatur Docker Networking menggunakan *network* *driver* `bridge`.

```sh
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - database
    environment:
      DB_HOST: database
    networks:
      - mynetwork
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_BACKEND_URL: http://backend:8080
  database:
    image: postgres
    volumes:
      - ./data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
    networks:
      - mynetwork
  networks:
    mynetwork:
      driver: bridge
```

Pada konfigurasi Docker Compose di atas, telah ditambahkan sebuah *network* dengan nama `mynetwork` dengan *driver* `bridge`. Selain itu, setiap *service* (*backend*, *frontend*, dan *database*) juga ditambahkan ke dalam *network* tersebut.

Penambahan *network* ini dilakukan agar ketiga *service* yang ada di dalam Docker Compose dapat saling berkomunikasi melalui *network* yang sama. Dengan adanya *network* ini, antar *service* dapat berkomunikasi dengan menggunakan nama *service* sebagai *hostname*, misalnya `database` untuk menghubungi *service* *database* dari *service backend*.

Alasan penambahan *network* ini adalah untuk mempermudah pengaturan komunikasi antar *service* dan menghindari masalah yang dapat timbul akibat penggunaan alamat IP yang berubah-ubah setiap kali melakukan start ulang terhadap *container*. Selain itu, dengan menggunakan *network* ini juga dapat dengan mudah menambahkan *service* baru ke dalam komposisi yang sudah ada tanpa harus memodifikasi ulang konfigurasi setiap *service*.

</div>

</br>
</br>

## **Sumber Referensi**
- https://docs.docker.com/compose/compose-file/
- https://docs.docker.com/storage/
- https://docs.docker.com/storage/volumes/
- https://docs.docker.com/network/network-tutorial-overlay/
- https://raidboxes.io/en/blog/webdesign-development/domain-name-system-dns/
