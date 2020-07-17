<template>
  <div id="app">
    <span class="d-flex flex-row" style="justify-content: space-between">
      <h2 style="padding: 8px 0px 0px 8px;">
        <strong style="color: blue">Blue</strong> 2 <strong style="color: red">Red</strong>
      </h2>
      <img src="../public/blue2red.png" style="max-height: 50px; padding-right: 8px;" />
    </span>
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
