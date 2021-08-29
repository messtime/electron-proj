<template>
  <div class="record-page">
    <div>
      <!--       <a-button class="import-btn" @click="goBack">
        导入
      </a-button> -->
      <div  class="import-btn">
        <a-upload name="file" :customRequest="dataHandle" :showUploadList="false" @change="handleImport">
          <a-button>
            导入 </a-button>
        </a-upload>
      </div>
      <a-button class="output-btn" @click="handleOutput">
        导出
      </a-button>
      <a-button class="back-btn" @click="goBack">
        回退
      </a-button>
      <a-tabs default-active-key="1" @change="mainCallback">
        <a-tab-pane v-for="(item, index) in mainPane" :key="'main' + index" :tab="item.titleBar">
          <div>
            <a-tabs default-active-key="list0" @change="callback" :tab-position="tabPosition">
              <a-tab-pane v-for="(list, indexList) in item.list" :key="'list' + indexList" :tab="month + '/' + list.title">
                <div>
                  <a-table bordered :data-source="list.dataSource" :row-selection="rowSelection" :columns="columns">
                    <template slot="age" slot-scope="text, record">
                      <editable-cell :text="text" @change="
                          onCellChange(
                            record.key,
                            'age',
                            index,
                            indexList,
                            $event,
                          )
                        " />
                    </template>
                    <template slot="address" slot-scope="text, record">
                      <editable-cell :text="text" @change="
                          onCellChange(
                            record.key,
                            'address',
                            index,
                            indexList,
                            $event
                          )
                        " />
                    </template>
                    <template slot="operation" slot-scope="text, record">
                      <a-popconfirm v-if="list.dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key,index,indexList)">
                        <a href="javascript:;">删除</a>
                      </a-popconfirm>
                    </template>
                    <template slot="footer" slot-scope="text, record">
                      <a-button class="editable-add-btn" @click="handleAdd(index, indexList, record)">
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
  </div>
</template>
<script>
// const { dialog } = require('electron')
// console.log(dialog.showOpenDialog({ properties: ['openFile', 'file:///C:/Users/lewei.li/Documents/Downloads/'] }))
const { dialog } = require('electron').remote;

// dialog.showOpenDialog({ properties: ['openFile', 'C:/Users/lewei.li/Documents/Downloads/'] })

import recordData from './Record/recordData.js'
import EditableCell from './Record/EditableCell.js'

import fs from 'fs'
import path from 'path'



const { MayPane, JunePane, JulyPane, AugustPane, SeptemberPane, paneMap } = recordData;
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
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



const columns = [{
    title: '期数',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '还款时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '还款本金',
    dataIndex: 'sum',
    key: 'sum',
  },
  {
    title: '还款利息',
    dataIndex: 'fee',
    key: 'fee',
  },
  {
    title: '提前还款额',
    dataIndex: 'allSum',
    key: 'allSum',
  },
  {
    title: '实际利率(%)',
    dataIndex: 'rate',
    key: 'rate',
  },
];

const data = [{
  index: 1,
  date: '2021/2/10',
  sum: 23667,
  fee: 4970,
  allSum: 1420000 - 23667 + 4970,
  rate: ((4970 + 4970) / 1420000) * 12 * 100,
}, ];



