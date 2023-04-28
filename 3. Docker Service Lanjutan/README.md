# **Docker Service Lanjutan**

<div style="text-align: justify"> 
Di materi sebelumnya, telah dipelajari beberapa *command* dari Docker yang penting untuk diketahui. Sebelum lanjut pada materi yang berfokus pada implementasi, terlebih dahulu masuk pada materi ketiga berikut ini.

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
      - [Jenis-Jenis Docker Mount](#jenis-jenis-docker-mount)
      - [**Mengelola Docker Volume**](#mengelola-docker-volume)
    - [**Docker Networking**](#docker-networking)
      - [**Pengertian Docker Networking**](#pengertian-docker-networking)
      - [**Konsep Dasar di Docker Networking**](#konsep-dasar-di-docker-networking)
        - [**Docker Network Driver**](#docker-network-driver)
        - [**IP Address Management**](#ip-address-management)
        - [**DNS Name Resolution**](#dns-name-resolution)
        - [**Port mapping**](#port-mapping)
      - [**Jenis-Jenis Docker Network Driver**](#jenis-jenis-docker-network-driver)
        - [**Bridge Network**](#bridge-network)
        - [**Host Network**](#host-network)
        - [**Overlay Network**](#overlay-network)
        - [IPvlan Network](#ipvlan-network)
        - [**MACvlan Network**](#macvlan-network)
        - [**Network Plugins**](#network-plugins)
      - [**Mengelola Docker Networking di Docker Compose**](#mengelola-docker-networking-di-docker-compose)
  - [**Sumber Referensi**](#sumber-referensi)

</br>

## **Glosarium**

Seperti materi sebelumnya, selalulah untuk *keep in mind* beberapa istilah berikut ini.

| Istilah | Arti | 
| ------- | -----| 
| Container | -----| 
| Image | -----| 

</br>

## **Materi**

Materi ketiga ini akan dibagi menjadi tiga topik bahasan. Pertama, tentang Docker Compose, Docker Data Management, dan juga Docker Networking. 

<br>

### **Docker Compose**

![Docker compose](img/docker-compose.jpg)

#### **Pengertian Docker Compose**

Docker Compose adalah sebuah alat atau *tool* untuk mengelola dan menjalankan aplikasi yang terdiri dari satu atau beberapa *container*. Docker Compose memungkinkan untuk mendefinisikan, mengonfigurasi, dan menjalankan beberapa *container* Docker sekaligus dengan menggunakan *file* konfigurasi YAML yang sederhana.

![Docker compose 2](img/docker-compose-file-yaml.jpg)

Dengan Docker Compose juga dapat menentukan image Docker untuk setiap container, mengatur pengaturan jaringan, menentukan volume yang dibutuhkan, dan melakukan konfigurasi lainnya dalam satu file konfigurasi. Selain itu, Docker Compose juga memudahkan proses pengaturan dan penyebaran aplikasi pada lingkungan produksi atau development yang berbeda dengan cara yang konsisten.

Dalam pengembangan perangkat lunak modern, aplikasi terdiri dari banyak komponen yang dapat dijalankan secara terpisah dan berinteraksi satu sama lain melalui jaringan. Dalam hal ini, Docker Compose menjadi alat yang sangat berguna untuk mengatur aplikasi tersebut dengan menggunakan container Docker, sehingga memudahkan proses pengembangan, pengujian, dan penyebaran aplikasi yang kompleks.

<!-- Masih bingung ya? Jeka coba analogikan Docker Compose dengan dapur di rumah. 

![Docker compose 3](img/docker-compose-dapur.jpg)

Bayangkan dapur sebagai lingkungan tempat kita memasak dan mengolah makanan, sedangkan setiap komponen dalam aplikasi seperti bahan makanan yang kita olah. Docker Compose bisa kita ibaratkan sebagai resep atau panduan yang memberitahu kita bagaimana cara memasak dan mengolah setiap bahan makanan agar menjadi hidangan yang lezat dan siap disajikan. Kita bisa menentukan bahan apa saja yang diperlukan, cara memasaknya, dan bagaimana cara menyajikannya dalam satu resep yang mudah diikuti. Sama seperti Docker Compose, kita juga bisa menentukan image Docker untuk setiap container, mengatur pengaturan jaringan, menentukan volume yang dibutuhkan, dan melakukan konfigurasi lainnya dalam satu *file* konfigurasi yang sederhana. Dengan begitu, kita bisa mengatur dan menjalankan aplikasi yang kompleks dengan mudah dan konsisten, sebagaimana kita mengatur dan memasak hidangan di dapur dengan resep yang sudah kita siapkan. -->

Selanjutnya, kita akan melihat contoh implementasi dari Docker Compose itu sendiri!

</br>

#### **Contoh Implementasi Docker Compose**

Sebagai contoh dalam bahasan implementasi ini, terdapat konfigurasi Docker Compose sebagai berikut.


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

- **`version: '3'`**: Versi dari Docker Compose yang digunakan dalam konfigurasi tersebut.
- **`services`**: Komponen utama yang mendefinisikan *service* yang akan dijalankan. Dalam konfigurasi diatas, terdapat 3 *service*, yaitu *frontend*, *backend*, dan *database*.
- **`backend`**: Nama *service* yang akan dijalankan.
- **`build: ./backend`**: Menentukan direktori dimana Docker akan melakukan *build image* untuk *service backend.*
- **`ports: - "8080:8080"`**: Mendefinisikan *port* *mapping*, dimana `port 8080` pada *container* akan di-*forward* ke `port 8080` pada *host*.
- **`environment: DB_HOST: database`**: Mendefinisikan *environment* *variable* pada *service* *backend*, dimana `DB_HOST` akan di-*set* sebagai *database*.
- **`frontend`**: Nama *service* yang akan dijalankan.
- **`build: ./frontend`**: Menentukan direktori dimana Docker akan melakukan *build* *image* untuk *service* *frontend*.
- **`ports: - "3000:3000"`**: Mendefinisikan *port* *mapping*, dimana `port 3000` pada *container* akan di-*forward* ke `port 3000` pada *host*.
- **`environment: REACT_APP_BACKEND_URL: http://backend:8080`**: Mendefinisikan *environment* *variable* pada *service* *frontend*, dimana `REACT_APP_BACKEND_URL` akan di-*set* sebagai `http://backend:8080`.
- **`database`**: Nama *service* yang akan dijalankan.
- **`image: postgres`**: Mendefinisikan *image* yang akan digunakan untuk *service* *database*.
- **`environment: POSTGRES_USER: myuser POSTGRES_PASSWORD: mypassword POSTGRES_DB: mydb`**: Mendefinisikan *environment variable* pada *service database*, dimana `POSTGRES_USER` akan di-*set* sebagai `myuser`, `POSTGRES_PASSWORD` akan di-*set* sebagai `mypassword`, dan `POSTGRES_DB` akan di-*set* sebagai *mydb*.


Untuk praktiknya akan dicontohkan pada [**Modul 4**](https://github.com/arsitektur-jaringan-komputer/Pelatihan-Docker/tree/pd23/4.%20Membangun%20Aplikasi%20di%20Docker) sebagai materi selanjutnya. 

</br>

#### **Depend On Docker Compose**

Pada konfigurasi Docker Compose, terdapat fitur **`depends_on`** yang berguna untuk menentukan urutan dalam membangun dan menjalankan container. Hal ini dibutuhkan ketika terdapat *container* yang membutuhkan layanan dari *container* lain yang harus sudah terlebih dahulu dibangun dan dijalankan. Contohnya pada konfigurasi Docekr compose sebelumnya, *container* backend membutuhkan layanan dari database untuk terkoneksi sehingga perlu menunggu *container* database terlebih dahulu dibangun dan dijalankan. 

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

Dari konfigurasi di atas, ditambahkan fitur **`depends_on`** pada *service* *backend* untuk memastikan *container* tersebut tidak akan dijalankan sebelum *container* *database* siap digunakan.

#### **Inheritance di Docker Compose**

Inheritance (pewarisan) adalah fitur penting di Docker Compose untuk mengelola *container* Docker yang terkait. Inheritance memungkinkan untuk mewarisi konfigurasi dari *file* konfigurasi lain. Dalam Docker Compose, ini dilakukan dengan menggunakan opsi **`extends`** di dalam *file* konfigurasi YAML. Dengan opsi ini, developer dapat membuat *file* konfigurasi yang lebih spesifik untuk setiap lingkungan, seperti production, staging, atau development, sementara masih mewarisi konfigurasi yang sama dari *file* konfigurasi yang lebih umum.


#### **Mengelola Docker Compose**

Berikut adalah beberapa perintah penting untuk mengelola Docker compose beserta penjelasannya yang tersedia pada **`docker compose COMMAND`**. Perthatian, apabila installasi docker compose melalui standalone maka format perintahnya adalah **`docker-compose COMMAND`** 

| Perintah | Deskripsi |
| --- | --- |
|`up` | Membuat dan memulai *container* sesuai dengan konfigurasi di dalam *file* `docker-compose.yml`. Jika *file* tersebut tidak ada, perintah ini akan gagal. |
|`up -d` |	Sama seperti docker-compose up, tetapi menjalankan *container* di background (detached mode).
|`down`	| Menghentikan dan menghapus *container* yang dihasilkan oleh docker-compose up. |
|`build` |	Membuat image untuk service yang didefinisikan di dalam docker-compose.yml. |
|`start` | Menjalankan *container* yang sudah dibuat. |
|`stop` |	Menghentikan *container* yang sedang berjalan. |
|`restart` |	Menghentikan dan menjalankan kembali container. |
|`ps` |	Menampilkan status dari *container* yang dijalankan oleh Docker Compose. |
|`logs` |	Menampilkan log dari service yang dijalankan oleh Docker Compose. |
|`exec` |	Menjalankan perintah di dalam container. |
|`config` |	Memvalidasi dan menampilkan konfigurasi dari docker-compose.yml. |
|`kill` |	Memaksa menghentikan *container* yang sedang berjalan. |

</br>

### **Docker Data Management**

#### **Pengenalan Docker Data Management** 

Docker Data Management adalah sebuah konsep untuk mengelola data atau *file* yang ada di Docker. Ketika menjalankan sebuah aplikasi atau layanan di dalam Docker container, data yang dihasilkan oleh aplikasi tersebut dapat disimpan dalam *container* itu sendiri atau dalam sebuah volume yang terpisah dari container.

Dalam Docker, terdapat beberapa jenis mount atau penghubung yang digunakan untuk mengelola data, seperti volume, bind mount, dan tmpfs mount. Seorang developer dapat memilih jenis mount yang tepat sesuai dengan kebutuhan aplikasi yang dijalankan di dalam container.

Selain itu, Docker juga menyediakan beberapa perintah untuk mengelola data pada Docker volume, seperti menampilkan informasi volume, menghapus volume, dan mengatur volume driver options. Dengan menggunakan perintah-perintah ini, developer dapat mengelola data di Docker dengan mudah dan efisien.

Pemahaman tentang Docker Data Management sangat penting untuk memastikan data yang dihasilkan oleh aplikasi yang dijalankan di dalam *container* tetap terjaga dan tidak hilang saat *container* dihapus atau dimatikan.

#### Jenis-Jenis Docker Mount
<img src="img/docker-mounts.png" alt="Docker Mount" style="width:100%;">

- ##### **Volume**
  
    Docker Volume adalah fitur pada Docker yang memungkinkan developer untuk mengelola data yang dibutuhkan oleh *container* secara terpisah dari *container* itu sendiri. Volume Docker memungkinkan *container* untuk berbagi data dengan host, *container* lain, atau dengan layanan penyimpanan data yang disediakan oleh penyedia layanan cloud.

    Dalam Docker, setiap *container* memiliki *file* system sendiri yang terisolasi dari host dan *container* lainnya. Dalam beberapa kasus, data yang diperlukan oleh *container* perlu disimpan secara persisten, sehingga tidak hilang saat *container* dihapus atau dihentikan. Docker Volume memungkinkan untuk membuat penyimpanan data persisten untuk *container* tersebut, dan memungkinkan *container* lain atau host untuk mengakses data tersebut.


    Berikut adalah contoh menerapkan Docker volume pada konfigurasi Docker compose sebelumnya.

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

    Dengan menambahkan konfigurasi volumes pada Docker compose, maka data dari database akan tersimpan dan tidak hilang meskipun *container* dimatikan.

- ##### **Bind Mount**

    Bind mount adalah tipe mount di Docker yang memungkinkan suatu *file* atau direktori di host machine digunakan oleh *container* Docker. Dalam bind mount, *container* dan host machine menggunakan *file* system yang sama, sehingga jika suatu *file* diubah dalam container, perubahannya juga akan terlihat di host machine, dan sebaliknya.

    Dalam penggunaannya, bind mount dapat digunakan untuk mengakses file-file atau direktori dari host machine dan menggunakan data tersebut dalam container. Misalnya, jika ingin menjalankan sebuah aplikasi web di dalam container, tetapi ingin menggunakan *file* konfigurasi yang ada di host machine, maka dapat dilakukan bind mount dari direktori yang berisi *file* konfigurasi tersebut ke dalam direktori di dalam container.

    Berikut adalah contoh implementasi dari Bind Mount.

    ```sh
    docker run -d \
    -it \
    --name bind-container \
    --mount type=bind,source="$(pwd)"/target,target=/app \
    node:16-alpine
    ``` 
    ![Hasil implementasi bind mount](img/docker-bind-mount-cli.png)

    Kode di atas merupakan perintah untuk menjalankan sebuah *container* dari image `node:16-alpine`, dengan beberapa opsi seperti:

    - **`-d`** : menjalankan *container* di background (detach mode).
    - **`-it`** : mengalihkan interaksi ke terminal *container* (interactive mode dan attach to container).
    - **`--name`** : memberikan nama `bind-container` container.
    - **`--mount`** : menentukan opsi mount pada container. Pada kasus ini, menggunakan `opsi type=bind` untuk membuat bind mount, di mana direktori lokal pada host `$(pwd)/target` di-mount pada direktori `/app` pada container.
    - **`node:16-alpine`** : image yang akan digunakan untuk menjalankan container.

    Untuk memastikan proses bind mount berjalan dengan baik dapat menggunakan perintah `docker inspect nama_container` dan lihat outputnya pada bagian `Mounts`.

    ```sh
    docker inspect bind-container
    ```

    ![Output dari bind mount di Docker container](img/hasil-bind-mount.png)

    Untuk memverifikasi kesesuaian antara isi *file* di directory host dengan directory target dapat dilakukan dengan masuk ke mode shell dari *container* itu sendiri.
    
    ![Verifikasi hasil bind mount](img/verifikasi-bind-mount.png)

    Keuntungan dari bind mount adalah fleksibilitasnya yang tinggi, karena memungkinkan akses langsung ke *file* di host machine. Namun, kekurangannya adalah tidak dapat digunakan di seluruh platform, dan konfigurasi harus dilakukan secara manual setiap kali *container* dijalankan atau dihapus.

- ##### tmpfs Mount

    tmpfs mount adalah salah satu jenis mount pada Docker yang memungkinkan untuk menyimpan data secara sementara di dalam memory RAM pada host. Dengan menggunakan tmpfs mount, data akan cepat diakses karena langsung disimpan di dalam memory RAM, namun data tersebut tidak akan persisten karena hanya disimpan di dalam memory dan tidak disimpan ke dalam disk fisik.

    Cara penggunaannya yaitu dengan menambahkan opsi --mount pada saat menjalankan container, lalu menentukan tipe mount tmpfs dan ukuran memory yang akan digunakan untuk menyimpan data. Berikut contoh perintah untuk menggunakan tmpfs mount dengan ukuran memory 100 MB pada container:

    ```sh
    docker run -d \
    -it \
    --name tmpfs-container \
    --mount type=tmpfs,destination=/app,tmpfs-size=100M \
    node:16-alpine
    ```

    ![Implementasi tmpfs mount](img/docker-tmpfs-mount.png)

    - **`-d`** : menjalankan *container* di background (detach mode).
    - **`-it`** : mengalihkan interaksi ke terminal *container* (interactive mode dan attach to container).
    - **`--name`** : memberikan nama `bind-container` container.
    - **`--mount`** digunakan untuk memasang sebuah volume pada container. `type=tmpfs` menentukan jenis volume yang akan digunakan, yaitu tmpfs volume. `destination=/app` menunjukkan direktori tujuan dari volume ini, yaitu `/app`.
    - **`tmpfs-size=100M`** digunakan untuk menentukan ukuran maksimum volume tmpfs dalam container, dalam hal ini sebesar 100 megabyte.
    - **`node:16-alpine`** : image yang akan digunakan untuk menjalankan container.

    Untuk memastikan proses tmpfs mount berjalan dengan baik dapat menggunakan perintah

    ![Hasil implementasi dari tmpfs mount](img/hasil-tmpfs-mount.png)

#### **Mengelola Docker Volume**
- ##### **Membuat Docker Volume**

  Untuk membuat Docker Volume dapat menggunakan perintah docker volume create. Contoh sintaks perintahnya adalah sebagai berikut: `docker volume create <nama_volume>`

  ![Membuat docker volume](img/docker-create-volume.png)


- ##### **Melihat Daftar Docker Volume**

  Untuk melihat daftar Docker Volume yang sudah dibuat, gunakan perintah `docker volume ls`. Contoh sintaks perintahnya adalah sebagai berikut: `docker volume ls`

  ![Melihat daftar docker volume](img/docker-ls-volume.png)

- ##### **Menggunakan Docker Volume pada Container**

  Untuk menggunakan Docker Volume pada *container* dengan menggunakan opsi -v pada perintah `docker run`. Contoh sintaks perintahnya adalah sebagai berikut: `docker run -v <nama_volume>:<lokasi_mount_container> <image_name>`

  ![Menggunakan docker volume pada container](img/docker-start-container-volume.png)


- ##### **Meng-Inspect Docker Volume**
  
  Untuk melihat detail dari Docker Volume yang sudah dibuat, gunakan perintah docker volume inspect. Contoh sintaks perintahnya adalah sebagai berikut: `docker volume inspect <nama_volume>`

  ![Inspect docker volume](img/docker-inspect-volume.png)

- ##### **Meng-Copy Data ke dalam Docker Volume**

  Untuk dapat meng-copy data ke dalam Docker Volume dengan menggunakan perintah `docker cp`. Contoh sintaks perintahnya adalah sebagai berikut: `docker cp <nama_file> <nama_container>:<lokasi_mount_container>`
  Dimana `<nama_file>` adalah nama *file* yang akan di-copy, `<nama_container>` adalah nama dari *container* yang akan di-copy *file* tersebut, dan `<lokasi_mount_container>` adalah lokasi di dalam *container* dimana *file* tersebut akan di-copy.

  ![Copy data ke dalam docker volume](img/docker-copy-volume.png)

- ##### **Menghapus Data dalam Docker Volume**

  Untuk menghapus data dalam Docker Volume, cukup hapus *file* yang berada di dalam volume tersebut dapat menggunakan perintah `docker exec` untuk menjalankan perintah di dalam container. Contoh sintaks perintahnya adalah sebagai berikut: `docker exec <nama_container> rm <lokasi_file_di_volume>` Dimana `<nama_container>` adalah nama dari *container* yang akan dihapus *file* tersebut, dan `<lokasi_file_di_volume>` adalah lokasi *file* yang akan dihapus dalam volume tersebut.

  ![Menghapus data dalam docker volume](img/docker-remove-data-volume.png)

- ##### **Menghapus Docker Volume**

  Untuk menghapus Docker Volume, gunakan perintah docker volume rm. Contoh sintaks perintahnya adalah sebagai berikut: `docker volume rm <nama_volume>`
  ![Menghapus volume](img/docker-remove-volume.png)

Itulah beberapa cara untuk mengelola Docker Volume seperti membuat, melihat daftar, menghapus, menggunakan, inspect, copy data ke dalam, dan menghapus data dalam Docker Volume. Dengan Docker Volume pengelolaan data pada *container* dengan lebih mudah dan efisien.

</br>

### **Docker Networking**

#### **Pengertian Docker Networking**

Dalam pengembangan dan implementasi aplikasi modern yang kompleks, penggunaan teknologi kontainer seperti Docker telah menjadi semakin umum. Docker memungkinkan para pengembang untuk memisahkan aplikasi dari lingkungan host dan infrastruktur di mana mereka dijalankan, sehingga memungkinkan lebih banyak fleksibilitas dan portabilitas.

Namun, ketika menjalankan beberapa *container* pada satu host, perlu untuk memungkinkan *container* untuk berkomunikasi satu sama lain, dan juga terhubung ke sumber daya di luar *container* seperti jaringan host atau jaringan eksternal. Disinilah Docker Networking berperan.

Docker Networking adalah cara untuk menghubungkan antara *container* Docker yang berbeda sehingga mereka dapat berkomunikasi satu sama lain. Saat menjalankan beberapa *container* di Docker, setiap *container* memiliki alamat IP yang berbeda dan terisolasi satu sama lain. Oleh karena itu, Docker Networking memungkinkan *container* Docker untuk terhubung ke jaringan yang sama atau subnet dan berkomunikasi satu sama lain, serta dapat terhubung dengan host mesin fisik atau jaringan eksternal.

Tanpa Docker Networking, setiap *container* berjalan pada subnet yang terisolasi, yang berarti mereka tidak dapat berkomunikasi satu sama lain atau dengan sumber daya di luar subnet tersebut. Dengan menggunakan Docker Networking, *container* Docker dapat terhubung ke jaringan yang sama atau subnet, dan dapat berkomunikasi dengan *container* lain dan sumber daya di luar container, seperti basis data atau layanan web yang terpisah.

Selain itu, Docker Networking memungkinkan pengguna untuk membuat lingkungan jaringan yang aman dan terisolasi di mana setiap *container* dapat berinteraksi satu sama lain, tetapi tetap terpisah dari lingkungan jaringan host. Ini memungkinkan para pengembang untuk menciptakan aplikasi yang lebih aman dan lebih mudah untuk dikelola, serta memfasilitasi pengembangan dan implementasi skala besar.

Oleh karena itu, Docker Networking adalah komponen kunci dalam penggunaan Docker Container. Dengan memungkinkan *container* untuk berkomunikasi satu sama lain dan terhubung ke sumber daya di luar container, Docker Networking memungkinkan para pengembang untuk menciptakan aplikasi yang lebih fleksibel, portabel, aman, dan mudah dielola.

#### **Konsep Dasar di Docker Networking**

##### **Docker Network Driver**

Docker Network Driver adalah komponen utama yang memungkinkan *container* Docker terhubung ke jaringan. Network Driver adalah plug-in yang diinstal pada host Docker dan mengatur bagaimana *container* terhubung ke jaringan.

Docker menyediakan beberapa jenis Network Driver yang berbeda, masing-masing dengan karakteristik yang unik, dan memungkinkan pengguna untuk memilih Network Driver yang tepat untuk kebutuhan aplikasi mereka. Berikut adalah beberapa jenis Network Driver yang tersedia di Docker: `bridge network`, `host network`, `overlay network`, `ipvlan`, `macvlan network`, `network plugins`. Detail pembahasan akan dijelaskan pada sub materi [Jenis-Jenis Docker Network Driver](#https://github.com/arsitektur-jaringan-komputer/Pelatihan-Docker/tree/pd23/3.%20Docker%20Service%20Lanjutan#jenis-jenis-docker-network-driver).

Dengan pemilihan Network Driver yang tepat, pengguna dapat memaksimalkan fleksibilitas, portabilitas, dan keamanan aplikasi di dalam container.

##### **IP Address Management**

IP Address Management (IPAM) adalah proses manajemen alamat IP di dalam jaringan Docker. Docker memungkinkan pengguna untuk mengontrol pengaturan IP pada setiap jaringan yang dibuat, termasuk pemberian alamat IP secara otomatis atau manual. Penjelasan detail mengenail IP Address dapat dilihat pada [Jarkom Modul 4](#https://github.com/arsitektur-jaringan-komputer/Modul-Jarkom/tree/master/Modul-4).

Dalam Docker, setiap *container* dapat memiliki alamat IP unik pada jaringan tertentu. IPAM memastikan bahwa alamat IP yang diberikan pada *container* tidak bertabrakan dengan alamat IP yang sudah ada di jaringan, sehingga mencegah masalah komunikasi dan konflik alamat IP.

Untuk melihat ip address yang digunakan oleh sebuah Docker *container* dapat menggunakan perintah `docker *container* inspect <container_id>`. Informasi seputar IP Address biasanya terdapat di `NetworkSettings`.

![Network setting di docker container](img/docker-network-setting.png)

Dalam Docker, IPAM menawarkan beberapa mode pengaturan IP address, antara lain:

- **`Default`**: Mode ini memungkinkan Docker secara otomatis memberikan alamat IP untuk setiap *container* dalam jaringan. Docker akan membuat subnet baru untuk setiap jaringan dan mengalokasikan alamat IP dari subnet tersebut.

- **`User-defined`**: Mode ini memungkinkan pengguna untuk secara manual menentukan subnet dan rentang alamat IP yang akan digunakan pada jaringan tertentu. Pengguna dapat menentukan rentang IP yang tersedia dan menentukan alamat IP yang akan digunakan pada setiap container.

- **`External`**: Mode ini memungkinkan Docker untuk terhubung ke IPAM pihak ketiga seperti DHCP server atau sistem manajemen alamat IP lainnya untuk mengelola alamat IP pada jaringan.

Pengaturan IPAM pada Docker memungkinkan pengguna untuk lebih mudah mengelola alamat IP pada jaringan Docker dan mencegah masalah komunikasi dan konflik alamat IP. Dalam lingkungan yang lebih kompleks, IPAM dapat membantu meningkatkan efisiensi dan skalabilitas jaringan Docker.

##### **DNS Name Resolution**

DNS name resolution adalah proses mengubah nama domain menjadi alamat IP yang terkait dengannya. Ketika seseorang mengakses sebuah website, misalnya, browser harus mengetahui alamat IP dari server tempat website tersebut dihosting. Namun, manusia tentunya lebih mudah mengingat nama domain daripada alamat IP yang panjang dan sulit diingat.

![Cara DNS name resolution bekerja](img/dns-name-resolution.png)

Dalam DNS name resolution, nama domain akan dicocokkan dengan alamat IP yang terkait dengannya dalam database DNS (Domain Name System). Database DNS adalah sistem terdistribusi yang memungkinkan pengguna untuk mencari informasi tentang nama domain dan mengembalikan alamat IP yang terkait dengan domain tersebut. Dalam praktiknya, server DNS biasanya memegang informasi tentang beberapa domain dan mungkin perlu meminta informasi dari server DNS lain jika informasi yang diminta tidak tersedia pada server tersebut. Pembahasan lebih lanjut tentang DNS name resolution dapat dilihat di [Jarkom Modul DNS](#https://github.com/arsitektur-jaringan-komputer/Modul-Jarkom/tree/master/Modul-2/DNS).

DNS name resolution sangat penting dalam internet, karena tanpa itu, pengguna akan kesulitan mengakses situs web dan layanan online. Dalam Docker, DNS name resolution memungkinkan *container* untuk berkomunikasi dengan menggunakan nama yang mudah diingat daripada alamat IP yang sulit diingat.

##### **Port mapping**

Port mapping adalah proses untuk menghubungkan antara port yang digunakan oleh sebuah aplikasi atau layanan dalam *container* dengan port yang tersedia pada host atau mesin tempat *container* dijalankan. Dalam Docker, port mapping memungkinkan *container* untuk menerima permintaan dari luar melalui port yang terbuka pada host atau mesin tempat *container* berjalan.

Misalnya, jika sebuah *container* menjalankan sebuah layanan web pada port 8080, namun port 8080 tidak terbuka pada host, maka layanan tersebut tidak dapat diakses dari luar. Namun, dengan melakukan port mapping dapat menghubungkan port 8080 pada *container* dengan port yang tersedia pada host, seperti port 8000. Dengan demikian, layanan web pada *container* dapat diakses melalui port 8000 pada host.

Port mapping dapat dilakukan pada saat menjalankan *container* dengan menggunakan perintah `docker run`. Untuk melakukan port mapping dapat menentukan port pada host dengan opsi `-p` dan port pada *container* dengan format `port_container`. Contohnya, jika ingin menghubungkan port 8080 pada *container* dengan port 8000 pada host dapat menjalankan perintah berikut:

```sh
docker run -p <port_host>:<port_container> <nama_container>
```
atau dengan menambahkan konfigurasi port mapping di Docker compose pada contohkan sebelumnya.

#### **Jenis-Jenis Docker Network Driver**
##### **Bridge Network**

Bridge network merupakan salah satu jenis network yang ada pada Docker. Bridge network digunakan untuk menghubungkan *container* dengan *container* lainnya pada satu host. Dalam bridge network, setiap *container* memiliki alamat IP yang unik dan terisolasi dalam network yang sama. Dalam jaringan bridge, setiap *container* dapat berkomunikasi dengan *container* lainnya melalui alamat IP yang diberikan oleh Docker.

Bridge network pada Docker merupakan default network yang dibuat oleh Docker ketika Docker diinstal pada sebuah host. Setiap *container* yang dibuat tanpa menyebutkan network yang digunakan, secara otomatis akan terhubung dengan jaringan bridge yang telah dibuat. Setiap jaringan bridge yang dibuat akan memiliki sebuah gateway yang bertindak sebagai titik masuk ke jaringan dari host.

Dalam bridge network pada Docker, *container* dapat diakses menggunakan alamat IP dari jaringan yang sama, atau menggunakan nama *container* yang diberikan pada saat pembuatan container. Container juga dapat dihubungkan dengan network lainnya melalui fitur bridge network yang disediakan oleh Docker. Dalam hal ini, sebuah *container* dapat terhubung dengan beberapa network secara bersamaan untuk memungkinkan interaksi dengan *container* lain yang berada pada jaringan yang berbeda.

Bridge network pada Docker dapat diatur secara manual dengan cara membuat jaringan baru atau mengatur konfigurasi dari jaringan yang sudah ada. Untuk membuat bridge network di Docker dapat menggunakan perintah: `docker network create <nama_network>`  atau dengan menulis driver network secara eksplisit `docker network create --driver bridge <nama_network>`.

![Membuat docker bridge network](img/docker-bridge-network.png)

Untuk memasang bridge network ke Docker *container* baru dapat menggunakan perintah `docker run --name <nama_container> --network <nama_network>` atau ke *container* yang sudah ada dengan perintah `docker network connect <nama_network> <nama_container>`.

![Memasang docker bridge network ke Docker container](img/docker-bridge-network-setting.png)

Setelah menambahkan *container* ke dalam Docker bridge network, *container* tersebut dapat diakses melalui alamat IP di dalam jaringan tersebut. Selain itu juga dapat menjalankan *container* baru dan menetapkannya ke dalam network yang sama untuk memungkinkan *container* tersebut berkomunikasi dengan *container* yang telah ada di dalam network.

##### **Host Network**

Selain bridge network, Docker juga mendukung host network. Host network memungkinkan *container* untuk menggunakan network interface yang sama dengan host. Dengan host network, *container* tidak dibatasi oleh isolasi network yang diberikan oleh Docker, sehingga *container* dapat langsung mengakses network host.

Perbedaan utama antara host network dan bridge network adalah pada tingkat isolasi network. Dalam host network, *container* berbagi alamat IP dengan host, sehingga tidak ada isolasi network antara *container* dan host. Sementara itu, pada bridge network, Docker membuat network virtual yang terpisah dari network host. Dalam bridge network, *container* berada di dalam network virtual yang terisolasi, sehingga tidak dapat langsung mengakses network host.

Keuntungan menggunakan host network adalah performa yang lebih baik karena *container* tidak melalui jaringan virtual yang terisolasi. Namun, kelemahan dari host network adalah kurangnya isolasi yang menyebabkan potensi masalah keamanan dan tidak fleksibel dalam hal port mapping.

Untuk membuat host network di Docker dapat dilakukan dengan perintah `docker network create --driver=host <nama-network>` dengan memberikan jenis driver secara eksplisit. Akan tetapi perlu diperhatikan kalau host network hanya diperbolehkan satu karena host network memberikan akses langsung ke semua port dan service pada host, sehingga dapat menimbulkan masalah keamanan jika lebih dari satu *container* menggunakan host network pada saat yang bersamaan. Selain itu, karena host network tidak memiliki isolasi seperti yang dimiliki oleh bridge network, maka ketika dua *container* menggunakan host network yang sama, mereka akan saling bersaing untuk menggunakan port yang sama, yang dapat menyebabkan konflik dan kegagalan dalam menjalankan container. Oleh karena itu, disarankan untuk menggunakan host network dengan hati-hati dan hanya jika memang benar-benar diperlukan.

Host network paling tepat digunakan ketika performa jaringan menjadi faktor kritis dan isolasi network tidak diperlukan. Contohnya adalah ketika menjalankan aplikasi yang memerlukan koneksi jaringan yang sangat cepat dan membutuhkan akses ke port host yang spesifik, seperti aplikasi game online atau streaming media. Selain itu, host network juga cocok digunakan untuk aplikasi yang sudah teroptimasi untuk dijalankan pada lingkungan host dan tidak memerlukan isolasi network. Misalnya, aplikasi yang hanya digunakan untuk pengujian atau aplikasi yang sifatnya sementara.

##### **Overlay Network**

Overlay network di Docker adalah jenis jaringan yang memungkinkan beberapa host Docker terhubung dan berkomunikasi satu sama lain melalui jaringan yang sama. Overlay network menggunakan teknologi Virtual Extensible LAN (VXLAN) untuk memungkinkan *container* di mesin Docker yang berbeda untuk berkomunikasi satu sama lain seakan-akan mereka berada dalam satu jaringan lokal.

Overlay network sangat berguna dalam skenario di mana perlu menjalankan aplikasi yang terdiri dari banyak *container* pada beberapa mesin Docker yang berbeda, seperti pada cluster atau lingkungan produksi yang terdistribusi. Dalam kasus seperti itu, overlay network memungkinkan *container* pada mesin yang berbeda untuk berkomunikasi dengan mudah satu sama lain, tanpa perlu memperhatikan topologi jaringan fisik di belakangnya. Karena overlay network digunakan pada sebuah cluster maka implementasi dari overlay network akan dicontohkan pada modul **DOCKER SWARM**

##### IPvlan Network

IPvlan network merupakan salah satu tipe driver network di Docker yang memungkinkan *container* Docker untuk memiliki satu atau beberapa interface virtual yang terhubung ke jaringan host. Interface virtual ini akan terhubung langsung ke interface fisik host, sehingga dapat digunakan untuk melakukan komunikasi langsung dengan jaringan eksternal.

Salah satu kelebihan dari IPvlan network adalah kemampuan untuk mengoptimalkan kinerja aplikasi dan mengurangi latensi dengan menghindari overhead dari proses routing yang terjadi pada driver network lain seperti bridge network. Selain itu, IPvlan network juga mendukung kemampuan untuk melakukan isolasi jaringan dengan menggunakan VLAN ID.

Namun, terdapat juga beberapa kekurangan dari penggunaan IPvlan network, antara lain sebagai berikut.
- Konfigurasi yang rumit dan memerlukan pengetahuan yang cukup untuk dapat menggunakannya dengan efektif
- Tidak mendukung kemampuan port mapping secara langsung, sehingga diperlukan konfigurasi tambahan untuk dapat melakukan port mapping
- Memerlukan kernel yang mendukung fitur IPvlan untuk dapat digunakan.

Oleh karena itu, sebaiknya melakukan evaluasi terlebih dahulu sebelum memutuskan untuk menggunakan IPvlan network di Docker.

##### **MACvlan Network**

MACvlan network adalah jenis jaringan Docker yang memungkinkan *container* Docker terhubung ke jaringan seperti virtual interface yang terpisah dan dapat memiliki alamat MAC yang berbeda. Dalam konfigurasi ini, setiap *container* memiliki alamat MAC yang unik, yang memungkinkan untuk terhubung ke jaringan fisik dengan alamat MAC yang sama.

Macvlan network sangat berguna ketika *container* Docker harus terhubung ke jaringan fisik yang sama dengan host Docker. Sebagai contoh, ketika *container* Docker harus terhubung ke jaringan yang memiliki protokol broadcast atau multicast, seperti protokol DHCP, NetBIOS, atau mDNS.

Namun, sama seperti dengan ipvlan network, konfigurasi macvlan network memerlukan beberapa pengetahuan dan pemahaman tentang jaringan. Selain itu, macvlan network memiliki beberapa batasan, seperti tidak dapat melakukan komunikasi antara *container* dalam jaringan yang sama, dan tidak dapat melakukan port mapping ke host.

Oleh karena itu, sebaiknya melakukan evaluasi terlebih dahulu sebelum memutuskan untuk menggunakan macvlan network di Docker.

##### **Network Plugins**

Docker Network Plugin adalah mekanisme yang memungkinkan pengguna untuk menggunakan fitur jaringan yang tidak disediakan oleh driver bawaan Docker. Plugin ini memungkinkan integrasi ke dalam sistem jaringan yang ada, seperti jaringan SDN atau jaringan virtual yang telah disiapkan oleh penyedia cloud. Contoh plugin jaringan yang tersedia untuk Docker antara lain: Flannel, Calico, Weave Net, Cilium, dan lain-lain.

Kelebihan dari menggunakan Docker Network Plugin adalah:

- Kompatibilitas: Plugin memungkinkan pengguna untuk menggunakan jaringan yang telah disiapkan oleh penyedia cloud, sehingga memungkinkan pengguna untuk mengintegrasikan Docker ke dalam lingkungan cloud yang lebih besar.

- Skalabilitas: Plugin memungkinkan pengguna untuk memperluas kapasitas jaringan Docker ke dalam sistem jaringan yang lebih besar, sehingga memungkinkan pengguna untuk mengelola jaringan Docker dengan lebih efisien.

Kekurangan dari menggunakan Docker Network Plugin adalah:

- Kompleksitas: Penggunaan plugin memerlukan pengetahuan yang lebih dalam tentang jaringan dan konfigurasi Docker, sehingga memerlukan waktu dan usaha yang lebih banyak untuk mengonfigurasi dan mengelola jaringan Docker.

- Ketergantungan: Penggunaan plugin memerlukan ketergantungan pada plugin yang diinstal, sehingga jika plugin tidak tersedia atau mengalami masalah, maka jaringan Docker tidak dapat digunakan dengan efektif.

#### **Mengelola Docker Networking di Docker Compose**

Masih ingatkah dengan konfigurasi Docker compose sebelumnya? Pada konfigurasi sebelumnya masih belum mengimplementasikan docker networking. Pada sub materi ini, akan ditambahkan konfigurasi untuk mengatur docker networking menggunakan network driver `bridge`.

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

Pada konfigurasi Docker Compose di atas, ditambahkan sebuah network dengan nama `mynetwork` dengan driver `bridge`. Selain itu, setiap service (backend, frontend, dan database) juga ditambahkan ke dalam network tersebut.

Penambahan network ini dilakukan agar ketiga service yang ada di dalam Docker Compose dapat saling berkomunikasi melalui network yang sama. Dengan adanya network ini, antar service dapat berkomunikasi dengan menggunakan nama service sebagai host name, misalnya `database` untuk menghubungi service database dari service backend.

Alasan penambahan network ini adalah untuk mempermudah pengaturan komunikasi antar service dan menghindari masalah yang dapat timbul akibat penggunaan IP address yang berubah-ubah setiap kali melakukan start ulang terhadap container. Selain itu, dengan menggunakan network ini juga dapat dengan mudah menambahkan service baru ke dalam komposisi yang sudah ada tanpa harus memodifikasi ulang konfigurasi setiap service


</div>

## **Sumber Referensi**
- https://docs.docker.com/compose/compose-file/
- https://docs.docker.com/storage/
- https://docs.docker.com/storage/volumes/
- https://docs.docker.com/network/network-tutorial-overlay/
- https://raidboxes.io/en/blog/webdesign-development/domain-name-system-dns/
