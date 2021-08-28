<template>
  <div class="record-page">
    <div>
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

const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper ">
          <a-input :value="value" @change="handleChange"  @pressEnter="check" @blur="check"/>
        </div>
        <div v-else class="editable-cell-text-wrapper"  @click="edit">
          {{ value || ' ' }}
        </div>
      </div>
    `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    };
  },
  methods: {
    handleChange(e) {

      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      this.$emit('change', this.value);
    },
    edit() {
      this.editable = true;
    },
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

const MayPane = [{
  titleBar: '26-28',
  list: [{
      title: 26,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    },
    {
      title: 27,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    },
    {
      title: 28,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    },
  ],
}];
const JunePane = [{
    titleBar: '1-4',
    list: [{
        title: 1,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 2,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 3,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 4,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
    ],
  },
  {
    titleBar: '7-11',
    list: [{
        title: 7,
        dataSource: [{
          key: '1',
          name: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 8,
        dataSource: [{
          key: '2',
          name: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 9,
        dataSource: [{
          key: '3',
          name: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 10,
        dataSource: [{
          key: '4',
          name: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 11,
        dataSource: [{
          key: '5',
          name: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
    ],
  },
  {
    titleBar: '15-18',
    list: [{
        title: 15,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 16,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 17,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
      {
        title: 18,
        dataSource: [{
          key: '1',
          age: '聊天记录1',
          address: '补充 1',
        }, ],
      },
    ],
  },
  {
    titleBar: '21-25',
    list: [{
      title: 21,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 22,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 23,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 24,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 25,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '28-30',
    list: [{
      title: 28,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 29,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 30,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
];
const JulyPane = [{
    titleBar: '1-2',
    list: [{
      title: 1,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 2,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '5-9',
    list: [{
      title: 5,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 6,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 7,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 8,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 9,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '12-16',
    list: [{
      title: 12,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 13,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 14,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 15,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 16,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '19-23',
    list: [{
      title: 19,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 20,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 21,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 22,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 23,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '26-30',
    list: [{
      title: 26,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 27,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 28,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 29,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 30,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
];
const AugustPane = [{
    titleBar: '2-6',
    list: [{
      title: 2,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 3,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 4,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 5,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 6,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '9-13',
    list: [{
      title: 9,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 10,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 11,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 12,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 13,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '16-20',
    list: [{
      title: 16,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 17,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 18,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 19,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 20,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '23-27',
    list: [{
      title: 23,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 24,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 25,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 26,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 27,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '30-31',
    list: [{
      title: 30,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 31,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
];
const SeptemberPane = [{
    titleBar: '1-3',
    list: [{
      title: 1,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 2,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 3,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '6-10',
    list: [{
      title: 6,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 7,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 8,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 9,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 10,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '13-18',
    list: [{
      title: 13,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 14,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 15,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 16,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 17,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 18,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '22-24',
    list: [{
      title: 22,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 23,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 24,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
  {
    titleBar: '26-30',
    list: [{
      title: 26,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 27,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 28,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 29,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, {
      title: 30,
      dataSource: [{
        key: '1',
        age: '聊天记录1',
        address: '补充 1',
      }, ],
    }, ],
  },
];
const paneMap = {
  5: MayPane,
  6: JunePane,
  7: JulyPane,
  8: AugustPane,
  9: SeptemberPane,
};

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
        age: '聊天记录1',
        address: '补充 1',
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
          width: '8%',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  methods: {
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
      data[mainIndex].list[listIndex].dataSource[key-1][dataIndex] = value;
      localStorage.setItem('data' + this.month, JSON.stringify(data));
    },
    onDelete(key, mainIndex, listIndex) {

      // this.mainPane[mainIndex].list[listIndex].dataSource
      //

      // const data = [...this.mainPane];
      var dataTemp = this.mainPane[mainIndex].list[listIndex].dataSource;
      for (var i = dataTemp.length - 1; i > key; i--) {
        dataTemp[i].key = dataTemp[i].key - 1;
      }
      dataTemp.splice(key - 1, 1);
      const data = [...this.mainPane];
      this.mainPane = data;
      localStorage.setItem('data' + this.month, JSON.stringify(data));
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
