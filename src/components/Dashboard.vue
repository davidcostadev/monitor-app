<template>

  <div>
    <div v-for="number in numbers" v-bind:class="`card-number ${numbers_status[number.number]}`">
      <div class="card-number-content">
        {{numbers_status[number.number]}}
      </div>
      <div class="card-number-footer">
        {{number.number}}
        {{number.name}}
      </div>
    </div>

  </div>

</template>

<script>
  import SocketMotor from '../socket';
  import config from '../config';
  import numbers from '../numbers.json';

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
          status[number.number] = 'off';
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

          old[data.number] = data.status;

          this.number_status_socket = old;
          window.console.log(data);
        });
      });
    },
  };
</script>

<style>
  .card-number.off,
  .card-number.error {
    background: red;
  }
  .card-number.waiting {
    background: orange;
  }
  .card-number.ok {
    background: green;
  }
</style>

