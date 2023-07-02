<template>
  <div class="home-container">
    <div class="section">
      <div class="header">
        <h1>You are now Home!</h1>
        <p>All you can do here is get out</p>
      </div>
      <button class="btn" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  created() {
    const loggedUser = localStorage.getItem("loggedUser");
    if (!loggedUser) {
      this.$router.push("/login");
    }
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedUser");
      this.$router.push("/login");
    },
  },
  props: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/Home.css";
@import "@/styles/Button.css";
</style>
