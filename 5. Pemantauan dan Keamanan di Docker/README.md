# **Pemantauan dan Keamanan di Docker**
- [**Glosarium**](#glosarium)
- [**Materi**](#materi)
  - [Docker Monitoring](#️docker-monitoring)
    - [Pengertian Docker Monitoring](#pengertian-docker-monitoring)
    - [Alat Pemantauan di Docker](#alat-pemantauan-di-docker)
      - [Docker Stats](#docker-stats)
      - [Prometheus](#prometheus)
      - [Grafana](#grafana)
      - [cAdvisor](#cadvisor)
      - [Sysdig](#sysdig)
    - [Jenis-Jenis Docker Monitoring](#jenis-jenis-docker-monitoring)
      - [Pemantauan Penggunaan CPU](#pemantauan-penggunaan-cpu)
      - [Pemantauan Penggunaan Memory](#pemantauan-penggunaan-memory)
      - [Pemantauan Penggunaan Jaringan](#pemantauan-penggunaan-jaringan)
      - [Pemantauan Filesystem](#pemantauan-filesystem)
      - [Pemantauan Log](#pemantauan-log)
    - [Implementasi Docker Monitoring](#implementasi-docker-monitoring)
  - [Docker Security](#docker-security) 
    - [Pengertian Docker Security](#pengertian-docker-security)
    - [Ancaman Keamanan di Docker](#ancaman-keamanan-di-docker)
      - [Container Escape](#container-escape)
      - [Container Breakout](#container-breakout)
      - [Container Poisoning](#container-poisoning)
      - [Container Sprawl](#container-sprawl)
      - [Container Hijacking](#container-hijacking)
    - [Strategi Keamanan di Docker](#strategi-keamanan-di-docker)
      - [Pengaturan Kontrol Akses](#pengaturan-kontrol-akses)
      - [Konfigurasi Jaringan](#konfigurasi-jaringan)
      - [Manajemen Data dan Konfigurasi](#manajemen-data-dan-konfigurasi)
      - [Memperbarui Docker secara Teratur](#memperbarui-docker-secara-teratur)
- [**Sumber Referensi**](#sumber-referensi)

## Glosarium
## Materi
### Pengertian Docker Monitoring
Docker monitoring merujuk pada proses memantau dan menganalisis kinerja aplikasi yang dijalankan di dalam Docker Container. Docker monitoring melibatkan pengumpulan data dan metrik dari aplikasi yang dijalankan di dalam Docker Container, serta pemantauan sumber daya sistem yang digunakan oleh kontainer tersebut, seperti penggunaan CPU, memori, dan jaringan. Data ini kemudian dianalisis untuk memahami performa aplikasi dan untuk mengidentifikasi masalah atau kelemahan yang mempengaruhi performa.

Penggunaan alat monitoring Docker memungkinkan tim operasi untuk memantau kinerja aplikasi secara real-time, mendeteksi masalah dan mendiagnosa root cause, serta membuat keputusan berdasarkan data yang terkumpul. Dengan melakukan docker monitoring secara teratur, ini dapat memastikan bahwa sistem yang menggunakan teknologi Docker berjalan dengan lancar, memenuhi kebutuhan performa dan keamanan, serta menghindari terjadinya masalah yang dapat mempengaruhi bisnis Anda.

### Alat Pemantauan di Docker
Dalam praktiknya, docker monitoring dapat dilakukan dengan menggunakan berbagai alat dan layanan yang akan dijelaskan di bawah ini.

#### Docker Stats
Docker Stats adalah sebuah perintah dalam Docker CLI (Command Line Interface) yang digunakan untuk memantau penggunaan sumber daya sistem pada setiap kontainer yang berjalan di sebuah host Docker. Perintah Docker Stats memberikan informasi seperti penggunaan CPU, memori, I/O disk, dan jaringan pada kontainer Docker.

Docker Stats dapat digunakan untuk memantau kinerja aplikasi di dalam kontainer, mengidentifikasi masalah yang mempengaruhi performa, dan untuk menentukan waktu untuk mengubah konfigurasi sistem atau skala aplikasi. Informasi yang diberikan oleh Docker Stats juga dapat digunakan untuk menganalisis dan memperbaiki masalah kinerja pada aplikasi dan memastikan penggunaan sumber daya yang optimal pada host Docker.

Perintah Docker Stats dapat dijalankan dengan menjalankan perintah `docker stats` di terminal. Perintah ini akan menampilkan daftar semua kontainer yang sedang berjalan di host Docker, beserta informasi penggunaan sumber daya sistem yang terkait. Selain itu, Docker Stats juga dapat diberikan opsi seperti `--no-stream` untuk menampilkan informasi dalam format yang lebih ringkas, atau opsi `--format` untuk menentukan format output yang dihasilkan.

#### Prometheus
Prometheus adalah salah satu alat open-source yang digunakan dalam Docker monitoring untuk memantau dan mengumpulkan metrik pada lingkungan Docker. Prometheus menyediakan platform monitoring dan alerting yang kuat dengan model data fleksibel dan query language yang ekspresif. Dalam lingkungan Docker, Prometheus dapat digunakan untuk memantau kinerja aplikasi dan infrastruktur yang berjalan dalam kontainer Docker.

Prometheus dapat bekerja dengan berbagai jenis aplikasi dan layanan yang dijalankan di dalam kontainer Docker, dan dapat mengumpulkan data metrik dari berbagai sumber, termasuk layanan yang dijalankan di dalam kontainer, host Docker, atau bahkan lingkungan yang lebih luas. Metrik yang dikumpulkan oleh Prometheus dapat digunakan untuk memantau performa aplikasi secara real-time, menganalisis kecenderungan kinerja dari waktu ke waktu, dan mengidentifikasi masalah yang mempengaruhi performa.

Prometheus juga dapat digunakan untuk menghasilkan alert ketika metrik tertentu mencapai ambang batas tertentu, atau ketika terjadi perubahan yang signifikan dalam kinerja aplikasi. Alert ini dapat disampaikan melalui berbagai saluran, termasuk email, Slack, atau platform alerting lainnya.

Untuk mengintegrasikan Prometheus dalam lingkungan Docker, dapat digunakan beberapa tools seperti Docker Compose, Docker Swarm, atau Kubernetes. Selain itu, Prometheus juga menyediakan library client yang dapat digunakan dalam aplikasi yang dijalankan di dalam kontainer Docker, sehingga memungkinkan aplikasi untuk langsung mengirimkan metrik ke Prometheus.

#### Grafana

![Grafana](img/docker-grafana.png)
Grafana adalah platform open-source untuk memvisualisasikan dan memantau data dari berbagai sumber, termasuk lingkungan Docker. Dalam lingkungan Docker monitoring, Grafana digunakan untuk memvisualisasikan data metrik yang dikumpulkan oleh alat monitoring seperti Prometheus.

Grafana menyediakan berbagai jenis visualisasi, termasuk grafik garis, grafik batang, heatmap, dan tabel. Visualisasi ini dapat digunakan untuk memperlihatkan tren kinerja aplikasi dari waktu ke waktu, menganalisis keterkaitan antara berbagai metrik, dan mengidentifikasi masalah yang mempengaruhi performa.

Selain itu, Grafana juga menyediakan kemampuan untuk membuat dashboard, yang memungkinkan untuk memperlihatkan informasi metrik yang penting dalam satu tampilan yang terpadu. Dashboard dapat disesuaikan dan dikonfigurasi dengan berbagai jenis panel visualisasi, dan dapat berisi informasi metrik dari berbagai sumber.

Dalam lingkungan Docker monitoring, Grafana biasanya diintegrasikan dengan alat monitoring seperti Prometheus sehingga dapat memanfaatkan data metrik yang telah dikumpulkan. Grafana dapat diintegrasikan dengan mudah dengan platform seperti Docker Compose, Docker Swarm, atau Kubernetes, dan dapat digunakan bersama dengan alat monitoring lainnya seperti Alertmanager untuk menghasilkan alert ketika terjadi perubahan yang signifikan dalam kinerja aplikasi.

Grafana juga menyediakan banyak plugin dan integrasi dengan berbagai layanan dan platform yang berbeda, sehingga memungkinkan untuk mengintegrasikan dengan berbagai sumber data lainnya, termasuk basis data, layanan cloud, dan alat monitoring lainnya.

#### cAdvisor
cAdvisor (Container Advisor) adalah alat open-source yang dikembangkan oleh Google yang digunakan dalam Docker monitoring untuk memantau dan mengumpulkan metrik performa pada setiap kontainer Docker yang berjalan di dalam sebuah host. cAdvisor dirancang khusus untuk mengumpulkan data metrik seperti penggunaan CPU, memori, jaringan, dan I/O disk pada setiap kontainer Docker dan mengirimkannya ke alat monitoring seperti Prometheus atau Grafana untuk dianalisis.

cAdvisor berjalan sebagai sebuah layanan di dalam host Docker, dan secara otomatis memantau setiap kontainer Docker yang berjalan di host tersebut. Alat ini juga dapat mengumpulkan metrik dari host Docker sendiri, seperti penggunaan CPU dan memori, yang memungkinkan pengguna untuk memperoleh gambaran lengkap tentang performa seluruh lingkungan Docker.

Selain memantau performa, cAdvisor juga dapat memberikan informasi mengenai konfigurasi dan pengaturan pada setiap kontainer Docker, seperti port yang terbuka, volume yang digunakan, dan image yang digunakan untuk menjalankan kontainer. Informasi ini sangat berguna untuk membantu dalam mengelola lingkungan Docker, terutama ketika diperlukan untuk melakukan analisis masalah yang terkait dengan kinerja dan konfigurasi aplikasi.

cAdvisor juga mendukung beberapa fitur seperti HTTP API untuk mengambil data metrik dari kontainer dan host Docker secara programatik, dukungan untuk berbagai jenis sistem file yang berbeda, serta kemampuan untuk membatasi penggunaan sumber daya sistem pada kontainer Docker.

Dalam lingkungan Docker monitoring, cAdvisor sering digunakan bersama dengan alat monitoring lainnya seperti Prometheus dan Grafana untuk memantau performa aplikasi dan infrastruktur secara efektif. Alat ini juga dapat digunakan untuk membuat tindakan pemulihan otomatis ketika terjadi masalah pada performa aplikasi.

#### Sysdig
Sysdig adalah alat open-source yang digunakan dalam Docker monitoring untuk memantau sistem dan aplikasi pada kontainer Docker. Alat ini berjalan pada level kernel di host, sehingga memungkinkan pengguna untuk memantau seluruh sistem operasi yang berjalan di dalam lingkungan Docker, termasuk aplikasi dan layanan yang dijalankan di setiap kontainer Docker.

Sysdig dapat memantau banyak metrik yang berbeda, seperti penggunaan CPU dan memori, aktivitas I/O disk dan jaringan, serta aktivitas sistem seperti penggunaan sistem file dan jaringan. Selain itu, Sysdig juga dapat digunakan untuk memantau keamanan dan kepatuhan Docker, seperti pengawasan akses user pada setiap kontainer Docker dan deteksi aktivitas yang mencurigakan.

Sysdig dapat digunakan bersama dengan alat monitoring seperti Prometheus dan Grafana untuk memantau dan menganalisis data metrik performa dan keamanan pada lingkungan Docker secara efektif. Selain itu, Sysdig juga dapat menghasilkan laporan dan alert ketika terjadi masalah atau aktivitas mencurigakan pada lingkungan Docker.

Keunggulan Sysdig di antara alat monitoring Docker lainnya adalah kemampuannya untuk memantau aktivitas pada level kernel dan aplikasi di setiap kontainer Docker, sehingga memungkinkan pengguna untuk memperoleh gambaran yang lebih lengkap tentang performa dan keamanan seluruh lingkungan Docker. Selain itu, Sysdig juga dapat digunakan pada berbagai sistem operasi, termasuk Linux, Windows, dan Mac OS, sehingga dapat diimplementasikan pada lingkungan Docker yang beragam dan kompleks.

### Jenis-Jenis Docker Monitoring
#### Pemantauan Penggunaan CPU
Pemantauan Penggunaan CPU adalah proses memantau seberapa banyak sumber daya CPU yang digunakan oleh sistem atau aplikasi pada suatu waktu tertentu. CPU (Central Processing Unit) adalah salah satu komponen penting dalam sebuah sistem komputer yang bertugas untuk mengeksekusi instruksi yang diberikan oleh aplikasi atau sistem operasi.

Dalam konteks teknologi informasi, Pemantauan Penggunaan CPU biasanya digunakan untuk memantau kinerja suatu sistem atau aplikasi, dan dapat membantu mengidentifikasi masalah kinerja atau bottleneck yang terjadi pada sistem tersebut. Pemantauan ini dapat dilakukan pada level hardware, seperti server atau komputer, atau pada level software, seperti aplikasi atau service yang berjalan pada sistem tersebut.

Pemantauan Penggunaan CPU dapat dilakukan dengan menggunakan tools atau software monitoring yang khusus dirancang untuk tujuan tersebut. Beberapa tools monitoring populer untuk pemantauan penggunaan CPU meliputi Grafana, Nagios, Zabbix, dan Prometheus.

Dalam praktiknya, pemantauan penggunaan CPU dilakukan dengan memantau beberapa parameter kunci, seperti persentase penggunaan CPU, load average, dan CPU utilization. Dengan memantau parameter-parameter ini secara teratur, kita dapat mengidentifikasi kapan terjadi puncak penggunaan CPU, kapan terjadi bottleneck, dan kapan diperlukan untuk menambah kapasitas CPU untuk menjaga kinerja sistem atau aplikasi tetap optimal.

#### Pemantauan Penggunaan Memory
Memantau penggunaan memory pada Docker sangat penting karena memory adalah sumber daya yang sangat kritis dalam lingkungan Docker. Ketika container berjalan, itu harus mengalokasikan sejumlah memory untuk menjalankan aplikasi di dalamnya. Jika container kekurangan memory, performa aplikasi dapat menurun, dan dalam kasus ekstrim, dapat menyebabkan kegagalan aplikasi atau bahkan crash.

Docker menyediakan alat untuk memantau penggunaan memory pada container dengan menggunakan Docker stats command. Command ini dapat memberikan informasi terkini mengenai penggunaan CPU, memory, disk I/O, dan jaringan dari container Docker yang sedang berjalan.

Selain itu, terdapat juga tool pihak ketiga yang dapat digunakan untuk memantau penggunaan memory pada Docker, seperti Prometheus dan Grafana. Kedua tool ini dapat digunakan untuk memantau berbagai aspek dari performa aplikasi Docker, termasuk penggunaan memory.

Dalam pemantauan penggunaan memory pada Docker, penting untuk memantau penggunaan memory pada tingkat host dan tingkat container. Memantau penggunaan memory pada tingkat host dapat membantu menentukan seberapa banyak memory yang tersedia untuk menjalankan container, sementara memantau penggunaan memory pada tingkat container dapat membantu menentukan seberapa banyak memory yang digunakan oleh aplikasi di dalam container.


#### Pemantauan Penggunaan Jaringan
Dalam konteks Docker Monitoring, pemantauan penggunaan jaringan pada container Docker sangat penting untuk memastikan aplikasi berjalan dengan lancar dan aman. Penggunaan jaringan pada Docker dapat mempengaruhi performa dan kinerja aplikasi, dan memastikan keamanan jaringan dalam lingkungan Docker juga menjadi hal yang sangat penting.

Untuk memantau penggunaan jaringan pada container Docker, Docker menyediakan beberapa alat bawaan, seperti Docker Stats Command. Command ini dapat memberikan informasi terkini mengenai penggunaan jaringan dari container Docker yang sedang berjalan. Informasi tersebut dapat mencakup jumlah paket yang diterima dan dikirim, bandwidth, dan jumlah kesalahan yang terjadi.

Selain itu, terdapat juga tool pihak ketiga yang dapat digunakan untuk memantau penggunaan jaringan pada Docker, seperti Prometheus dan Grafana. Kedua tool ini dapat digunakan untuk memantau berbagai aspek dari performa aplikasi Docker, termasuk penggunaan jaringan.

Dalam pemantauan penggunaan jaringan pada Docker, penting untuk memantau koneksi masuk dan keluar dari container. Hal ini dapat membantu memastikan bahwa aplikasi berinteraksi dengan jaringan secara efektif dan aman. Selain itu, perlu juga memantau lalu lintas jaringan dan menganalisis data lalu lintas tersebut untuk mendeteksi adanya serangan atau masalah jaringan lainnya.

Selain itu, dapat pula melakukan pengaturan jaringan dengan membatasi akses pada container Docker menggunakan Docker Network. Docker Network menyediakan kontrol akses jaringan yang lebih baik dan memungkinkan pengaturan jaringan yang lebih fleksibel, seperti memisahkan lalu lintas jaringan antara beberapa container atau membatasi koneksi jaringan ke host.
 
#### Pemantauan Filesystem
Pemantauan Filesystem pada Docker Monitoring merujuk pada pemantauan sistem file yang digunakan oleh container Docker. Sistem file pada Docker adalah bagian penting dari container, karena berisi semua file dan data yang diperlukan untuk menjalankan aplikasi.

Dalam pemantauan Filesystem pada Docker, perlu untuk memantau penggunaan ruang disk pada container Docker untuk memastikan bahwa tidak ada kehabisan ruang disk yang dapat menyebabkan aplikasi crash atau kegagalan lainnya. Docker Stats Command juga dapat digunakan untuk memantau penggunaan ruang disk pada container Docker.

Selain itu, perlu juga memantau perubahan pada file sistem, seperti perubahan pada file konfigurasi atau data aplikasi. Docker menyediakan fitur log dan audit untuk memantau perubahan ini.

Dalam beberapa kasus, memantau file sistem dapat membantu mendeteksi serangan keamanan pada container Docker. Sebagai contoh, memantau perubahan pada file konfigurasi atau sistem file pada container Docker dapat membantu mendeteksi adanya perubahan yang tidak sah dan mengambil tindakan yang diperlukan.

Untuk memantau file sistem pada container Docker, terdapat juga tool pihak ketiga yang dapat digunakan, seperti Sysdig dan Fluentd. Kedua tool ini dapat digunakan untuk memantau berbagai aspek dari sistem file pada container Docker, termasuk penggunaan ruang disk dan perubahan pada file sistem.

Dalam pemantauan Filesystem pada Docker, penting juga untuk melakukan backup secara teratur dan mengatur mekanisme pengelolaan data agar data tidak hilang atau rusak pada saat pemindahan container ke lingkungan lain. Hal ini dapat dilakukan dengan melakukan backup data secara teratur dan mengelola data menggunakan layanan penyimpanan data yang aman dan andal.

#### Pemantauan Log
Pemantauan Log pada Docker Monitoring merujuk pada pemantauan catatan log yang dihasilkan oleh container Docker. Log pada Docker sangat penting untuk memastikan bahwa aplikasi berjalan dengan lancar dan aman, dan untuk membantu mengidentifikasi dan memecahkan masalah yang mungkin terjadi pada aplikasi.

Dalam pemantauan log pada Docker, perlu untuk memastikan bahwa log yang dihasilkan oleh container Docker dikumpulkan dan disimpan dengan baik. Docker menyediakan fitur logging bawaan yang dapat digunakan untuk memantau dan mengumpulkan log dari container Docker.

Selain itu, terdapat juga tool pihak ketiga seperti Fluentd dan ELK Stack yang dapat digunakan untuk memantau log pada Docker dengan lebih efektif. Kedua tool ini dapat mengumpulkan log dari beberapa container Docker secara bersamaan dan melakukan analisis log yang lebih kompleks.

Dalam pemantauan log pada Docker, penting juga untuk memastikan bahwa log disimpan dengan aman dan dapat diakses oleh orang yang berwenang. Hal ini dapat dilakukan dengan menggunakan sistem otentikasi dan otorisasi yang tepat untuk mengontrol akses ke log.

Pemantauan log pada Docker juga dapat membantu dalam mendeteksi serangan keamanan pada container Docker. Dalam beberapa kasus, penyerang dapat meninggalkan jejak pada log yang dapat digunakan untuk mendeteksi adanya serangan atau kebocoran data.

Selain itu, pemantauan log pada Docker juga dapat membantu dalam pemecahan masalah pada aplikasi. Dengan memantau log yang dihasilkan oleh container Docker, dapat membantu mengidentifikasi masalah pada aplikasi dan mengambil tindakan yang diperlukan untuk memperbaiki masalah tersebut.

Dalam kesimpulannya, pemantauan log pada Docker Monitoring sangat penting untuk memastikan bahwa aplikasi berjalan dengan lancar dan aman, dan untuk membantu mengidentifikasi dan memecahkan masalah yang mungkin terjadi pada aplikasi.

### Implementasi Docker Monitoring

## Sumber Referensi
- https://docs.docker.com/engine/reference/commandline/stats/
- https://docs.docker.com/engine/security/
- https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html