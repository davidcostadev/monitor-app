<template>
  <div id="app">
    <div id="header">
      <ul v-if="this.$route.path !== '/'"class="nav">
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/details"> Desempenho</router-link>
          <router-link to="/"> Sair</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    created() {
      window.console.log(this.$route);
    },
  };

</script>

<style>
  body {
    background-color: #111111;
    color: #eeeeee;
    font-family: tahoma, arial, sans-serif;
    margin: 0;
  }
  .monitor {
    width: 100%;
    height: 200px;
  }
  h4 {
    margin-bottom: 1px;
  }
  .nav {
    background: #1f1f1f;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
  }
  .nav a {
    color: #ccc;
    padding: 8px 12px;
    display: inline-block;
    text-decoration: none;
  }
  .nav a.router-link-exact-active {
    background: rgba(0, 0, 0, 0.3);
  }
  .block-slots {
    font-size: 0px;
    margin: 5px 0 0;
  }
  .slot {
    padding: 8px 12px;
    display: inline-block;
    background: #292929;
    font-size: 12px;
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .slot-virtual {
    color: aqua;
  }
  .slot-app {
    color: lime;
  }
  .block-info {
    display: flex;
    justify-content: space-between;
    background: #1f1f1f;
    font-size: 12px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  .block-info > div {
    padding: 8px;
  }

 /* @media (max-width: 600px) {
    .block-info {
      flex-direction: column;
    }
  }
*/




</style>
