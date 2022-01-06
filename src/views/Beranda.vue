<template>
  <div class="">
    <div class="bg-gray-200 flex flex-col justify-center items-center">
      <div class="text-5xl font-bold">
        <span class="bg-clip-text text-transparent bg-gradient-to-r to-green-400 from-blue-500 filter drop-shadow">
          Turing Machine
        </span>
      </div>
      <div class="my-10 bg-gradient-to-r from-green-400 to-blue-500 shadow-inner rounded rounded-xl">
        <div class=" grid grid-cols-2 justify-center items-stretch gap-6 py-6 px-6">
          <router-link to="/penjumlahan/">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Penjumlahan</button>
          </router-link>
          <router-link to="/pengurangan/">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Pengurangan</button>
          </router-link>
          <router-link to="/perkalian/">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Perkalian</button>
          </router-link>
          <router-link to="/pembagian/">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Pembagian</button>
          </router-link>
          <router-link to="/perpangkatan/multitrack">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Perpangkatan</button>
          </router-link>
          <router-link to="/faktorial/">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Faktorial</button>
          </router-link>
          <router-link to="/modulo/multitrack">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Modulo</button>
          </router-link>
          <router-link to="/logaritma/">
            <button class="btn-a text-gray-500 bg-white font-medium text-lg  ring-offset-blue-50">Logaritma</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Beranda',
  components: {
    
  },
  data() {
    return {
      isStandard: 0
    }
  },
}
//router-link-active
</script>

<style scoped>

</style>