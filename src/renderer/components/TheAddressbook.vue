<template>
  <div class="tab-title">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="公司">
        <div>
          <a-table bordered :data-source="dataSource1" :columns="columns1">
            <template slot="age" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'age', $event, 1)" />
            </template>
            <template slot="part" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'part', $event, 1)" />
            </template>
            <template slot="phone" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'phone', $event, 1)" />
            </template>
            <template slot="boss" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'boss', $event, 1)" />
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm v-if="dataSource1" title="Sure to delete?" @confirm="() => onDelete(record.key, 1)">
                <a href="javascript:;">X</a>
              </a-popconfirm>
            </template>
            <template slot="footer" slot-scope="text, record">
              <a-button class="editable-add-btn" @click="handleAdd(1)">
                Add
              </a-button>
            </template>
          </a-table>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="代理商">
        <div>
          <a-table bordered :data-source="dataSource2" :columns="columns2">
            <template slot="age" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'age', $event, 2)" />
            </template>
            <template slot="city" slot-scope="text, record">
              <!-- <editable-cell
                :text="text"
                @change="onCellChange(record.key, 'city', $event, 2)"
              /> -->
              <a-select :default-value="record.city" style="width:70px;" @change="handleChange">
                <a-select-option v-for="(item, index) in cityData" :value="item" :key="index">
                  {{ item }}
                </a-select-option>
              </a-select>
            </template>
            <template slot="address" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'address', $event, 2)" />
            </template>
            <template slot="type" slot-scope="text, record">
              <editable-cell
                :text="text"
                @change="onCellChange(record.key, 'type', $event, 2)"
              />
              <a-select default-value="" :value="record.type"  style="width:150px;" @change="handleChange">
                <a-select-option v-for="(item, index) in typeData" :value="item" :key="index">
                  {{ item }}
                </a-select-option>
              </a-select>
            </template>
            <template slot="contact" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'contact', $event, 2)" />
            </template>
            <template slot="phone" slot-scope="text, record">
              <editable-cell :text="text" @change="onCellChange(record.key, 'phone', $event, 2)" />
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-popconfirm v-if="dataSource2.length" title="Sure to delete?" @confirm="() => onDelete(record.key, 2)">
                <a href="javascript:;">X</a>
              </a-popconfirm>
            </template>
            <template slot="footer" slot-scope="text, record">
              <a-button class="editable-add-btn" @click="handleAdd(2)">
                Add
              </a-button>
            </template>
          </a-table>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-button class="back-btn" @click="goBack">
      Back
    </a-button>
  </div>
