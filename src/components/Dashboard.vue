<template>

  <div v-for="machine in machineList">
    <div class="block-slots">
      <span v-for="virtual in machine.virtual" class="slot slot-virtual">{{virtual}}</span>
      <span v-for="app in machine.app" class="slot slot-app">{{app}}</span>
    </div>

    <canvas :id="`host${machine.id}Cpu`" class="monitor"></canvas>

    <div class="block-info">
      <div class="info-machine">Machine: {{machine.id}}</div>
      <div class="info-virtual">Virtual: {{machine.virtual.length}}</div>
      <div class="info-apps">Apps: {{machine.app.length}}</div>
      <div class="info-cpu">CPU:{{machine.cpu}}</div>
      <div id="info-memory">MEMORY{{machine.memory}}</div>
      <div :id="`info-cpu-usage${machine.id}`">0%</div>
      <div :id="`info-memory-usage${machine.id}`">0%</div>
      <!--<div class="info-memory-usage">{{machineInfo[machine.id].memory}}</div>-->

    </div>
  </div>

</template>

<script>
  export default {
    //
  };
</script>

<style>

</style>

