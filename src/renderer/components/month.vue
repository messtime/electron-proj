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
        <a-button type="primary">
          Import</a-button>
      </a-upload>
      <a-button type="primary" @click="handleOutput">
        Export
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
      this.$router.push(link);
    },
    dataHandle(info) {
      var filePath =
        info.file.path;
      let fileData = fs.readFileSync(filePath, 'utf8')
      try {

        let temp = JSON.parse(fileData);
        Object.keys(temp).forEach((item) => {
          localStorage.setItem(item, temp[item])
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
      Date.prototype.format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          }
        }
        return fmt;
      }

      this.$message.success(`文件导出路径: ` + __static);
      let filePath = path.join(__static, '../' + new Date().format("yyyy-MM-dd hh:mm:ss") + ' allExport.js');
      this.$message.success(`文件导出路径: ` + filePath);

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
  width: 70%;
  margin: 20px auto;
  padding-top: 15%;
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
    bottom: 25%;
    position: absolute;
    right: 15%;
  }

  .btn-container {
    margin-top: 21px;
  }
}

</style>