</template>
<script>
import recordData from "./Record/recordData.js";
import EditableCell from "./Record/EditSimpleDbl.js";
import fs from "fs";
import path from "path";

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
  data() {
    return {
      rowSelection,
      cityData: [
        "武汉",
        "黄石",
        "十堰",
        "宜昌",
        "襄阳",
        "鄂州",
        "荆门",
        "孝感",
        "荆州",
        "黄冈",
        "咸宁",
        "随州",
      ],
      typeData: [
        "新开发个人",
        "已在合作个人",
        "新开发电梯公司",
        "已在合作电梯公司",
      ],
      dataSource1: [{
        key: "1",
        name: "1",
        age: "",
        phone: "",
        boss: "",
        part: "",
      }, ],
      dataSource2: [{
        key: "1",
        name: "1",
        age: "",
        address: "",
        phone: "",
        contact: "",
        type: "",
        city: "",
      }, ],
      count: 3,
      columns1: [
        // {
        //   title: "",
        //   dataIndex: "key",
        //   width: "5%",
        //   scopedSlots: { customRender: "key" },
        // },
        {
          title: "姓名",
          dataIndex: "age",
          width: "18%",

          scopedSlots: { customRender: "age" },
        },
        {
          title: "部门",
          dataIndex: "part",
          width: "31%",

          scopedSlots: { customRender: "part" },
        },
        {
          title: "移动电话",
          dataIndex: "phone",
          width: "33%",

          scopedSlots: { customRender: "phone" },
        },
        {
          title: "直接上级",
          dataIndex: "boss",
          width: "15%",

          scopedSlots: { customRender: "boss" },
        },
        {
          title: "",
          dataIndex: "operation",
          width: "3%",
          scopedSlots: { customRender: "operation" },
        },
      ],
      columns2: [
        // {
        //   title: "",
        //   dataIndex: "key",
        //   width: "5%",
        //   scopedSlots: { customRender: "key" },
        // },
        {
          title: "全称",
          dataIndex: "age",
          width: "22%",
          // fixed: 'left',
          scopedSlots: { customRender: "age" },
        },
        {
          title: "地级市",
          dataIndex: "city",
          width: "10%",

          scopedSlots: { customRender: "city" },
        },

        {
          title: "经营地址",
          dataIndex: "address",
          width: "23%",

          scopedSlots: { customRender: "address" },
        },
        {
          title: "分类",
          dataIndex: "type",
          width: "10%",

          scopedSlots: { customRender: "type" },
        },
        {
          title: "主要联系人",
          dataIndex: "contact",
          width: "15%",

          scopedSlots: { customRender: "contact" },
        },
        {
          title: "联系电话",
          dataIndex: "phone",
          width: "22%",
          // fixed: 'right',
          scopedSlots: { customRender: "phone" },
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
  components: {
    EditableCell,
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    handleChange(field, key) {

      // this.dataSource2[key - 1][field] = value;

    },
    onCellChange(key, field, value, type) {
      if (type == 1) {
        this.dataSource1[key - 1][field] = value;
        localStorage.setItem("company", JSON.stringify(this.dataSource1));
      } else {
        this.dataSource2[key - 1][field] = value;
        localStorage.setItem("agent", JSON.stringify(this.dataSource2));
      }
    },
    onDelete(key, type) {
      if (type == 1) {
        var dataTemp = this.dataSource1;
        for (let i = dataTemp.length; i > key; i--) {
          dataTemp[i - 1].key = i - 1;
        }
        dataTemp.splice(key - 1, 1);
        const data = [...dataTemp];

        setTimeout(() => {
          this.dataSource1 = data;

          localStorage.setItem("company", JSON.stringify(this.dataSource1));
        }, 1);
      } else {
        var dataTemp = this.dataSource2;
        for (let i = dataTemp.length; i > key; i--) {
          dataTemp[i - 1].key = i - 1;
        }
        dataTemp.splice(key - 1, 1);
        const data = [...dataTemp];
        this.dataSource2 = [];

        setTimeout(() => {
          this.dataSource2 = data;

          localStorage.setItem("agent", JSON.stringify(this.dataSource2));
        }, 1);
      }
    },

    handleAdd(type) {
      let newData = {};
      if (type == 1) {
        newData = {
          key: this.dataSource1.length + 1,
          age: "data",
          phone: "else",
          boss: "else",
          part: "else",
        };
        this.dataSource1.push(newData);
        localStorage.setItem("company", JSON.stringify(this.dataSource1));
      } else {
        newData = {
          key: this.dataSource2.length + 1,
          name: "1",
          age: "data",
          address: "else",
          phone: "",
          contact: "",
          type: "",
          city: "",
        };
        this.dataSource2.push(newData);
        localStorage.setItem("agent", JSON.stringify(this.dataSource2));
      }
    },
    goBack() {
      // window.history.back();
      this.$router.push("/month");
    },
  },
  mounted() {
    var company = localStorage.getItem("company");

    var agent = localStorage.getItem("agent");

    if (company) {
      company = JSON.parse(company);
      if (company.length == 0) {
        localStorage.setItem(
          "company",
          JSON.stringify(this.dataSource2)
        );
      } else {
        this.dataSource1 = [];
        setTimeout(() => {

          this.dataSource1 = company;
        }, 1)
      }
    } else {
      localStorage.setItem(
        "company",
        JSON.stringify(this.dataSource1)
      );
    }

    if (agent) {
      agent = JSON.parse(agent);
      if (agent.length == 0) {
        localStorage.setItem(
          "agent",
          JSON.stringify(this.dataSource2)
        );
      } else {
        this.dataSource2 = [];
        setTimeout(() => {
          this.dataSource2 = agent;

        }, 1)
      }
    } else {
      localStorage.setItem(
        "agent",
        JSON.stringify(this.dataSource2)
      );
    }
  }
}

</script>
<style lang="scss">
.ant-select-dropdown-menu .ant-select-dropdown-menu-item {
  font-size: 14px !important;
}

.tab-title {
  .ant-table-row-cell-break-word {
    text-align: center;
  }

  .ant-tabs {
    margin-left: 25px;
    margin-right: 25px;
  }

  .ant-select-selection-selected-value {
    font-size: 14px !important;
  }

  .back-btn {
    position: fixed;
    /* left: 5%; */
    left: 25px;
    // float: right;
    // right: 62px;
    cursor: pointer;
    z-index: 100;
    bottom: 15px;
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    text-shadow: none;
    font-weight: bold;
    font-size: 18px;
  }
}

</style>
