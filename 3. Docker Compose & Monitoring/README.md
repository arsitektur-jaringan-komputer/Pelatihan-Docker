# **Docker Compose & Monitoring**
- [**Docker Compose & Monitoring**](#docker-compose--monitoring)
  - [Docker Compose](#docker-compose)
  - [Monitoring](#monitoring)
  - [Docker Swarm](#docker-swarm)

## Docker Compose
## Monitoring
Dalam penggunaan docker, kita dapat memonitor/memantau resource yang digunakan oleh docker. Docker memberikan beberapa command untuk melakukan hal tersebut. Monitoring resource sangatlah penting agar anda dapat mengetahui batasan perangkat anda dan dengan demikian anda dapat menghindar dari crash. Hal-hal yang perlu dimonitor disebut `metrics` pada modul ini. Metrics yang perlu diperhatikan secara umum adalah storage, memory, CPU Utilization, dan I/O Speed baik network maupun disk.

Anda dapat memonitor resource memory, CPU Util dan IO yang digunakan oleh docker dengan `docker stats`. Berikut adalah beberapa command:
- ```docker stats```<br>
Mendapatkan informasi tentang penggunaan resource oleh tiap container secara realtime. Metrics yang didapatkan berupa CPU Usage (%), MEM Usage, Network Usage, Block Usage, dan PIDS.<br>
- ```docker stats --no-stream```<br>
Command diatas akan memberikan informasi resource pada saat ini (tidak realtime). Dengan option `no-stream` anda diberikan kebebasan untuk membuat scheduler anda sendiri.

Anda dapat memonitor storage yang digunakan oleh Docker Image maupun Docker Container dengan `docker system`. Terdapat berbagai command untuk monitoring storage.
- ```docker system df```<br>
Menampilkan storage yang digunakan untuk masing-masing image dan container

- ```docker system prune```<br>
Command diatas menghapus image dan container yang sudah tidak berjalan. Image yang dihapus adalah image yang tidak digunakan di container manapun. Dengan `docker system prune` anda dapat mengklaim kembali storage. Hati-hati menggunakan docker system prune, karena mungkin saja karena kesalahan konfigurasi akan menghapus image yang masih anda perlukan.

Referensi: https://docs.docker.com/engine/reference/commandline/system/

## Docker Swarm
