<template>
  <div class="record-page">
    <div style="flex:3;">
      <!--       <a-button class="import-btn" @click="goBack">
        导入
      </a-button> -->
      <a-button class="back-btn" @click="goBack">
        Back
      </a-button>
      <a-button class="switch-btn" @click="switchShow">
        {{ rightShow ? "Close" : "Show" }}
      </a-button>
      <div class="btn-container" v-if="false">
        <div class="import-btn">
          <a-upload
            name="file"
            :customRequest="dataHandle"
            :showUploadList="false"
            @change="handleImport"
          >
            <a-button> 导入 </a-button>
          </a-upload>
        </div>
        <a-button class="output-btn" @click="handleOutput">
          导出
        </a-button>
      </div>

      <a-tabs default-active-key="1" @change="mainCallback">
        <a-tab-pane
          v-for="(item, index) in mainPane"
          :key="'main' + index"
          :tab="item.titleBar"
        >
          <div>
            <a-tabs
              default-active-key="list0"
              :tabBarGutter="12"
              @change="callback"
              :tab-position="tabPosition"
            >
              <a-tab-pane
                v-for="(list, indexList) in item.list"
                :key="'list' + indexList"
                :tab="month + '/' + list.title"
              >
                <div>
                  <a-table
                    bordered
                    :data-source="list.dataSource"
                    :row-selection="rowSelection"
                    :columns="columns"
                  >
                    <template slot="age" slot-scope="text, record">
                      <editable-cell
                        :text="text"
                        @change="
                          onCellChange(
                            record.key,
                            'age',
                            index,
                            indexList,
                            $event
                          )
                        "
                      />
                    </template>
                    <template slot="address" slot-scope="text, record">
                      <editable-cell
                        :text="text"
                        @change="
                          onCellChange(
                            record.key,
                            'address',
                            index,
                            indexList,
                            $event
                          )
                        "
                      />
                    </template>
                    <template slot="operation" slot-scope="text, record">
                      <a-popconfirm
                        v-if="list.dataSource.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record.key, index, indexList)"
                      >
                        <a href="javascript:;">X</a>
                      </a-popconfirm>
                    </template>
                    <template slot="footer" slot-scope="text, record">
                      <a-button
                        class="editable-add-btn"
                        @click="handleAdd(index, indexList, record)"
                      >
                        Add
                      </a-button>
                    </template>
                  </a-table>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <Menu class="menu-style" v-show="rightShow"></Menu>
  </div>
</template>
<script>
// const { dialog } = require('electron')
// console.log(dialog.showOpenDialog({ properties: ['openFile', 'file:///C:/Users/lewei.li/Documents/Downloads/'] }))
const { dialog } = require("electron").remote;

// dialog.showOpenDialog({ properties: ['openFile', 'C:/Users/lewei.li/Documents/Downloads/'] })

