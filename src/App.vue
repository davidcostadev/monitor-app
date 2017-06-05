<template>
  <div id="app">
    <!--<router-view></router-view>-->

    <div>

    </div>

    <h1>CPU Load</h1>

    <h4>Maquina 1</h4>
    <canvas id="host1Cpu" class="monitor"></canvas>

    <h4>Maquina 2</h4>
    <canvas id="host2Cpu" class="monitor"></canvas>

    <!--<h4>host3.example.com</h4>
        <canvas id="host3Cpu" width="500" height="100"></canvas>

        <h4>host4.example.com</h4>
        <canvas id="host4Cpu" width="500" height="100"></canvas>-->

    <p>
      <em>This is fake data.</em>
    </p>

  </div>
</template>

<script>

import { SmoothieChart, TimeSeries } from 'smoothie';
import SocketMotor from './socket';
import config from './config';

// window.console.log(SmoothieChart, TimeSeries);

function MachineChat(host) {
  const seriesOptions = [
    { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.1)', lineWidth: 3 },
    { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.1)', lineWidth: 3 },
  ];


  const cpuLine = new TimeSeries();
  const memoryLine = new TimeSeries();

  const timeline = new SmoothieChart({
    millisPerPixel: 100,
    maxValue: 100,
    minValue: 0,
    responsive: true,
    grid: {
      strokeStyle: '#555555',
      lineWidth: 1,
      millisPerLine: 5000,
      verticalSections: 4,
      // millisPerLine: 6000,
    },
  });

  timeline.addTimeSeries(cpuLine, seriesOptions[0]);
  timeline.addTimeSeries(memoryLine, seriesOptions[1]);

  // console.log(`${host}Cpu`);
  timeline.streamTo(document.getElementById(`${host}Cpu`), 1000);

  return {
    cpuLine,
    memoryLine,
  };
}

// const machines = {};

// machines['2'] = MachineChat('host2');

// const io = require('socket.io-client');

const Socket = new SocketMotor(config.ip);


export default {
  name: 'app',
  data() {
    return {
      machines: {},
    };
  },
  mounted() {
    Socket.connect(() => {
      window.console.log('connect');

      this.machines['1'] = MachineChat('host1');
      this.machines['2'] = MachineChat('host2');
    });

    Socket.getCpu((data) => {
       // window.console.log(data);

      if (typeof this.machines[data.machine] !== 'undefined') {
        this.machines[data.machine].cpuLine.append(new Date().getTime(), data.cpu);
      }
    });

    Socket.getMemory((data) => {
      // window.console.log(data);

      if (typeof this.machines[data.machine] !== 'undefined') {
        this.machines[data.machine].memoryLine.append(new Date().getTime(), data.memory);
      }
    });
  },
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
</style>