export default {
  name: 'record',
  components: {
    EditableCell,
  },
  data() {
    return {
      mainPane: AugustPane,
      total: 1420000,
      tabPosition: 'left',
      fee: 4970,
      month: null,
      activeKey: 1,
      rowSelection,
      dataSource: [{
        key: '1',
        name: '1',
        age: '聊天记录',
        address: '补充',
      }],
      count: 3,
      columns: [{
          title: '',
          dataIndex: 'key',
          width: '5%',
          scopedSlots: { customRender: 'key' },
        },
        {
          title: '聊天记录整理',
          dataIndex: 'age',
          width: '60%',

          scopedSlots: { customRender: 'age' },
        },
        {
          title: '补充',
          dataIndex: 'address',
          width: '27%',

          scopedSlots: { customRender: 'address' },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '10%',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
    dataHandle(info) {
      var filePath =
        info.file.path;
      let fileData = fs.readFileSync(filePath, 'utf8')
      try {
        fileData = JSON.parse(fileData);
        localStorage.setItem('data' + this.month, JSON.stringify(fileData['data' + this.month]));

        this.mainPane = [];
        setTimeout(() => { this.mainPane = fileData['data' + this.month]; }, 1)

        this.$message.success(filePath + `  文件已导入 `);

      } catch (error) {
        this.$message.error('文件格式错误,请重新选择');

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
      let filePath = path.join(__static, '../output.js');
      let tempData = {};

      fs.exists(filePath, (exists) => {
        if (exists) {
          var fileData = fs.readFileSync(filePath, 'utf8');
          if (fileData) {
            fileData = JSON.parse(fileData);

            fileData['data' + this.month] = JSON.parse(localStorage.getItem('data' + this.month));
            fs.writeFileSync(filePath, JSON.stringify(fileData, 'utf8'));
            this.$message.success(`文件已导出到: ` + filePath);
          } else {
            tempData['data' + this.month] = JSON.parse(localStorage.getItem('data' + this.month));
            fs.writeFileSync(filePath, JSON.stringify(tempData), 'utf8');
            this.$message.success(`文件已导出到: ` + filePath);
          }

        } else {

          tempData['data' + this.month] = JSON.parse(localStorage.getItem('data' + this.month));

          fs.writeFileSync(filePath, JSON.stringify(tempData), 'utf8')
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
      data[mainIndex].list[listIndex].dataSource[key - 1][dataIndex] = value;
      localStorage.setItem('data' + this.month, JSON.stringify(data));
    },
    onDelete(key, mainIndex, listIndex) {

      // this.mainPane[mainIndex].list[listIndex].dataSource
      //
      // debugger;
      // const data = [...this.mainPane];
      var dataTemp = this.mainPane[mainIndex].list[listIndex].dataSource;
      for (let i = dataTemp.length; i > key; i--) {
        dataTemp[i - 1].key = i - 1;
      }
      dataTemp.splice(key - 1, 1);
      const data = [...dataTemp];
      this.mainPane[mainIndex].list[listIndex].dataSource = data
      var te = [...this.mainPane];
      this.mainPane = [];
      setTimeout(() => {
        this.mainPane = te;
      }, 1)
      localStorage.setItem('data' + this.month, JSON.stringify(this.mainPane));
      // const target = dataTemp.find((item) => item.key === key);

      // const dataSource = [...this.dataSource];
      // this.dataSource = dataSource.filter((item) => item.key !== key);
    },

    handleAdd(mainIndex, listIndex) {
      const { count, dataSource } = this;
      const newData = {
        key: this.mainPane[mainIndex].list[listIndex].dataSource.length + 1,
        age: '聊天记录',
        address: `补充`,
      };
      this.mainPane[mainIndex].list[listIndex].dataSource.push(newData);
      const data = [...this.mainPane];
      localStorage.setItem('data' + this.month, JSON.stringify(data));

      // this.dataSource = [...dataSource, newData]
      // this.count = count + 1
    },
    pressEnter() {
      if (this.userInput == this.password) {
        this.goPage('/overview');
      } else {
        this.userInput = '';
      }
    },
    callback(key) {
      console.log(key);
    },
    mainCallback(key) {
      this.activeKey = key;
    },
    onChange(e) {
      console.log(e);
    },
    compute(link) {
      let lastMoney = this.total - 23667;
      let avgMoney = (lastMoney + this.total + 23667) / 2;
      let item = {
        index: 1,
        date: '2021/2/10',
        sum: 23667,
        fee: 4970,
        allSum: this.total - 23667 + this.fee,
        rate: ((4970 + this.fee) / avgMoney) * 12 * 100,
      };
      let itemAll = [];
      itemAll.push({ ...item });
      for (let i = 2; i < 5 * 12 + 1; i++) {
        if (i == 60) {
          let lastMoney = this.total - 23667 * 60;
          let avgMoney = (lastMoney + this.total + 23667) / 2;
          itemAll.push({
            index: 60,
            date: '2026/2/10',
            sum: 23667,
            fee: 4970,
            allSum: this.total - 23667 * 60,
            rate: ((((4970 * 60) / avgMoney) * 12) / 60) * 100,
          });
          continue;
        }
        item.index = i;
        let dateArr = item.date.split('/');
        if (dateArr[1] < 12) {
          dateArr[1] = +dateArr[1] + 1;
        } else {
          dateArr[0] = +dateArr[0] + 1;
          dateArr[1] = 1;
        }
        item.date = dateArr.join('/');
        item.allSum = item.allSum - 23667;
        let lastMoney = item.allSum - this.fee;
        let avgMoney = (lastMoney + this.total + 23667) / 2;
        let allFee = 4970 * item.index + this.fee;
        item.rate = (((allFee / avgMoney) * 12) / item.index) * 100;
        let tempItem = { ...item };
        itemAll.push(tempItem);
      }
      this.dataSource = itemAll;
    },
  },
  mounted() {
    this.month = this.$route.query.month;
    var data = localStorage.getItem('data' + this.month);
    if (data) {
      this.mainPane = JSON.parse(data);
    } else {
      this.mainPane = paneMap[this.month];
    }
    // this.compute();
  },
};

</script>
<style lang="scss">
.record-page {
  margin: 20px;
  margin-left: 10p;

  .input-container {
    display: flex;
    justify-content: space-evenly;

    .ant-input {
      width: 180px;
    }
  }

  .import-btn {
    position: absolute;
    cursor: pointer;
    right: 295px;
    z-index: 100;
  }

  .output-btn {
    float: right;
    cursor: pointer;
    z-index: 100;
    right: 200px;
  }

  .editable-cell-text-wrapper {
    white-space: pre-line;
    position: relative;
    top: -12px;
  }


  .back-btn {
    float: right;
    right: 62px;
    cursor: pointer;
    z-index: 100;
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
