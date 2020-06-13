<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Game</router-link> |
      <router-link to="/high-scores">High Scores</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-top: 20px;
  padding-bottom: 10px;
}
#nav a {
  font-weight: bold;
  color: #ffffff;
}
#nav a.router-link-exact-active {
  color: #8b0000;
}
</style>
