<template>
  <div class="month-page">
      <b>工作日志</b>
        <a-button type="primary" @click="goPage('/record')">
      5月
    </a-button>
      <a-button type="primary"   @click="goPage('/record')">
      6月
    </a-button>
      <a-button type="primary"   @click="goPage('/record')">
      7月
    </a-button>
      <a-button type="primary"   @click="goPage('/record')">
      8月
    </a-button>
      <a-button type="primary"   @click="goPage('/record')">
      9月
    </a-button>

  </div>
</template>
<script>
  

export default {
  name: 'month',
  data () {
    return {
    
    }
  },
  methods: {
       goPage (link) {
        this.$router.push(link)
      }
  },
  mounted () {
    // this.compute();
  }
}
</script>
<style lang="scss">
.month-page {
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
