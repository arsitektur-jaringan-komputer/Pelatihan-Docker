## **CONTENTS**
* [**Docker Compose**](#docker-compose)
* [**Monitoring**](#monitoring)
* [**Docker Swarm**](#docker-swarm)

## Docker Compose
## Monitoring
Anda dapat memonitor resource yang digunakan oleh docker dengan `docker stats`. Berikut adalah beberapa command:
- ```docker stats```<br>
Mendapatkan informasi tentang penggunaan resource oleh tiap container secara realtime. Metrics yang didapatkan berupa CPU Usage (%), MEM Usage, Network Usage, Block Usage, dan PIDS.<br>
- ```docker stats --no-stream```<br>
Command diatas akan memberikan informasi resource pada saat ini (tidak realtime).

## Docker Swarm
