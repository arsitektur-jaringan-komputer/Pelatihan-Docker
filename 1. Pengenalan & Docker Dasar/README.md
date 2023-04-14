# **Pengenalan & Docker Dasar**
- [**Glosarium**](#glosarium)
- [**Pengenalan & Docker Dasar**](#pengenalan-docker-dasar)
  - [Host Filesystem Pollution Problem](#️-apa-itu-docker)
  - [Containerization vs Virtualization](#-containerization-vs-virtualization)
  - [Apa itu Docker?](#-apa-itu-docker?)
  - [Arsitektur Docker](#-arsitektur-docker)
  - [Kelebihan dan Kekurangan Docker](#-kelebihan-dan-kekurangan-docker)
  - [Tantangan Penggunaan Docker](#-tantangan-penggunaan-docker)
- [**Sumber**](#-sumber)

## Glosarium
| Kata | Pengertian |
| -------- | -------- |
| Guest operating system  | sistem operasi yang berjalan di virtual mesin  |
| Host operating system  | sistem operasi yang berjalan di workstation  |

## Introduction

### Host Filesystem Pollution Problem
Pernahkan kalian over time karena banyaknya software yang diinstall di laptop padahal tidak semuanya digunakan ? Atau pernahkah menggunakan software yang sama tapi digunakan ke berbeda versi sehingga harus switching ke versi tertentu ? Itulah contoh beberapa kasus dari Host Filesystem Pollution Problem merujuk pada akumulasi file, folder, atau perubahan konfigurasi yang terjadi dalam sistem operasi host akibat instalasi perangkat lunak yang berlebihan atau tidak teratur. Dalam lingkungan pengembangan perangkat lunak, sering kali diperlukan pengujian atau penggunaan banyak perangkat lunak dan dependensi yang berbeda. Akibatnya, sistem operasi host dapat menjadi tidak teratur, berantakan, atau tidak stabil, karena instalasi yang berlebihan atau saling bertentangan dari perangkat lunak yang digunakan.

### Virtualization vs Containerization
A. Virtualization
B. Containerization 


### Apa itu Docker ?

### Arsitektur Docker

![dockermeme](https://user-images.githubusercontent.com/11045113/151545292-42eb0377-297e-4cfc-a02b-00a44bee3316.jpg)

### Kelebihan dan Kekurangan Docker
#### Kelebihan Docker
1. Portabilitas: Kontainer Docker dapat dijalankan di berbagai lingkungan, termasuk lingkungan pengembangan, uji coba, dan produksi, tanpa perlu khawatir tentang perbedaan konfigurasi atau dependensi.

2. Isolasi: Kontainer Docker menyediakan isolasi yang kuat antara aplikasi yang berjalan di dalamnya, sehingga mengurangi potensi konflik atau gangguan antara aplikasi yang berbeda.

3. Skalabilitas: Docker memungkinkan aplikasi untuk dijalankan secara horizontal, dengan kemampuan untuk mengelola dan mengatur jumlah kontainer yang berjalan sesuai dengan kebutuhan aplikasi.

4. Efisiensi Sumber Daya: Docker memungkinkan penggunaan sumber daya yang efisien, karena kontainer dapat berbagi kernel sistem operasi yang sama, mengurangi overhead sistem operasi yang diperlukan untuk setiap kontainer.

5. Pengelolaan Konfigurasi: Docker menyediakan alat untuk mengelola konfigurasi aplikasi sebagai kode, memungkinkan pengelolaan konfigurasi yang konsisten dan terdokumentasi dalam kode sumber aplikasi.

6. Ekosistem Luas: Docker memiliki ekosistem yang luas dan aktif, dengan banyak perangkat tambahan dan integrasi dengan alat-alat lain yang umum digunakan dalam pengembangan dan manajemen aplikasi.

#### Kekurangan Docker
1. Kompleksitas Konfigurasi: Docker memiliki konfigurasi yang kompleks, terutama untuk aplikasi yang lebih kompleks atau dengan kebutuhan jaringan yang rumit.

2. Keamanan: Pengaturan keamanan Docker yang salah atau tidak benar dapat memperkenalkan risiko keamanan, seperti kerentanan terhadap akses yang tidak sah atau perpindahan data antar kontainer.

3. Kompatibilitas Aplikasi: Aplikasi yang dijalankan dalam kontainer Docker harus kompatibel dengan lingkungan Docker, dan tidak semua aplikasi dapat dijalankan tanpa modifikasi dalam kontainer Docker.

4. Pengelolaan Data: Pengelolaan data dalam kontainer Docker dapat menjadi tantangan, termasuk pengelolaan penyimpanan data dalam kontainer yang berjalan dan pengelolaan data persisten di luar kontainer.

5. Monitoring dan Manajemen: Monitoring dan manajemen kontainer Docker dalam skala besar dapat kompleks, termasuk pengelolaan banyak kontainer, pengelolaan jaringan, dan pemantauan kinerja aplikasi yang berjalan dalam kontainer.

### Tantangan Penggunaan Docker


## Sumber

