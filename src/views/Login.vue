<template>
  <div class="login-container">
    <div class="row-container">
      <div class="section">
        <img :src="mySVG" />
      </div>
      <div class="section form">
        <form @submit="onSubmit">
          <div class="app-input">
            <input type="text" v-model="email" />
            <div class="underline"></div>
            <label>Email ID</label>
          </div>
          <div class="app-input">
            <input type="password" v-model="password" />
            <div class="underline"></div>
            <label>Password</label>
          </div>
          <div class="forgot-password">
            <p>Forgot password?</p>
          </div>
          <button
            type="submit"
            class="btn"
            :class="{ disabled: !email.length || !password.length }"
          >
            Login
          </button>
        </form>
        <div class="no-account">
          <p>Don't have an account?</p>
          <a href="/register">Register now</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  created() {},
  data() {
    return {
      mySVG: require("@/assets/stree.svg"),
      email: "",
      password: "",
    };
  },
  props: {},
  methods: {
    onSubmit(event) {
      event.preventDefault();
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (!existingUsers.find((user) => user.email === this.email))
        return alert("User doesn't exist");
      if (!existingUsers.find((user) => user.password === this.password))
        return alert("Incorrect password");

      const user = existingUsers.find((user) => user.email === this.email);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      this.$router.push("/");
    },
  },
};
</script>
<style>
@import "@/styles/Login.css";
</style>
