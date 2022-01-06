import { createRouter, createWebHistory } from 'vue-router'
import Anggota from '../views/Anggota.vue'
import Beranda from '../views/Beranda.vue'
import Penjumlahan from '../views/Penjumlahan.vue';
import PenjumlahanMulti from '../views/PenjumlahanMulti.vue';
import Pengurangan from '../views/Pengurangan.vue';
import PenguranganMulti from '../views/PenguranganMulti.vue';
import Perkalian from '../views/Perkalian.vue';
import PerkalianMulti from '../views/PerkalianMulti.vue';
import Pembagian from '../views/Pembagian.vue';
import PembagianMulti from '../views/PembagianMulti.vue';
import Perpangkatan from '../views/Perpangkatan.vue';
import PerpangkatanMulti from '../views/PerpangkatanMulti.vue';
import Modulo from '../views/Modulo.vue';
import ModuloMulti from '../views/ModuloMulti.vue';
import Faktorial from '../views/Faktorial.vue';
import FaktorialMulti from '../views/FaktorialMulti.vue';
import Logaritma from '../views/Logaritma.vue';
import LogaritmaMulti from '../views/LogaritmaMulti.vue';
import TMpenjumlahan from '../views/TMpenjumlahan.vue';
import TMpengurangan from '../views/TMpengurangan.vue';
import TMperkalian from '../views/TMperkalian.vue';
import TMpembagian from '../views/TMpembagian.vue';
import TMfaktorial from '../views/TMfaktorial.vue';
import TMmodulo from '../views/TMmodulo.vue';
import TMperpangkatan from '../views/TMperpangkatan.vue';
import TMlogaritma from '../views/TMlogaritma.vue';

const routes = [
  {
    path: '/anggota',
    name: 'Anggota',
    component: Anggota
  },
  {
    path: '/',
    name: 'Beranda',
    component: Beranda
  },
  {
    path: "/penjumlahan",
    name: "TM penjumlahan",
    component: TMpenjumlahan,
  },
  {
    path: "/pengurangan",
    name: "TM Pengurangan",
    component: TMpengurangan,
  },
  {
    path: "/perkalian",
    name: "TM Perkalian",
    component: TMperkalian,
  },
  {
    path: "/pembagian",
    name: "TM Pembagian",
    component: TMpembagian,
  },
  {
    path: "/faktorial",
    name: "TM Faktorial",
    component: TMfaktorial,
  },
  {
    path: "/modulo",
    name: "TM Modulo",
    component: TMmodulo,
  },
  {
    path: "/perpangkatan",
    name: "TM Perpangkatan",
    component: TMperpangkatan,
  },
  {
    path: "/logaritma",
    name: "TM Logaritma",
    component: TMlogaritma,
  },
  {
    path: "/penjumlahan/standar",
    name: "Penjumlahan Standar",
    component: Penjumlahan,
  },
  {
    path: "/penjumlahan/multitrack",
    name: "Penjumlahan Multitrack",
    component: PenjumlahanMulti,
  },
  {
    path: "/pengurangan/standar",
    name: "Pengurangan Standar",
    component: Pengurangan,
  },
  {
    path: "/pengurangan/multitrack",
    name: "Pengurangan Multitrack",
    component: PenguranganMulti,
  },
  {
    path: "/perkalian/standar",
    name: "Perkalian Standar",
    component: Perkalian,
  },
  {
    path: "/perkalian/multitrack",
    name: "Perkalian Multitrack",
    component: PerkalianMulti,
  },
  {
    path: "/pembagian/standar",
    name: "Pembagian Standar",
    component: Pembagian,
  },
  {
    path: "/pembagian/multitrack",
    name: "Pembagian Multitrack",
    component: PembagianMulti,
  },
  {
    path: "/perpangkatan/standar",
    name: "Perpangkatan Standar",
    component: Perpangkatan,
  },
  {
    path: "/perpangkatan/multitrack",
    name: "Perpangkatan Multitrack",
    component: PerpangkatanMulti,
  },
  {
    path: "/modulo/standar",
    name: "Modulo Standar",
    component: Modulo,
  },
  {
    path: "/modulo/multitrack",
    name: "Modulo Multitrack",
    component: ModuloMulti,
  },
  {
    path: "/faktorial/standar",
    name: "Faktorial Standar",
    component: Faktorial,
  },
  {
    path: "/faktorial/multitrack",
    name: "Faktorial Multitrack",
    component: FaktorialMulti,
  },
  {
    path: "/logaritma/standar",
    name: "Logaritma Standar",
    component: Logaritma,
  },
  {
    path: "/logaritma/multitrack",
    name: "Logaritma Multitrack",
    component: LogaritmaMulti,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
