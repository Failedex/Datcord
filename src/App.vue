<template>
  <div>
    <img src="../public/Datcord.png" alt="beautiful logo" id="logo">
    <nav>
      <router-link to="/">Chat</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: red;
}

#logo {
  position: fixed;
  top: 5px;
  left: 5px;
  width: 80px;
  height: 80px;
}
</style>
