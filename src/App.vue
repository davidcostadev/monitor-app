<template>
  <div id="app">
    <div id="header">
      <ul class="nav">
        <li>
          <router-link to="/"> Detalhes</router-link>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
  };

</script>

<style>
  body {
    background-color: #111111;
    color: #eeeeee;
    font-family: tahoma, arial, sans-serif;
  }
  .monitor {
    width: 100%;
    height: 200px;
  }
  h4 {
    margin-bottom: 1px;
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
  .slot+.slot {

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

  @media (max-width: 600px) {
    .block-info {
      /*flex-direction: column;*/
    }
  }



</style>
