# **Pengenalan Docker**
- [**Glosarium**](#glosarium)
- [**Materi**](#materi)
  - [Host Filesystem Pollution Problem](#️host-filesystem-pollution-problem)
  - [Virtualization vs Containerization](#virtualization-vs-containerization)
  - [Apa itu Docker?](#apa-itu-docker)
  - [Arsitektur Docker](#arsitektur-docker)
    - [Docker Daemon](#docker-daemon)
    - [Docker Client](#docker-client)
    - [Docker Objects](#docker-objects)
    - [Docker Registry](#docker-registry)
  - [Kelebihan dan Kekurangan Docker](#kelebihan-dan-kekurangan-docker)
  - [Tantangan Penggunaan Docker](#tantangan-penggunaan-docker)
- [**Sumber Referensi**](#sumber-referensi)


## Glosarium
| Kata | Pengertian |
| -------- | -------- |
| Guest operating system  | sistem operasi yang berjalan di virtual mesin  |
| Host operating system  | sistem operasi yang berjalan di workstation  |

## Materi

### Host Filesystem Pollution Problem

_Host Filesystem Pollution Problem_ merujuk pada akumulasi file, folder, atau perubahan konfigurasi yang terjadi dalam _host operating system_ akibat instalasi perangkat lunak yang berlebihan atau tidak teratur. Dalam lingkungan pengembangan perangkat lunak, seringkali diperlukan pengujian atau penggunaan banyak perangkat lunak dan dependensi yang berbeda. Namun, jika tidak dikelola dengan baik, hal ini dapat menyebabkan _host operating system_ menjadi tidak teratur, berantakan, atau tidak stabil.

Salah satu contoh kasus Host Filesystem Pollution Problem adalah akumulasi software yang diinstal di laptop atau komputer host tanpa pengelolaan yang baik. Pengguna sering kali menginstal banyak software untuk keperluan pengembangan perangkat lunak, tetapi tidak semuanya digunakan secara aktif. Akibatnya, file, folder, dan konfigurasi yang terkait dengan software yang tidak digunakan dapat terakumulasi di _host operating system_, menghasilkan tumpukan file yang tidak perlu dan memenuhi ruang penyimpanan, serta mengganggu kinerja sistem operasi.

Selain itu, _Host Filesystem Pollution Problem_ juga dapat terjadi ketika pengguna menggunakan beberapa versi perangkat lunak yang sama secara bersamaan pada _host operating system_. Misalnya, dalam pengembangan perangkat lunak, terkadang diperlukan untuk menguji aplikasi pada beberapa versi perangkat lunak atau dependensi yang berbeda. Namun, jika pengelolaan versi tidak diatur dengan baik, hal ini dapat mengakibatkan banyak versi perangkat lunak yang terinstal pada _host operating system_, sehingga membingungkan dan mempersulit pengelolaan dan penggunaan software tersebut.

Nah, permasalahan diataslah yang sering kita temui sebagai developer. Masih banyak lagi contoh kasus _Host Filesystem Pollution Problem_. Lantas bagaimana cara mengatasi permasalahan tersebut? Yuk, simak kenalan dengan _virtualization_ dan _containerization_.

### Virtualization vs Containerization
#### **Virtualization**

#### **Containerization**


### Apa itu Docker?

![Logo Docker](img/docker.png)

Docker adalah sebuah platform yang memungkinkan pengembang perangkat lunak untuk membuat, mengemas, dan menjalankan aplikasi dalam wadah yang dapat diisolasi secara mandiri, disebut _container_. _Container_ dalam Docker berfungsi seperti lingkungan eksekusi yang terisolasi untuk menjalankan aplikasi, termasuk kode sumber, runtime, dan dependensi yang diperlukan.

Dengan Docker, pengembang dapat membuat wadah yang konsisten dan portabel, yang dapat dijalankan di berbagai lingkungan komputasi, termasuk mesin lokal, server cloud, atau lingkungan pengembangan dan produksi yang berbeda. Docker memungkinkan aplikasi dan dependensinya diisolasi, sehingga aplikasi dapat dijalankan secara konsisten di berbagai lingkungan tanpa mengganggu _host operating system_ atau aplikasi lainnya.

### Arsitektur Docker

![Arsitektur Docker](img/architecture.png)

#### Docker Daemon
_Docker Daemon_ adalah komponen yang berjalan di latar belakang (background) pada host dan bertanggung jawab untuk menjalankan dan mengelola _Docker Object_ seperti _images_, _container_, _network_, dan lain-lain. Docker Daemon adalah proses yang berjalan di dalam sistem operasi host dan menerima perintah dari _Docker Client_ untuk membuat, menjalankan, menghentikan, dan mengelola _Docker Object_. _Docker Daemon_ juga bertanggung jawab untuk mengelola sumber daya host seperti CPU, memori, dan jaringan yang digunakan oleh _Docker Object_.

#### Docker Client
_Docker Client_ adalah antarmuka pengguna berbasis command-line atau GUI yang digunakan untuk berinteraksi dengan Docker. _Docker Client_ memungkinkan pengguna untuk menjalankan perintah-perintah Docker untuk membuat, mengelola, dan mengontrol layanan pada Docker. _Docker Client_ berkomunikasi dengan _Docker Daemon_ untuk mengirimkan perintah-perintah Docker dan menerima output layanan Docker yang sedang berjalan.

#### Docker Objects
Docker Objects adalah komponen dasar yang terdapat di Docker. Beberapa contoh _Docker Objects_ meliputi _image_, _container_, _volume_, dan _network_ yang akan dijelaskan pada modul selanjutnya. 

#### Docker Registry 
_Docker Registry_ adalah repositori yang digunakan untuk menyimpan dan berbagi _Docker Image_. _Docker Registry_ berfungsi sebagai tempat penyimpanan untuk _Docker Image_ yang dapat diakses oleh pengguna Docker dari berbagai lokasi. _Docker Hub_, yang merupakan Docker's public registry, adalah salah satu contoh _Docker Registry_ yang sering digunakan untuk menyimpan dan berbagi _Docker Image_ secara publik. Selain _Docker Hub_, pengguna juga dapat membuat Docker Registry pribadi untuk menyimpan _Docker Image_. 

### Kelebihan dan Kekurangan Docker

Docker adalah platform open-source yang memungkinkan pengguna untuk membuat, mengelola, dan menjalankan aplikasi dalam kontainer. Berikut adalah beberapa kelebihan dan kekurangan Docker:

| Kelebihan | Kekurangan |
|------------|------------|
| **Isolasi**: Kontainer Docker memungkinkan aplikasi dan dependensinya diisolasi dalam lingkungan yang terpisah, sehingga tidak saling mempengaruhi. | **Kompleksitas Konfigurasi**: Konfigurasi Docker dapat menjadi kompleks, terutama untuk aplikasi yang lebih kompleks dengan banyak komponen atau dependensi. |
| **Portabilitas**: Docker memungkinkan aplikasi untuk dikemas dalam kontainer yang dapat dijalankan di berbagai lingkungan, termasuk mesin lokal, cloud, atau lingkungan produksi. | **Keamanan**: Docker kontainer berbagi kernel sistem operasi host, sehingga menghadirkan potensi kerentanan keamanan jika tidak dikonfigurasi dengan benar. |
| **Efisiensi**: Kontainer Docker memungkinkan penggunaan sumber daya yang efisien, dengan pengurangan overhead sistem operasi dan penggunaan sumber daya yang lebih ringan daripada virtualisasi tradisional. | **Pengelolaan Jaringan**: Pengaturan jaringan untuk kontainer Docker bisa rumit, terutama ketika harus mengatur jaringan lintas host. |
| **Skalabilitas**: Docker memungkinkan aplikasi untuk dikemas sebagai layanan yang dapat dengan mudah diatur untuk berjalan pada beberapa kontainer, memfasilitasi skalabilitas horizontal dan pengelolaan aplikasi yang mudah. | **Pemantauan**: Pemantauan kontainer Docker dapat lebih rumit dibandingkan dengan lingkungan tradisional, memerlukan perhatian ekstra dalam mengelola kesehatan dan kinerja kontainer. |
| **Komunitas**: Docker memiliki komunitas yang luas yang membantu dalam perkembangan Docker itu sendiri. | **Pembelajaran Awal**: Docker memerlukan pemahaman konsep yang cukup untuk dapat menggunakannya secara efektif, yang mungkin memerlukan waktu untuk belajar bagi pengguna yang belum terbiasa dengan teknologi kontainer. |


### Tantangan Penggunaan Docker


## Sumber Referensi

- https://docs.docker.com.xy2401.com/engine/docker-overview/
- Bullington-McGuire, R., Dennis, A. K., & Schwartz, M. (2020). Docker For Developers. Packt.


