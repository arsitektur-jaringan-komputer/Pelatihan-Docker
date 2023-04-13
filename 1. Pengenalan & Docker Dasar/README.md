# **Pengenalan & Docker Dasar**
- [**Pengenalan & Docker Dasar**](#pengenalan--docker-dasar)
  - [Apa itu docker?](#️-apa-itu-docker)
  - [Arsitektur Docker](#-arsitektur-docker)
  - [Containerization vs Virtualization](#-arsitektur-docker)
  - [Dockerfile](#-dockerfile)
  - [Docker Hub](#-docker-hub)
  - [Sumber](#-sumber)

## Introduction

### Host Filesystem Pollution Problem
1. intinya kalau tanpa menggunakan docker atau vm, komputer bakal tercemari dengan banyaknya software yang udah tidak dipakai dll

Disini dijelasin:
1. latar belakang permasalahan umum seorang developer
    1.1. over time yang diakibatkan dari banyaknya software yang di install di workstationnya padahal gak semuanya digunakan sehingga harus reinstall / reformat
    1.2. perbedaan versi software, semisal sudah menggunakan nodejs v10 kamu harus switch dulu ke v12 kalau mau ganti versi
2. bagaimana docker menyelesaikan permasalahan pada poin 1
    2.1. software yang diinstall disimpan di virtual machine atau filesystem container yang terpisah

### How to solve ?
1. Virtualization
    1.1. ada banyak virtual machine yang dapat digunakan seperti parallels (macOS), KVM/QEMU (Linux), VMMare, Virtualbox. pada kali ini akan dicontohkan penggunaan virtualbox
2. Containerization

### Virtualization vs Containerization
1. permasalahan di virtualization adalah memakan banyak ram dan lain-lain 


### Arsitektur Docker
Dengan docker kita mendapatkan:
- Abstraksi OS level dengan penggunakan sumber daya optimal
- Interoperabilitas antara berbagai macam sistem operasi
- Proses build dan test yang lebih efisien
- Eksekusi program lebih cepat

meme docker:

![dockermeme](https://user-images.githubusercontent.com/11045113/151545292-42eb0377-297e-4cfc-a02b-00a44bee3316.jpg)

### Kelebihan dan Kekurangan Docker
##### Kelebihan Docker
##### Kekurangan Docker


## Sumber

