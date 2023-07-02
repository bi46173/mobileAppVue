<template>
  <div class="register-container">
    <div class="row-container">
      <div class="section form">
        <div class="header">
          <img :src="arrowLeft" @click="navigateBack" />
          <h1>Register to Stree</h1>
        </div>
        <form @submit="onSubmit">
          <div class="app-input">
            <input
              type="text"
              v-model="fullName"
              :class="{ error: errors.fullName }"
              required
            />
            <div class="underline"></div>
            <label>Full Name</label>
            <span class="error" v-if="errors.fullName">{{ errors.fullName }}</span>
          </div>
          <div class="app-input">
            <input
              type="email"
              v-model="email"
              :class="{ error: errors.email }"
              required
            />
            <div class="underline"></div>
            <label>Email</label>
            <span class="error" v-if="errors.email">{{ errors.email }}</span>
          </div>
          <div class="app-input">
            <input
              type="number"
              v-model="mobileNumber"
              :class="{ error: errors.mobileNumber }"
              required
            />
            <div class="underline"></div>
            <label>Mobile Number</label>
            <span class="error" v-if="errors.mobileNumber">{{
              errors.mobileNumber
            }}</span>
          </div>
          <div class="app-input">
            <input
              type="password"
              v-model="password"
              :class="{ error: errors.password }"
              required
            />
            <div class="underline"></div>
            <label>Password</label>
            <span class="error" v-if="errors.password">{{ errors.password }}</span>
            <div class="bars">
              <span
                class="bar"
                v-for="index in 4"
                :key="index"
                :class="{ filled: passwordScore >= index }"
              />
            </div>
          </div>
          <div class="app-input">
            <input
              type="password"
              v-model="confirmPassword"
              :class="{ error: errors.password }"
              required
            />
            <div class="underline"></div>
            <label>Confirm Password</label>
            <span class="error" v-if="errors.confirmPassword">{{
              errors.confirmPassword
            }}</span>
          </div>
          <button type="submit" class="btn" :class="{ disabled: hasErrors }">
            Register
          </button>
        </form>
        <div className="consent">
          <div>
            By registering you agree to <span>Terms & Conditions</span> and
            <span>Privacy Policy</span>
            of Stree
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const passwordStrength = require("zxcvbn");
export default {
  name: "RegisterPage",
  created() {},
  data() {
    return {
      arrowLeft: require("@/assets/arrow-left.svg"),
      fullName: "",
      email: "",
      mobileNumber: null,
      password: "",
      confirmPassword: "",
      errors: {},
      passwordScore: 0,
    };
  },
  props: {},
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
    onSubmit(event) {
      event.preventDefault();
      if (this.hasErrors) {
        console.log("Form has errors. Cannot submit.");
        return;
      }
      const userToRegister = {
        fullName: this.fullName,
        email: this.email,
        mobileNumber: this.mobileNumber,
        password: this.password,
      };
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (existingUsers.find((user) => user.email === userToRegister.email))
        return alert("User already exists");
      existingUsers.push(userToRegister);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      this.$router.push("/login");
    },
    validateEmail(email) {
      if (email.trim().length === 0) {
        return (this.errors["email"] = "Email cannot be empty");
      }
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        delete this.errors["email"];
        return;
      } else {
        this.errors["email"] = "Invalid email";
      }
    },
    validateFullName(value) {
      value = value.trim();

      if (value.length === 0) {
        return (this.errors["fullName"] = "Name cannot be empty");
      }
      const onlyLettersMatcher = /^[a-zA-Z\s]*$/;
      if (!onlyLettersMatcher.test(value)) {
        return (this.errors["fullName"] =
          "Name cannot contain non-alphabetic characters");
      }
      delete this.errors["fullName"];
    },
    validateMobileNumber(value) {
      if (String(value).length === 0) {
        return (this.errors["mobileNumber"] = "Mobile number cannot be empty");
      }
      const onlyNumbersMatcher = /^\d+$/;
      if (!onlyNumbersMatcher.test(value)) {
        return (this.errors["mobileNumber"] = "Mobile number cannot contain non-numbers");
      }
      if (String(value).length < 9) {
        return (this.errors["mobileNumber"] =
          "Mobile number has to be at least 9 characters");
      }
      delete this.errors["mobileNumber"];
    },
    validatePassword(value) {
      if (value.length === 0) {
        return (this.errors["password"] = "Password cannot be empty");
      }
      if (value.length < 9) {
        return (this.errors["password"] = "Password has to be at least 9 characters");
      }
      delete this.errors["password"];
    },
    validateConfirmPassword(value) {
      if (value.length === 0) {
        return (this.errors["confirmPassword"] = "Please confirm your password");
      }
      if (value !== this.password) {
        return (this.errors["confirmPassword"] = "Passwords should be the same");
      }
      delete this.errors["confirmPassword"];
    },
  },
  watch: {
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    fullName(value) {
      this.fullName = value;
      this.validateFullName(value);
    },
    mobileNumber(value) {
      this.mobileNumber = value;
      this.validateMobileNumber(value);
    },
    password(value) {
      this.passwordScore = passwordStrength(value).score;
      this.validatePassword(value);
    },
    confirmPassword(value) {
      this.validateConfirmPassword(value);
    },
  },
  computed: {
    hasErrors() {
      const hasValidationErrors = Object.keys(this.errors).length !== 0;
      const fieldNotFilled =
        this.fullName === "" ||
        this.email === "" ||
        this.mobileNumber === null ||
        this.password === "" ||
        this.confirmPassword === "";
      return hasValidationErrors || fieldNotFilled;
    },
  },
};
</script>
<style>
@import "@/styles/Register.css";
</style>
