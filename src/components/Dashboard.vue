<template>

  <div>

    dashboard

  </div>

</template>

<script>
  import SocketMotor from '../socket';
  import config from '../config';

  const Socket = new SocketMotor(config.ip);

  export default {
    data() {
      return {
        // Socket
      };
    },
    mounted() {
      Socket.connect(() => {
        window.console.log('connected');

        Socket.getStatsClient((data) => {
          window.console.log(data);
        });
      });
    },
  };
</script>

<style>

</style>

