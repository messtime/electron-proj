<template>
  <div class="menu-page">
    <div class="test-router" v-show="showTest">
      <a-row>
      <a-col :span="6" v-for="router in routerList" :key="router.path">
          <router-link :to="router.path">{{ router.path }}</router-link>
      </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
  
import router from '../router'

export default {
  name: 'menu',
  data () {
    return {
        showTest: true,
              routerList: router.options.routes

    }
  },
  methods: {
  
  },
  mounted () {
    // this.compute();
  }
}
</script>
<style lang="scss">
.menu-page {
  margin: 20px;
//   display: flex;

.ant-btn {
    margin-left: 20px;
}
  .input-container {
    display: flex;
    justify-content: space-evenly;

    .ant-input {
      width: 180px;
    }
  }

  .btn-container {
    margin-top: 21px;
  }
}

</style>
