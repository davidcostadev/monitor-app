<template>
  <div id="app">
    <!--<router-view></router-view>-->

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

  </div>
</template>

<script>

import { SmoothieChart, TimeSeries } from 'smoothie';
import SocketMotor from './socket';
import config from './config';
import machineList from './machines.json';


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

  timeline.streamTo(document.getElementById(`${host}Cpu`), 1000);

  return {
    cpuLine,
    memoryLine,
  };
}


const Socket = new SocketMotor(config.ip);


// function findMachine(machines, id, callback) {
//   let idFind = 0;

//   for (let i = 0; machines.length; i += 1) {
//     if (machines[i].id === id) {
//       idFind = id;
//       break;
//     }
//   }

//   if (idFind === 0) {
//     return;
//   }

//   callback(id);
// }

export default {
  name: 'app',
  data() {
    return {
      machineList,
      machines: {},
      machineInfo: {},
    };
  },
  mounted() {
    Socket.connect(() => {
      // window.console.log('connect');

      this.machineList.forEach((machine) => {
        this.machines[machine.id] = MachineChat(`host${machine.id}`);
        this.machineInfo[machine.id] = { memory: null, cpu: null };

        window.console.log(this.machineInfo);
      });

      Socket.getCpu((data) => {
        if (typeof this.machines[data.machine] !== 'undefined') {
          this.machines[data.machine].cpuLine.append(new Date().getTime(), data.cpu);
          // this.machineInfo[data.machine].cpu = data.cpu;
          document.getElementById(`info-cpu-usage${data.machine}`).innerHTML = `CPU USAGE: ${data.cpu}%`;
        }
      });

      Socket.getMemory((data) => {
        if (typeof this.machines[data.machine] !== 'undefined') {
          this.machines[data.machine].memoryLine.append(new Date().getTime(), data.memory);
          document.getElementById(`info-memory-usage${data.machine}`).innerHTML = `Memory USAGE: ${data.memory}%`;
        }
      });
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