import recordData from "./Record/recordData.js";
import EditableCell from "./Record/EditableCell.js";
// import menu  from './menu.vue'
const Menu = require("@/components/menu").default;
import fs from "fs";
import path from "path";
function stopDefault(e) {
  if (e && e.preventDefault) e.preventDefault();
  else window.event.returnValue = false;
  e.stopPropagation();
  e.cancelBubble = true;
}
window.openFile = () => {
  const { shell } = require("electron").remote;
  shell.showItemInFolder(event.target.getAttribute("href"));
  // dialog.showOpenDialog({ properties: ['openFile', event.target.href] });
  stopDefault(event);
};
const {
  MayPane,
  JunePane,
  JulyPane,
  AugustPane,
  SeptemberPane,
  paneMap,
} = recordData;
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  name: "record",
  components: {
    EditableCell,
    Menu,
  },
  data() {
    return {
      rightShow: true,
      mainPane: AugustPane,
      total: 1420000,
      tabPosition: "left",
      fee: 4970,
      month: null,
      activeKey: 1,
      rowSelection,
      dataSource: [
        {
          key: "1",
          name: "1",
          age: "data",
          address: "else",
        },
      ],
      count: 3,
      columns: [
        {
          title: "",
          dataIndex: "key",
          width: "10%",
          scopedSlots: { customRender: "key" },
        },
        {
          title: "记录整理",
          dataIndex: "age",
          width: "53%",

          scopedSlots: { customRender: "age" },
        },
        {
          title: "补充",
          dataIndex: "address",
          width: "34%",

          scopedSlots: { customRender: "address" },
        },
        {
          title: "",
          dataIndex: "operation",
          width: "3%",
          scopedSlots: { customRender: "operation" },
        },
      ],
    };
  },
  methods: {
    goBack() {
      // window.history.back();
      this.$router.push("/month");
    },
    switchShow() {
      this.rightShow = !this.rightShow;
    },
    dataHandle(info) {
      var filePath = info.file.path;
      let fileData = fs.readFileSync(filePath, "utf8");
      try {
        fileData = JSON.parse(fileData);
        localStorage.setItem(
          "data" + this.month,
          JSON.stringify(fileData["data" + this.month])
        );

        this.mainPane = [];
        setTimeout(() => {
          this.mainPane = fileData["data" + this.month];
        }, 1);

        this.$message.success(filePath + `  文件已导入 `);
      } catch (error) {
        this.$message.error("文件格式错误,请重新选择");
      }
      return;
    },
    handleImport(info) {
      return;
      // let fileContents = fs.readFileSync(path.resolve(__static, '../output.js'), 'utf8')

      // console.log(fileContents);

      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   this.$message.success(`${info.file.name} 导入完成`);
      // } else if (info.file.status === 'error') {
      //   this.$message.error(`${info.file.name} 导入失败`);
      // }
    },
    handleOutput() {
      let filePath = path.join(__static, "../output.js");
      let tempData = {};

      fs.exists(filePath, (exists) => {
        if (exists) {
          var fileData = fs.readFileSync(filePath, "utf8");
          if (fileData) {
            fileData = JSON.parse(fileData);

            fileData["data" + this.month] = JSON.parse(
              localStorage.getItem("data" + this.month)
            );
            fs.writeFileSync(filePath, JSON.stringify(fileData, "utf8"));
            this.$message.success(`文件已导出到: ` + filePath);
          } else {
            tempData["data" + this.month] = JSON.parse(
              localStorage.getItem("data" + this.month)
            );
            fs.writeFileSync(filePath, JSON.stringify(tempData), "utf8");
            this.$message.success(`文件已导出到: ` + filePath);
          }
        } else {
          tempData["data" + this.month] = JSON.parse(
            localStorage.getItem("data" + this.month)
          );

          fs.writeFileSync(filePath, JSON.stringify(tempData), "utf8");
          this.$message.success(`文件已导出到: ` + filePath);
        }
      });
    },
    onCellChange(key, dataIndex, mainIndex, listIndex, value) {
      // const dataSource = [...this.dataSource];
      const data = [...this.mainPane];
      //

      // var dateTemp = data[mainIndex].list[listIndex].dataSource;
      // const target = dateTemp.find((item) => item.key === key);
      // if (target) {
      //   target[dataIndex] = value;
      //   this.dataSource = dataSource;
      // }
      //;
      data[mainIndex].list[listIndex].dataSource[key - 1][dataIndex] = value;
      this.$set(
        data[mainIndex].list[listIndex].dataSource[key - 1],
        dataIndex,
        value
      );
      localStorage.setItem("data" + this.month, JSON.stringify(data));
    },
    onDelete(key, mainIndex, listIndex) {
      // this.mainPane[mainIndex].list[listIndex].dataSource
      //
      //;
      // const data = [...this.mainPane];
      var dataTemp = this.mainPane[mainIndex].list[listIndex].dataSource;
      for (let i = dataTemp.length; i > key; i--) {
        dataTemp[i - 1].key = i - 1;
      }
      dataTemp.splice(key - 1, 1);
      const data = [...dataTemp];
      this.mainPane[mainIndex].list[listIndex].dataSource = data;
      var te = [...this.mainPane];
      this.mainPane = [];
      // this.$nextTick(()=>{
      //    this.mainPane = te;
      //   localStorage.setItem('data' + this.month, JSON.stringify(this.mainPane));
      // })
      setTimeout(() => {
        this.mainPane = te;
        localStorage.setItem(
          "data" + this.month,
          JSON.stringify(this.mainPane)
        );
      }, 1);
      // const target = dataTemp.find((item) => item.key === key);

      // const dataSource = [...this.dataSource];
      // this.dataSource = dataSource.filter((item) => item.key !== key);
    },

    handleAdd(mainIndex, listIndex) {
      const { count, dataSource } = this;
      const newData = {
        key: this.mainPane[mainIndex].list[listIndex].dataSource.length + 1,
        age: "data",
        address: `else`,
      };
      this.mainPane[mainIndex].list[listIndex].dataSource.push(newData);
      const data = [...this.mainPane];
      localStorage.setItem("data" + this.month, JSON.stringify(data));

      // this.dataSource = [...dataSource, newData]
      // this.count = count + 1
    },
    pressEnter() {
      if (this.userInput == this.password) {
        this.goPage("/overview");
      } else {
        this.userInput = "";
      }
    },
    callback(key) {
      console.log(key);
    },
    mainCallback(key) {
      this.activeKey = key;
    },
    openFile(e) {
      //;
      dialog.showOpenDialog({
        properties: ["openFile", "C:/Users/lewei.li/Documents/Downloads/"],
      });
      return false;
    },
    onChange(e) {
      console.log(e);
    },
  },
  mounted() {
    this.month = this.$route.query.month;
    var data = localStorage.getItem("data" + this.month);
    if (data) {
      this.mainPane = JSON.parse(data);
      if (!this.mainPane || this.mainPane.length == 0) {
        this.mainPane = paneMap[this.month];
        localStorage.setItem(
          "data" + this.month,
          JSON.stringify(this.mainPane)
        );
      }
    } else {
      this.mainPane = paneMap[this.month];
      localStorage.setItem("data" + this.month, JSON.stringify(this.mainPane));
    }
  },
};
</script>
<style lang="scss">
.record-page {
  display: flex;
  margin: 20px;
  margin-left: 10px;
  margin-top: 5px;
  .ant-tabs-nav .ant-tabs-tab-active {
    text-shadow: none;
    font-weight: bold;
    font-size: 18px;
  }

  .ant-tabs-tab,
  .ant-tabs-nav {
    // font-size: 18px;
  }

  .input-container {
    display: flex;
    justify-content: space-evenly;

    .ant-input {
      width: 180px;
    }
  }
  .btn-container {
    display: flex;
  }
  .import-btn {
    margin-right: 20px;
    margin-left: 20px;
    // position: absolute;
    // cursor: pointer;
    // right: 295px;
    // z-index: 100;
  }

  .output-btn {
    // float: right;
    // cursor: pointer;
    // z-index: 100;
    // right: 200px;
  }

  .editable-cell-text-wrapper {
    white-space: pre-line;
    position: relative;
    // top: -12px;
  }
  .switch-btn {
    position: fixed;
    /* left: 5%; */
    left: 25px;
    // float: right;
    // right: 62px;
    cursor: pointer;
    z-index: 100;
    padding-right: 13px;
    padding-left: 13px;
    bottom: 62px;
  }

  .back-btn {
    position: fixed;
    bottom: 15px;
    /* left: 5%; */
    left: 25px;
    // float: right;
    // right: 62px;
    cursor: pointer;
    z-index: 100;
  }
  .menu-style {
    flex: 1;
    margin-top: 66px;
    margin-left: 20px;
  }

  .icon-style {
    left: 0;
    top: 9px;
  }

  .text-style {
    margin-left: 20px;
  }

  .btn-container {
    margin-top: 21px;
  }

  .ant-table-footer {
    background-color: transparent;
    border-right: none;
    border-left: none;
    border-bottom: none;
  }
}
</style>
