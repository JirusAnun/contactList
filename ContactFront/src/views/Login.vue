<template>
  <div class="ui middle aligned center aligned grid" style="height: auto; margin-top: 2%;">
    <div class="ui segment" style="display: flex; flex-direction: column; width: 30%;">
      <div class="ui teal segment" style="width: 95%; align-self: center; margin-top: 5px;">
        <div class="ui teal ribbon label big">Login</div>
      </div>
      <div class="ui small header" style="padding-left: 2%; margin-top:15px;">User Account</div>
      <div class="ui input" style="width: 95%; align-self: center; margin-top:-1%;">
        <input type="text" v-model="userpass.Username" placeholder="User Account" />
      </div>
      <div class="ui small header" style="padding-left: 2%; margin-top:4%">Password</div>
      <div class="ui input" style="width: 95%; align-self: center; margin-top:-1%;">
        <input type="password" v-model="userpass.Password" placeholder="Password" />
      </div>
      <div style="display: flex; justify-content: left; padding: 20px 2% 0px 10px;">
        <button class="ui button" @click="Login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      userpass: {
        Username: "",
        Password: ""
      }
    }
  },
  methods: {
    async Login() {
      try {
        const response = await axios.post('http://localhost:5001/login', this.userpass)
        this.handleLoginResponse(response)
      } catch (error) {
        console.error(error)
      }
    },
    handleLoginResponse(response) {
      alert(response.data.message)
      if (response.data.login) {
        this.handleSuccessfulLogin()
      } else {
        this.handleFailedLogin()
      }
    },
    handleSuccessfulLogin() {
      localStorage.setItem('isAuthenticated', true)
      this.$router.replace('/contact')
    },
    handleFailedLogin() {
      this.userpass.Username = ""
      this.userpass.Password = ""
      localStorage.setItem('isAuthenticated', false)
    }
  }
}
</script>