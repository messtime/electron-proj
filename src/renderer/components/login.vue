<template>
  <div class="login-page">
    <a-input v-model='userInput' ref="login" type="password" placeholder="" @pressEnter="pressEnter" />
  </div>
</template>
<script>
  export default {
    name: 'login-page',
    data () {
      return {
        password: '0121',
        userInput: ''
      }
  },
    methods: {
      pressEnter () {
        if (this.userInput == this.password) {
          this.goPage('/month')
        } else {
          this.userInput = ''
        }
      },
      goPage (link) {
        this.$router.push(link)
      }
    },
    mounted () {
      this.$refs.login.$el.focus()
  }
  }
</script>
<style lang="scss">
body {
  height: auto !important;
}
  .login-page {
    text-align: center;
    width: 30%;
    height: auto;
    max-width: 200px;
    margin: 0 auto;
    margin-top: 30%;
    .ant-input {
      outline: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      border: none;
      border-bottom: 1px solid #d9d9d9;
      &:focus,
      &:hover {
        box-shadow: none;
        border-color: #d9d9d9;
      }
    }
  }
</style>
