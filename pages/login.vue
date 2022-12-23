<template>
  <div class="card-container">
    <b-container fluid="sm" class="card-content d-flex flex-column mx-auto">
      <img class="mb-5 align-self-center" src="~/assets/logo.png" alt="logo" width="360" />
      <h1>Login</h1>
      <p class="mb-5">
        Seja bem vindo !
      </p>
      <b-form-group @submit.stop.prevent>
        <label for="mail">
          E-mail
        </label>
        <b-form-input
          id="mail"
          v-model="mail"
          :state="validationEmail"
          type="email"
          autocomplete="false"
        />
        <b-form-invalid-feedback :state="validationEmail">
          Por favor informar um e-mail válido.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationEmail">
          E-mail válido.
        </b-form-valid-feedback>
      </b-form-group>
      <b-form-group @submit.stop.prevent>
        <label for="password">
          Senha
        </label>
        <b-form-input
          id="password"
          v-model="password"
          :state="validationPassword"
          type="password"
          autocomplete="false"
        />
        <b-form-invalid-feedback :state="validationPassword">
          A senha deve possuir 8 ou mais caracteres.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validationPassword">
          Senha válida.
        </b-form-valid-feedback>
      </b-form-group>
      <b-button variant="primary" @click="logged">
        Logar
        <b-spinner v-if="loading" small />
      </b-button>
      <b-alert v-model="showAlert" class="mt-4" variant="danger" dismissible>
        Login inválido. Tente novamente!
      </b-alert>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mail: null,
      password: null,
      loading: false,
      showAlert: false
    }
  },
  computed: {
    validationEmail () {
      if (this.mail != null) {
        return this.mail.includes('@') && (this.mail.endsWith('br') || this.mail.endsWith('com'))
      }
    },
    validationPassword () {
      if (this.password != null) {
        return this.password.length >= 8
      }
    }
  },
  methods: {
    async logged () {
      this.loading = true
      await this.$store.dispatch('login', { email: this.mail, password: this.password })
        .then(({ data }) => {
          return data
        })
        .catch(() => {
          this.loading = false
          this.showAlert = true
        })
    }
  }
}
</script>

<style scoped>
.card-container {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}
.card-content {
  max-width: 500px;
}
.card-content:nth-first-child() {
  justify-content: center;
}
</style>
