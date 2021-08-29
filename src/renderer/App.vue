<template>
  <div id="app">
    <div class="test-router" v-show="showTest">
      <a-row>
      <a-col :span="6" v-for="router in routerList" :key="router.path">
          <router-link :to="router.path">{{ router.path }}</router-link>
      </a-col>
      </a-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router'

export default {
  name: '工作记录',
  data () {
    return {
      showTest: false,
      routerList: router.options.routes
    }
  },
  methods: {
    hideTest (test) {
      const keyCode = test.keyCode
      if (test === 27 || keyCode === 27) {
        this.showTest = !this.showTest
      }
    }
  },
  mounted () {
    setTimeout(() => {
      document.onkeydown = this.hideTest
    }, 200)
  }
}
</script>

<style lang="scss">
/* CSS */
.test-router {
  .ant-col {
    line-height: 2;
  }

}
</style>
