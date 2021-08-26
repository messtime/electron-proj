<template>
  <div class="record-page">
    <div>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="5/3-5/7">
          <div>
            <a-tabs
              default-active-key="11"
              @change="callback"
              :tab-position="tabPosition"
            >
              <a-tab-pane key="11" tab="5/3">
                <div>
                  <a-table
                    bordered
                    :data-source="dataSource"
                    :row-selection="rowSelection"
                    :columns="columns"
                  >
                    <template slot="age" slot-scope="text, record">
                      <editable-cell
                        :text="text"
                        @change="onCellChange(record.key, 'age', $event)"
                      />
                    </template>
                    <template slot="address" slot-scope="text, record">
                      <editable-cell
                        :text="text"
                        @change="onCellChange(record.key, 'address', $event)"
                      />
                    </template>
                    <template slot="operation" slot-scope="text, record">
                      <a-popconfirm
                        v-if="dataSource.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record.key)"
                      >
                        <a href="javascript:;">Delete</a>
                      </a-popconfirm>
                    </template>
                    <template slot="footer">
                      <a-button class="editable-add-btn" @click="handleAdd">
                        Add
                      </a-button>
                    </template>
                  </a-table>
                </div>
              </a-tab-pane>
              <a-tab-pane key="12" tab="5/4" force-render>
                Content of Tab Pane 2
              </a-tab-pane>
              <a-tab-pane key="13" tab="5/5">
                Content of Tab Pane 3
              </a-tab-pane>
              <a-tab-pane key="14" tab="5/6">
                Content of Tab Pane 4
              </a-tab-pane>
              <a-tab-pane key="15" tab="5/7">
                Content of Tab Pane 4
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="5/10-5/14" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="5/17-5/21">
          Content of Tab Pane 3
        </a-tab-pane>
        <a-tab-pane key="4" tab="5/24-5/28">
          Content of Tab Pane 4
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
// const { dialog } = require('electron')
// console.log(dialog.showOpenDialog({ properties: ['openFile', 'file:///C:/Users/lewei.li/Documents/Downloads/'] }))
const { dialog } = require("electron").remote;

// dialog.showOpenDialog({ properties: ['openFile', 'C:/Users/lewei.li/Documents/Downloads/'] })

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
      this.$emit("change", this.value);
    },
    edit() {
      this.editable = true;
    },
  },
};

const columns = [
  {
    title: "期数",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "还款时间",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "还款本金",
    dataIndex: "sum",
    key: "sum",
  },
  {
    title: "还款利息",
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: "提前还款额",
    dataIndex: "allSum",
    key: "allSum",
  },
  {
    title: "实际利率(%)",
    dataIndex: "rate",
    key: "rate",
  },
];

const data = [
  {
    index: 1,
    date: "2021/2/10",
    sum: 23667,
    fee: 4970,
    allSum: 1420000 - 23667 + 4970,
    rate: ((4970 + 4970) / 1420000) * 12 * 100,
  },
];

export default {
  name: "record",
  components: {
    EditableCell,
  },
  data() {
    return {
      total: 1420000,
      tabPosition: "left",
      fee: 4970,
      columns,
      rowSelection,
      dataSource: [],
      dataSource: [
        {
          key: "0",
          name: "1",
          age: "聊天记录1",
          address: "补充 1",
        },
        {
          key: "1",
          name: "2",
          age: "聊天记录2",
          address: "补充 2",
        },
      ],
      count: 3,
      columns: [
        {
          title: "",
          dataIndex: "name",
          width: "5%",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "聊天记录整理",
          dataIndex: "age",
          width: "60%",

          scopedSlots: { customRender: "age" },
        },
        {
          title: "补充",
          dataIndex: "address",
          width: "27%",

          scopedSlots: { customRender: "address" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: "8%",
          scopedSlots: { customRender: "operation" },
        },
      ],
    };
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find((item) => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter((item) => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: count,
        age: "聊天记录" + count,
        address: `补充 ${count}`,
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
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
    onChange(e) {
      console.log(e);
    },
    compute(link) {
      let lastMoney = this.total - 23667;
      let avgMoney = (lastMoney + this.total + 23667) / 2;
      let item = {
        index: 1,
        date: "2021/2/10",
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
            date: "2026/2/10",
            sum: 23667,
            fee: 4970,
            allSum: this.total - 23667 * 60,
            rate: ((((4970 * 60) / avgMoney) * 12) / 60) * 100,
          });
          continue;
        }
        item.index = i;
        let dateArr = item.date.split("/");
        if (dateArr[1] < 12) {
          dateArr[1] = +dateArr[1] + 1;
        } else {
          dateArr[0] = +dateArr[0] + 1;
          dateArr[1] = 1;
        }
        item.date = dateArr.join("/");
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
