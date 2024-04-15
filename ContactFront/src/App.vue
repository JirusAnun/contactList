<template>
  <div id="app">
    <div class="nav">
      <div class="nav-content">
        <div class="logo-container">
          <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png" alt="vue"/>
        </div>
        <router-link class="nav-link" to="/contact">Contacts</router-link>
      </div>
      <div class="icon" @click="Logout"><i class="user alternate icon"></i></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "App",
    methods: {
        Logout() {
          if(this.isAuthenticated()){
            if(this.confirmLogout()){
              this.performLogout()
            }
          }
      },
      isAuthenticated() {
        return localStorage.getItem('isAuthenticated') === "true"
      },
      confirmLogout() {
        return confirm("Are you want to logout?")
      },
      performLogout() {
        localStorage.setItem('isAuthenticated', false)
        this.$router.replace('/login')
      }
    }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .nav {
    background-color: black;
    text-decoration: none;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 18px;
    padding-right: 22px;
    font-size: 18px;
    border-radius: 4px;
    justify-content: space-between;
  }
  .nav-content {
    display: flex;
    align-items: center;
  }
  .logo-container {
    margin-right: 30px;
  }
  .logo {
    height: 30px;
  }
  .nav-link {
    color: white;
  }
  .icon{
    color: rgb(222, 222, 222);
  }
  .user.alternate.icon {
    visibility: visible;
  }
</style>