<template>
  <div id="page-login">
    <form id="login" action="">
      <h1>Login de Acesso</h1>
      <div class="form-group"><input type="email" class="input-text" v-model="email" placeholder="email"></div>
      <div class="form-group"><input type="password" class="input-text" v-model="password" placeholder="senha"></div>
      <div class="form-group"><button class="button" v-on:click="logar">Entrar</button></div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      logar() {
        if (this.email === 'contato@m3.com.br' && this.password === 'senhasupersecreta') {
          this.$router.push('/dashboard');
        } else {
          alert('Acesso negado');
        }
      },
    },
  };
</script>


<style>
  #page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 80%;

  }

  #login {
    margin: 30px 20px 60px;
    width: 100%;
    max-width: 400px;
  }
  #login h1 {
    text-align: center;
  }

  .form-group {
    margin: 10px 0;
    display: flex;
  }
  .form-group .input-text{
    flex: 1 100%;
    font-size: 18px;
    padding: 8px 16px;
  }
  .form-group .button {
    flex: 1 100%;
  }
  .button {
    background: green;
    padding: 10px 16px;
    font-size: 18px;
    border: 0;
    color: white;
  }
</style>
