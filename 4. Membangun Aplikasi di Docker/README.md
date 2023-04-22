# **Membangun Aplikasi di Docker**
- [**Glosarium**](#glosarium)
- [**Materi**](#materi)
  - [Mikroservice](#️arsitektur-mikroservice)
    - [Pengertian Mikroservice](#pengertian-mikroservice)
    - [Karakteristik Mikroservice](#karakteristik-mikroservice)
    - [Arsitektur Mikroservice](#arsitektur-mikroservice)
    - [Inter-container communication](#inter-container-communication)
      - [Sockets](#sockets)
      - [Filesystem](#filesystem)
      - [Database records](#database-record)
      - [HTTP](#http)
      - [MQTT](#mqtt)
  - [Docker Swarm](#docker-swarm)
  - [Membuat Aplikasi Mikroservice dengan Docker](#membuat-aplikasi-mikroservice-dengan-docker)
- [**Sumber**](#-sumber)


## Glosarium

## Materi
### Mikroservice
#### Pengertian Mikroservice
Microservice adalah sebuah pendekatan arsitektur perangkat lunak untuk membangun sebuah aplikasi dengan memecahnya menjadi beberapa komponen kecil yang berdiri sendiri (independen) dan saling berkomunikasi melalui antarmuka yang terstandardisasi. Dalam arsitektur microservice, setiap komponen atau service memiliki tanggung jawab yang spesifik dan dijalankan secara independen dari komponen lainnya.

![Aplikasi mikroservice](img/microservice.png)

Secara umum, arsitektur microservice menawarkan beberapa keuntungan, seperti memudahkan skalabilitas, mempercepat waktu deployment dan pengembangan, serta memudahkan untuk memperbaiki atau meng-upgrade aplikasi. Hal ini disebabkan karena setiap service dapat dikembangkan, di-deploy, dan di-maintain secara terpisah tanpa mempengaruhi service lainnya.

Namun, di sisi lain, menggunakan arsitektur microservice juga memiliki beberapa tantangan, seperti pengelolaan service yang lebih kompleks dan koordinasi antar service yang harus dilakukan secara hati-hati. Oleh karena itu, pemilihan arsitektur yang tepat harus dipertimbangkan berdasarkan kebutuhan bisnis dan teknologi yang digunakan.

#### Karakteristik Mikroservice
#### Arsitektur Mikroservice

#### Inter-container communication
Inter-container communication di aplikasi microservice merujuk pada cara komunikasi antar service atau container yang berbeda dalam suatu aplikasi yang menggunakan arsitektur microservice. Karena setiap service dijalankan pada container yang terpisah dan terisolasi, maka inter-container communication harus dilakukan melalui mekanisme tertentu.

##### Sockets
Sockets adalah salah satu mekanisme yang dapat digunakan dalam inter-container communication pada aplikasi microservice. Socket dapat diartikan sebagai titik akhir dari suatu koneksi yang digunakan untuk berkomunikasi antar service atau container yang berbeda.

Dalam konteks aplikasi microservice, socket biasanya digunakan untuk melakukan komunikasi antar service pada jaringan lokal atau antar container pada mesin yang sama. Socket dapat digunakan untuk melakukan komunikasi secara sinkron atau asinkron.

Pada umumnya, penggunaan socket dalam inter-container communication pada aplikasi microservice dapat dilakukan dengan beberapa cara, seperti:

- TCP Socket: digunakan untuk melakukan komunikasi yang reliable dan ordered antar service atau container pada jaringan lokal.

- Unix Domain Socket: digunakan untuk melakukan komunikasi antar container pada mesin yang sama. Unix domain socket dapat lebih cepat daripada TCP socket karena tidak perlu melalui jaringan.

- Datagram Socket: digunakan untuk melakukan komunikasi yang tidak reliable dan unordered antar service atau container pada jaringan lokal. Datagram socket dapat digunakan untuk transfer data yang relatif kecil dan tidak memerlukan protokol seperti TCP.

Pemilihan jenis socket yang tepat harus dipertimbangkan berdasarkan kebutuhan bisnis dan teknologi yang digunakan dalam aplikasi microservice. Penggunaan socket dalam inter-container communication dapat membantu meningkatkan efisiensi dan performa dari aplikasi microservice.

##### Filesystem
##### Database records
##### HTTP
HTTP (Hypertext Transfer Protocol) adalah protokol komunikasi yang umum digunakan dalam inter-container communication pada aplikasi microservice. HTTP adalah protokol request-response yang digunakan untuk mentransfer data melalui jaringan antar service atau container.

Pada aplikasi microservice, HTTP dapat digunakan sebagai mekanisme inter-container communication melalui RESTful API. Setiap service menyediakan RESTful API yang terbuka, dan service lain dapat mengakses API tersebut untuk berkomunikasi dengan service yang bersangkutan.

Dalam penggunaan HTTP sebagai mekanisme inter-container communication pada aplikasi microservice, HTTP dapat memiliki beberapa keunggulan, seperti:

- Mudah diimplementasikan: karena HTTP adalah protokol yang sangat umum, banyak bahasa pemrograman dan framework yang mendukung implementasi HTTP.
- Interoperabilitas yang baik: karena HTTP adalah protokol standar, service yang berbeda dapat saling berkomunikasi dengan mudah.
- Dukungan terhadap berbagai format data: HTTP mendukung berbagai format data seperti JSON, XML, dan lain-lain, sehingga memungkinkan service untuk berkomunikasi menggunakan format data yang berbeda-beda.
- Dukungan terhadap pengamanan: HTTP dapat digunakan dengan protokol HTTPS untuk memastikan keamanan dan kerahasiaan data yang ditransfer antar service atau container.

Namun, penggunaan HTTP sebagai mekanisme inter-container communication pada aplikasi microservice juga memiliki beberapa kelemahan, seperti:

- Overhead yang besar: HTTP memiliki overhead yang besar karena memerlukan header dan metadata yang cukup kompleks.
- Performa yang relatif lambat: karena overhead yang besar, performa HTTP relatif lambat dibandingkan dengan mekanisme inter-container communication yang lebih sederhana seperti Unix domain socket.
- Tidak mendukung streaming data: HTTP tidak mendukung streaming data secara efektif, sehingga tidak cocok untuk transfer data yang besar dan kompleks.

Pemilihan mekanisme inter-container communication yang tepat harus dipertimbangkan berdasarkan kebutuhan bisnis dan teknologi yang digunakan dalam aplikasi microservice. HTTP dapat menjadi pilihan yang baik terutama jika aplikasi microservice membutuhkan interoperabilitas yang baik dan dukungan terhadap pengamanan.

##### MQTT
MQTT (Message Queuing Telemetry Transport) adalah protokol komunikasi ringan yang digunakan untuk pertukaran data pada sistem IoT (Internet of Things) dan aplikasi yang membutuhkan pertukaran data real-time. MQTT dirancang untuk mengoptimalkan penggunaan bandwidth jaringan dan penggunaan daya pada perangkat yang terhubung dengan jaringan.

Pada aplikasi microservice, MQTT dapat digunakan sebagai mekanisme inter-container communication untuk komunikasi antara service atau container yang berjalan pada mesin yang sama atau mesin yang berbeda. MQTT menggunakan konsep publish-subscribe untuk mentransfer pesan antara service atau container.

Dalam konsep publish-subscribe, service atau container yang mengirim pesan disebut sebagai publisher, sedangkan service atau container yang menerima pesan disebut sebagai subscriber. Publisher hanya perlu mengirimkan pesan ke broker (sebuah server MQTT) tanpa harus mengetahui subscriber mana yang akan menerimanya. Kemudian broker akan menyebarluaskan pesan ke seluruh subscriber yang telah terdaftar.

![Inter-container communication dengan MQTT](img/microservice-mqtt.png)

Beberapa keunggulan dari MQTT sebagai mekanisme inter-container communication pada aplikasi microservice adalah sebagai berikut:

- Ringan dan efisien: MQTT dirancang untuk mengoptimalkan penggunaan bandwidth jaringan dan penggunaan daya pada perangkat yang terhubung dengan jaringan, sehingga sangat cocok digunakan pada aplikasi microservice yang membutuhkan pertukaran data real-time.
- Skalabilitas yang baik: MQTT dapat digunakan pada sistem yang sangat besar dengan banyak service atau container, sehingga sangat cocok digunakan pada aplikasi microservice yang membutuhkan skalabilitas.
- Dukungan terhadap kualitas layanan (QoS): MQTT menyediakan tiga tingkat QoS (0, 1, 2) untuk memastikan pesan terkirim dengan benar dan tiba pada waktu yang tepat.
- Dukungan terhadap pengamanan: MQTT dapat digunakan dengan protokol SSL/TLS untuk memastikan keamanan dan kerahasiaan data yang ditransfer antar service atau container.

Namun, penggunaan MQTT juga memiliki beberapa kelemahan, seperti:

- Kurang umum: MQTT masih kurang umum dibandingkan dengan protokol komunikasi lainnya seperti HTTP.
- Kompleksitas implementasi: MQTT memerlukan broker sebagai perantara antara publisher dan subscriber, sehingga memerlukan kompleksitas implementasi yang lebih tinggi.

Pemilihan mekanisme inter-container communication yang tepat harus dipertimbangkan berdasarkan kebutuhan bisnis dan teknologi yang digunakan dalam aplikasi microservice. MQTT dapat menjadi pilihan yang baik terutama jika aplikasi microservice membutuhkan penggunaan bandwidth jaringan dan penggunaan daya yang efisien, serta dukungan terhadap kualitas layanan dan pengamanan.

### Docker Swarm

### Membuat Aplikasi Mikroservice dengan Docker
## Sumber Referensi
- https://datacommcloud.co.id/microservices-adalah-perbedaan-monolithic-architecture/
- https://medium.com/pujanggateknologi/berkenalan-dengan-teknologi-mqtt-7e63cab9d00d