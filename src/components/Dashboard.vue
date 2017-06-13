<template>
  <div id="dashboard-page">
    <div class="header-page">WhatsFácil Status</div>
    <div class="numbers">
      <div v-for="number in numbers" v-bind:class="`card-number ${numbers_status[number.number].status}`">

        <div class="card-number-content">
          <div class="card-number-machine">{{number.maquine}}</div>
          <div v-if="numbers_status[number.number].status === 'esperando'">ok</div>
          <div v-else-if="numbers_status[number.number].status === 'ok'">move</div>
          <div v-else>{{numbers_status[number.number].status}}</div>

          <div class="card-number-time">{{numbers_status[number.number].time}}</div>
        </div>
        <div class="card-number-name">{{number.name}}</div>
        <div class="card-number-number">{{number.number}}</div>
      </div>
    </div>
  </div>


</template>

<script>
  import SocketMotor from '../socket';
  import config from '../config';
  import numbers from '../numbers.json';
  import { getHora } from '../helpers/Common';

  const Socket = new SocketMotor(config.ip);

  export default {
    data() {
      return {
        number_status_socket: {},
        numbers,
      };
    },
    computed: {
      numbers_status() {
        const status = {};

        this.numbers.forEach((number) => {
          status[number.number] = {
            status: 'off',
            time: '-',
          };
        });


        for (const number in this.number_status_socket) {
          let element = this.number_status_socket[number];
          status[number] = element;
        }

        return status;
      },
    },
    mounted() {
      Socket.connect(() => {
        window.console.log('connected');

        Socket.getStatsClient((data) => {
          const old = JSON.parse(JSON.stringify(this.number_status_socket));

          old[data.number] = {
            status: data.status,
            time: getHora(data.time),
          };

          this.number_status_socket = old;
          // window.console.log(data);
        });
      });
    },
  };
</script>

<style>
  .header-page {
    text-align: center;
    font-size: 26px;
    margin: 30px 0;
  }

  @media (min-width: 400px) {
    .header-page {
      font-size: 48px;
    }
  }

  .numbers {
    display: flex;
    flex-flow: row wrap;
    text-align: center;
    align-items: stretch;
    margin: 0 20px;
    padding-bottom: 30px;
  }
  @media (min-width: 1600px) {
    .numbers {
      margin: 0 60px;
    }
  }
  .card-number{
    margin: 5px 5px;
    flex: 1 10%;
    min-width: 246px;
  }
  .card-number .card-number-content{
    transition: all 1s;
  }
  .card-number.off .card-number-content,
  .card-number.error .card-number-content{
    background: red;
  }
  .card-number.esperando .card-number-content{
    background: green;
  }
  .card-number.ok .card-number-content{
    background: greenyellow;
    color: black;
  }
  .card-number-content{
    font-size: 46px;
    padding: 24px 15px;
  }
  .card-number-machine {
    padding: 5px 15px;
    margin: -24px -15px 24px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.5);
  }
  .card-number-time {
    padding: 5px 15px;
    margin: 24px -15px -24px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.5);
  }
  .card-number-name {
    padding: 5px 15px;
    background: #252525;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .card-number-number {
    padding: 0 15px 5px;
    background: #252525;
    font-size: 12px;
    color: gray;
  }
</style>

