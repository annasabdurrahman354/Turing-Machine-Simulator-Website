<template>
  <div id="nav" class="mb-6">
    <router-link to="/">Beranda</router-link> |
    <router-link to="/anggota">Anggota</router-link>
  </div>
  <router-view/>
</template>

<script>
export default {
  name: 'Apps',
  components:{

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
#nav {
  padding-top: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
  --tw-gradient-from: #34d399;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(52, 211, 153, 0));
  --tw-gradient-to: #3b82f6;
}
</style>
