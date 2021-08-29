<template>
  <div class="month-page">
    <b>工作日志</b>
    <a-button type="primary" @click="goPage('/record?month=5')">
      5月
    </a-button>
    <a-button type="primary" @click="goPage('/record?month=6')">
      6月
    </a-button>
    <a-button type="primary" @click="goPage('/record?month=7')">
      7月
    </a-button>
    <a-button type="primary" @click="goPage('/record?month=8')">
      8月
    </a-button>
    <a-button type="primary" @click="goPage('/record?month=9')">
      9月
    </a-button>
    <div class="file-nav">
      <a-upload name="file" :customRequest="dataHandle" :showUploadList="false" @change="handleImport">
        <a-button  type="primary" >
         全部导入 </a-button>
      </a-upload>
      <a-button type="primary" @click="handleOutput">
        全部导出
      </a-button>
    </div>
  </div>
</template>
<script>
import fs from 'fs'
import path from 'path'

export default {
  name: 'month',
  data() {
    return {

    }
  },
  methods: {
    goPage(link) {
      this.$router.push(link)
    },
    dataHandle(info) {
      var filePath =
        info.file.path;
      let fileData = fs.readFileSync(filePath, 'utf8')
      try {

        let temp = JSON.parse(fileData);
        Object.keys(temp).forEach((item) => {
          localStorage.setItem(item, JSON.stringify(temp[item]))
        })
        this.$message.success(filePath + `  文件已导入 `);

      } catch (error) {
        this.$message.error('文件格式错误,请重新选择');

      }
      return;

    },
    handleImport(info) {
      return;
    },
    handleOutput() {
      let filePath = path.join(__static, '../allOutput.js');
      fs.writeFileSync(filePath, JSON.stringify(localStorage), 'utf8')
      this.$message.success(`文件已导出到: ` + filePath);

    },

  },
  mounted() {
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
  .file-nav {
    margin-top: 300px;
    float: right;
  }
  .btn-container {
    margin-top: 21px;
  }
}

</style>
