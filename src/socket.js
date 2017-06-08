import io from 'socket.io-client';

export default class SocketMotor {
  constructor(ip) {
    this.ip = ip;
    this.socket = null;
  }

  connect(callback) {
    this.socket = io(this.ip, {
      query: {
        type: 'view',
      },
    });

    this.socket.on('connect', callback);

    this.socket.on('registred', (socketId) => {
      window.console.log('ON registred');
      window.console.log(socketId);
    });

    this.socket.on('disconnect', () => {
      window.console.log('disconnect');
    });
  }

  getCpu(callback) {
    this.socket.on('get_cpu', callback);
  }

  getStatsClient(callback) {
    this.socket.on('get_stats_client', callback);
  }

  getMemory(callback) {
    this.socket.on('get_memory', callback);
  }

}
